/**
 * assets/js/ui.js
 * DOM elements cache and rendering logic.
 */

import { STATE, deleteHistoryWorkout } from './state.js';
import { escapeHtml, calculateOneRM } from './utils.js';
import { startTimer } from './timer.js';

export const DOM = {};

/**
 * Caches DOM elements for quick access.
 */
export function initDOM() {
    Object.assign(DOM, {
        navBtns: document.querySelectorAll('.nav-btn'),
        views: document.querySelectorAll('.view'),
        btnStart: document.getElementById('btn-start-workout'),
        btnEnd: document.getElementById('btn-end-workout'),
        inputWorkoutName: document.getElementById('workout-name'),
        panelNew: document.getElementById('new-workout-panel'),
        panelActive: document.getElementById('active-workout-panel'),
        workoutNameDisplay: document.getElementById('display-workout-name'),
        workoutDuration: document.getElementById('workout-duration'),
        workoutTotalVolume: document.getElementById('workout-total-volume'),
        inputSearchEx: document.getElementById('exercise-search'),
        datalistEx: document.getElementById('wger-exercises'),
        btnAddEx: document.getElementById('btn-add-exercise'),
        containerEx: document.getElementById('exercises-container'),
        historyList: document.getElementById('history-list'),
        
        // Stats Elements
        statsContainer: document.getElementById('stats-container'),

        // Templates Elements
        startTemplatesList: document.getElementById('start-templates-list'),
        templateNameInput: document.getElementById('template-name'),
        btnCreateTemplate: document.getElementById('btn-create-template'),
        templatesListContainer: document.getElementById('templates-list-container'),

        // Timer Elements
        timerCard: document.getElementById('floating-timer'),
        timerDisplay: document.getElementById('timer-display'),
        btnCloseTimer: document.getElementById('btn-close-timer'),
        btnTimerAdd30: document.getElementById('btn-timer-add30'),
        btnTimerReset: document.getElementById('btn-timer-reset'),
        btnPresets: document.querySelectorAll('.btn-preset'),

        // Templates
        tplExercise: document.getElementById('tpl-exercise')
    });
}

/**
 * Populates the exercises datalist dropdown.
 */
export function populateExercisesDatalist() {
    DOM.datalistEx.innerHTML = STATE.wgerExercises
        .map(name => `<option value="${escapeHtml(name)}">`)
        .join('');
}

/**
 * Renders the active workout exercises dynamically.
 */
export function renderActiveExercises() {
    DOM.containerEx.innerHTML = '';
    let totalVolume = 0;

    STATE.activeWorkout.exercises.forEach((ex, exIndex) => {
        const clone = DOM.tplExercise.content.cloneNode(true);
        const card = clone.querySelector('.exercise-card');

        card.querySelector('.ex-name').textContent = ex.name;
        
        const targetLabel = card.querySelector('.ex-target');
        if (targetLabel) {
            const trg = [];
            if(ex.targetSets) trg.push(`${ex.targetSets} set`);
            if(ex.targetReps) trg.push(`${ex.targetReps} reps`);
            if(ex.restTime) trg.push(`${ex.restTime}s rec`);
            targetLabel.textContent = trg.length > 0 ? `Obiettivo: ${trg.join(' | ')}` : '';
        }

        // Remove Exercise
        card.querySelector('.btn-remove-ex').addEventListener('click', () => {
            if (confirm('Rimuovere esercizio?')) {
                STATE.activeWorkout.exercises.splice(exIndex, 1);
                renderActiveExercises();
            }
        });

        // Render Sets
        const setsContainer = card.querySelector('.ex-sets');
        ex.sets.forEach((set, setIndex) => {
            const row = document.createElement('div');
            row.className = 'set-row';
            const oneRM = calculateOneRM(set.weight, set.reps);

            totalVolume += (set.weight * set.reps);

            row.innerHTML = `
                <span class="set-num">${setIndex + 1}</span>
                <div class="set-data">
                    <span>${set.weight} kg</span>
                    <span>x ${set.reps} reps</span>
                    <span class="set-1rm" title="Massimale Stimato (1RM)">~${oneRM} kg 1RM</span>
                </div>
                <button class="btn-del-set" data-ex="${exIndex}" data-set="${setIndex}">&times;</button>
            `;
            setsContainer.appendChild(row);
        });

        // Setup Delete Set Buttons
        setsContainer.querySelectorAll('.btn-del-set').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ei = e.target.getAttribute('data-ex');
                const si = e.target.getAttribute('data-set');
                STATE.activeWorkout.exercises[ei].sets.splice(si, 1);
                renderActiveExercises();
            });
        });

        // Setup Add Set Button
        const btnAddSet = card.querySelector('.btn-add-set');
        const inputW = card.querySelector('.input-set-weight');
        const inputR = card.querySelector('.input-set-reps');

        // Autofill previous set data
        if (ex.sets.length > 0) {
            const last = ex.sets[ex.sets.length - 1];
            inputW.value = last.weight;
            inputR.value = last.reps;
        }

        btnAddSet.addEventListener('click', () => {
            const w = parseFloat(inputW.value);
            const r = parseInt(inputR.value);
            if (isNaN(w) || isNaN(r) || r <= 0) return alert('Inserisci Peso e Ripetizioni validi.');

            STATE.activeWorkout.exercises[exIndex].sets.push({ weight: w, reps: r });
            
            if (ex.restTime && parseInt(ex.restTime) > 0) {
                startTimer(parseInt(ex.restTime), document.getElementById('floating-timer'), document.getElementById('timer-display'));
            }
            
            renderActiveExercises();
        });

        DOM.containerEx.appendChild(clone);
    });

    // Update Total Volume UI
    if (DOM.workoutTotalVolume) {
        DOM.workoutTotalVolume.textContent = `${totalVolume.toFixed(1)} kg`;
    }
}

/**
 * Renders the workout history view.
 */
export function renderHistory() {
    if (STATE.history.length === 0) {
        DOM.historyList.innerHTML = '<p style="color: var(--text-muted)">Nessun allenamento nello storico.</p>';
        return;
    }

    DOM.historyList.innerHTML = STATE.history.map((w, idx) => {
        const date = new Date(w.startTime).toLocaleString('it-IT');
        let totalSets = 0;
        let totalVolume = 0;

        w.exercises.forEach(ex => {
            totalSets += ex.sets.length;
            ex.sets.forEach(s => { totalVolume += (s.weight * s.reps); });
        });

        return `
            <div class="history-item">
                <div style="display:flex; justify-content:space-between;">
                    <div class="history-title">${escapeHtml(w.name)}</div>
                    <button class="btn-danger btn-small btn-del-history" data-index="${idx}">Elimina</button>
                </div>
                <div class="history-meta">
                    ${date} &bull; ${w.exercises.length} Esercizi &bull; ${totalSets} Serie totali &bull; Volume: ${totalVolume} kg
                </div>
            </div>
        `;
    }).join('');

    // Attach History Delete Events
    DOM.historyList.querySelectorAll('.btn-del-history').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (confirm('Eliminare allenamento dallo storico?')) {
                const idx = e.target.getAttribute('data-index');
                const workoutId = STATE.history[idx].id;
                STATE.history.splice(idx, 1);
                deleteHistoryWorkout(workoutId); // Async call to MySQL
                renderHistory();
                renderStatsView(); // Update stats
            }
        });
    });
}

/**
 * Renders the Statistics View.
 */
export function renderStatsView() {
    if (!DOM.statsContainer) return;
    
    if (STATE.history.length === 0) {
        DOM.statsContainer.innerHTML = '<p style="color: var(--text-muted)">Completa almeno un allenamento per vedere le tue statistiche.</p>';
        return;
    }
    
    let totalWorkouts = STATE.history.length;
    let totalVolume = 0;
    let exCounts = {};
    
    STATE.history.forEach(w => {
        w.exercises.forEach(ex => {
            // Count exercise frequency
            exCounts[ex.name] = (exCounts[ex.name] || 0) + 1;
            
            // Calculate volume
            ex.sets.forEach(s => {
                totalVolume += (s.weight * s.reps);
            });
        });
    });
    
    // Sort top 3 exercises
    let topExercises = Object.entries(exCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
        
    let topExHtml = topExercises.map(e => `
        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
            <span>${escapeHtml(e[0])}</span>
            <span style="color:var(--primary); font-weight:bold;">${e[1]} volte</span>
        </div>
    `).join('');

    DOM.statsContainer.innerHTML = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:20px;">
            <div class="glass-card" style="text-align:center;">
                <div style="font-size:3rem; font-weight:800; color:var(--primary);">${totalWorkouts}</div>
                <div style="color:var(--text-muted); font-size:0.9rem;">Allenamenti Totali</div>
            </div>
            <div class="glass-card" style="text-align:center;">
                <div style="font-size:2rem; font-weight:800; color:var(--success); margin-top:10px;">${(totalVolume / 1000).toFixed(1)}t</div>
                <div style="color:var(--text-muted); font-size:0.9rem;">Volume Totale (Tonnellate)</div>
            </div>
        </div>
        
        <div class="glass-card">
            <h3 style="color:var(--secondary);">Top 3 Esercizi Preferiti</h3>
            ${topExHtml || '<p style="color:var(--text-muted);">Nessun esercizio registrato.</p>'}
        </div>
    `;
}

/**
 * Renders the Templates / Gym Days View
 */
export function renderTemplatesView() {
    if (STATE.templates.length === 0) {
        DOM.templatesListContainer.innerHTML = '<p style="color: var(--text-muted)">Nessuna scheda creata.</p>';
        return;
    }

    DOM.templatesListContainer.innerHTML = STATE.templates.map((tpl, idx) => `
        <div class="glass-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <h3 style="margin:0; color:var(--primary)">${escapeHtml(tpl.name)}</h3>
                <button class="btn-danger btn-small btn-del-template" data-index="${idx}">Elimina</button>
            </div>
            <div id="tpl-ex-list-${idx}" style="margin-bottom:15px; padding-left:15px;">
                ${tpl.exercises.length > 0
            ? tpl.exercises.map((e, eidx) => {
                const trg = [];
                if(e.targetSets) trg.push(`${e.targetSets} set`);
                if(e.targetReps) trg.push(`${e.targetReps} reps`);
                if(e.restTime) trg.push(`${e.restTime}s rec`);
                const trgStr = trg.length > 0 ? ` <span style="color:var(--text-muted);font-size:0.85rem;">(${trg.join(' | ')})</span>` : '';
                return `<div style="display:flex; justify-content:space-between; align-items:center; padding: 5px 0; border-bottom: 1px solid var(--card-border);">
                    <div>&bull; ${escapeHtml(e.name)}${trgStr}</div>
                    <button class="btn-del-template-ex btn-danger btn-small" data-tindex="${idx}" data-eindex="${eidx}" style="padding: 2px 8px; font-size: 0.8rem;">Rimuovi</button>
                </div>`;
            }).join('')
            : '<div style="color:var(--text-muted);font-size:0.9rem;">Nessun esercizio</div>'
        }
            </div>
            
            <div class="form-row" style="flex-direction:column; gap:5px;">
                <input type="text" class="input-modern tpl-ex-input" style="margin-bottom:5px;" data-index="${idx}" list="wger-exercises" placeholder="Cerca esercizio da aggiungere...">
                <div style="display:flex; gap:10px; width:100%;">
                    <input type="number" class="input-modern tpl-sets-input" style="margin-bottom:0;" data-index="${idx}" placeholder="Set" min="1">
                    <input type="number" class="input-modern tpl-reps-input" style="margin-bottom:0;" data-index="${idx}" placeholder="Reps" min="1">
                    <input type="number" class="input-modern tpl-rest-input" style="margin-bottom:0;" data-index="${idx}" placeholder="Rec (s)" min="0" step="10">
                </div>
                <button class="btn-secondary btn-small btn-add-tpl-ex mt-2" data-index="${idx}" style="width:100%;">Aggiungi alla Scheda</button>
            </div>
        </div>
    `).join('');
}

/**
 * Renders the start options in the New Workout Panel.
 */
export function renderWorkoutStartOptions() {
    if (STATE.templates.length === 0) {
        DOM.startTemplatesList.innerHTML = '<div style="color:var(--text-muted); font-size:0.9rem;">Nessuna scheda salvata. Vai in "Schede" per crearne una.</div>';
        return;
    }

    DOM.startTemplatesList.innerHTML = STATE.templates.map((tpl, idx) => `
        <button class="btn-secondary btn-start-template" data-index="${idx}" style="text-align:left; padding:15px; font-size:1.1rem; display:flex; justify-content:space-between;">
            <span>${escapeHtml(tpl.name)}</span>
            <span style="font-size:0.9rem; opacity:0.8;">${tpl.exercises.length} esercizi</span>
        </button>
    `).join('');
}

/**
 * Switches between views (Allenamento / Storico).
 * @param {string} targetId - The id of the view to activate.
 */
export function switchView(targetId) {
    DOM.navBtns.forEach(b => b.classList.remove('active'));
    document.querySelector(`.nav-btn[data-target="${targetId}"]`).classList.add('active');

    DOM.views.forEach(v => {
        v.classList.add('hidden');
        v.classList.remove('active');
    });
    
    const targetView = document.getElementById(targetId);
    targetView.classList.remove('hidden');
    targetView.classList.add('active');
}
