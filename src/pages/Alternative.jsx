import StageHeader from "../components/StageHeader";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import IntermediateResults from "../components/IntermediateResults";

import { alternativeQuestions } from "../data/alternativeQuestions";
import { useGame } from "../context/GameContext";

export default function Alternative() {
  const {
    currentQuestion,
    characters,
    showResults,
    setCurrentQuestion,
    saveAnswer,
    getAnswer,
    setStage,
    showIntermediateResults,
  } = useGame();

  const questionIndex = currentQuestion;

  const question =
    alternativeQuestions[questionIndex];

  if (!question) {
    return null;
  }

  // -------------------------
  // ПРОМІЖНИЙ РЕЗУЛЬТАТ
  // -------------------------

  if (showResults) {
    return (
      <IntermediateResults
        type="characters"
        characters={characters}
        title="ТВОЄ СТАВЛЕННЯ ЗМІНИЛОСЯ"
        description={`Ти вже спробував подивитися на історію очима самих персонажів.

Тепер залишився останній етап.

Твій вирок.`}
        buttonText="ПЕРЕЙТИ ДО СУДУ"
        onContinue={() => setStage(4)}
      />
    );
  }

  const questionId =
    `alternative-${questionIndex}`;

  const selected =
    getAnswer(questionId);

  // -------------------------
  // Вибір
  // -------------------------

  const handleSelect = (option) => {
    const effects = {};

    // Ефект основного персонажа
    if (option.effects) {
      effects.characters = {
        [question.character]:
          option.effects,
      };
    }

    // Ефект іншого персонажа
    if (option.characterEffect) {
      const {
        character,
        trust,
      } = option.characterEffect;

      effects.characters = {
        ...(effects.characters || {}),

        [character]: {
          ...(
            effects.characters?.[
              character
            ] || {}
          ),

          trust,
        },
      };
    }

    saveAnswer(
      questionId,
      option.label,
      effects
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
      alternativeQuestions.length - 1;

    if (isLastQuestion) {
      showIntermediateResults();
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
        number="03"
        title="🕵️ А ЯК БИ ТИ ВЧИНИВ?"
        description={`Ти вже знаєш, хто і що приховував.

Тому ми не будемо знову розігрувати сцени з книги.

Замість цього уявімо альтернативну історію.`}
      />

      <ProgressBar
        current={questionIndex + 1}
        total={alternativeQuestions.length}
      />

      <div className="mb-8">
        <div className="mb-4 text-xs tracking-[0.3em] text-red-700">
          СИТУАЦІЯ{" "}
          {String(question.id).padStart(
            2,
            "0"
          )}
        </div>

        <h2 className="mb-6 text-2xl font-light text-neutral-100">
          {question.title}
        </h2>

        <p className="whitespace-pre-line text-base leading-8 text-neutral-300">
          {question.text}
        </p>

        <div className="mt-8 border-l border-neutral-800 pl-4">
          <div className="text-xs tracking-[0.2em] text-neutral-500">
            {question.question}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {question.options.map(
          (option) => (
            <button
              key={option.label}
              type="button"
              onClick={() =>
                handleSelect(option)
              }
              className={`
                w-full border p-5 text-left
                transition-all
                ${
                  selected ===
                  option.label
                    ? "border-red-700 bg-red-950/10"
                    : "border-neutral-800"
                }
              `}
            >
              <span className="text-sm leading-6 text-neutral-300">
                {option.label}
              </span>
            </button>
          )
        )}
      </div>

      <div className="mt-8 space-y-4">
        <Button
          onClick={handleNext}
          disabled={!selected}
        >
          {questionIndex ===
          alternativeQuestions.length - 1
            ? "ЗАВЕРШИТИ ЕТАП"
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