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

document.body.append(title, textarea, keyboard, langSwitchInfo);
