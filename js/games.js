/* games.js — All game logic for Parity Progress */

// Utility Selectors
const qs = (s) => document.querySelector(s);
const qsa = (s) => document.querySelectorAll(s);

/**********************************
 * GAME 1 — Myth or Fact
 **********************************/
const mfList = [
  {
    q: "Quotas harm national productivity.",
    a: false,
    e: "Research from Norway & Rwanda shows quotas improved governance and outcomes.",
  },
  {
    q: "Women face lower early-promotion rates.",
    a: true,
    e: "This is known as the 'broken rung' — less promotion at early levels.",
  },
  {
    q: "Parental leave policies reduce women's retention.",
    a: false,
    e: "Supportive leave policies increase workforce retention.",
  },
];
let mfIndex = 0;

function renderMF() {
  const cur = mfList[mfIndex % mfList.length];
  qs("#mf-question").textContent = cur.q;

  const box = qs("#mf-options");
  box.innerHTML = "";

  ["Myth", "Fact"].forEach((label) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = label;

    div.onclick = () => {
      const correct = (label === "Fact") === cur.a;
      div.classList.add(correct ? "correct" : "wrong");
      qs("#mf-explain").textContent = cur.e;
    };

    box.appendChild(div);
  });

  qs("#mf-explain").textContent = "";
}

qs("#mf-next").onclick = () => {
  mfIndex++;
  renderMF();
};

renderMF();

/**********************************
 * GAME 2 — Bias Detect
 **********************************/
const bdList = [
  {
    q: "She might quit soon because she has kids.",
    b: true,
    e: "Assuming caregiving = bias.",
  },
  {
    q: "He is competent and focused.",
    b: false,
    e: "Neutral statement.",
  },
  {
    q: "Women are too emotional to lead.",
    b: true,
    e: "Classic gender stereotype.",
  },
];
let bdIndex = 0;

function renderBD() {
  const cur = bdList[bdIndex % bdList.length];
  qs("#bd-question").textContent = cur.q;
  qs("#bd-explain").textContent = "";
}

qs("#bd-yes").onclick = () => {
  const cur = bdList[bdIndex % bdList.length];
  qs("#bd-explain").textContent = cur.b ? cur.e : "Incorrect — this one is neutral.";
  bdIndex++;
  renderBD();
};

qs("#bd-no").onclick = () => {
  const cur = bdList[bdIndex % bdList.length];
  qs("#bd-explain").textContent = !cur.b
    ? "Correct — neutral statement."
    : cur.e;
  bdIndex++;
  renderBD();
};

renderBD();

/**********************************
 * GAME 3 — Global Match
 **********************************/
const gmList = [
  {
    c: "Rwanda",
    o: "High women representation in parliament",
    p: "Gender quotas",
  },
  {
    c: "Norway",
    o: "Increase in women on corporate boards",
    p: "Board regulations",
  },
  {
    c: "Mexico",
    o: "Stronger electoral parity",
    p: "Parity laws",
  },
];
let gmIndex = 0;

function renderGM() {
  const cur = gmList[gmIndex % gmList.length];
  qs("#gm-question").textContent = `${cur.c}: ${cur.o}`;

  const box = qs("#gm-options");
  box.innerHTML = "";

  const shuffled = gmList.map((x) => x.p).sort(() => Math.random() - 0.5);

  shuffled.forEach((choice) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = choice;

    div.onclick = () => {
      const correct = choice === cur.p;
      div.classList.add(correct ? "correct" : "wrong");
      qs("#gm-explain").textContent = correct
        ? "Correct!"
        : `Correct Answer: ${cur.p}`;
    };

    box.appendChild(div);
  });

  qs("#gm-explain").textContent = "";
}

qs("#gm-next").onclick = () => {
  gmIndex++;
  renderGM();
};

renderGM();
