import { useEffect, useMemo, useState } from "react";

import {
  profiles,
  characterNames,
} from "../data/profiles";

import StatBar from "../components/StatBar";
import Button from "../components/Button";

import { useGame } from "../context/GameContext";

import {
  getParticipantId,
  saveFinalResult,
  subscribeToGroupResults,
} from "../services/firebaseResults";

// --------------------------------------------------
// Допоміжні функції
// --------------------------------------------------

function getReaderPercentage(
  value,
  total
) {
  if (!total) {
    return 0;
  }

  return Math.round(
    (value / total) * 100
  );
}

function calculateGroupAverages(
  participants
) {
  if (!participants.length) {
    return null;
  }

  const characterKeys = [
    "viktor",
    "anna",
    "isabel",
    "halberstadt",
  ];

  const statKeys = [
    "trust",
    "suspicion",
    "empathy",
    "responsibility",
  ];

  const characters = {};

  characterKeys.forEach(
    (character) => {
      characters[character] = {};

      statKeys.forEach((stat) => {
        const values = participants
          .map(
            (participant) =>
              participant.characters
                ?.[
                  character
                ]?.[stat]
          )
          .filter(
            (value) =>
              typeof value ===
              "number"
          );

        if (!values.length) {
          characters[character][stat] =
            50;

          return;
        }

        const average =
          values.reduce(
            (sum, value) =>
              sum + value,
            0
          ) / values.length;

        characters[character][stat] =
          Math.round(average);
      });
    }
  );

  return {
    characters,
  };
}

// --------------------------------------------------
// Character block
// --------------------------------------------------

function CharacterFinalCard({
  character,
  data,
  groupData,
}) {
  return (
    <div className="border border-neutral-900 p-5">
      <div className="mb-6 text-xl text-neutral-100">
        {characterNames[character]}
      </div>

      <FinalStat
        label="ДОВІРА"
        value={data.trust}
        groupValue={groupData?.trust}
      />

      <FinalStat
        label="ПІДОЗРА"
        value={data.suspicion}
        groupValue={
          groupData?.suspicion
        }
      />

      <FinalStat
        label="ЕМПАТІЯ"
        value={data.empathy}
        groupValue={
          groupData?.empathy
        }
      />

      <FinalStat
        label="ВІДПОВІДАЛЬНІСТЬ"
        value={data.responsibility}
        groupValue={
          groupData?.responsibility
        }
      />
    </div>
  );
}

// --------------------------------------------------
// Individual + Group stat
// --------------------------------------------------

function FinalStat({
  label,
  value,
  groupValue,
}) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between">
        <span className="text-[10px] tracking-[0.2em] text-neutral-500">
          {label}
        </span>

        <span className="text-xs text-neutral-300">
          {value}%
        </span>
      </div>

      <div className="h-1 bg-neutral-900">
        <div
          className="h-1 bg-neutral-400 transition-all duration-700"
          style={{
            width: `${value}%`,
          }}
        />
      </div>

      {typeof groupValue ===
        "number" && (
        <>
          <div className="mt-3 flex justify-between">
            <span className="text-[9px] tracking-[0.15em] text-neutral-700">
              СЕРЕДНЄ ПО ГРУПІ
            </span>

            <span className="text-[10px] text-neutral-600">
              {groupValue}%
            </span>
          </div>

          <div className="mt-1 h-px bg-neutral-900">
            <div
              className="h-px bg-red-900 transition-all duration-700"
              style={{
                width: `${groupValue}%`,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

// --------------------------------------------------
// FINAL
// --------------------------------------------------

export default function Final() {
  const {
    characters,
    readerProfile,
    setStage,
    resetGame,
  } = useGame();

  const [
    groupParticipants,
    setGroupParticipants,
  ] = useState([]);

  const [
    firebaseError,
    setFirebaseError,
  ] = useState(false);

  // ----------------------------------------------
  // Reader profile
  // ----------------------------------------------

  const profileEntries =
    Object.entries(
      readerProfile
    );

  const totalProfileScore =
    profileEntries.reduce(
      (sum, [, value]) =>
        sum + value,
      0
    );

  const sortedProfiles =
    profileEntries
      .map(([key, value]) => ({
        key,
        value,
        profile: profiles[key],
        percentage:
          getReaderPercentage(
            value,
            totalProfileScore
          ),
      }))
      .sort(
        (a, b) =>
          b.value - a.value
      );

  const mainProfile =
    sortedProfiles[0];

  // ----------------------------------------------
  // Group averages
  // ----------------------------------------------

  const groupAverages = useMemo(
    () =>
      calculateGroupAverages(
        groupParticipants
      ),
    [groupParticipants]
  );

  // ----------------------------------------------
  // Save final result
  // ----------------------------------------------

  useEffect(() => {
    let cancelled = false;

    async function saveResult() {
      try {
        await saveFinalResult({
          characters,
          readerProfile,
        });
      } catch (error) {
        console.error(
          "Не вдалося зберегти результат:",
          error
        );

        if (!cancelled) {
          setFirebaseError(true);
        }
      }
    }

    saveResult();

    return () => {
      cancelled = true;
    };
  }, [characters, readerProfile]);

  // ----------------------------------------------
  // Realtime group listener
  // ----------------------------------------------

  useEffect(() => {
    const unsubscribe =
      subscribeToGroupResults(
        (results) => {
          setGroupParticipants(
            results
          );
        },
        () => {
          setFirebaseError(true);
        }
      );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <main className="min-h-screen px-6 py-8">
      {/* HEADER */}

      <div className="mb-12">
        <div className="mb-4 text-[10px] tracking-[0.4em] text-neutral-600">
          FINAL REPORT
        </div>

        <h1 className="text-4xl font-light text-neutral-100">
          ТВОЄ БАЧЕННЯ
          <br />
          «ТЕРАПІЇ»
        </h1>
      </div>

      {/* FIREBASE STATUS */}

      <div className="mb-8 border border-neutral-900 p-4">
        <div className="text-[9px] tracking-[0.25em] text-neutral-700">
          РЕЗУЛЬТАТИ ГРУПИ
        </div>

        {firebaseError ? (
          <p className="mt-2 text-xs leading-5 text-red-800">
            Не вдалося підключитися до
            спільних результатів.
          </p>
        ) : (
          <p className="mt-2 text-xs leading-5 text-neutral-500">
            Учасників завершили тест:{" "}
            <span className="text-neutral-300">
              {groupParticipants.length}
            </span>
          </p>
        )}
      </div>

      {/* CHARACTERS */}

      <section>
        <div className="mb-6 text-xs tracking-[0.25em] text-red-700">
          ПЕРСОНАЖІ
        </div>

        <div className="space-y-8">
          {Object.entries(
            characters
          ).map(
            ([key, character]) => (
              <CharacterFinalCard
                key={key}
                character={key}
                data={character}
                groupData={
                  groupAverages
                    ?.characters?.[
                    key
                  ]
                }
              />
            )
          )}
        </div>
      </section>

      {/* READER PROFILE */}

      <section className="mt-16">
        <div className="mb-6 text-xs tracking-[0.25em] text-red-700">
          ТВОЄ ПРОЧИТАННЯ
        </div>

        <div className="space-y-4">
          {sortedProfiles.map(
            ({
              key,
              profile,
              percentage,
            }) => (
              <div key={key}>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm text-neutral-300">
                    {profile.icon}{" "}
                    {profile.name}
                  </span>

                  <span className="text-xs text-neutral-500">
                    {percentage}%
                  </span>
                </div>

                <div className="h-1 bg-neutral-900">
                  <div
                    className="h-1 bg-neutral-500 transition-all duration-1000"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* MAIN PROFILE */}

      {mainProfile && (
        <section className="mt-16 border border-neutral-900 p-6">
          <div className="mb-6 text-center text-5xl">
            {mainProfile.profile.icon}
          </div>

          <div className="mb-2 text-center text-[10px] tracking-[0.3em] text-neutral-600">
            ТВОЄ ЧИТАННЯ
          </div>

          <h2 className="text-center text-3xl font-light text-neutral-100">
            ТИ —{" "}
            {mainProfile.profile.name.toUpperCase()}
          </h2>

          <p className="mt-6 text-center text-sm leading-7 text-neutral-500">
            {
              mainProfile.profile
                .description
            }
          </p>
        </section>
      )}

      {/* BUTTONS */}

      <div className="mt-16 space-y-3">
        <Button
          onClick={() => setStage(6)}
        >
          А ТЕПЕР ОБГОВОРЕННЯ
        </Button>

        <Button
          variant="secondary"
          onClick={() => {
            resetGame();
          }}
        >
          ПОЧАТИ СПОЧАТКУ
        </Button>
      </div>
    </main>
  );
}