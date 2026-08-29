import { useState } from "react";

import Button from "../components/Button";
import { useGame } from "../context/GameContext";

const questions = [
  "У який момент ти остаточно перестав довіряти Віктору?",

  "Чи можна вважати Віктора жертвою, якщо він сам приймав рішення, які погіршували ситуацію?",

  "Чи змінив фінал твоє ставлення до подій, які відбувалися раніше?",

  "Хто для тебе страшніший: людина, яка бреше, чи людина, яка сама вірить у свою брехню?",

  "Чи був фінал чесним щодо читача?",
];

export default function Discussion() {
  const {
    resetGame,
  } = useGame();

  const [index, setIndex] = useState(0);

  const isLast = index === questions.length - 1;

  return (
    <main className="flex min-h-screen flex-col px-6 py-8">
      <div className="mb-12">
        <div className="text-[10px] tracking-[0.4em] text-neutral-700">
          AFTER THE CASE
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div className="mb-8 text-[10px] tracking-[0.3em] text-neutral-600">
          ПИТАННЯ {String(index + 1).padStart(2, "0")}
        </div>

        <h1 className="text-3xl font-light leading-[1.4] text-neutral-100">
          {questions[index]}
        </h1>
      </div>

      <div className="mt-12">
        {!isLast ? (
          <Button
            onClick={() =>
              setIndex((prev) => prev + 1)
            }
          >
            НАСТУПНЕ ПИТАННЯ
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="border border-neutral-900 p-5 text-center">
              <p className="text-xs leading-6 text-neutral-500">
                На цьому гра закінчується.
                <br />
                Далі — тільки обговорення.
              </p>
            </div>

            <Button
              variant="secondary"
              onClick={resetGame}
            >
              ПОЧАТИ НОВЕ РОЗСЛІДУВАННЯ
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}