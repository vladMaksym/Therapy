import Button from "../components/Button";
import { useGame } from "../context/GameContext";

export default function Start() {
  const { setStage } = useGame();

  return (
    <main className="flex min-h-screen flex-col justify-between px-6 py-8">
      <div className="flex justify-end">
        <span className="text-[10px] tracking-[0.3em] text-neutral-700">
          CASE 001
        </span>
      </div>

      <div>
        <div className="mb-6 text-[10px] tracking-[0.4em] text-neutral-600">
          ПСИХОЛОГІЧНЕ РОЗСЛІДУВАННЯ
        </div>

        <h1 className="text-5xl font-light tracking-tight text-neutral-100">
          ТЕРАПІЯ
        </h1>

        <p className="mt-4 text-xl leading-8 text-neutral-400">
          Психологічне розслідування
          після прочитання
        </p>

        <div className="my-10 h-px bg-neutral-900" />

        <p className="max-w-sm text-base leading-7 text-neutral-400">
          Ти вже знаєш, чим усе закінчилося.
        </p>

        <p className="mt-3 max-w-sm text-base leading-7 text-neutral-200">
          Тепер спробуй зрозуміти,
          що ти насправді думаєш
          про цю історію.
        </p>

        <div className="mt-10 border-l border-red-800 pl-4">
          <p className="text-xs leading-6 text-red-400">
            ⚠ Усі завдання містять спойлери.
          </p>
        </div>
      </div>

      <Button onClick={() => setStage(1)}>
        ПОЧАТИ
      </Button>
    </main>
  );
}