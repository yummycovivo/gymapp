/**
 * assets/js/api.js
 * External API integration logic.
 */

import { STATE } from './state.js';

const LOCAL_API_URL = 'api/exercises.php';

/**
 * Fetches the exercises list from the WGER API.
 * Updates the global STATE with the exercise names.
 */
export async function fetchWgerExercises() {
    try {
        const res = await fetch(LOCAL_API_URL);
        const data = await res.json();
        
        if (data.success) {
            STATE.wgerExercises = data.data;
        }
        
    } catch (error) {
        console.error('Failed to load local exercises:', error);
    }
}
