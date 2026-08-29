export const judgmentQuestions = [
  {
    id: 1,
    type: "responsibility",

    title:
      "ХТО НЕСЕ НАЙБІЛЬШУ ВІДПОВІДАЛЬНІСТЬ ЗА ТЕ, ЩО СТАЛОСЯ?",

    options: [
      { label: "Віктор", value: "viktor" },
      { label: "Анна", value: "anna" },
      { label: "Ізабель", value: "isabel" },
      { label: "Гальберштедт", value: "halberstadt" },
      { label: "Інший персонаж", value: "other" },
    ],
  },

  {
    id: 2,
    type: "justify",

    title: "ЧИ МОЖНА ЙОГО / ЇЇ ВИПРАВДАТИ?",

    options: [
      {
        label: "🟢 Так, його/її можна зрозуміти.",
        effects: {
          empathy: 10,
        },
      },
      {
        label:
          "🟡 Частково. Обставини мають значення.",
        effects: {
          empathy: 5,
          responsibility: 5,
        },
      },
      {
        label:
          "🔴 Ні. Вчинки мають наслідки.",
        effects: {
          responsibility: 10,
        },
      },
    ],
  },

  {
    id: 3,
    type: "empathy",

    title: "ХТО ВИКЛИКАЄ В ТЕБЕ НАЙБІЛЬШЕ СПІВЧУТТЯ?",

    options: [
      { label: "Віктор", value: "viktor" },
      { label: "Анна", value: "anna" },
      { label: "Ізабель", value: "isabel" },
      { label: "Гальберштедт", value: "halberstadt" },
      { label: "Йозефіна", value: "josephine" },
    ],
  },

  {
    id: 4,
    type: "suspicion",

    title: "КОГО ТОБІ НАЙВАЖЧЕ ЗРОЗУМІТИ?",

    options: [
      { label: "Віктор", value: "viktor" },
      { label: "Анна", value: "anna" },
      { label: "Ізабель", value: "isabel" },
      { label: "Гальберштедт", value: "halberstadt" },
      { label: "Йозефіна", value: "josephine" },
    ],
  },

  {
    id: 5,
    type: "trust",

    title:
      "КОМУ ТИ ДОВІРЯЄШ ПІСЛЯ ВСЬОГО, ЩО СТАЛОСЯ?",

    options: [
      { label: "Віктору", value: "viktor" },
      { label: "Анні", value: "anna" },
      { label: "Ізабель", value: "isabel" },
      { label: "Гальберштедту", value: "halberstadt" },
      { label: "Нікому", value: "nobody" },
    ],
  },

  {
    id: 6,
    type: "reason",

    title:
      "ЩО, НА ТВОЮ ДУМКУ, НАЙБІЛЬШЕ ВПЛИНУЛО НА ВЧИНКИ ПЕРСОНАЖІВ?",

    options: [
      {
        label: "Їхні власні рішення.",
        effect: "responsibility",
        amount: 5,
      },
      {
        label: "Їхнє минуле.",
        effect: "empathy",
        amount: 5,
      },
      {
        label:
          "Обставини, у яких вони опинилися.",
        effect: "responsibility",
        amount: -5,
      },
      {
        label: "Вплив інших людей.",
        effect: "responsibility",
        amount: -5,
      },
    ],
  },

  {
    id: 7,
    type: "finalTrust",

    title:
      "ЯКЩО Б ТОБІ ДОВЕЛОСЯ ПОЗНАЙОМИТИСЯ З ОДНИМ ІЗ НИХ У РЕАЛЬНОМУ ЖИТТІ — КОГО Б ТИ ОБРАВ?",

    options: [
      { label: "Віктор", value: "viktor" },
      { label: "Анна", value: "anna" },
      { label: "Ізабель", value: "isabel" },
      { label: "Гальберштедт", value: "halberstadt" },
    ],
  },
];