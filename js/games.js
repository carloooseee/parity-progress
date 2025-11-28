// Game State
let score = 0;
let gamesCompleted = 0;
const totalGames = 3;

// Data
const mythFactData = [
  {
    q: "Gender parity is only a women's issue.",
    options: ["Myth", "Fact"],
    correct: 0,
    explain: "Gender parity benefits everyone! It leads to economic growth, better decision-making, and happier societies."
  },
  {
    q: "Diverse companies are 25% more likely to have above-average profitability.",
    options: ["Myth", "Fact"],
    correct: 1,
    explain: "True! McKinsey research shows that diversity directly correlates with financial performance."
  },
  {
    q: "The global gender gap has already been closed by 90%.",
    options: ["Myth", "Fact"],
    correct: 0,
    explain: "False. As of 2024, the global gender gap is closed by about 68%. We still have a long way to go."
  }
];

const biasData = [
  {
    q: "\"She's too emotional to lead the team.\"",
    isBias: true,
    explain: "This is a stereotype. Leadership capability is not defined by gender or emotion."
  },
  {
    q: "\"He is a great nurse.\"",
    isBias: false,
    explain: "This is a neutral statement acknowledging someone's profession and skill."
  },
  {
    q: "\"We need to hire a woman to fill the quota.\"",
    isBias: true,
    explain: "Tokenism is a form of bias. Hiring should be based on merit and the value of diverse perspectives, not just checking a box."
  }
];

const matchData = [
  {
    q: "Which country was the first to enforce equal pay for equal work?",
    options: ["Iceland", "USA", "Japan"],
    correct: 0,
    explain: "Iceland has been a pioneer in enforcing equal pay legislation."
  },
  {
    q: "Which country has the highest percentage of women in parliament?",
    options: ["Rwanda", "Sweden", "Canada"],
    correct: 0,
    explain: "Rwanda leads the world with over 60% of its parliament seats held by women."
  },
  {
    q: "Which country recently passed a law for paid menstrual leave?",
    options: ["Spain", "Germany", "UK"],
    correct: 0,
    explain: "Spain became the first European country to pass a law granting paid menstrual leave."
  }
];

// Current indices
let mfIndex = 0;
let bdIndex = 0;
let gmIndex = 0;

// DOM Elements
const scoreDisplay = document.getElementById('total-score');
const resultsSection = document.getElementById('results-section');
const finalScoreDisplay = document.getElementById('final-score');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadMF();
  loadBD();
  loadGM();
});

function updateScore(points) {
  score += points;
  scoreDisplay.innerText = score;
  scoreDisplay.classList.add('shake');
  setTimeout(() => scoreDisplay.classList.remove('shake'), 500);
}

function checkCompletion() {
  if (gamesCompleted === totalGames) {
    setTimeout(() => {
      document.querySelectorAll('.game-card').forEach(el => el.style.display = 'none');
      resultsSection.style.display = 'block';
      finalScoreDisplay.innerText = score;
      confettiEffect();
    }, 1000);
  }
}

// --- Myth or Fact Logic ---
function loadMF() {
  if (mfIndex >= mythFactData.length) {
    document.getElementById('game-mf').innerHTML = '<div class="p-4 text-center text-success fw-bold">Section Completed!</div>';
    gamesCompleted++;
    checkCompletion();
    return;
  }
  
  const data = mythFactData[mfIndex];
  document.getElementById('mf-question').innerText = data.q;
  const optsDiv = document.getElementById('mf-options');
  optsDiv.innerHTML = '';
  
  data.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt;
    btn.onclick = () => checkMF(idx, btn);
    optsDiv.appendChild(btn);
  });

  document.getElementById('mf-explain').className = 'feedback-text';
  document.getElementById('mf-explain').style.display = 'none';
  document.getElementById('mf-next').style.display = 'none';
}

function checkMF(selectedIdx, btn) {
  const data = mythFactData[mfIndex];
  const explainDiv = document.getElementById('mf-explain');
  const nextBtn = document.getElementById('mf-next');
  
  // Disable all buttons
  const allBtns = document.querySelectorAll('#mf-options .option-btn');
  allBtns.forEach(b => b.disabled = true);

  if (selectedIdx === data.correct) {
    btn.classList.add('correct');
    explainDiv.innerHTML = `<strong>Correct!</strong> ${data.explain}`;
    explainDiv.className = 'feedback-text feedback-correct show';
    updateScore(10);
  } else {
    btn.classList.add('incorrect');
    allBtns[data.correct].classList.add('correct');
    explainDiv.innerHTML = `<strong>Incorrect.</strong> ${data.explain}`;
    explainDiv.className = 'feedback-text feedback-incorrect show';
  }

  nextBtn.style.display = 'inline-block';
  nextBtn.onclick = () => {
    mfIndex++;
    loadMF();
  };
}

// --- Bias Detect Logic ---
function loadBD() {
  if (bdIndex >= biasData.length) {
    document.getElementById('game-bd').innerHTML = '<div class="p-4 text-center text-success fw-bold">Section Completed!</div>';
    gamesCompleted++;
    checkCompletion();
    return;
  }

  const data = biasData[bdIndex];
  document.getElementById('bd-question').innerText = data.q;
  
  // Reset buttons
  const yesBtn = document.getElementById('bd-yes');
  const noBtn = document.getElementById('bd-no');
  yesBtn.disabled = false;
  noBtn.disabled = false;
  yesBtn.className = 'option-btn';
  noBtn.className = 'option-btn';
  
  // Clear feedback
  const explainDiv = document.getElementById('bd-explain');
  explainDiv.className = 'feedback-text';
  explainDiv.style.display = 'none';
  
  document.getElementById('bd-next').style.display = 'none';

  yesBtn.onclick = () => checkBD(true, yesBtn, noBtn);
  noBtn.onclick = () => checkBD(false, noBtn, yesBtn);
}

function checkBD(isBiasSelected, selectedBtn, otherBtn) {
  const data = biasData[bdIndex];
  const explainDiv = document.getElementById('bd-explain');
  const nextBtn = document.getElementById('bd-next');

  selectedBtn.disabled = true;
  otherBtn.disabled = true;

  if (isBiasSelected === data.isBias) {
    selectedBtn.classList.add('correct');
    explainDiv.innerHTML = `<strong>Correct!</strong> ${data.explain}`;
    explainDiv.className = 'feedback-text feedback-correct show';
    updateScore(10);
  } else {
    selectedBtn.classList.add('incorrect');
    otherBtn.classList.add('correct');
    explainDiv.innerHTML = `<strong>Incorrect.</strong> ${data.explain}`;
    explainDiv.className = 'feedback-text feedback-incorrect show';
  }

  nextBtn.style.display = 'inline-block';
  nextBtn.onclick = () => {
    bdIndex++;
    loadBD();
  };
}

// --- Global Match Logic ---
function loadGM() {
  if (gmIndex >= matchData.length) {
    document.getElementById('game-gm').innerHTML = '<div class="p-4 text-center text-success fw-bold">Section Completed!</div>';
    gamesCompleted++;
    checkCompletion();
    return;
  }

  const data = matchData[gmIndex];
  document.getElementById('gm-question').innerText = data.q;
  const optsDiv = document.getElementById('gm-options');
  optsDiv.innerHTML = '';

  data.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt;
    btn.onclick = () => checkGM(idx, btn);
    optsDiv.appendChild(btn);
  });

  document.getElementById('gm-explain').className = 'feedback-text';
  document.getElementById('gm-explain').style.display = 'none';
  document.getElementById('gm-next').style.display = 'none';
}

function checkGM(selectedIdx, btn) {
  const data = matchData[gmIndex];
  const explainDiv = document.getElementById('gm-explain');
  const nextBtn = document.getElementById('gm-next');

  const allBtns = document.querySelectorAll('#gm-options .option-btn');
  allBtns.forEach(b => b.disabled = true);

  if (selectedIdx === data.correct) {
    btn.classList.add('correct');
    explainDiv.innerHTML = `<strong>Correct!</strong> ${data.explain}`;
    explainDiv.className = 'feedback-text feedback-correct show';
    updateScore(10);
  } else {
    btn.classList.add('incorrect');
    allBtns[data.correct].classList.add('correct');
    explainDiv.innerHTML = `<strong>Incorrect.</strong> ${data.explain}`;
    explainDiv.className = 'feedback-text feedback-incorrect show';
  }

  nextBtn.style.display = 'inline-block';
  nextBtn.onclick = () => {
    gmIndex++;
    loadGM();
  };
}

function confettiEffect() {
  // Simple confetti simulation
  const colors = ['#6366f1', '#a855f7', '#ec4899'];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.transition = 'top 2s ease-in, transform 2s ease-in';
    confetti.style.zIndex = '9999';
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.style.top = '100vh';
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    }, 100);

    setTimeout(() => confetti.remove(), 2000);
  }
}
