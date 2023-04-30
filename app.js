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

document.body.append(title, textarea, keyboard, langSwitchInfo);
