// Game State
let gameState = {
  redName: '', blueName: '', className: '', school: '',
  redScore: 0, blueScore: 0, redCorrect: 0, blueCorrect: 0,
  totalQuestions: 0, timer: 60, timerInterval: null, startTime: 0,
  currentQuestion: null, currentTeamTurn: 'red', 
  redTeamAnswered: false, blueTeamAnswered: false
};

// Navigation
function goToPage(n) {
  if (n === 2) {
    const r = document.getElementById('teamRed').value.trim();
    const b = document.getElementById('teamBlue').value.trim();
    const c = document.getElementById('classInput').value.trim();
    const s = document.getElementById('schoolInput').value.trim();
    if (!r || !b || !c || !s) {
      document.getElementById('formError').classList.remove('hidden');
      return;
    }
    document.getElementById('formError').classList.add('hidden');
    gameState.redName = r; gameState.blueName = b;
    gameState.className = c; gameState.school = s;
  }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page' + n).classList.add('active');
  if (n === 2) createParticles();

var audio = document.getElementById("bgMusicST1");
  if (n === 2) {
    audio.play(2); // เริ่มเล่นเพลงถ้าอยู่หน้าเพจ 2
  } else {
    audio.pause(2); // หยุดเล่นเพลงถ้าไม่ใช่หน้าเพจ 2
    audio.currentTime = 0; // รีเซ็ตเพลงให้กลับไปเริ่มใหม่
  }



  var audio = document.getElementById("bgMusicST2");
  if (n === 3) {
    audio.play(3); // เริ่มเล่นเพลงถ้าอยู่หน้าเพจ 2
  } else {
    audio.pause(3); // หยุดเล่นเพลงถ้าไม่ใช่หน้าเพจ 2
    audio.currentTime = 0; // รีเซ็ตเพลงให้กลับไปเริ่มใหม่
  }




var audio = document.getElementById("gameMusic");
  if (n === 5) {
    audio.play(5); // เริ่มเล่นเพลงถ้าอยู่หน้าเพจ 2
  } else {
    audio.pause(5); // หยุดเล่นเพลงถ้าไม่ใช่หน้าเพจ 2
    audio.currentTime = 0; // รีเซ็ตเพลงให้กลับไปเริ่มใหม่
  }





    // ส่วนที่เพิ่มเข้าไปเพื่อคุมกล่องรูปภาพ
    const imageContainer = document.querySelector('.image-container');
    
    if (n === 3) {
        imageContainer.style.display = 'flex'; // โชว์เฉพาะหน้า 3
    } else {
        imageContainer.style.display = 'none'; // ซ่อนในหน้าอื่นๆ ทั้งหมด
    }






var audio = document.getElementById("bgMusicST3");
  if (n === 4) {
    audio.play(); // เริ่มเล่นเพลงถ้าอยู่หน้าเพจ 2
  } else {
    audio.pause(); // หยุดเล่นเพลงถ้าไม่ใช่หน้าเพจ 2
    audio.currentTime = 0; // รีเซ็ตเพลงให้กลับไปเริ่มใหม่
  }






 var audio = document.getElementById("bgMusicST4");
  if (n === 7) {
    audio.play(); // เริ่มเล่นเพลงถ้าอยู่หน้าเพจ 2
  } else {
    audio.pause(); // หยุดเล่นเพลงถ้าไม่ใช่หน้าเพจ 2
    audio.currentTime = 0; // รีเซ็ตเพลงให้กลับไปเริ่มใหม่
  }



 var audio = document.getElementById("bgMusicST5");
  if (n === 6) {
    audio.play(); // เริ่มเล่นเพลงถ้าอยู่หน้าเพจ 2
  } else {
    audio.pause(); // หยุดเล่นเพลงถ้าไม่ใช่หน้าเพจ 2
    audio.currentTime = 0; // รีเซ็ตเพลงให้กลับไปเริ่มใหม่
  }




  


}




function createParticles() {
  const c = document.getElementById('particles2');
  c.innerHTML = '';
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'light-particle';
    p.style.left = Math.random()*100+'%';
    p.style.top = Math.random()*100+'%';
    p.style.animationDelay = Math.random()*3+'s';
    p.style.width = (4+Math.random()*6)+'px';
    p.style.height = p.style.width;
    c.appendChild(p);
  }
}






// Question Generation
function generateQuestion() {
  const ops = ['+', '-'];
  const op = ops[Math.floor(Math.random()*2)];
  
  const denoms = [2,3,4,5,6,8,10];
  
  let d1 = denoms[Math.floor(Math.random()*denoms.length)];
  let d2 = denoms[Math.floor(Math.random()*denoms.length)];
  let n1 = Math.floor(Math.random()*(d1-1))+1;
  let n2 = Math.floor(Math.random()*(d2-1))+1;
  
  let lcd = lcm(d1, d2);
  let ansNum, ansDen;
  if (op === '+') {
    ansNum = n1*(lcd/d1) + n2*(lcd/d2);
  } else {
    ansNum = n1*(lcd/d1) - n2*(lcd/d2);
    if (ansNum <= 0) { 
      [n1,n2] = [n2,n1]; [d1,d2] = [d2,d1];
      lcd = lcm(d1,d2);
      ansNum = n1*(lcd/d1) - n2*(lcd/d2);
      if (ansNum <= 0) return generateQuestion();
    }
  }
  ansDen = lcd;
  const g = gcd(Math.abs(ansNum), ansDen);
  ansNum /= g; ansDen /= g;

  let choices = [{n: ansNum, d: ansDen}];
  while (choices.length < 4) {
    let wn = ansNum + (Math.floor(Math.random()*5)-2);
    let wd = ansDen + (Math.floor(Math.random()*3)-1);
    if (wd <= 0) wd = ansDen;
    if (wn <= 0) wn = 1;
    if (!choices.some(c => c.n===wn && c.d===wd)) choices.push({n:wn, d:wd});
  }
  
  choices.sort(() => Math.random()-0.5);
  const correctIdx = choices.findIndex(c => c.n===ansNum && c.d===ansDen);
  const time = lcd > 20 ? 120 : 60;

  return { n1, d1, n2, d2, op, ansNum, ansDen, choices, correctIdx, time };
}

function gcd(a,b) { return b===0?a:gcd(b,a%b); }
function lcm(a,b) { return (a*b)/gcd(a,b); }

function renderFraction(n, d) {
  return `<span class="fraction-display"><span class="num">${n}</span><span class="line"></span><span class="den">${d}</span></span>`;
}

// Game Logic
function startGame() {
  gameState.redScore = 0; gameState.blueScore = 0;
  gameState.redCorrect = 0; gameState.blueCorrect = 0;
  gameState.totalQuestions = 0; gameState.startTime = Date.now();
  gameState.currentTeamTurn = 'red'; gameState.questionAnswered = false;
  document.getElementById('redTeamLabel').textContent = gameState.redName;
  document.getElementById('blueTeamLabel').textContent = gameState.blueName;
  document.getElementById('redSideLabel').textContent = gameState.redName;
  document.getElementById('blueSideLabel').textContent = gameState.blueName;

  
var gameAudio = document.getElementById("gameMusic");
gameAudio.volume = 0.5; // กำหนดความดังระหว่าง 0.0 ถึง 1.0
gameAudio.play();



  goToPage(5);

  nextQuestion();













  
}

function nextQuestion() {
  clearInterval(gameState.timerInterval);
  const q = generateQuestion();
  gameState.currentQuestion = q;
  gameState.timer = q.time;
  gameState.totalQuestions++;
  gameState.redTeamAnswered = false;
  gameState.blueTeamAnswered = false;
  updateScoreDisplay();
  
  document.getElementById('questionText').innerHTML = 
    `${renderFraction(q.n1, q.d1)} <span class="text-yellow-300 text-3xl font-black mx-2">${q.op}</span> ${renderFraction(q.n2, q.d2)} <span class="text-yellow-300 text-3xl font-black mx-2">=</span> <span class="text-yellow-300 text-3xl">?</span>`;

  renderChoices('redChoices', 'red', q);
  renderChoices('blueChoices', 'blue', q);
  
  document.querySelectorAll('#redChoices .choice-btn').forEach(b => {
    b.disabled = false;
    b.style.opacity = '1';
  });
  document.querySelectorAll('#blueChoices .choice-btn').forEach(b => {
    b.disabled = false;
    b.style.opacity = '1';
  });

  updateTimerDisplay();
  gameState.timerInterval = setInterval(() => {
    gameState.timer--;
    updateTimerDisplay();
    if (gameState.timer <= 0) {
      clearInterval(gameState.timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function renderChoices(containerId, team, q) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  q.choices.forEach((c, i) => {
    const btn = document.createElement('button');
    const bgColor = team === 'red' ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500';
    btn.className = `choice-btn ${bgColor} text-white font-bold rounded-xl aspect-square flex items-center justify-center text-sm p-1`;
    btn.innerHTML = `<span class="fraction-display"><span class="num text-sm">${c.n}</span><span class="line"></span><span class="den text-sm">${c.d}</span></span>`;
    btn.onclick = () => handleAnswer(team, i, btn, container);
    btn.disabled = false;
    container.appendChild(btn);
  });
}

function handleAnswer(team, idx, btn, container) {
  if (team === 'red' && gameState.redTeamAnswered) return;
  if (team === 'blue' && gameState.blueTeamAnswered) return;
  
  const q = gameState.currentQuestion;
  
  if (team === 'red') gameState.redTeamAnswered = true;
  else gameState.blueTeamAnswered = true;
  
  if (idx === q.correctIdx) {
    btn.classList.add('correct');
    if (team === 'red') { gameState.redScore++; gameState.redCorrect++; }
    else { gameState.blueScore++; gameState.blueCorrect++; }
    updateScoreDisplay();
    
    document.querySelectorAll('#redChoices .choice-btn').forEach(b => b.disabled = true);
    document.querySelectorAll('#blueChoices .choice-btn').forEach(b => b.disabled = true);
    
    if (Math.abs(gameState.redScore - gameState.blueScore) >= 5) {
      clearInterval(gameState.timerInterval);
      setTimeout(showResults, 500);
      return;
    }
    
    setTimeout(nextQuestion, 600);
  } else {
    btn.classList.add('wrong');
    btn.style.backgroundColor = '#1a1a1a';
    btn.style.opacity = '0.5';
    btn.disabled = true;
    
    const selector = team === 'red' ? '#redChoices .choice-btn' : '#blueChoices .choice-btn';
    document.querySelectorAll(selector).forEach(b => {
      b.disabled = true;
    });
    
    if (gameState.redTeamAnswered && gameState.blueTeamAnswered) {
      setTimeout(nextQuestion, 600);
    }
  }
}

function updateTimerDisplay() {
  const el = document.getElementById('timerDisplay');
  el.textContent = `⏱️ ${gameState.timer}`;
  el.style.borderColor = gameState.timer <= 10 ? '#ef4444' : '#facc15';
}

function updateScoreDisplay() {
  document.getElementById('redScore').textContent = gameState.redScore;
  document.getElementById('blueScore').textContent = gameState.blueScore;
  const diff = gameState.redScore - gameState.blueScore;
  const redPct = 50 + (diff / 5) * 50;
  const clamped = Math.max(10, Math.min(90, redPct));
  document.getElementById('tugRed').style.width = clamped + '%';
  document.getElementById('tugBlue').style.width = (100 - clamped) + '%';
  document.getElementById('tugHeart').style.left = `calc(${clamped}% - 14px)`;
  document.getElementById('tugHeart').classList.add('heart-beat');
  setTimeout(() => document.getElementById('tugHeart').classList.remove('heart-beat'), 600);
}

function showResults() {
  goToPage(6);
  const elapsed = Math.round((Date.now() - gameState.startTime) / 1000);
  const winner = gameState.redScore > gameState.blueScore ? gameState.redName : gameState.blueName;
  
  document.getElementById('winnerText').innerHTML = `🏆 ${winner} ชนะ!`;
  document.getElementById('resultDetails').innerHTML = `
    <div class="bg-white/10 rounded-xl p-3 space-y-2">
      <p><span class="text-yellow-300">🏫</span> ${gameState.className} | ${gameState.school}</p>
      <hr class="border-white/20">
      <div class="flex justify-between">
        <span class="text-red-400 font-bold">${gameState.redName}</span>
        <span class="font-bold">${gameState.redScore} คะแนน (ถูก ${gameState.redCorrect} ข้อ)</span>
      </div>
      <div class="flex justify-between">
        <span class="text-blue-400 font-bold">${gameState.blueName}</span>
        <span class="font-bold">${gameState.blueScore} คะแนน (ถูก ${gameState.blueCorrect} ข้อ)</span>
      </div>
      <hr class="border-white/20">
      <p>📊 โจทย์ทั้งหมด: ${gameState.totalQuestions} ข้อ</p>
      <p>⏱️ ใช้เวลาทั้งหมด: ${elapsed} วินาที</p>
    </div>`;
  
  const cc = document.getElementById('confettiContainer');
  cc.innerHTML = '';
  for (let i = 0; i < 40; i++) {
    const c = document.createElement('div');
    c.style.cssText = `position:absolute;left:${Math.random()*100}%;top:-20px;width:10px;height:10px;background:${['#ff0','#f0f','#0ff','#f00','#0f0','#00f'][Math.floor(Math.random()*6)]};border-radius:${Math.random()>0.5?'50%':'0'};animation:confetti-fall ${2+Math.random()*2}s linear ${Math.random()}s forwards;`;
    cc.appendChild(c);
  }
}


















function resetGame() {
  gameState.redScore=0; gameState.blueScore=0;
  gameState.redCorrect=0; gameState.blueCorrect=0;
  gameState.totalQuestions=0;
  gameState.redTeamAnswered=false; gameState.blueTeamAnswered=false;
  clearInterval(gameState.timerInterval);




  
}
























var modal = document.getElementById('customModal');
var homeBtn = document.getElementById('homeButton');
var yesBtn = document.getElementById('confirmYes');
var noBtn = document.getElementById('confirmNo');

homeBtn.addEventListener('click', function() {
    modal.classList.remove('hidden');
});

yesBtn.addEventListener('click', function() {
document.getElementById('confirmYes').addEventListener('click', function() {
    document.getElementById('customModal').classList.add('hidden');
    goToPage(1); 
});
});

noBtn.addEventListener('click', function() {
    modal.classList.add('hidden');
});














