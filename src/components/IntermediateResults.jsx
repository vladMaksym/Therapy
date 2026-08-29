import Button from "./Button";

const characterNames = {
  viktor: "ВІКТОР",
  anna: "АННА",
  isabel: "ІЗАБЕЛЬ",
  halberstadt: "ГАЛЬБЕРШТЕДТ",
};

const characterIcons = {
  viktor: "🧠",
  anna: "👁️",
  isabel: "🕯️",
  halberstadt: "⚖️",
};

const profileNames = {
  detective: "🔎 ДЕТЕКТИВ",
  analyst: "🧠 АНАЛІТИК",
  skeptic: "🎭 СКЕПТИК",
  empath: "❤️ ЕМПАТ",
  judge: "⚖️ СУДДЯ",
  theorist: "🧩 ТЕОРЕТИК",
};

const characterStats = [
  {
    key: "trust",
    label: "ДОВІРА",
  },
  {
    key: "suspicion",
    label: "ПІДОЗРА",
  },
  {
    key: "empathy",
    label: "ЕМПАТІЯ",
  },
  {
    key: "responsibility",
    label: "ВІДПОВІДАЛЬНІСТЬ",
  },
];

function StatBar({ label, value }) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] text-neutral-500">
          {label}
        </span>

        <span className="text-xs text-neutral-300">
          {value}%
        </span>
      </div>

      <div className="h-1 w-full bg-neutral-900">
        <div
          className="h-full bg-red-800 transition-all duration-700"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}

function CharacterResult({
  character,
  data,
}) {
  return (
    <div className="border border-neutral-800 bg-neutral-950 p-5">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-xl">
          {characterIcons[character]}
        </span>

        <div>
          <div className="text-[10px] tracking-[0.3em] text-red-700">
            ПЕРСОНАЖ
          </div>

          <h2 className="mt-1 text-lg font-medium tracking-[0.08em] text-neutral-100">
            {characterNames[character]}
          </h2>
        </div>
      </div>

      {characterStats.map((stat) => (
        <StatBar
          key={stat.key}
          label={stat.label}
          value={data[stat.key]}
        />
      ))}
    </div>
  );
}

export default function IntermediateResults({
  type,
  characters,
  readerProfile,
  title,
  description,
  buttonText,
  onContinue,
}) {
  const profileEntries = Object.entries(
    readerProfile || {}
  );

  const totalProfile =
    profileEntries.reduce(
      (sum, [, value]) => sum + value,
      0
    );

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mb-10">
        <div className="mb-3 text-[10px] tracking-[0.35em] text-red-700">
          ПРОМІЖНИЙ РЕЗУЛЬТАТ
        </div>

        <h1 className="text-3xl font-light leading-tight tracking-[0.04em] text-neutral-100">
          {title}
        </h1>

        {description && (
          <p className="mt-5 whitespace-pre-line text-sm leading-7 text-neutral-500">
            {description}
          </p>
        )}
      </div>

      {/* -------------------------
          Профіль читача
      ------------------------- */}

      {type === "profile" && (
        <section>
          <div className="mb-6 border-l border-red-900 pl-4">
            <div className="text-[10px] tracking-[0.25em] text-neutral-600">
              ТВОЄ ПРОЧИТАННЯ
            </div>

            <p className="mt-2 text-sm leading-6 text-neutral-400">
              Ти вже визначив, що саме
              шукаєш в історіях такого типу.
            </p>
          </div>

          <div className="space-y-5">
            {profileEntries.map(
              ([key, value]) => {
                const percentage =
                  totalProfile > 0
                    ? Math.round(
                        (value /
                          totalProfile) *
                          100
                      )
                    : 0;

                return (
                  <div key={key}>
                    <div className="mb-2 flex justify-between">
                      <span className="text-xs tracking-[0.15em] text-neutral-300">
                        {profileNames[key]}
                      </span>

                      <span className="text-xs text-neutral-500">
                        {percentage}%
                      </span>
                    </div>

                    <div className="h-1 bg-neutral-900">
                      <div
                        className="h-full bg-red-800 transition-all duration-700"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>
      )}

      {/* -------------------------
          Персонажі
      ------------------------- */}

      {type === "characters" && (
        <section>
          <div className="mb-6">
            <div className="text-[10px] tracking-[0.25em] text-neutral-600">
              ПОТОЧНЕ СТАВЛЕННЯ
            </div>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              Ці показники вже враховують
              усі твої попередні рішення.
            </p>
          </div>

          <div className="space-y-5">
            {Object.entries(
              characters
            ).map(([character, data]) => (
              <CharacterResult
                key={character}
                character={character}
                data={data}
              />
            ))}
          </div>
        </section>
      )}

      <div className="mt-10">
        <Button onClick={onContinue}>
          {buttonText}
        </Button>
      </div>
    </main>
  );
}