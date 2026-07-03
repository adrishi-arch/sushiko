(() => {
  const fortunes = window.SUSHINI_FORTUNES || [];
  const cookieButton = document.querySelector('.fortune-cookie');
  const scroll = document.querySelector('#fortune-scroll');
  const fortuneText = document.querySelector('#fortune-text');
  const luckyNumbers = document.querySelector('#lucky-numbers');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  createSakuraFall(motionQuery.matches);

  if (!cookieButton || !scroll || !fortuneText || !luckyNumbers || fortunes.length === 0) {
    return;
  }

  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  const numbers = createLuckyNumbers(6, 60);

  fortuneText.textContent = randomFortune;
  luckyNumbers.replaceChildren(
    ...numbers.map((number, index) => {
      const item = document.createElement('span');
      item.className = 'lucky-number';
      item.style.animationDelay = `${index * 70}ms`;
      item.textContent = String(number).padStart(2, '0');
      return item;
    })
  );

  cookieButton.addEventListener('click', () => {
    cookieButton.classList.add('is-open');
    cookieButton.setAttribute('aria-expanded', 'true');
    cookieButton.disabled = true;

    window.setTimeout(() => {
      scroll.hidden = false;
      scroll.classList.add('is-visible');
    }, 520);
  });

  function createLuckyNumbers(amount, max) {
    const values = new Set();

    while (values.size < amount) {
      values.add(Math.floor(Math.random() * max) + 1);
    }

    return [...values].sort((a, b) => a - b);
  }

  function createSakuraFall(reduceMotion) {
    const layer = document.querySelector('.sakura-fall');

    if (!layer || reduceMotion) {
      return;
    }

    const petalCount = window.innerWidth < 720 ? 9 : 15;
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < petalCount; index += 1) {
      const petal = document.createElement('span');
      const size = 15 + Math.round(Math.random() * 15);
      const duration = 13 + Math.random() * 12;
      const drift = Math.round((Math.random() * 120 - 60) * 10) / 10;
      const delay = Math.round(Math.random() * -180) / 10;

      petal.className = 'sakura-petal';
      petal.style.setProperty('--petal-left', `${Math.round(Math.random() * 100)}vw`);
      petal.style.setProperty('--petal-size', `${size}px`);
      petal.style.setProperty('--petal-duration', `${duration.toFixed(1)}s`);
      petal.style.setProperty('--petal-delay', `${delay.toFixed(1)}s`);
      petal.style.setProperty('--petal-drift', `${drift}px`);
      petal.style.setProperty('--petal-rotate', `${Math.round(Math.random() * 180)}deg`);
      petal.style.setProperty('--petal-opacity', `${(0.28 + Math.random() * 0.34).toFixed(2)}`);
      fragment.append(petal);
    }

    layer.append(fragment);
  }
})();
