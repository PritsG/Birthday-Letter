const envelopeBtn = document.getElementById('envelopeBtn');
const letterPaper = document.getElementById('letterPaper');
const revealBtn = document.getElementById('revealBtn');
const secretNote = document.getElementById('secretNote');
const photoCards = document.querySelectorAll('.photo-card');

photoCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    const isActive = card.classList.contains('active');

    photoCards.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });

    if (!isActive) {
      card.classList.add('active');
      card.setAttribute('aria-pressed', 'true');
    }
  });

  window.setTimeout(() => {
    card.classList.add('show');
  }, 180 * (index + 1));
});

envelopeBtn.addEventListener('click', () => {
  envelopeBtn.classList.toggle('open');
  letterPaper.classList.toggle('show');
  if (letterPaper.classList.contains('show')) {
    envelopeBtn.setAttribute('aria-expanded', 'true');
  } else {
    envelopeBtn.setAttribute('aria-expanded', 'false');
  }
});

revealBtn.addEventListener('click', () => {
  secretNote.classList.toggle('visible');
  revealBtn.textContent = secretNote.classList.contains('visible')
    ? 'Hide the secret note'
    : 'Reveal a secret note';
});

const cakes = [];
const cakeCount = 2;

for (let i = 0; i < cakeCount; i += 1) {
  const cake = document.createElement('div');
  cake.className = 'birthdayCake';
  cake.innerHTML = `
    <div class="cake-base"></div>
    <div class="cake-frosting"></div>
    <div class="cake-candle">
      <div class="candle-body"></div>
      <div class="flame"></div>
    </div>
  `;

  document.body.appendChild(cake);

  cakes.push({
    el: cake,
    x: -220 - i * 120,
    speed: 1.2 + i * 0.18,
    offsetY: 10 + (i % 3) * 18,
    phase: i * 1.1,
  });
}

function animateCakes() {
  cakes.forEach((cake) => {
    cake.x += cake.speed;
    if (cake.x > window.innerWidth + 220) {
      cake.x = -220 - Math.random() * 280;
    }
    const bob = Math.sin((cake.x / 40) + cake.phase) * 10;
    cake.el.style.transform = `translate3d(${cake.x}px, ${bob - cake.offsetY}px, 0)`;
  });

  requestAnimationFrame(animateCakes);
}

animateCakes();