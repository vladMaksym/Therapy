import StageHeader from "../components/StageHeader";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";

import {
  judgmentQuestions,
} from "../data/judgmentQuestions";

import {
  useGame,
} from "../context/GameContext";

export default function Judgment() {
  const {
    characters,
    judgment,
    currentQuestion,
    setCurrentQuestion,
    saveAnswer,
    getAnswer,
    setStage,
  } = useGame();

  const questionIndex =
    currentQuestion;

  const question =
    judgmentQuestions[questionIndex];

  if (!question) {
    return null;
  }

  const questionId =
    `judgment-${questionIndex}`;

  const selected =
    getAnswer(questionId);

  const responsibleCharacter =
    judgment.responsibleCharacter;

  // -------------------------
  // Формування ефектів
  // -------------------------

  const getEffects = () => {
    switch (question.type) {
      // -----------------------
      // Питання 01
      // -----------------------

      case "responsibility":
        if (!characters[selected]) {
          return {};
        }

        return {
          characters: {
            [selected]: {
              responsibility: 15,
            },
          },
        };

      // -----------------------
      // Питання 02
      // -----------------------

      case "justify": {
        if (
          !responsibleCharacter ||
          !characters[responsibleCharacter]
        ) {
          return {};
        }

        const option =
          question.options.find(
            (item) =>
              item.label === selected
          );

        if (!option) {
          return {};
        }

        return {
          characters: {
            [responsibleCharacter]:
              option.effects,
          },
        };
      }

      // -----------------------
      // Питання 03
      // -----------------------

      case "empathy":
        if (!characters[selected]) {
          return {};
        }

        return {
          characters: {
            [selected]: {
              empathy: 10,
            },
          },
        };

      // -----------------------
      // Питання 04
      // -----------------------

      case "suspicion":
        if (!characters[selected]) {
          return {};
        }

        return {
          characters: {
            [selected]: {
              suspicion: 10,
            },
          },
        };

      // -----------------------
      // Питання 05
      // -----------------------

      case "trust":
        if (selected === "nobody") {
          return {
            allCharacters: {
              trust: -5,
            },
          };
        }

        if (!characters[selected]) {
          return {};
        }

        return {
          characters: {
            [selected]: {
              trust: 10,
            },
          },
        };

      // -----------------------
      // Питання 06
      // -----------------------

      case "reason": {
        if (
          !responsibleCharacter ||
          !characters[responsibleCharacter]
        ) {
          return {};
        }

        const option =
          question.options.find(
            (item) =>
              item.label === selected
          );

        if (!option) {
          return {};
        }

        return {
          characters: {
            [responsibleCharacter]: {
              [option.effect]:
                option.amount,
            },
          },
        };
      }

      // -----------------------
      // Питання 07
      // -----------------------

      case "finalTrust":
        if (!characters[selected]) {
          return {};
        }

        return {
          characters: {
            [selected]: {
              trust: 5,
            },
          },
        };

      default:
        return {};
    }
  };

  // -------------------------
  // Judgment state
  // -------------------------

  const getJudgmentChange = () => {
    switch (question.type) {
      case "responsibility":
        return {
          key: "responsibleCharacter",
          value: selected,
        };

      case "empathy":
        return {
          key: "empathyCharacter",
          value: selected,
        };

      case "suspicion":
        return {
          key: "suspicionCharacter",
          value: selected,
        };

      case "trust":
        return {
          key: "trustedCharacter",
          value: selected,
        };

      default:
        return null;
    }
  };

  // -------------------------
  // Вибір
  // -------------------------

  const handleSelect = (option) => {
    const value =
      option.value ?? option.label;

    // Важливо:
    // для питання 01 відповідь змінює
    // responsibleCharacter.
    //
    // Тому наступний render вже буде
    // знати правильного персонажа.

    // Для більшості питань ефект можна
    // сформувати одразу.

    let effects = {};

    switch (question.type) {
      case "responsibility":
        if (characters[value]) {
          effects = {
            characters: {
              [value]: {
                responsibility: 15,
              },
            },
          };
        }
        break;

      case "justify": {
        if (
          responsibleCharacter &&
          characters[responsibleCharacter]
        ) {
          const answerOption =
            question.options.find(
              (item) =>
                item.label === value
            );

          if (answerOption) {
            effects = {
              characters: {
                [responsibleCharacter]:
                  answerOption.effects,
              },
            };
          }
        }
        break;
      }

      case "empathy":
        if (characters[value]) {
          effects = {
            characters: {
              [value]: {
                empathy: 10,
              },
            },
          };
        }
        break;

      case "suspicion":
        if (characters[value]) {
          effects = {
            characters: {
              [value]: {
                suspicion: 10,
              },
            },
          };
        }
        break;

      case "trust":
        if (value === "nobody") {
          effects = {
            allCharacters: {
              trust: -5,
            },
          };
        } else if (characters[value]) {
          effects = {
            characters: {
              [value]: {
                trust: 10,
              },
            },
          };
        }
        break;

      case "reason": {
        if (
          responsibleCharacter &&
          characters[responsibleCharacter]
        ) {
          const answerOption =
            question.options.find(
              (item) =>
                item.label === value
            );

          if (answerOption) {
            effects = {
              characters: {
                [responsibleCharacter]: {
                  [answerOption.effect]:
                    answerOption.amount,
                },
              },
            };
          }
        }
        break;
      }

      case "finalTrust":
        if (characters[value]) {
          effects = {
            characters: {
              [value]: {
                trust: 5,
              },
            },
          };
        }
        break;

      default:
        break;
    }

    saveAnswer(
      questionId,
      value,
      effects,
      getJudgmentChangeForValue(
        question,
        value
      )
    );
  };

  // -------------------------
  // Далі
  // -------------------------

  const handleNext = () => {
    if (!selected) {
      return;
    }

    const isLastQuestion =
      questionIndex ===
      judgmentQuestions.length - 1;

    if (isLastQuestion) {
      setStage(5);
      return;
    }

    setCurrentQuestion(
      questionIndex + 1
    );
  };

  // -------------------------
  // Назад
  // -------------------------

  const handleBack = () => {
    if (questionIndex === 0) {
      return;
    }

    setCurrentQuestion(
      questionIndex - 1
    );
  };

  return (
    <main className="min-h-screen px-6 py-8">
      <StageHeader
        number="04"
        title="⚖️ СУД"
        description={`Ти пройшов усі попередні етапи.

Твоє ставлення до персонажів уже сформувалося.

Тепер — останні рішення.`}
      />

      <ProgressBar
        current={questionIndex + 1}
        total={judgmentQuestions.length}
      />

      <div className="mb-8">
        <div className="mb-3 text-[10px] tracking-[0.3em] text-neutral-600">
          РІШЕННЯ{" "}
          {String(question.id).padStart(
            2,
            "0"
          )}
        </div>

        <h2 className="text-xl font-medium leading-8 text-neutral-100">
          {question.title}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map(
          (option) => {
            const value =
              option.value ??
              option.label;

            return (
              <button
                key={value}
                type="button"
                onClick={() =>
                  handleSelect(option)
                }
                className={`
                  w-full border p-5 text-left
                  transition-all
                  ${
                    selected === value
                      ? "border-red-700 bg-red-950/10"
                      : "border-neutral-800"
                  }
                `}
              >
                <span className="text-sm leading-6 text-neutral-300">
                  {option.label}
                </span>
              </button>
            );
          }
        )}
      </div>

      <div className="mt-8 space-y-4">
        <Button
          onClick={handleNext}
          disabled={!selected}
        >
          {questionIndex ===
          judgmentQuestions.length - 1
            ? "ПОКАЗАТИ РЕЗУЛЬТАТ"
            : "ДАЛІ"}
        </Button>

        {questionIndex > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="w-full py-3 text-[11px] tracking-[0.2em] text-neutral-500 transition hover:text-white"
          >
            ← НАЗАД
          </button>
        )}
      </div>
    </main>
  );
}

function getJudgmentChangeForValue(
  question,
  value
) {
  switch (question.type) {
    case "responsibility":
      return {
        key: "responsibleCharacter",
        value,
      };

    case "empathy":
      return {
        key: "empathyCharacter",
        value,
      };

    case "suspicion":
      return {
        key: "suspicionCharacter",
        value,
      };

    case "trust":
      return {
        key: "trustedCharacter",
        value,
      };

    default:
      return null;
  }
}