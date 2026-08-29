import {
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import {
  db,
  THERAPY_SESSION_ID,
} from "../firebase";

const participantsCollection =
  collection(
    db,
    "sessions",
    THERAPY_SESSION_ID,
    "participants"
  );

// --------------------------------------------------
// Генеруємо ID учасника.
// Один браузер = один participantId.
// --------------------------------------------------

export function getParticipantId() {
  const storageKey =
    "therapy-participant-id";

  let participantId =
    localStorage.getItem(storageKey);

  if (!participantId) {
    participantId =
      `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 10)}`;

    localStorage.setItem(
      storageKey,
      participantId
    );
  }

  return participantId;
}

// --------------------------------------------------
// Збереження фінального результату
// --------------------------------------------------

export async function saveFinalResult({
  characters,
  readerProfile,
}) {
  const participantId =
    getParticipantId();

  const participantRef = doc(
    participantsCollection,
    participantId
  );

  await setDoc(
    participantRef,
    {
      characters,
      readerProfile,
      completed: true,
      updatedAt: Date.now(),
    },
    {
      merge: true,
    }
  );

  return participantId;
}

// --------------------------------------------------
// Realtime результати групи
// --------------------------------------------------

export function subscribeToGroupResults(
  callback,
  onError
) {
  return onSnapshot(
    participantsCollection,
    (snapshot) => {
      const results = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (participant) =>
            participant.completed === true
        );

      callback(results);
    },
    (error) => {
      console.error(
        "Помилка Firebase:",
        error
      );

      if (onError) {
        onError(error);
      }
    }
  );
}