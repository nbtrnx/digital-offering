'use strict';

let totalAmountOffered = 0;

updateDisplay(totalAmountOffered);

// coins
const coins = Array.from(document.getElementsByClassName('coin'));
for (const coin of coins) {
  coin.addEventListener(
    'click',
    (e) => {
      offerCoin(e.currentTarget);
    },
    { once: true }
  );
}

function offerCoin(coin) {
  const yen = coinToYen(coin);
  addTotalAmountOffered(yen);
  moveCoin(coin);
}

function coinToYen(coin) {
  let yen;
  const id = coin.id;
  if (id == 'coin5') {
    yen = 5;
  } else if (id == 'coin10') {
    yen = 10;
  } else if (id == 'coin100') {
    yen = 100;
  }
  return yen;
}

function addTotalAmountOffered(value) {
  setTotalAmountOffered(totalAmountOffered + value);
}

function setTotalAmountOffered(newValue) {
  totalAmountOffered = newValue;
  onTotalAmountOfferedChange(totalAmountOffered);
}

function onTotalAmountOfferedChange(value) {
  updateDisplay(value);
  updateColor(value);
  updateMessage(value);
}

function updateDisplay(value) {
  const displayTotalAmountOffered = document.getElementById('display-totalAmountOffered');
  displayTotalAmountOffered.textContent = value;
}

function updateColor(value) {
  if (value == 5 || value == 15) {
    const colorCombination = 'var(--color-combination)';
    prayButton.style.backgroundColor = colorCombination;
    modal.style.backgroundColor = colorCombination;
    prayButton.classList.add('pop');
    prayButton.addEventListener(
      'animationend',
      () => {
        prayButton.classList.remove('pop');
      },
      { once: true }
    );
  } else if (value == 115) {
    const colorCombinationSpecial = 'var(--color-combination-special)';
    prayButton.style.backgroundColor = colorCombinationSpecial;
    modal.style.backgroundColor = colorCombinationSpecial;
    prayButton.classList.add('pop');
    prayButton.addEventListener(
      'animationend',
      () => {
        prayButton.classList.remove('pop');
      },
      { once: true }
    );
  }
}

function updateMessage(value) {
  const modalMessage = document.getElementById('modal-message');
  if (value == 5) {
    modalMessage.textContent = '”ご縁” がありますように！';
  } else if (value == 15) {
    modalMessage.textContent = '”十分ご縁” がありますように！';
  } else if (value == 115) {
    modalMessage.textContent = '”いいご縁” がありますように！';
  }
}

// moveCoin
function moveCoin(coin) {
  const { offsetX, offsetY } = calculateOffset(coin);
  translateCoin(coin, offsetX, offsetY);
}

function calculateOffset(coin) {
  const boxTop = document.getElementById('box-top');
  const boxTopInfo = boxTop.getBoundingClientRect();
  const boxTopCenterX = boxTopInfo.left + boxTopInfo.width / 2;
  const boxTopCenterY = boxTopInfo.top + boxTopInfo.height / 2;

  const coinInfo = coin.getBoundingClientRect();
  const coinCenterX = coinInfo.left + coinInfo.width / 2;
  const coinCenterY = coinInfo.top + coinInfo.height / 2;

  return {
    offsetX: coinCenterX - boxTopCenterX,
    offsetY: coinCenterY - boxTopCenterY
  };
}

function translateCoin(coin, offsetX, offsetY) {
  const id = coin.id;
  if (id == 'coin5') {
    coin.style.setProperty('--translateX', `${-offsetX - 10}px`);
  } else if (id == 'coin10') {
    coin.style.setProperty('--translateX', `${-offsetX}px`);
  } else if (id == 'coin100') {
    coin.style.setProperty('--translateX', `${-offsetX + 10}px`);
  }
  coin.style.setProperty('--translateY', `${-offsetY}px`);
}

// prayButton => openModal
const prayButton = document.getElementById('prayButton');
prayButton.addEventListener('click', pray);

const modal = document.getElementById('modal');
function pray() {
  openModal();
  setTimeout(closeModal, 2000);
}
function openModal() {
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add('open'));
}
function closeModal() {
  modal.classList.remove('open');
  modal.addEventListener('transitionend', () => (modal.hidden = true), { once: true });
}
