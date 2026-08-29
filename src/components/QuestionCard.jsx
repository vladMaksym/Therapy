import ChoiceCard from "./ChoiceCard";

export default function QuestionCard({
  question,
  selected,
  onSelect,
}) {
  return (
    <section>
      <div className="mb-6">
        <div className="mb-3 text-[10px] tracking-[0.3em] text-neutral-600">
          QUESTION {String(question.id).padStart(2, "0")}
        </div>

        <h2 className="text-xl font-medium leading-8 text-neutral-100">
          {question.title}
        </h2>

        {question.subtitle && (
          <p className="mt-2 text-sm text-neutral-500">
            {question.subtitle}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = question.multiple
            ? selected.includes(option.id)
            : selected === option.id;

          return (
            <ChoiceCard
              key={option.id}
              selected={isSelected}
              onClick={() => onSelect(option)}
            >
              {option.icon && (
                <span className="mr-3 text-lg">{option.icon}</span>
              )}

              {option.label}
            </ChoiceCard>
          );
        })}
      </div>
    </section>
  );
}