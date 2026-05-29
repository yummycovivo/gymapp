/**
 * assets/js/state.js
 * Global state management and LocalStorage synchronization.
 */

export const STATE = {
    wgerExercises: [],
    history: [],
    templates: [],
    activeWorkout: null,
    workoutInterval: null
};

const API_HISTORY = 'api/history.php';
const API_TEMPLATES = 'api/templates.php';

/**
 * Loads workout history and templates from MySQL via API.
 */
export async function loadHistory() {
    try {
        const [histRes, tplRes] = await Promise.all([
            fetch(API_HISTORY),
            fetch(API_TEMPLATES)
        ]);
        
        const histData = await histRes.json();
        const tplData = await tplRes.json();
        
        STATE.history = histData.success ? histData.data : [];
        let rawTemplates = tplData.success ? tplData.data : [];
        
        // Backward compatibility: convert string exercises to objects
        STATE.templates = rawTemplates.map(tpl => ({
            ...tpl,
            exercises: (tpl.exercises || []).map(ex => {
                if (typeof ex === 'string') {
                    return { name: ex, targetSets: '', targetReps: '', restTime: '' };
                }
                return ex;
            })
        }));
        
        // Setup initial default templates if completely empty
        if (STATE.templates.length === 0) {
            STATE.templates = [
                { id: Date.now() + 1, name: 'Chest Day', exercises: [
                    { name: 'Bench Press', targetSets: 4, targetReps: 8, restTime: 120 },
                    { name: 'Incline Dumbbell Press', targetSets: 3, targetReps: 10, restTime: 90 },
                    { name: 'Cable Crossover', targetSets: 3, targetReps: 15, restTime: 60 }
                ]},
                { id: Date.now() + 2, name: 'Leg Day', exercises: [
                    { name: 'Squat', targetSets: 4, targetReps: 8, restTime: 120 },
                    { name: 'Leg Press', targetSets: 3, targetReps: 10, restTime: 90 },
                    { name: 'Calf Raises', targetSets: 4, targetReps: 15, restTime: 60 }
                ]},
                { id: Date.now() + 3, name: 'Back & Biceps', exercises: [
                    { name: 'Pull-ups', targetSets: 3, targetReps: 8, restTime: 120 },
                    { name: 'Barbell Row', targetSets: 4, targetReps: 8, restTime: 90 },
                    { name: 'Bicep Curls', targetSets: 3, targetReps: 12, restTime: 60 }
                ]}
            ];
            await saveTemplates();
        }
    } catch (e) {
        console.error("Error loading data:", e);
    }
}

/**
 * Saves a new workout to MySQL history.
 * Note: Local STATE is updated immediately, DB in background.
 */
export async function saveHistoryWorkout(workoutObj) {
    try {
        await fetch(`${API_HISTORY}?action=add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(workoutObj)
        });
    } catch (e) {
        console.error("Failed to save workout:", e);
    }
}

/**
 * Deletes a workout from MySQL history.
 */
export async function deleteHistoryWorkout(id) {
    try {
        await fetch(`${API_HISTORY}?action=delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
    } catch (e) {
        console.error("Failed to delete workout:", e);
    }
}

/**
 * Saves all gym templates to MySQL.
 */
export async function saveTemplates() {
    try {
        await fetch(`${API_TEMPLATES}?action=save_all`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(STATE.templates)
        });
    } catch (e) {
        console.error("Failed to save templates:", e);
    }
}

/**
 * Initializes a new workout.
 * @param {string} name - The name of the workout.
 */
export function createNewWorkout(name, templateExercises = []) {
    STATE.activeWorkout = {
        id: Date.now(),
        name: name || 'Allenamento senza nome',
        startTime: Date.now(),
        exercises: templateExercises.map(exObj => {
            const exName = typeof exObj === 'string' ? exObj : exObj.name;
            return {
                id: Date.now() + Math.random(),
                name: exName,
                targetSets: exObj.targetSets || '',
                targetReps: exObj.targetReps || '',
                restTime: exObj.restTime || '',
                sets: []
            };
        })
    };
}

/**
 * Finalizes the active workout and saves it to history.
 */
export function finalizeWorkout() {
    if (!STATE.activeWorkout) return false;
    
    // Se non ci sono esercizi, scartiamo l'allenamento senza salvarlo
    if (STATE.activeWorkout.exercises.length === 0) {
        STATE.activeWorkout = null;
        return false;
    }
    
    STATE.activeWorkout.endTime = Date.now();
    STATE.history.unshift(STATE.activeWorkout);
    
    // Scrive sul database in modo asincrono
    saveHistoryWorkout(STATE.activeWorkout);
    
    STATE.activeWorkout = null;
    return true;
}

/**
 * Adds an exercise to the active workout.
 * @param {string} exName - The name of the exercise.
 */
export function addExerciseToActiveWorkout(exName) {
    if (!STATE.activeWorkout) return;
    STATE.activeWorkout.exercises.push({
        id: Date.now(),
        name: exName,
        sets: []
    });
}
