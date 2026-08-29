export const readingQuestions = [
  {
    id: 1,
    title: "ЩО ДЛЯ ТЕБЕ Є ГОЛОВНОЮ ТЕМОЮ «ТЕРАПІЇ»?",
    subtitle: "Обери максимум 2.",
    multiple: true,

    options: [
      {
        id: "memory",
        icon: "🧠",
        label: "Пам'ять",
        effects: { analyst: 1 },
      },
      {
        id: "manipulation",
        icon: "🎭",
        label: "Маніпуляція",
        effects: { skeptic: 1 },
      },
      {
        id: "guilt",
        icon: "⚖️",
        label: "Провина",
        effects: { judge: 1 },
      },
      {
        id: "loss",
        icon: "❤️",
        label: "Втрата",
        effects: { empath: 1 },
      },
      {
        id: "fear",
        icon: "😨",
        label: "Страх",
        effects: { theorist: 1 },
      },
      {
        id: "truth",
        icon: "🔎",
        label: "Пошук правди",
        effects: { detective: 1 },
      },
    ],
  },

  {
    id: 2,
    title: "ЯК ТИ ЗАЗВИЧАЙ ЧИТАЄШ ПСИХОЛОГІЧНІ ТРИЛЕРИ?",
    options: [
      {
        id: "a",
        label:
          "Шукаю підказки й намагаюся розгадати все раніше за героя.",
        effects: { detective: 1 },
      },
      {
        id: "b",
        label:
          "Найбільше стежу за психологією персонажів та їхніми мотивами.",
        effects: { analyst: 1 },
      },
      {
        id: "c",
        label:
          "Постійно перевіряю, кому і чому я можу вірити.",
        effects: { skeptic: 1 },
      },
      {
        id: "d",
        label:
          "Найбільше переживаю за персонажів та намагаюся зрозуміти їхні почуття.",
        effects: { empath: 1 },
      },
      {
        id: "e",
        label:
          "Думаю про наслідки вчинків героїв і оцінюю їхні рішення.",
        effects: { judge: 1 },
      },
      {
        id: "f",
        label:
          "Будую власні версії й теорії, навіть якщо не маю достатньо доказів.",
        effects: { theorist: 1 },
      },
    ],
  },

  {
    id: 3,
    title: "ЩО ДЛЯ ТЕБЕ ВАЖЛИВІШЕ В ІСТОРІЇ?",
    options: [
      {
        id: "a",
        label: "З'ясувати, що насправді сталося.",
        effects: { detective: 1 },
      },
      {
        id: "b",
        label:
          "Розібратися, чому персонажі поводяться саме так.",
        effects: { analyst: 1 },
      },
      {
        id: "c",
        label:
          "Зрозуміти, де правда, а де маніпуляція.",
        effects: { skeptic: 1 },
      },
      {
        id: "d",
        label:
          "Відчути емоції персонажів і зрозуміти їхній внутрішній стан.",
        effects: { empath: 1 },
      },
      {
        id: "e",
        label:
          "Визначити, хто і за що має нести відповідальність.",
        effects: { judge: 1 },
      },
      {
        id: "f",
        label:
          "Спробувати побачити прихований сенс і скласти власну картину подій.",
        effects: { theorist: 1 },
      },
    ],
  },

  {
    id: 4,
    title: "ЯК ТИ СПРИЙНЯВ ФІНАЛ?",
    options: [
      {
        id: "a",
        label:
          "Тепер я можу скласти всі деталі в одну картину.",
        effects: { analyst: 1 },
      },
      {
        id: "b",
        label:
          "Тепер я ще більше сумніваюся в усьому, що відбувалося.",
        effects: { skeptic: 1 },
      },
      {
        id: "c",
        label:
          "Фінал змусив мене переосмислити персонажів та їхні вчинки.",
        effects: { judge: 1 },
      },
      {
        id: "d",
        label:
          "Найбільше мене зачепило те, через що довелося пройти героям.",
        effects: { empath: 1 },
      },
      {
        id: "e",
        label:
          "У мене з'явилося ще більше власних версій того, що могло відбуватися.",
        effects: { theorist: 1 },
      },
      {
        id: "f",
        label:
          "Мені сподобалося, що фінал нарешті дав відповідь на головну загадку.",
        effects: { detective: 1 },
      },
    ],
  },

  {
    id: 5,
    title:
      "ЩО ДЛЯ ТЕБЕ ВАЖЛИВІШЕ, КОЛИ ТИ ОЦІНЮЄШ ВЧИНОК ЛЮДИНИ?",
    options: [
      {
        id: "a",
        label: "Чи говорить вона правду.",
        effects: { detective: 1 },
      },
      {
        id: "b",
        label: "Чому вона це зробила.",
        effects: { analyst: 1 },
      },
      {
        id: "c",
        label: "Чи намагалася вона мною маніпулювати.",
        effects: { skeptic: 1 },
      },
      {
        id: "d",
        label: "Що вона при цьому відчувала.",
        effects: { empath: 1 },
      },
      {
        id: "e",
        label: "До яких наслідків призвів її вчинок.",
        effects: { judge: 1 },
      },
      {
        id: "f",
        label:
          "Що могло залишитися за межами того, що ми знаємо.",
        effects: { theorist: 1 },
      },
    ],
  },
];