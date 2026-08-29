import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const GameContext = createContext(null);

const STORAGE_KEY = "therapy-game";

const INITIAL_STATE = {
  stage: 0,

  // Поточне питання поточного етапу
  currentQuestion: 0,

  // Чи показуємо проміжний результат
  showResults: false,

  readerProfile: {
    detective: 0,
    analyst: 0,
    skeptic: 0,
    empath: 0,
    judge: 0,
    theorist: 0,
  },

  characters: {
    viktor: {
      trust: 50,
      suspicion: 50,
      empathy: 50,
      responsibility: 50,
    },

    anna: {
      trust: 50,
      suspicion: 50,
      empathy: 50,
      responsibility: 50,
    },

    isabel: {
      trust: 50,
      suspicion: 50,
      empathy: 50,
      responsibility: 50,
    },

    halberstadt: {
      trust: 50,
      suspicion: 50,
      empathy: 50,
      responsibility: 50,
    },
  },

  judgment: {
    responsibleCharacter: null,
    empathyCharacter: null,
    suspicionCharacter: null,
    trustedCharacter: null,
  },

  answers: {},
};

function createInitialState() {
  return {
    ...INITIAL_STATE,

    readerProfile: {
      ...INITIAL_STATE.readerProfile,
    },

    characters: Object.fromEntries(
      Object.entries(INITIAL_STATE.characters).map(
        ([character, stats]) => [
          character,
          { ...stats },
        ]
      )
    ),

    judgment: {
      ...INITIAL_STATE.judgment,
    },

    answers: {},
  };
}

function clamp(value, min = 0, max = 100) {
  return Math.min(
    Math.max(value, min),
    max
  );
}

/**
 * Застосування або скасування ефектів.
 *
 * multiplier = 1  -> застосувати
 * multiplier = -1 -> скасувати
 */
function applyEffects(
  state,
  effects,
  multiplier = 1
) {
  const nextState = {
    ...state,

    readerProfile: {
      ...state.readerProfile,
    },

    characters: Object.fromEntries(
      Object.entries(state.characters).map(
        ([character, stats]) => [
          character,
          { ...stats },
        ]
      )
    ),
  };

  // -------------------------
  // Профіль читача
  // -------------------------

  if (effects?.readerProfile) {
    Object.entries(
      effects.readerProfile
    ).forEach(([key, value]) => {
      nextState.readerProfile[key] =
        (nextState.readerProfile[key] || 0) +
        value * multiplier;
    });
  }

  // -------------------------
  // Окремі персонажі
  // -------------------------

  if (effects?.characters) {
    Object.entries(
      effects.characters
    ).forEach(
      ([character, characterEffects]) => {
        if (!nextState.characters[character]) {
          return;
        }

        Object.entries(
          characterEffects
        ).forEach(([key, value]) => {
          const currentValue =
            nextState.characters[character][key] ??
            0;

          nextState.characters[character][key] =
            clamp(
              currentValue +
                value * multiplier
            );
        });
      }
    );
  }

  // -------------------------
  // Всі персонажі
  // -------------------------

  if (effects?.allCharacters) {
    Object.keys(
      nextState.characters
    ).forEach((character) => {
      Object.entries(
        effects.allCharacters
      ).forEach(([key, value]) => {
        const currentValue =
          nextState.characters[character][key] ??
          0;

        nextState.characters[character][key] =
          clamp(
            currentValue +
              value * multiplier
          );
      });
    });
  }

  return nextState;
}

export function GameProvider({ children }) {
  const [game, setGame] = useState(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return createInitialState();
      }

      const parsed = JSON.parse(saved);

      const initial = createInitialState();

      return {
        ...initial,
        ...parsed,

        readerProfile: {
          ...initial.readerProfile,
          ...(parsed.readerProfile || {}),
        },

        characters: {
          ...initial.characters,
          ...(parsed.characters || {}),
        },

        judgment: {
          ...initial.judgment,
          ...(parsed.judgment || {}),
        },

        answers: parsed.answers || {},

        currentQuestion:
          typeof parsed.currentQuestion ===
          "number"
            ? parsed.currentQuestion
            : 0,

        showResults:
          parsed.showResults === true,
      };
    } catch (error) {
      console.error(
        "Не вдалося відновити гру:",
        error
      );

      return createInitialState();
    }
  });

  // -------------------------
  // LocalStorage
  // -------------------------

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(game)
      );
    } catch (error) {
      console.error(
        "Не вдалося зберегти гру:",
        error
      );
    }
  }, [game]);

  // -------------------------
  // Stage
  // -------------------------

  const setStage = (stage) => {
    setGame((prev) => ({
      ...prev,
      stage,
      currentQuestion: 0,
      showResults: false,
    }));
  };

  // -------------------------
  // Results
  // -------------------------

  const showIntermediateResults = () => {
    setGame((prev) => ({
      ...prev,
      showResults: true,
    }));
  };

  const hideIntermediateResults = () => {
    setGame((prev) => ({
      ...prev,
      showResults: false,
    }));
  };

  // -------------------------
  // Question
  // -------------------------

  const setCurrentQuestion = (question) => {
    setGame((prev) => ({
      ...prev,
      currentQuestion: Math.max(
        0,
        question
      ),
    }));
  };

  const nextQuestion = () => {
    setGame((prev) => ({
      ...prev,
      currentQuestion:
        prev.currentQuestion + 1,
    }));
  };

  const previousQuestion = () => {
    setGame((prev) => ({
      ...prev,
      currentQuestion: Math.max(
        0,
        prev.currentQuestion - 1
      ),
    }));
  };

  // -------------------------
  // Answers
  // -------------------------

  const saveAnswer = (
    questionId,
    value,
    effects = {},
    judgmentChange = null
  ) => {
    setGame((prev) => {
      let nextState = prev;

      const previousAnswer =
        prev.answers?.[questionId];

      // Скасувати старі ефекти
      if (previousAnswer?.effects) {
        nextState = applyEffects(
          nextState,
          previousAnswer.effects,
          -1
        );
      }

      // Скасувати старий judgment
      if (
        previousAnswer?.judgmentChange
      ) {
        const oldChange =
          previousAnswer.judgmentChange;

        nextState = {
          ...nextState,

          judgment: {
            ...nextState.judgment,
            [oldChange.key]: null,
          },
        };
      }

      // Застосувати нові ефекти
      nextState = applyEffects(
        nextState,
        effects,
        1
      );

      // Застосувати новий judgment
      if (judgmentChange) {
        nextState = {
          ...nextState,

          judgment: {
            ...nextState.judgment,

            [judgmentChange.key]:
              judgmentChange.value,
          },
        };
      }

      return {
        ...nextState,

        answers: {
          ...nextState.answers,

          [questionId]: {
            value,
            effects,
            judgmentChange,
          },
        },
      };
    });
  };

  const getAnswer = (questionId) => {
    return (
      game.answers?.[questionId]?.value ??
      null
    );
  };

  // -------------------------
  // Reader profile
  // -------------------------

  const updateReaderProfile = (effects) => {
    setGame((prev) =>
      applyEffects(
        prev,
        {
          readerProfile: effects,
        },
        1
      )
    );
  };

  // -------------------------
  // Character
  // -------------------------

  const updateCharacter = (
    character,
    effects
  ) => {
    setGame((prev) =>
      applyEffects(
        prev,
        {
          characters: {
            [character]: effects,
          },
        },
        1
      )
    );
  };

  // -------------------------
  // All characters
  // -------------------------

  const updateAllCharacters = (effects) => {
    setGame((prev) =>
      applyEffects(
        prev,
        {
          allCharacters: effects,
        },
        1
      )
    );
  };

  // -------------------------
  // Judgment
  // -------------------------

  const setJudgment = (key, value) => {
    setGame((prev) => ({
      ...prev,

      judgment: {
        ...prev.judgment,
        [key]: value,
      },
    }));
  };

  // -------------------------
  // Reset
  // -------------------------

  const resetGame = () => {
    localStorage.removeItem(STORAGE_KEY);

    setGame(createInitialState());
  };

  return (
    <GameContext.Provider
      value={{
        ...game,

        setStage,

        showIntermediateResults,
        hideIntermediateResults,

        setCurrentQuestion,
        nextQuestion,
        previousQuestion,

        saveAnswer,
        getAnswer,

        updateReaderProfile,
        updateCharacter,
        updateAllCharacters,

        setJudgment,

        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "useGame must be used inside GameProvider"
    );
  }

  return context;
}