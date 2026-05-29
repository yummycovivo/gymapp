/**
 * assets/js/main.js
 * Entry point. Glues all modules together and sets up events.
 */

import { STATE, loadHistory, saveTemplates, createNewWorkout, finalizeWorkout, addExerciseToActiveWorkout } from './state.js';
import { fetchWgerExercises } from './api.js';
import { DOM, initDOM, populateExercisesDatalist, renderActiveExercises, renderHistory, switchView, renderTemplatesView, renderWorkoutStartOptions, renderStatsView } from './ui.js';
import { startTimer, closeTimer, addTime, resetTimer } from './timer.js';
import { formatTimeHHMMSS } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    initDOM();
    await loadHistory();
    setupNavigation();
    setupWorkoutControls();
    setupTimerEvents();
    setupTemplateEvents();
    renderHistory();
    renderTemplatesView();
    renderWorkoutStartOptions();
    renderStatsView();
    
    // Fetch and populate WGER Exercises
    await fetchWgerExercises();
    populateExercisesDatalist();
});

function setupNavigation() {
    DOM.navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchView(btn.getAttribute('data-target'));
        });
    });
}

function setupWorkoutControls() {
    DOM.btnStart.addEventListener('click', () => {
        createNewWorkout(DOM.inputWorkoutName.value.trim());
        DOM.workoutNameDisplay.textContent = STATE.activeWorkout.name;
        DOM.panelNew.classList.add('hidden');
        DOM.panelActive.classList.remove('hidden');
        DOM.inputWorkoutName.value = '';

        renderActiveExercises();

        // Start live workout duration clock
        if (STATE.workoutInterval) clearInterval(STATE.workoutInterval);
        STATE.workoutInterval = setInterval(updateWorkoutDurationDisplay, 1000);
        updateWorkoutDurationDisplay();
    });

    DOM.btnEnd.addEventListener('click', () => {
        if (!confirm('Terminare questo allenamento e salvarlo nello storico?')) return;

        const saved = finalizeWorkout();
        if (!saved) {
            alert('Allenamento vuoto o senza esercizi: scartato e non salvato nello storico.');
        }
        clearInterval(STATE.workoutInterval);

        DOM.panelActive.classList.add('hidden');
        DOM.panelNew.classList.remove('hidden');
        DOM.containerEx.innerHTML = '';

        if (saved) {
            renderHistory();
            renderStatsView();
        }
        closeTimer(DOM.timerCard);
    });

    DOM.btnAddEx.addEventListener('click', () => {
        const exName = DOM.inputSearchEx.value.trim();
        if (!exName) return alert('Inserisci un nome esercizio.');

        addExerciseToActiveWorkout(exName);
        DOM.inputSearchEx.value = '';
        renderActiveExercises();
    });

    // Start workout from Template
    DOM.startTemplatesList.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-start-template');
        if (!btn) return;
        
        const tplIdx = btn.getAttribute('data-index');
        const tpl = STATE.templates[tplIdx];
        
        createNewWorkout(tpl.name, tpl.exercises);
        DOM.workoutNameDisplay.textContent = STATE.activeWorkout.name;
        DOM.panelNew.classList.add('hidden');
        DOM.panelActive.classList.remove('hidden');
        
        renderActiveExercises();
        
        if (STATE.workoutInterval) clearInterval(STATE.workoutInterval);
        STATE.workoutInterval = setInterval(updateWorkoutDurationDisplay, 1000);
        updateWorkoutDurationDisplay();
    });
}

function updateWorkoutDurationDisplay() {
    if (!STATE.activeWorkout) return;
    const totalSeconds = Math.floor((Date.now() - STATE.activeWorkout.startTime) / 1000);
    DOM.workoutDuration.textContent = formatTimeHHMMSS(totalSeconds);
}

function setupTimerEvents() {
    DOM.btnCloseTimer.addEventListener('click', () => closeTimer(DOM.timerCard));
    DOM.btnTimerReset.addEventListener('click', () => resetTimer(DOM.timerDisplay));
    DOM.btnTimerAdd30.addEventListener('click', () => addTime(30, DOM.timerDisplay));

    DOM.btnPresets.forEach(btn => {
        btn.addEventListener('click', () => {
            const seconds = parseInt(btn.getAttribute('data-time'));
            startTimer(seconds, DOM.timerCard, DOM.timerDisplay);
        });
    });
}

function setupTemplateEvents() {
    // Create new template
    DOM.btnCreateTemplate.addEventListener('click', () => {
        const name = DOM.templateNameInput.value.trim();
        if (!name) return alert('Inserisci un nome per la scheda.');
        
        STATE.templates.push({ id: Date.now(), name: name, exercises: [] });
        saveTemplates();
        DOM.templateNameInput.value = '';
        renderTemplatesView();
        renderWorkoutStartOptions();
    });

    // Handle dynamic template actions (add/remove exercise, remove template)
    DOM.templatesListContainer.addEventListener('click', (e) => {
        // Delete Template
        if (e.target.classList.contains('btn-del-template')) {
            if (!confirm('Eliminare questa scheda?')) return;
            const idx = e.target.getAttribute('data-index');
            STATE.templates.splice(idx, 1);
            saveTemplates();
            renderTemplatesView();
            renderWorkoutStartOptions();
            return;
        }

        // Add Exercise to Template
        if (e.target.classList.contains('btn-add-tpl-ex')) {
            const idx = e.target.getAttribute('data-index');
            const input = document.querySelector(`.tpl-ex-input[data-index="${idx}"]`);
            const setsIn = document.querySelector(`.tpl-sets-input[data-index="${idx}"]`);
            const repsIn = document.querySelector(`.tpl-reps-input[data-index="${idx}"]`);
            const restIn = document.querySelector(`.tpl-rest-input[data-index="${idx}"]`);
            
            const exName = input.value.trim();
            if (!exName) return;
            
            STATE.templates[idx].exercises.push({
                name: exName,
                targetSets: setsIn ? setsIn.value.trim() : '',
                targetReps: repsIn ? repsIn.value.trim() : '',
                restTime: restIn ? restIn.value.trim() : ''
            });
            saveTemplates();
            
            input.value = '';
            if(setsIn) setsIn.value = '';
            if(repsIn) repsIn.value = '';
            if(restIn) restIn.value = '';
            
            renderTemplatesView();
            renderWorkoutStartOptions();
            return;
        }

        // Remove Exercise from Template
        if (e.target.classList.contains('btn-del-template-ex')) {
            if (!confirm('Rimuovere questo esercizio dalla scheda?')) return;
            const tIdx = e.target.getAttribute('data-tindex');
            const eIdx = e.target.getAttribute('data-eindex');
            STATE.templates[tIdx].exercises.splice(eIdx, 1);
            saveTemplates();
            renderTemplatesView();
            renderWorkoutStartOptions();
            return;
        }
    });
}
