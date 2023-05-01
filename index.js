import {KEYBOARD_DATA} from './data';

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
  'MetaLeft',
  'MetaRight',
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
    if (keyType !== 'shiftCaps' && keyType !== 'caps') {
      const langContainer = document.createElement('span');
      langContainer.className = keyType;

      const lowerCaseContainer = document.createElement('span');
      const upperCaseContainer = document.createElement('span');
      const capsContainer = document.createElement('span');
      const shiftCapsContainer = document.createElement('span');
      lowerCaseContainer.className = 'lowerCase';
      upperCaseContainer.className = 'upperCase hidden';
      capsContainer.className = 'caps hidden';
      shiftCapsContainer.className = 'shiftCaps hidden';

      if (typeof data.keys[keyType] === 'string') {
        lowerCaseContainer.innerText = data.keys[keyType];
        upperCaseContainer.innerText = data.keys['shiftCaps'];
      } else {
        lowerCaseContainer.innerText = data.keys[keyType]['lowerCase'];
        upperCaseContainer.innerText = data.keys[keyType]['upperCase'];
      }

      capsContainer.innerText = data.keys['caps'] || data.keys[keyType]['upperCase'];
      shiftCapsContainer.innerText = data.keys['shiftCaps'] || data.keys[keyType]['lowerCase'];

      keyType !== currentLang && langContainer.classList.add('hidden');

      langContainer.append(lowerCaseContainer, upperCaseContainer, capsContainer, shiftCapsContainer);
      button.append(langContainer);
    }
  }

  button.addEventListener('mouseup', () => processKeyupEvent(data))
  button.addEventListener('mousedown', event => processKeydownEvent({
    ...data,
    key: event.srcElement.nodeName === 'SPAN'
      ? event.srcElement.innerText
      : [...event.srcElement.childNodes].filter(child => !child.className.includes('hidden'))[0].innerText,
  }));

  return button;
}

function writeText(event) {
  const {beforeSelectedText, afterSelectedText, selectedText} = getTextAreaData();

  if (event.code === 'Backspace') {
    textarea.value = selectedText.length
      ? beforeSelectedText + afterSelectedText
      : beforeSelectedText.substr(0, beforeSelectedText.length - 1) + afterSelectedText;
    textarea.selectionEnd = beforeSelectedText.length - 1;
  } else if (event.code === 'Delete') {
    textarea.value = selectedText.length
      ? beforeSelectedText + afterSelectedText
      : beforeSelectedText + afterSelectedText.substr(1, afterSelectedText.length);
    textarea.selectionEnd = beforeSelectedText.length;
  } else if (!unwritableCodes.includes(event.code)) {
    let key;

    switch (event.key) {
      case 'Tab': {
        key = '   ';
        break;
      }
      case 'Enter': {
        key = '\n';
        break;
      }
      default: {
        key = getKey(event.code) || event.key;
      }
    }

    textarea.value = beforeSelectedText + key + afterSelectedText;
    textarea.selectionEnd = (beforeSelectedText + key).length;
  }
}

function getTextAreaData() {
  const cursorStart = textarea.selectionStart;
  const cursorEnd = textarea.selectionEnd;

  return {
    beforeSelectedText: textarea.value.substr(0, cursorStart),
    afterSelectedText: textarea.value.substr(cursorEnd, textarea.value.length - 1),
    selectedText: cursorStart === cursorEnd ? '' : textarea.value.substr(cursorStart, cursorEnd - 1),
  };
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
  const capsElements = document.getElementsByClassName('caps');
  const shiftCapsCaseElements = document.getElementsByClassName('shiftCaps');

  if (capsActive) {
    [...lowerCaseElements].forEach(element => element.classList.add('hidden'));
    [...upperCaseElements].forEach(element => element.classList.remove('hidden'));
    [...capsElements].forEach(element => element.classList.add('hidden'));
    [...shiftCapsCaseElements].forEach(element => element.classList.add('hidden'));
  } else {
    [...lowerCaseElements].forEach(element => element.classList.remove('hidden'));
    [...upperCaseElements].forEach(element => element.classList.add('hidden'));
    [...capsElements].forEach(element => element.classList.add('hidden'));
    [...shiftCapsCaseElements].forEach(element => element.classList.add('hidden'));
  }
}

function onShiftClick(value) {
  shiftActive = value;

  const lowerCaseElements = document.getElementsByClassName('lowerCase');
  const upperCaseElements = document.getElementsByClassName('upperCase');
  const capsElements = document.getElementsByClassName('caps');
  const shiftCapsCaseElements = document.getElementsByClassName('shiftCaps');

  if (capsActive) {
    if (shiftActive) {
      [...lowerCaseElements].forEach(element => element.classList.add('hidden'));
      [...upperCaseElements].forEach(element => element.classList.add('hidden'));
      [...capsElements].forEach(element => element.classList.add('hidden'));
      [...shiftCapsCaseElements].forEach(element => element.classList.remove('hidden'));
    } else {
      [...lowerCaseElements].forEach(element => element.classList.add('hidden'));
      [...upperCaseElements].forEach(element => element.classList.add('hidden'));
      [...capsElements].forEach(element => element.classList.remove('hidden'));
      [...shiftCapsCaseElements].forEach(element => element.classList.add('hidden'));
    }
  } else {
    if (shiftActive) {
      [...lowerCaseElements].forEach(element => element.classList.add('hidden'));
      [...upperCaseElements].forEach(element => element.classList.remove('hidden'));
      [...capsElements].forEach(element => element.classList.add('hidden'));
      [...shiftCapsCaseElements].forEach(element => element.classList.add('hidden'));
    } else {
      [...lowerCaseElements].forEach(element => element.classList.remove('hidden'));
      [...upperCaseElements].forEach(element => element.classList.add('hidden'));
      [...capsElements].forEach(element => element.classList.add('hidden'));
      [...shiftCapsCaseElements].forEach(element => element.classList.add('hidden'));
    }
  }
}

function getKey(code) {
  const button = document.getElementById(code);

  return button ? [...[...button.childNodes]
      ?.filter(langContainer => langContainer.className.includes(currentLang))[0]
      ?.childNodes]
      ?.filter(valueContainer => !valueContainer.className.includes('hidden'))[0]
      ?.innerText
    : null;
}

function processKeydownEvent(event) {
  event.preventDefault?.();

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

  writeText(event);
}

function processKeyupEvent(event) {
  event.preventDefault?.();

  (event.code === 'ShiftLeft' || event.code === 'ShiftRight') && onShiftClick(false);

  const eventSource = document.getElementById(event.code);
  if (eventSource && event.code !== 'CapsLock') {
    eventSource.classList.remove('active');
  }

  altActive = (event.code === 'AltLeft' || event.code === 'AltRight') ? false : altActive;
  ctrlActive = (event.code === 'ControlLeft' || event.code === 'ControlRight') ? false : ctrlActive;
}

document.addEventListener('keydown', event => processKeydownEvent(event));
document.addEventListener('keyup', event => processKeyupEvent(event));
document.body.append(title, textarea, keyboard, langSwitchInfo);
