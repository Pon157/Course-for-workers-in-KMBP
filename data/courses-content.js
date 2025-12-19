export const levelsData = {
    junior: {
        title: "Путь Отрока",
        image: "assets/images/ranks/junior.jpg",
        laws: [
            {
                id: "j1",
                title: "Закон Приветного Слова",
                description: "Первое впечатление — как фундамент терема. Если он кривой, всё рухнет.",
                image: "assets/images/laws/welcome.jpg",
                steps: [
                    { type: "view", label: "Свиток теории", content: "Учимся здороваться так, чтобы гость почувствовал себя важным боярином." },
                    { type: "practice", label: "Ристалище (Бот)", link: "https://t.me/actor_bot", desc: "Поприветствуй 5 разных гостей в боте." },
                    { type: "repeat", label: "Закрепление", question: "Можно ли говорить 'Здрасьте' вместо 'Доброго здравия'?" },
                    { type: "chat", label: "Вече Отроков", link: "https://t.me/chat_junior" },
                    { type: "review", label: "Слово Домового", desc: "Куратор проверяет твою вежливость." }
                ]
            },
            {
                id: "j2",
                title: "Грамота Быстрой Помощи",
                description: "Гость не должен ждать ответа дольше, чем варится каша.",
                image: "assets/images/laws/speed.jpg",
                steps: [
                    { type: "view", label: "Свиток скорости", content: "Как использовать заготовки, не становясь бездушным механизмом." },
                    { type: "practice", label: "Схватка с временем", link: "https://t.me/actor_bot", desc: "Ответь на 10 вопросов за 5 минут." },
                    { type: "review", label: "Суд Домового", desc: "Разбор твоих таймингов." }
                ]
            }
        ]
    },
    middle: {
        title: "Путь Бывалого",
        image: "assets/images/ranks/middle.jpg",
        laws: [
            {
                id: "m1",
                title: "Закон Гневного Странника",
                description: "Как успокоить того, кто готов сжечь твой терем дотла.",
                image: "assets/images/laws/angry.jpg",
                steps: [
                    { type: "view", label: "Мудрость спокойствия", content: "Психология работы с негативом и возражениями." },
                    { type: "practice", label: "Живая практика", link: "https://t.me/actor_bot", desc: "Укроти разгневанного купца." },
                    { type: "review", label: "Разбор ошибок", desc: "Анализ чата с наставником." }
                ]
            }
        ]
    },
    senior: {
        title: "Путь Воеводы",
        image: "assets/images/ranks/senior.jpg",
        laws: [
            {
                id: "s1",
                title: "Закон Наставничества",
                description: "Теперь ты сам — свет для других. Учись передавать знания.",
                image: "assets/images/laws/mentor.jpg",
                steps: [
                    { type: "view", label: "Управление дружиной", content: "Как давать обратную связь, не обижая отроков." },
                    { type: "practice", label: "Проверка свитков", desc: "Проверь 3 чата новичков и вынеси вердикт." },
                    { type: "review", label: "Совет Домовых", desc: "Финальное испытание на ранг Хранителя." }
                ]
            }
        ]
    }
};
