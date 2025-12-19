import { placementTest } from '../data/placement-test.js';

const state = {
    user: null,
    score: 0,
    currentQuestion: 0,
    level: null
};

const root = document.getElementById('app-root');

// --- ЭКРАН 1: РЕГИСТРАЦИЯ ---
function showAuth() {
    root.innerHTML = `
        <h1>Врата Академии</h1>
        <p class="master-quote">"Стой, путник. Назови имя свое, дабы вписал я его в летопись познания."</p>
        <input type="text" id="userName" class="medieval-input" placeholder="Твое имя...">
        <button id="startBtn" class="medieval-btn">Вступить в обитель</button>
    `;

    document.getElementById('startBtn').onclick = () => {
        const name = document.getElementById('userName').value;
        if(name) {
            state.user = name;
            showMasterIntro();
        }
    };
}

// --- ЭКРАН 2: ПРИВЕТСТВИЕ МАСТЕРА ---
function showMasterIntro() {
    root.innerHTML = `
        <h1>Мудрый Всевед</h1>
        <p class="master-quote">"Здрав будь, <b>${state.user}</b>. Вижу, путь твой был долог. Прежде чем дам тебе ключи от знаний, должен я понять, готов ли ты к битве за умы людей."</p>
        <button id="testBtn" class="medieval-btn">Пройти испытание</button>
    `;
    document.getElementById('testBtn').onclick = showTest;
}

// --- ЭКРАН 3: ТЕСТ ---
function showTest() {
    const q = placementTest[state.currentQuestion];
    
    let optionsHtml = q.options.map((opt, i) => `
        <button class="medieval-btn" data-score="${opt.score}">${opt.text}</button>
    `).join('');

    root.innerHTML = `
        <h2>Испытание ${state.currentQuestion + 1}</h2>
        <p>${q.question}</p>
        <div id="options">${optionsHtml}</div>
    `;

    document.querySelectorAll('#options button').forEach(btn => {
        btn.onclick = (e) => {
            state.score += parseInt(e.target.dataset.score);
            state.currentQuestion++;
            
            if(state.currentQuestion < placementTest.length) {
                showTest();
            } else {
                finishTest();
            }
        };
    });
}

function finishTest() {
    // Логика определения уровня
    if(state.score >= 8) state.level = 'senior';
    else if(state.score >= 5) state.level = 'middle';
    else state.level = 'junior';
    
    // Переходим к Личному Кабинету (будет в Части 2)
    alert(`Твой уровень: ${state.level.toUpperCase()}. Переходим в терем...`);
}

function finishTest() {
    const results = {
        junior: { name: "Отрок", id: "junior" },
        middle: { name: "Бывалый", id: "middle" },
        senior: { name: "Воевода", id: "senior" }
    };

    let final;
    if(state.score >= 8) final = results.senior;
    else if(state.score >= 5) final = results.middle;
    else final = results.junior;

    state.level = final.id;
    state.levelName = final.name;

    // Сохраняем "в летопись" (localStorage)
    localStorage.setItem('academy_user', JSON.stringify(state));
    
    // Переход в кабинет
    renderDashboard(state);
}

// Глобальная функция смены темы
window.toggleTheme = () => {
    document.body.classList.toggle('theme-svarog');
};
// Запуск
showAuth();
