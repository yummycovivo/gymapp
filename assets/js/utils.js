/**
 * assets/js/utils.js
 * Utility pure functions for formatting and calculations.
 */

/**
 * Escapes HTML characters to prevent XSS.
 * @param {string} str - The string to escape.
 * @returns {string} The escaped string.
 */
export function escapeHtml(str) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return String(str).replace(/[&<>"']/g, m => map[m]);
}

/**
 * Calculates the theoretical One Rep Max (1RM) using the Epley formula.
 * @param {number} weight - The weight lifted.
 * @param {number} reps - The number of repetitions.
 * @returns {string} The estimated 1RM, formatted to 1 decimal place.
 */
export function calculateOneRM(weight, reps) {
    return (weight * (1 + reps / 30)).toFixed(1);
}

/**
 * Formats a duration in seconds to MM:SS.
 * @param {number} totalSeconds - The duration in seconds.
 * @returns {string} Formatted string "MM:SS".
 */
export function formatTimeMMSS(totalSeconds) {
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return `${m}:${s}`;
}

/**
 * Formats a duration in seconds to HH:MM:SS.
 * @param {number} totalSeconds - The duration in seconds.
 * @returns {string} Formatted string "HH:MM:SS".
 */
export function formatTimeHHMMSS(totalSeconds) {
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
}
