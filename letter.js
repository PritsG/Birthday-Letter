const envelopeBtn = document.getElementById('envelopeBtn');
const letterPaper = document.getElementById('letterPaper');
const revealBtn = document.getElementById('revealBtn');
const secretNote = document.getElementById('secretNote');
const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const passwordSubmit = document.getElementById('passwordSubmit');
const passwordCancel = document.getElementById('passwordCancel');
const passwordError = document.getElementById('passwordError');
const photoCards = document.querySelectorAll('.photo-card');
const cards = document.querySelectorAll('.card');

const openStoryBtn = document.getElementById('openStoryBtn');
const hideStoryBtn = document.getElementById('hideStoryBtn');
const hint = document.querySelector('.cover-hint');
const secondPage = document.getElementById('secondPage');
const thirdPage = document.getElementById('thirdPage');
const fourthPage = document.getElementById('fourthPage');
const fifthPage = document.getElementById('fifthPage');
const sixthPage = document.getElementById('sixthPage');
const finalHeartsBtn = document.getElementById('finalHeartsBtn');
const unlockFifthBtn = document.getElementById('unlockFifthBtn');
const unlockModal = document.getElementById('unlockModal');
const unlockInput = document.getElementById('unlockInput');
const unlockSubmit = document.getElementById('unlockSubmit');
const unlockCancel = document.getElementById('unlockCancel');
const unlockError = document.getElementById('unlockError');

const fifthPagePassword = 'IHopeYouEnjoyedTheEffort';

const revealOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach((card) => observer.observe(card));
};

const resetScrollPosition = () => {
  window.scrollTo({ top: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

const showStory = () => {
  resetScrollPosition();
  secondPage.classList.remove('is-hidden');
  thirdPage.classList.remove('is-hidden');
  fourthPage.classList.remove('is-hidden');
  fifthPage.classList.add('is-hidden');
  document.body.classList.add('story-open');
  hint?.classList.add('visible');
  hideStoryBtn.hidden = false;
  secondPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const hideStory = () => {
  resetScrollPosition();
  secondPage.classList.add('is-hidden');
  thirdPage.classList.add('is-hidden');
  fourthPage.classList.add('is-hidden');
  fifthPage.classList.add('is-hidden');
  sixthPage.classList.add('is-hidden');
  document.body.classList.remove('story-open');
  hint?.classList.remove('visible');
  hideStoryBtn.hidden = true;
};

const revealFourthPage = () => {
  fourthPage.classList.remove('is-hidden');
  fourthPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const revealFinalPage = () => {
  sixthPage.classList.remove('is-hidden');
  sixthPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

openStoryBtn?.addEventListener('click', showStory);
hideStoryBtn?.addEventListener('click', hideStory);
// showFourthPageBtn?.addEventListener('click', revealFourthPage);
finalHeartsBtn?.addEventListener('click', revealFinalPage);
function openUnlockModal() {
  unlockModal?.classList.add('visible');
  unlockModal?.setAttribute('aria-hidden', 'false');
  unlockInput.value = '';
  unlockError.textContent = '';
  unlockInput.focus();
}

function closeUnlockModal() {
  unlockModal?.classList.remove('visible');
  unlockModal?.setAttribute('aria-hidden', 'true');
  unlockError.textContent = '';
}

unlockFifthBtn?.addEventListener('click', openUnlockModal);

unlockSubmit?.addEventListener('click', () => {
  const enteredPassword = unlockInput.value.trim();

  if (enteredPassword === fifthPagePassword) {
    fifthPage.classList.remove('is-hidden');
    fifthPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeUnlockModal();
  } else {
    unlockError.textContent = 'Incorrect password. Please try again.';
    unlockInput.focus();
  }
});

unlockCancel?.addEventListener('click', closeUnlockModal);

unlockInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    unlockSubmit.click();
  }
});

unlockModal?.addEventListener('click', (event) => {
  if (event.target === unlockModal) {
    closeUnlockModal();
  }
});

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
  const willOpen = !letterPaper.classList.contains('show');
  envelopeBtn.classList.toggle('open', willOpen);
  letterPaper.classList.toggle('show', willOpen);
  envelopeBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
});

const secretPassword = '8-3-2010';
const closeBtn = document.getElementById('closeBtn');

function openPasswordModal() {
  passwordModal.classList.add('visible');
  passwordModal.setAttribute('aria-hidden', 'false');
  passwordInput.value = '';
  passwordError.textContent = '';
  passwordInput.focus();
}

function closePasswordModal() {
  passwordModal.classList.remove('visible');
  passwordModal.setAttribute('aria-hidden', 'true');
  passwordError.textContent = '';
}

revealBtn.addEventListener('click', () => {
  if (secretNote.classList.contains('visible')) {
    secretNote.classList.remove('visible');
    revealBtn.textContent = 'Reveal a secret note';
    return;
  }

  openPasswordModal();
});

passwordSubmit.addEventListener('click', () => {
  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === secretPassword) {
    secretNote.classList.add('visible');
    revealBtn.textContent = 'Hide the secret note';
    closePasswordModal();

    const noteContainer = document.querySelector('.paper-inner');
    if (noteContainer) {
      noteContainer.scrollTop = noteContainer.scrollHeight;
    }
  } else {
    passwordError.textContent = 'Incorrect password. Please try again.';
    passwordInput.focus();
  }
});

passwordCancel.addEventListener('click', closePasswordModal);

passwordInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    passwordSubmit.click();
  }
});

passwordModal.addEventListener('click', (event) => {
  if (event.target === passwordModal) {
    closePasswordModal();
  }
});

closeBtn.addEventListener('click', () => {
  envelopeBtn.classList.remove('open');
  letterPaper.classList.remove('show');
  envelopeBtn.setAttribute('aria-expanded', 'false');
});

revealOnScroll();

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