/**
 * Calculator UI: state, display updates, keypad and keyboard binding.
 * Uses shared calculator module for balanced-equation operations.
 */
import { compute } from '../calculator.js';
const SELECTORS = {
    display: '#display',
    pendingLine: '#pendingLine',
    keypad: '.keypad',
    keyDot: '#keyDot',
    keyC: '#keyC',
    keyBackspace: '#keyBackspace',
    keyAdd: '#keyAdd',
    keySub: '#keySub',
    keyMul: '#keyMul',
    keyDiv: '#keyDiv',
    keyEq: '#keyEq',
};
let displayEl = null;
let pendingLineEl = null;
let displayValue = '0';
let pendingOp = null;
let pendingVal = null;
let freshResult = false;
function getDisplayEl() {
    if (!displayEl)
        displayEl = document.querySelector(SELECTORS.display);
    return displayEl;
}
function getPendingLineEl() {
    if (!pendingLineEl)
        pendingLineEl = document.querySelector(SELECTORS.pendingLine);
    return pendingLineEl;
}
export function updateDisplay() {
    const disp = getDisplayEl();
    const pend = getPendingLineEl();
    if (!disp || !pend)
        return;
    disp.textContent = displayValue;
    if (pendingOp !== null && pendingVal !== null) {
        pend.textContent = `${pendingVal} ${pendingOp}`;
        pend.hidden = false;
    }
    else {
        pend.textContent = '';
        pend.hidden = true;
    }
}
function inputDigit(digit) {
    if (freshResult) {
        displayValue = digit;
        freshResult = false;
    }
    else {
        if (displayValue === '0' && digit !== '.')
            displayValue = digit;
        else
            displayValue += digit;
    }
    updateDisplay();
}
function inputDecimal() {
    if (freshResult) {
        displayValue = '0.';
        freshResult = false;
    }
    else if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}
function clearAll() {
    displayValue = '0';
    pendingOp = null;
    pendingVal = null;
    freshResult = false;
    updateDisplay();
}
function backspace() {
    if (displayValue === 'Error') {
        displayValue = '0';
    }
    else if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    }
    else {
        displayValue = '0';
    }
    updateDisplay();
}
function applyOp(op) {
    if (op === '=') {
        if (pendingOp !== null && pendingVal !== null) {
            const result = compute(pendingOp, pendingVal, displayValue);
            displayValue =
                Number.isNaN(result) || !Number.isFinite(result) ? 'Error' : String(result);
            pendingOp = null;
            pendingVal = null;
        }
        freshResult = true;
    }
    else {
        pendingVal = displayValue;
        pendingOp = op;
        freshResult = true;
    }
    updateDisplay();
}
function bindKeypad() {
    const keypad = document.querySelector(SELECTORS.keypad);
    if (!keypad)
        return;
    keypad.querySelectorAll('.key-num[data-num]').forEach((btn) => {
        btn.addEventListener('click', () => inputDigit(btn.dataset.num ?? ''));
    });
    const byId = (sel) => keypad.querySelector(sel) ?? document.querySelector(sel);
    byId(SELECTORS.keyDot)?.addEventListener('click', inputDecimal);
    byId(SELECTORS.keyC)?.addEventListener('click', clearAll);
    byId(SELECTORS.keyBackspace)?.addEventListener('click', backspace);
    byId(SELECTORS.keyAdd)?.addEventListener('click', () => applyOp('+'));
    byId(SELECTORS.keySub)?.addEventListener('click', () => applyOp('−'));
    byId(SELECTORS.keyMul)?.addEventListener('click', () => applyOp('×'));
    byId(SELECTORS.keyDiv)?.addEventListener('click', () => applyOp('÷'));
    byId(SELECTORS.keyEq)?.addEventListener('click', () => applyOp('='));
}
function bindKeyboard() {
    document.addEventListener('keydown', (e) => {
        const target = e.target;
        if (target.closest('input') || target.closest('textarea'))
            return;
        const key = e.key;
        switch (key) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                inputDigit(key);
                e.preventDefault();
                break;
            case '.':
                inputDecimal();
                e.preventDefault();
                break;
            case '+':
                applyOp('+');
                e.preventDefault();
                break;
            case '-':
            case '−':
                applyOp('−');
                e.preventDefault();
                break;
            case '*':
            case '×':
                applyOp('×');
                e.preventDefault();
                break;
            case '/':
            case '÷':
                applyOp('÷');
                e.preventDefault();
                break;
            case 'Enter':
            case '=':
                applyOp('=');
                e.preventDefault();
                break;
            case 'Backspace':
                backspace();
                e.preventDefault();
                break;
            case 'Escape':
            case 'c':
            case 'C':
                clearAll();
                e.preventDefault();
                break;
            default:
                break;
        }
    });
}
export function init() {
    bindKeypad();
    bindKeyboard();
    updateDisplay();
}
