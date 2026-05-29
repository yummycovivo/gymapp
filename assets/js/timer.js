/**
 * assets/js/timer.js
 * Rest timer logic.
 */

import { formatTimeMMSS } from './utils.js';

export const TIMER_STATE = {
    interval: null,
    seconds: 0
};

/**
 * Updates the timer display element.
 * @param {HTMLElement} displayEl - The DOM element to update.
 */
export function updateTimerDisplay(displayEl) {
    displayEl.textContent = formatTimeMMSS(TIMER_STATE.seconds);
}

/**
 * Starts the countdown timer.
 * @param {number} seconds - The duration to count down from.
 * @param {HTMLElement} cardEl - The timer card wrapper.
 * @param {HTMLElement} displayEl - The timer display text.
 */
export function startTimer(seconds, cardEl, displayEl) {
    cardEl.classList.remove('hidden');
    displayEl.classList.remove('flash');
    TIMER_STATE.seconds = seconds;
    updateTimerDisplay(displayEl);

    if (TIMER_STATE.interval) clearInterval(TIMER_STATE.interval);

    TIMER_STATE.interval = setInterval(() => {
        TIMER_STATE.seconds--;

        if (TIMER_STATE.seconds <= 0) {
            TIMER_STATE.seconds = 0;
            clearInterval(TIMER_STATE.interval);
            displayEl.classList.add('flash');

            // Simple beep sound using base64 audio
            try {
                new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU').play().catch(() => { });
            } catch (e) { }
        }

        updateTimerDisplay(displayEl);
    }, 1000);
}

/**
 * Closes and stops the timer.
 * @param {HTMLElement} cardEl - The timer card wrapper.
 */
export function closeTimer(cardEl) {
    cardEl.classList.add('hidden');
    clearInterval(TIMER_STATE.interval);
}

/**
 * Adds seconds to the active timer.
 * @param {number} seconds - Seconds to add.
 * @param {HTMLElement} displayEl - The timer display text.
 */
export function addTime(seconds, displayEl) {
    TIMER_STATE.seconds += seconds;
    displayEl.classList.remove('flash');
    updateTimerDisplay(displayEl);
}

/**
 * Resets the timer to 0.
 * @param {HTMLElement} displayEl - The timer display text.
 */
export function resetTimer(displayEl) {
    TIMER_STATE.seconds = 0;
    updateTimerDisplay(displayEl);
}
