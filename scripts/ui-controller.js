import { academyLaws } from '../data/courses-content.js';

export function renderDashboard(user) {
    const root = document.getElementById('app-root');
    const laws = academyLaws[user.level] || academyLaws.junior;

    root.innerHTML = `
        <header style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h1>Твой Терем</h1>
                <p>Добро пожаловать, <b>${user.name}</b>. Твой чин: <span class="status-badge">${user.levelName}</span></p>
            </div>
            <div class="theme-switch">
                <button class="medieval-btn" style="font-size: 1rem;" onclick="window.toggleTheme()">Сменить время суток</button>
            </div>
        </header>

        <div class="dashboard-grid">
            <aside class="scroll-panel">
                <h2>Твой Домовой</h2>
                <p>«Помогу решить любую беду, только в колокольчик звякни»</p>
                <a href="https://t.me/curator_bot" class="medieval-btn" style="text-decoration: none; text-align: center;">Позвать Домового</a>
            </aside>

            <main class="scroll-panel">
                <h2>Законы уровня</h2>
                <div class="laws-list">
                    ${laws.map(law => `
                        <div class="law-card">
                            <h3>${law.title}</h3>
                            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                                ${law.steps.map(step => `
                                    <button class="medieval-btn" style="font-size: 1rem; padding: 10px;" onclick="alert('${step.label}')">
                                        ${step.label}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </main>
        </div>
    `;
}
