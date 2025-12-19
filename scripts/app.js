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
    let result = "";
    let finalLevel = "";
    const total = state.score;
    const maxScore = placementQuestions.length * 3;

    if (total >= maxScore * 0.8) {
        finalLevel = 'senior';
        result = `Поразительно! Ты набрал ${total} баллов. В тебе течет кровь истинного Воеводы. Твои знания крепки, как стены Кремля. Ступай в свои палаты!`;
    } else if (total >= maxScore * 0.5) {
        finalLevel = 'middle';
        result = `Добротный результат, ${total} баллов. Ты уже не новичок, ты — Бывалый мастер. Но есть куда расти. Твой терем ждет тебя.`;
    } else {
        finalLevel = 'junior';
        result = `Ты набрал ${total} баллов. Путь твой только начинается, Отрок. Не печалься, ибо каждый дуб когда-то был желудем. Ступай учить законы!`;
    }

    state.level = finalLevel;
    
    root.innerHTML = `
        <div class="full-screen-center fade-in">
            <h1>Вердикт Мудреца</h1>
            <p class="master-quote" style="font-size: 2rem;">"${result}"</p>
            <button class="medieval-btn" onclick="startAcademy()">Войти в Академию</button>
        </div>
    `;
}

window.startAcademy = () => {
    // Сохраняем в память браузера
    localStorage.setItem('user_rank', state.level);
    renderDashboard(state); // Вызываем функцию из UI-контроллера
};

// Запуск
showAuth();
