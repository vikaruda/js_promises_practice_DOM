'use strict';

const createElementDiv = document.createElement('div');

createElementDiv.setAttribute('data-qa', 'notification');

const firstPromise = new Promise((resolve, reject) => {
  // eslint-disable-next-line no-shadow
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  // eslint-disable-next-line no-shadow
  document.addEventListener('click', function (event) {
    if (event.button === 0 || event.button === 2) {
      resolve('Second promise was resolved never rejected');
    }
  });

  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    resolve('Second promise was resolved never rejected');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false; // Змінна для лівого кліку
  let rightClick = false; // Змінна для правого кліку

  // Лістенер для лівого кліку
  // eslint-disable-next-line no-shadow
  function handleLeftClick(event) {
    if (event.button === 0) {
      leftClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
        removeEventListeners();
      }
    }
  }

  // Лістенер для правого кліку
  // eslint-disable-next-line no-shadow
  function handleRightClick(event) {
    event.preventDefault();

    if (event.button === 2) {
      rightClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
        removeEventListeners();
      }
    }
  }

  function removeEventListeners() {
    document.removeEventListener('click', handleLeftClick);
    document.removeEventListener('contextmenu', handleRightClick);
  }

  // Додаємо слухачі подій
  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

firstPromise
  .then((data) => {
    createElementDiv.textContent = data;
    createElementDiv.classList.add('success');
    document.body.append(createElementDiv);
  })
  .catch((error) => {
    createElementDiv.textContent = error;
    createElementDiv.classList.add('error');
    document.body.append(createElementDiv);
  });

secondPromise.then((data) => {
  createElementDiv.textContent = data;
  createElementDiv.classList.add('success');
  document.body.append(createElementDiv);
});

thirdPromise.then((data) => {
  createElementDiv.textContent = data;
  createElementDiv.classList.add('success');
  document.body.append(createElementDiv);
});
