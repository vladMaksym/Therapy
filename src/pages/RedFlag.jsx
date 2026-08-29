import StageHeader from "../components/StageHeader";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import IntermediateResults from "../components/IntermediateResults";

import { redFlagQuestions } from "../data/redFlagQuestions";
import { useGame } from "../context/GameContext";

const flagStyles = {
  green: {
    indicator: "🟢",
    title: "GREEN FLAG",
    border: "border-emerald-900",
  },

  yellow: {
    indicator: "🟡",
    title: "SUSPICIOUS",
    border: "border-yellow-900",
  },

  red: {
    indicator: "🔴",
    title: "RED FLAG",
    border: "border-red-900",
  },
};

export default function RedFlag() {
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
    redFlagQuestions[questionIndex];

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
        title="ТВОЄ СТАВЛЕННЯ ФОРМУЄТЬСЯ"
        description={`Тепер ти вже не просто читаєш історію.

Ти почав оцінювати людей, які в ній опинилися.

Але остаточні висновки ще попереду.`}
        buttonText="ПЕРЕЙТИ ДО НАСТУПНОГО ЕТАПУ"
        onContinue={() => setStage(3)}
      />
    );
  }

  const questionId =
    `red-flag-${questionIndex}`;

  const selected =
    getAnswer(questionId);

  // -------------------------
  // Вибір
  // -------------------------

  const handleSelect = (option) => {
    saveAnswer(
      questionId,
      option.id,
      {
        characters: {
          [question.character]:
            option.effects,
        },
      }
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
      redFlagQuestions.length - 1;

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
        number="02"
        title="🚦 RED FLAG"
        description={`Тобі не потрібно знати,
чи хороший це персонаж.

Тільки одне:

ЧИ ДОВІРЯЄШ ТИ ЙОМУ?`}
      />

      <ProgressBar
        current={questionIndex + 1}
        total={redFlagQuestions.length}
      />

      <div className="mb-8">
        <div className="mb-3 text-xs tracking-[0.3em] text-red-700">
          {question.title}
        </div>

        <p className="whitespace-pre-line text-base leading-8 text-neutral-300">
          {question.text}
        </p>
      </div>

      <div className="space-y-3">
        {question.options.map((option) => {
          const style =
            flagStyles[option.id];

          return (
            <button
              key={option.id}
              type="button"
              onClick={() =>
                handleSelect(option)
              }
              className={`
                w-full border p-5 text-left
                transition-all
                ${
                  selected === option.id
                    ? `${style.border} bg-neutral-900`
                    : "border-neutral-800 bg-neutral-950"
                }
              `}
            >
              <div className="mb-3 text-xs font-bold tracking-[0.2em] text-neutral-500">
                {style.indicator}{" "}
                {style.title}
              </div>

              <div className="text-sm leading-6 text-neutral-300">
                {option.label}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-4">
        <Button
          onClick={handleNext}
          disabled={!selected}
        >
          {questionIndex ===
          redFlagQuestions.length - 1
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