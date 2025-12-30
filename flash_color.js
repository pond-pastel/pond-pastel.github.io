const COUNT_OF_COLOR = 3;
let interval = 5000;
let isPlaying = false;
let score, hp, time, timer, colorList, answer, countOfAnswer;

function apply() {
    const colorArea = document.querySelector("#color-area");
    colorArea.innerHTML = "";
    let colorGroup = [];
    for(let i = 0;i < COUNT_OF_COLOR;i++) {
        const CG = document.createElement("div");
        CG.classList.add("color-group");
        colorGroup.push(CG);
    }
    colorGroup.forEach((CG) => {
        for(let i = 0;i < COUNT_OF_COLOR;i++) {
            const c = document.createElement("button");
            c.classList.add("color");
            c.disabled = true;
            CG.append(c);
        }
        colorArea.append(CG);
    });
}

function highScoreApply() {
    const data = localStorage.getItem("flash_color");
    let highScore;
    if(data) {
        highScore = JSON.parse(data).highScore;
    } else {
        localStorage.setItem("flash_color", JSON.stringify({highScore: 0}));
        highScore = 0;
    }
    if(score ?? 0 > highScore) {
        localStorage.setItem("flash_color", JSON.stringify({highScore: score}));
        highScore = score;
    }
    const highScoreEle = document.querySelectorAll(".high-score");
    highScoreEle.forEach((h) => {
        h.textContent = `High Score: ${highScore}`;
    });
}

function start() {
    const beforeStarting = document.querySelectorAll(".before-starting");
    beforeStarting.forEach((b) => {
        b.style.display = "none";
    });
    const playing = document.querySelectorAll(".playing");
    playing.forEach((p) => {
        p.style.display = null;
    });
    const result = document.querySelectorAll(".result");
    result.forEach((r) => {
        r.style.display = "none";
    });
    score = 0;
    hp = COUNT_OF_COLOR;
    heartApply();
    countOfAnswer = 0;
    isPlaying = true;
    nextQuestion();
}

function answerTime() {
    colorHidden();
    const color = document.querySelectorAll(".color");
    color.forEach((c) => {
        c.disabled = false;
    });
    const remember = document.querySelectorAll(".remember");
    remember.forEach((r) => {
        r.style.display = "none";
    });
    const response = document.querySelectorAll(".response");
    response.forEach((r) => {
        r.style.display = null;
    });
    const end = document.querySelectorAll(".end");
    end.forEach((n) => {
        n.style.display = "none";
    });
    const rand = Math.floor(Math.random() * 3);
    const CL = ["red", "green", "blue"];
    answer = CL[rand];
    const answeringColor = document.querySelector("#answering-color");
    answeringColor.style.background = CL[rand];
}

function nextQuestion() {
    if(score > 0 && interval > 500) {
        interval -= 500;
    }
    countOfAnswer = 0;
    const remember = document.querySelectorAll(".remember");
    remember.forEach((r) => {
        r.style.display = null;
    });
    const response = document.querySelectorAll(".response");
    response.forEach((r) => {
        r.style.display = "none";
    });
    const end = document.querySelectorAll(".end");
    end.forEach((n) => {
        n.style.display = "none";
    });
    disabledButton();
    colorHidden();
    shuffleColor();
    setIntv();
}

function setIntv() {
    if(timer) {
        clearTimer();
    }
    time = interval;
    timer = setInterval(runTheTimer, 100);
}

function clearTimer() {
    clearInterval(timer);
    timer = null;
    time = 0;
}

function runTheTimer() {
    time -= 100;
    const timerBar = document.querySelector("#timer-bar");
    timerBar.style.width = `${(time / interval) * 100}%`;
    if(time <= 0) {
        clearTimer();
        answerTime();
    }
}

function shuffleColor() {
    colorList = [];
    for(let i = 0;i < (COUNT_OF_COLOR * COUNT_OF_COLOR);i++) {
        const rand = Math.floor(Math.random() * 3);
        const CL = ["red", "green", "blue"];
        colorList.push(CL[rand]);
    }
    colorApply();
}

function colorApply(num = null) {
    const color = document.querySelectorAll(".color");
    if(num !== null) {
        color[num].style.background = colorList[num];
    } else {
        color.forEach((c, i) => {
            c.style.background = colorList[i];
        });
    }
}

function colorHidden() {
    const color = document.querySelectorAll(".color");
    color.forEach((c) => {
        c.style.background = null;
    });
}

function judgement(num) {
    if(time || !isPlaying) {
        return;
    }
    colorApply(num);
    const color = document.querySelectorAll(".color");
    color[num].disabled = true;
    if(colorList[num] === answer) {
        score += 1;
        countOfAnswer += 1;
    } else {
        hp -= 1;
        heartApply();
        if(hp <= 0) {
            gameOver();
            return;
        }
    }
    if(countOfAnswer === colorList.filter((c) => c === answer).length) {
        nextQuestion();
    }
}

function zeroJudgement() {
    if(colorList.filter((c) => c === answer).length === 0) {
        score += 1;
    } else {
        hp -= 1;
        heartApply();
        if(hp <= 0) {
            gameOver();
            return;
        }
    }
    nextQuestion();
}

function heartApply() {
    const haertEle = document.querySelector("#haert");
    let haert = "";
    for(let i = 0;i < hp;i++) {
        haert += "♥";
    }
    haertEle.textContent = haert;
}

function gameOver() {
    isPlaying = false;
    colorApply();
    highScoreApply();
    const beforeStarting = document.querySelectorAll(".before-starting");
    beforeStarting.forEach((b) => {
        b.style.display = "none";
    });
    const playing = document.querySelectorAll(".playing");
    playing.forEach((p) => {
        p.style.display = "none";
    });
    const result = document.querySelectorAll(".result");
    result.forEach((r) => {
        r.style.display = null;
    });
    disabledButton();
    showResult();
}

function showResult() {
    const scoreEle = document.querySelector("#score");
    scoreEle.textContent = score;
}

function returnHome() {
    const beforeStarting = document.querySelectorAll(".before-starting");
    beforeStarting.forEach((r) => {
        r.style.display = null;
    });
    const playing = document.querySelectorAll(".playing");
    playing.forEach((p) => {
        p.style.display = "none";
    });
    const result = document.querySelectorAll(".result");
    result.forEach((r) => {
        r.style.display = "none";
    });
    colorHidden();
    score = null;
    hp = null;
    time = null;
    clearTimer();
    colorList = null;
    answer = null;
    countOfAnswer = null;
    isPlaying = false;
    interval = 5000;
}

function disabledButton() {
    const color = document.querySelectorAll(".color");
    color.forEach((c) => {
        c.disabled = true;
    });
}

window.onload = function() {
    apply();
    highScoreApply();
    const rule = document.querySelector("#rule");
    rule.addEventListener("click", () => {
        alert(`${COUNT_OF_COLOR}×${COUNT_OF_COLOR}マスに表示される色を覚えて、お題の色の場所を答えるゲームです。\n問題が出されるたびに色が表示される時間が短くなります。\n${COUNT_OF_COLOR}回ミスするとゲームオーバーです。`);
    });
    const startButton = document.querySelector("#start-button");
    startButton.addEventListener("click", () => {
        start();
    });
    const zeroButton = document.querySelector("#zero-button");
    zeroButton.addEventListener("click", () => {
        zeroJudgement();
    });

    const returnButton = document.querySelector("#return-button");
    returnButton.addEventListener("click", () => {
        returnHome();
    });
    const color = document.querySelectorAll(".color");
    color.forEach((c, i) => {
        c.addEventListener("click", () => {
            judgement(i);
        });
    });
}