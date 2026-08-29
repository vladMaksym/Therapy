import StageHeader from "../components/StageHeader";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import Button from "../components/Button";
import IntermediateResults from "../components/IntermediateResults";

import { readingQuestions } from "../data/readingQuestions";
import { useGame } from "../context/GameContext";

export default function Reading() {
  const {
    currentQuestion,
    readerProfile,
    showResults,
    setCurrentQuestion,
    saveAnswer,
    getAnswer,
    setStage,
    showIntermediateResults,
  } = useGame();

  const questionIndex = currentQuestion;

  const question =
    readingQuestions[questionIndex];

  if (!question) {
    return null;
  }

  // -------------------------
  // ПРОМІЖНИЙ РЕЗУЛЬТАТ
  // -------------------------

  if (showResults) {
    return (
      <IntermediateResults
        type="profile"
        readerProfile={readerProfile}
        title="ТВОЄ ПРОЧИТАННЯ СФОРМОВАНО"
        description={`Ти визначив, що для тебе найважливіше в цій історії.

Тепер подивимося, як ти ставишся до людей, які в ній опинилися.`}
        buttonText="ПЕРЕЙТИ ДО RED FLAG"
        onContinue={() => setStage(2)}
      />
    );
  }

  const questionId =
    `reading-${questionIndex}`;

  const savedAnswer =
    getAnswer(questionId);

  const selected = savedAnswer
    ? Array.isArray(savedAnswer)
      ? savedAnswer
      : [savedAnswer]
    : [];

  // -------------------------
  // Вибір
  // -------------------------

  const handleSelect = (option) => {
    if (question.multiple) {
      let newSelected;

      if (selected.includes(option.id)) {
        newSelected = selected.filter(
          (id) => id !== option.id
        );
      } else {
        if (selected.length >= 2) {
          return;
        }

        newSelected = [
          ...selected,
          option.id,
        ];
      }

      saveAnswer(
        questionId,
        newSelected,
        {
          readerProfile:
            getReaderEffects(
              question,
              newSelected
            ),
        }
      );

      return;
    }

    saveAnswer(
      questionId,
      option.id,
      {
        readerProfile:
          option.effects,
      }
    );
  };

  // -------------------------
  // Далі
  // -------------------------

  const handleNext = () => {
    if (selected.length === 0) {
      return;
    }

    const isLastQuestion =
      questionIndex ===
      readingQuestions.length - 1;

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
        number="01"
        title="🧠 ТВОЄ ПРОЧИТАННЯ"
        description={`Ти вже знаєш, чим закінчилася «Терапія».

Але одна й та сама історія може залишити після себе зовсім різні висновки.

Цей етап — про те, як саме ти побачив цю історію.

Тут немає правильних відповідей.`}
      />

      <ProgressBar
        current={questionIndex + 1}
        total={readingQuestions.length}
      />

      <QuestionCard
        question={question}
        selected={
          question.multiple
            ? selected
            : selected[0]
        }
        onSelect={handleSelect}
      />

      <div className="mt-8 space-y-4">
        {question.multiple && (
          <p className="text-center text-[10px] tracking-[0.2em] text-neutral-600">
            ОБРАНО {selected.length} / 2
          </p>
        )}

        <Button
          onClick={handleNext}
          disabled={selected.length === 0}
        >
          {questionIndex ===
          readingQuestions.length - 1
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

function getReaderEffects(
  question,
  selectedIds
) {
  const effects = {};

  question.options
    .filter((option) =>
      selectedIds.includes(option.id)
    )
    .forEach((option) => {
      Object.entries(
        option.effects || {}
      ).forEach(([key, value]) => {
        effects[key] =
          (effects[key] || 0) +
          value;
      });
    });

  return effects;
}