const KEYBOARD_DATA = [
  [
    {
      'keys': {
        'rus': '1',
        'eng': '1',
      },
      'keyCode': 49,
      'code': 'Digit1',
    },
    {
      'keys': {
        'rus': '2',
        'eng': '2',
      },
      'keyCode': 50,
      'code': 'Digit2',
    },
    {
      'keys': {
        'rus': 'Backspace',
        'eng': 'Backspace',
      },
      'keyCode': 8,
      'code': 'Backspace',
    },
    {
      'keys': {
        'rus': 'Del',
        'eng': 'Del',
      },
      'keyCode': 46,
      'code': 'Delete',
    },
  ],

  [
    {
      'keys': {
        'rus': 'CapsLock',
        'eng': 'CapsLock',
      },
      'keyCode': 20,
      'code': 'CapsLock',
    },
    {
      'keys': {
        'rus': 'Shift',
        'eng': 'Shift',
      },
      'keyCode': 16,
      'code': 'ShiftLeft',
    },
    {
      'keys': {
        'rus': {
          'lowerCase': 'ф',
          'upperCase': 'Ф',
        },
        'eng': {
          'lowerCase': 'a',
          'upperCase': 'A',
        },
      },
      'keyCode': 65,
      'code': 'KeyA',
    },
    {
      'keys': {
        'rus': {
          'lowerCase': 'ы',
          'upperCase': 'Ы',
        },
        'eng': {
          'lowerCase': 's',
          'upperCase': 'S',
        },
      },
      'keyCode': 83,
      'code': 'KeyS',
    },
  ],
  [
    {
      'keys': {
        'rus': 'Ctrl',
        'eng': 'Ctrl',
      },
      'keyCode': 17,
      'code': 'ControlLeft',
    },
    {
      'keys': {
        'rus': 'Alt',
        'eng': 'Alt',
      },
      'keyCode': 18,
      'code': 'AltLeft',
    },
  ]
];

const RUSSIAN_LANG = 'rus';
const ENGLISH_LANG = 'eng';
let currentLang = localStorage.getItem('lang') || RUSSIAN_LANG;
let capsActive;
let shiftActive;
let altActive;
let ctrlActive;
const unwritableCodes = [
  'CapsLock',
  'ControlLeft',
  'ControlRight',
  'ShiftLeft',
  'ShiftRight',
  'AltLeft',
  'AltRight',
];

const title = document.createElement('span');
title.className = 'title';
title.innerText = 'Virtual Keyboard';

const langSwitchInfo = document.createElement('p');
langSwitchInfo.className = 'info';
langSwitchInfo.innerText = 'Для переключения языка комбинация: левыe ctrl + alt';

const textarea = document.createElement('textarea');
textarea.id = 'keyboardTextarea'
textarea.className = 'textarea';
textarea.rows = 5;
textarea.cols = 50;

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';

KEYBOARD_DATA.forEach(rowItems => {
  const keyboardRow = document.createElement('div');
  keyboardRow.className = 'keyboard__row';

  rowItems.forEach(item => keyboardRow.append(createButton(item)));
  keyboard.append(keyboardRow);
})

function createButton(data) {
  const button = document.createElement('button');
  button.id = data.code;
  button.className = `button ${data.code}`;

  for (let keyType in data.keys) {
    const langContainer = document.createElement('span');
    langContainer.className = keyType;

    const lowerCaseContainer = document.createElement('span');
    const upperCaseContainer = document.createElement('span');
    lowerCaseContainer.className = 'lowerCase';
    upperCaseContainer.className = 'upperCase';

    if (typeof data.keys[keyType] === 'string') {
      lowerCaseContainer.innerText = data.keys[keyType];
      upperCaseContainer.innerText = data.keys[keyType];
    } else {
      lowerCaseContainer.innerText = data.keys[keyType]['lowerCase'];
      upperCaseContainer.innerText = data.keys[keyType]['upperCase'];
    }

    keyType !== currentLang && langContainer.classList.add('hidden');
    upperCaseContainer.classList.add('hidden');

    langContainer.append(lowerCaseContainer, upperCaseContainer);
    button.append(langContainer);
  }

  return button;
}

function backSpaceClick() {
  let text = textarea.value;
  const cursorPosition = textarea.selectionEnd;

  if (cursorPosition) {
    textarea.value = text.substr(0, cursorPosition - 1) + text.substr(cursorPosition, text.length - 1);
    textarea.selectionEnd = cursorPosition - 1;
  }
}

function deleteClick() {
  let text = textarea.value;
  const cursorPosition = textarea.selectionEnd;

  if (cursorPosition !== text.length) {
    textarea.value = text.substr(0, cursorPosition) + text.substr(cursorPosition + 1, text.length);
    textarea.selectionEnd = cursorPosition;
  }
}

function changeLang() {
  currentLang = currentLang === RUSSIAN_LANG ? ENGLISH_LANG : RUSSIAN_LANG;
  localStorage.setItem('lang', currentLang);

  const rusLangElements = document.getElementsByClassName(RUSSIAN_LANG);
  const engLangElements = document.getElementsByClassName(ENGLISH_LANG);

  if (currentLang === RUSSIAN_LANG) {
    [...rusLangElements].forEach(element => element.classList.remove('hidden'));
    [...engLangElements].forEach(element => element.classList.add('hidden'));
  } else {
    [...rusLangElements].forEach(element => element.classList.add('hidden'));
    [...engLangElements].forEach(element => element.classList.remove('hidden'));
  }
}

function onCapsClick() {
  capsActive = !capsActive;
  const lowerCaseElements = document.getElementsByClassName('lowerCase');
  const upperCaseElements = document.getElementsByClassName('upperCase');

  if (capsActive) {
    [...lowerCaseElements].forEach(element => element.classList.add('hidden'));
    [...upperCaseElements].forEach(element => element.classList.remove('hidden'));
  } else {
    [...lowerCaseElements].forEach(element => element.classList.remove('hidden'));
    [...upperCaseElements].forEach(element => element.classList.add('hidden'));
  }
}

function onShiftClick(value) {
  shiftActive = value;

  const lowerCaseElements = document.getElementsByClassName('lowerCase');
  const upperCaseElements = document.getElementsByClassName('upperCase');

  if (capsActive) {
    if (shiftActive) {
      [...lowerCaseElements].forEach(element => element.classList.add('hidden'));
      [...upperCaseElements].forEach(element => element.classList.remove('hidden'));
    } else {
      [...lowerCaseElements].forEach(element => element.classList.remove('hidden'));
      [...upperCaseElements].forEach(element => element.classList.add('hidden'));
    }
  } else {
    if (shiftActive) {
      [...lowerCaseElements].forEach(element => element.classList.remove('hidden'));
      [...upperCaseElements].forEach(element => element.classList.add('hidden'));
    } else {
      [...lowerCaseElements].forEach(element => element.classList.add('hidden'));
      [...upperCaseElements].forEach(element => element.classList.remove('hidden'));
    }
  }
}

document.addEventListener('keydown', event => {
  event.preventDefault();

  const eventSource = document.getElementById(event.code);

  if (eventSource) {
    event.code === 'CapsLock' && capsActive
      ? eventSource.classList.remove('active')
      : eventSource.classList.add('active');
  }

  (event.code === 'ShiftLeft' || event.code === 'ShiftRight') && onShiftClick(true);
  event.code === 'CapsLock' && onCapsClick();

  altActive = event.code === 'AltLeft' || event.code === 'AltRight' || altActive;
  ctrlActive = event.code === 'ControlLeft' || event.code === 'ControlRight' || ctrlActive;
  altActive && ctrlActive && changeLang();

  if (event.code === "Backspace") {
    backSpaceClick();
  } else if (event.code === "Delete") {
    deleteClick();
  } else if (!unwritableCodes.includes(event.code)) {
    textarea.value += event.key;
  }
});

document.addEventListener('keyup', event => {
  event.preventDefault();

  (event.code === 'ShiftLeft' || event.code === 'ShiftRight') && onShiftClick(false);

  const eventSource = document.getElementById(event.code);
  if (eventSource && event.code !== 'CapsLock') {
    eventSource.classList.remove('active');
  }

  altActive = (event.code === 'AltLeft' || event.code === 'AltRight') ? false : altActive;
  ctrlActive = (event.code === 'ControlLeft' || event.code === 'ControlRight') ? false : ctrlActive;
});

document.body.append(title, textarea, keyboard, langSwitchInfo);
