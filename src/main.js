const steps = [
  { n: 1, title: 'Добро пожаловать', short: 'Добро\nпожаловать' },
  { n: 2, title: 'Ваш вопрос', short: 'Ваш вопрос' },
  { n: 3, title: 'Матрица судьбы', short: 'Матрица\nсудьбы' },
  { n: 4, title: 'Анализ решения', short: 'Анализ решения\n(7 шагов)' },
  { n: 5, title: 'Рекомендация', short: 'Рекомендация\nи следующий шаг' }
];

const protocol = [
  ['Вопрос', 'Открывать ли свой бизнес?'],
  ['Сигналы', 'Что показывает матрица'],
  ['Гипотезы', 'Возможные сценарии'],
  ['Факты', 'Данные и реальность'],
  ['Варианты', 'Доступные пути'],
  ['Ход', 'Оценка и выбор'],
  ['Следующий шаг', 'Конкретное действие']
];

const matrixNodes = [
  [50, 8, '1', 'violet'], [32, 22, '12', 'neutral'], [50, 21, '11', 'violet'], [69, 22, '22', 'neutral'],
  [17, 42, '7', 'neutral'], [31, 42, '7', 'violet'], [50, 42, '6', 'center'], [69, 42, '8', 'cyan'], [84, 42, '8', 'cyan'],
  [31, 63, '16', 'neutral'], [50, 63, '22', 'cyan'], [69, 63, '18', 'gold'], [50, 80, '22', 'cyan']
];

function matrixSvg(extraClass = '') {
  const edges = [
    [50,8,17,42],[50,8,84,42],[17,42,50,80],[84,42,50,80],[50,8,50,80],
    [17,42,84,42],[32,22,69,63],[69,22,31,63],[31,42,69,42],[31,22,50,42],[69,22,50,42],
    [31,63,50,42],[69,63,50,42],[50,21,31,42],[50,21,69,42],[50,63,31,42],[50,63,69,42]
  ];
  return `
    <svg class="matrix-svg ${extraClass}" viewBox="0 0 100 92" aria-label="Матрица судьбы" role="img">
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="1.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="edge" x1="0" x2="1"><stop stop-color="#a694ff" stop-opacity=".25"/><stop offset=".5" stop-color="#d7ddff" stop-opacity=".72"/><stop offset="1" stop-color="#7de7ff" stop-opacity=".28"/></linearGradient>
      </defs>
      <circle cx="50" cy="46" r="40" fill="none" stroke="rgba(180,201,255,.18)" stroke-width=".55" stroke-dasharray="1.4 2"/>
      <circle cx="50" cy="46" r="32" fill="none" stroke="rgba(176,151,255,.22)" stroke-width=".45"/>
      <ellipse cx="50" cy="46" rx="43" ry="28" fill="none" stroke="rgba(125,231,255,.17)" stroke-width=".4" transform="rotate(-13 50 46)"/>
      ${edges.map(([x1,y1,x2,y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#edge)" stroke-width=".55"/>`).join('')}
      ${matrixNodes.map(([x,y,tone,label, legacy]) => '').join('')}
      ${matrixNodes.map(([x,y,label,tone]) => `<g class="matrix-node matrix-node--${tone}" transform="translate(${x} ${y})"><circle r="${tone==='center'?6.3:4.6}"/><text y="1.5">${label}</text></g>`).join('')}
    </svg>`;
}

function statusBar() {
  return `<div class="statusbar"><span>9:41</span><span class="status-icons"><i></i><i></i><i></i></span></div>`;
}

function homeIndicator() { return `<div class="home-indicator"></div>`; }

function phoneShell(index, content, cls='') {
  return `<article class="phone phone-${index} ${cls}" data-step="${index}">
    <div class="phone-frame">
      <div class="dynamic-island"></div>
      <div class="phone-screen">${statusBar()}${content}${homeIndicator()}</div>
    </div>
  </article>`;
}

function welcomeScreen() {
  return `
    <div class="screen welcome-screen">
      <div class="landscape" aria-hidden="true"><span class="mountain m1"></span><span class="mountain m2"></span><span class="horizon"></span></div>
      <div class="welcome-matrix">${matrixSvg('hero-matrix')}</div>
      <div class="welcome-copy">
        <h2>Matrica</h2><p class="caps">НАВИГАТОР РЕШЕНИЙ</p>
        <p class="muted">Помогаем увидеть скрытые связи,<br>оценить варианты и сделать<br>верный шаг.</p>
      </div>
      <button class="primary-btn" data-go="2">Начать путь</button>
      <div class="pagination"><b></b><i></i><i></i></div>
    </div>`;
}

function questionScreen() {
  return `
    <div class="screen question-screen">
      <button class="icon-btn back" data-go="1" aria-label="Назад">‹</button>
      <div class="screen-heading"><h3>Какой вопрос<br>вас волнует?</h3><p>Сформулируйте коротко и по сути.</p></div>
      <label class="question-card">
        <textarea id="questionInput" maxlength="300" rows="5" aria-label="Ваш вопрос">Открывать ли свой бизнес?</textarea>
        <span id="counter">28 / 300</span>
      </label>
      <div class="tip-card"><button class="tip-close">×</button><strong>Совет</strong><p>Чем яснее вопрос, тем точнее матрица и рекомендации.</p></div>
      <div class="flow-ribbons" aria-hidden="true"><i></i><i></i><i></i></div>
      <button class="primary-btn continue" data-go="3"><span>Продолжить</span><b>→</b></button>
    </div>`;
}

function matrixScreen() {
  return `
    <div class="screen matrix-screen">
      <div class="topline"><button class="icon-btn" data-go="2">‹</button><h3>Ваша матрица</h3><button class="info-btn">i</button></div>
      <div class="tabs"><span class="active">Текущая матрица</span><span>Поток: Сейчас</span></div>
      <div class="matrix-stage">${matrixSvg('large-matrix')}<div class="orbit-particle p1"></div><div class="orbit-particle p2"></div><div class="orbit-particle p3"></div></div>
      <div class="legend"><span class="v">Дух</span><span class="p">Таланты</span><span class="g">Отношения</span><span class="c">Реализация</span><span class="n">Род</span><span class="w">Материя</span></div>
      <div class="bottom-nav"><span>⌂<small>Обзор</small></span><span class="active">✧<small>Матрица</small></span><span>◷<small>История</small></span></div>
    </div>`;
}

function analysisScreen() {
  return `
    <div class="screen analysis-screen">
      <div class="analysis-title"><div><h3>Анализ решения</h3><p>7-шаговый протокол</p></div><span class="network-icon">⌘</span></div>
      <div class="protocol-list">
        ${protocol.map(([title, sub], i) => `<button class="protocol-row ${i===0?'active':''}" data-protocol="${i}"><span class="protocol-num">${i+1}</span><span class="protocol-copy"><strong>${title}</strong><small>${sub}</small></span><span class="chev">›</span></button>`).join('')}
      </div>
      <div class="bottom-nav"><span class="active">⌂<small>Обзор</small></span><span>✧<small>Матрица</small></span><span>◷<small>История</small></span></div>
    </div>`;
}

function resultScreen() {
  return `
    <div class="screen result-screen">
      <div class="topline"><button class="icon-btn" data-go="4">‹</button><h3>Рекомендация</h3><span></span></div>
      <div class="result-orbit"><div class="check">✓</div><i></i><i></i></div>
      <div class="result-card">
        <p>Сейчас для вас верно:</p>
        <h4>Двигаться постепенно<br>и проверять гипотезу<br>на практике.</h4>
        <div class="metrics"><span><b>◎</b>Потенциал роста <em>Высокий</em></span><span><b>♢</b>Риски <em>Умеренные</em></span><span><b>◈</b>Ресурсы <em>Достаточные</em></span></div>
        <p class="result-note">Матрица поддерживает мягкий старт<br>и обучение в процессе.</p>
      </div>
      <button class="primary-btn result-action"><span>Сделать обратимый шаг</span><b>→</b></button>
      <button class="save-btn">♡ &nbsp; Сохранить результат</button>
    </div>`;
}

function animationPanel() {
  return `
    <aside class="animation-panel">
      <p>ЯЗЫК АНИМАЦИИ</p>
      <div><span class="ani-icon rings"></span><b>мягкие<br>переходы</b></div>
      <div><span class="ani-icon nodes"><i></i><i></i><i></i><i></i></span><b>живые<br>узлы</b></div>
      <div><span class="ani-icon wave">∞</span><b>плавные<br>линии</b></div>
      <div><span class="ani-icon sparkle">✦</span><b>спокойные<br>микроанимации</b></div>
    </aside>`;
}

function brand() {
  return `<header class="brand">
    <div class="brand-icon">${matrixSvg('mini-matrix')}<span>M</span></div>
    <div><h1>Matrica</h1><p class="caps">НАВИГАТОР РЕШЕНИЙ</p>
    <p class="brand-sub">Матрица судьбы как интеллект-карта:<br>ясность, глубина и уверенность в каждом решении.</p></div>
  </header>`;
}

function stepRail() {
  return `<nav class="step-rail" aria-label="Этапы">
    ${steps.map((s,i) => `<button data-go="${s.n}" class="${i===0?'active':''}"><span>${s.n}</span><b>${s.short.replace('\n','<br>')}</b></button>${i<steps.length-1?'<i class="rail-line"><em></em></i>':''}`).join('')}
  </nav>`;
}

const app = document.querySelector('#app');
app.innerHTML = `
  <main class="concept-board">
    <div class="cosmos" aria-hidden="true">
      <i class="star s1"></i><i class="star s2"></i><i class="star s3"></i><i class="star s4"></i><i class="star s5"></i><i class="star s6"></i>
      <svg class="header-orbits" viewBox="0 0 900 220"><path d="M35 16 C260 15 460 63 606 116 S786 181 820 126"/><path d="M232 38 C411 58 554 100 650 137 S773 175 833 121"/><circle cx="641" cy="137" r="3"/></svg>
      <div class="far-mountains"><span></span><span></span><span></span></div>
    </div>
    ${brand()}
    ${animationPanel()}
    <section class="phones" aria-label="Экраны Matrica">
      ${phoneShell(1, welcomeScreen())}
      ${phoneShell(2, questionScreen())}
      ${phoneShell(3, matrixScreen())}
      ${phoneShell(4, analysisScreen())}
      ${phoneShell(5, resultScreen())}
    </section>
    ${stepRail()}
  </main>`;

let activeStep = 1;
function setStep(step) {
  activeStep = Number(step);
  document.querySelectorAll('.step-rail button').forEach((b, idx) => b.classList.toggle('active', idx === activeStep-1));
  document.querySelectorAll('.phone').forEach((phone) => phone.classList.toggle('mobile-active', Number(phone.dataset.step) === activeStep));
}

app.addEventListener('click', (event) => {
  const go = event.target.closest('[data-go]');
  if (go) setStep(go.dataset.go);

  const protocolRow = event.target.closest('.protocol-row');
  if (protocolRow) {
    document.querySelectorAll('.protocol-row').forEach(r => r.classList.remove('active'));
    protocolRow.classList.add('active');
  }

  if (event.target.closest('.tip-close')) event.target.closest('.tip-card')?.classList.add('closed');
});

const input = document.querySelector('#questionInput');
const counter = document.querySelectorr('#counter');
input.addEventListener('input', () => counter.textContent = `${input.value.length} / 300`);

setStep(1);

// Mobile gesture navigation keeps the visual mockup untouched while making the five-screen flow usable.
let touchStartX = null;
const phones = document.querySelector('.phones');
phones.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0]?.clientX ?? null;
}, { passive: true });
phones.addEventListener('touchend', (event) => {
  if (touchStartX == null) return;
  const delta = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
  touchStartX = null;
  if (Math.abs(delta) < 55) return;
  if (delta < 0 && activeStep < 5) setStep(activeStep + 1);
  if (delta > 0 && activeStep > 1) setStep(activeStep - 1);
}, { passive: true });

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' && activeStep < 5) setStep(activeStep + 1);
  if (event.key === 'ArrowLeft' && activeStep > 1) setStep(activeStep - 1);
});
