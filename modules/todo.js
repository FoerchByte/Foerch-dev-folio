/**
 * @file modules/todo.js
 * @description
 * EN: Core logic for the To-Do List (Case Study).
 * Demonstrates DOM manipulation, localStorage state management,
 * and advanced drag-and-drop (mouse + touch) for reordering.
 * PL: Kluczowa logika dla Listy Zadań (Case Study).
 * Demonstruje manipulację DOM, zarządzanie stanem w localStorage
 * oraz zaawansowane "przeciągnij i upuść" (mysz + dotyk) do zmiany kolejności.
 */

let todoT, showTodoConfirmationModal, playSound;
let todos = [];
let currentFilter = 'all';
let draggedItem = null;

// EN: Variables for touch gesture handling (long press for edit, drag for move).
// PL: Zmienne do obsługi gestów dotykowych (długie przytrzymanie = edycja, przeciągnięcie = ruch).
let longPressTimer = null;
let isDragging = false;
let startY = 0;
let initialScroll = 0;

let todoList, todoForm, todoInput, todoFooter, todoCounter, clearCompletedBtn, todoFilters;

/**
 * @description EN: Saves the current 'todos' array to localStorage.
 * PL: Zapisuje aktualną tablicę 'todos' do localStorage.
 */
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * @description EN: Renders the filtered list of todos to the DOM.
 * PL: Renderuje przefiltrowaną listę zadań do DOM.
 */
function renderTodos() {
    const scrollTop = todoList.scrollTop; // EN: Preserve scroll position
    todoList.innerHTML = '';
    const filteredTodos = getFilteredTodos();
    filteredTodos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });
    updateFooter();
    todoList.scrollTop = scrollTop; // EN: Restore scroll position
}

/**
 * @description EN: Creates an HTML list item element for a single todo object.
 * PL: Tworzy element listy HTML (li) dla pojedynczego obiektu zadania.
 */
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-app__item ${todo.completed ? 'todo-app__item--completed' : ''}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
        <div class="todo-app__view">
            <div class="todo-app__drag-handle" aria-label="Przeciągnij by zmienić kolejność">⠿</div>
            <span class="todo-app__text">${todo.text}</span>
            <button class="todo-app__delete-btn">×</button>
        </div>
        <input type="text" class="todo-app__edit-input" value="${todo.text}">
    `;
    return li;
}

/**
 * @description EN: Updates the footer (task counter, filter states, clear button visibility).
 * PL: Aktualizuje stopkę (licznik zadań, stany filtrów, widoczność przycisku "Wyczyść").
 */
function updateFooter() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    const completedCount = todos.length - activeCount;

    todoCounter.textContent = todoT('todoCounter', activeCount);
    todoFooter.style.display = todos.length > 0 ? 'flex' : 'none';
    clearCompletedBtn.style.display = completedCount > 0 ? 'block' : 'none';

    document.querySelectorAll('.todo-app__filter-btn').forEach(btn => {
        btn.classList.toggle('todo-app__filter-btn--active', btn.dataset.filter === currentFilter);
    });
}

/**
 * @description EN: Returns the todo list based on the current active filter.
 * PL: Zwraca listę zadań na podstawie aktywnego filtra.
 */
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active': return todos.filter(todo => !todo.completed);
        case 'completed': return todos.filter(todo => !todo.completed);
        default: return todos;
    }
}

/**
 * @description EN: Adds a new todo to the list.
 * PL: Dodaje nowe zadanie do listy.
 */
function addTodo(text) {
    const newTodo = { id: Date.now(), text: text, completed: false };
    todos.push(newTodo);
    saveTodos();

    if (currentFilter === 'all' || currentFilter === 'active') {
        const todoElement = createTodoElement(newTodo);
        todoList.appendChild(todoElement);
    }
    updateFooter();
}

/**
 * @description EN: Toggles the completion state of a todo.
 * PL: Przełącza stan ukończenia zadania.
 */
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        if (todo.completed) {
            playSound('complete');
        }
        todos.sort((a, b) => a.completed - b.completed); // EN: Completed tasks go to the bottom
        saveTodos();
        renderTodos();
    }
}

/**
 * @description EN: Deletes a todo from the list.
 * PL: Usuwa zadanie z listy.
 */
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    
    const todoElement = todoList.querySelector(`[data-id='${id}']`);
    if (todoElement) {
        todoElement.remove();
    }
    updateFooter();
}

/**
 * @description EN: Clears all completed todos after confirmation.
 * PL: Usuwa wszystkie ukończone zadania po potwierdzeniu.
 */
function clearCompleted() {
    const completedCount = todos.filter(todo => todo.completed).length;
    if (completedCount === 0) return;

    showTodoConfirmationModal(todoT('todoConfirmClear', completedCount), () => {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        renderTodos();
    });
}

/**
 * @description EN: Enters editing mode for a specific todo item.
 * PL: Włącza tryb edycji dla konkretnego zadania.
 */
function startEditing(li) {
    if(isDragging) return; // EN: Prevent editing while dragging
    li.classList.add('todo-app__item--editing');
    const input = li.querySelector('.todo-app__edit-input');
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
}

/**
 * @description EN: Finishes editing mode, saves changes, or deletes if empty.
 * PL: Kończy tryb edycji, zapisuje zmiany lub usuwa zadanie (jeśli puste).
 */
function finishEditing(li, newText) {
    const id = parseInt(li.dataset.id, 10);
    const todo = todos.find(t => t.id === id);

    if (todo) {
        if (newText) {
            todo.text = newText;
            li.querySelector('.todo-app__text').textContent = newText;
        } else {
            deleteTodo(id); // EN: Delete if text is empty
            return;
        }
    }
    li.classList.remove('todo-app__item--editing');
    saveTodos();
}


// --- Drag & Drop Logic (Mouse) ---
function handleDragStart(e) {
    draggedItem = e.target;
    setTimeout(() => e.target.classList.add('dragging'), 0);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedItem = null;
    // EN: Update the todos array based on the new DOM order.
    // PL: Zaktualizuj tablicę todos na podstawie nowego porządku w DOM.
    const newOrderIds = [...todoList.children].map(li => parseInt(li.dataset.id));
    todos.sort((a, b) => newOrderIds.indexOf(a.id) - newOrderIds.indexOf(b.id));
    saveTodos();
}

function handleDragOver(e) {
    e.preventDefault();
    const afterElement = getDragAfterElement(todoList, e.clientY);
    if (afterElement == null) {
        todoList.appendChild(draggedItem);
    } else {
        todoList.insertBefore(draggedItem, afterElement);
    }
}

// --- Drag & Drop Logic (Touch) ---
function handleTouchStart(e) {
    const target = e.target;
    const li = target.closest('.todo-app__item');
    if (!li) return;

    if (target.closest('.todo-app__drag-handle')) {
        // EN: Start touch drag
        // PL: Rozpocznij przeciąganie dotykiem
        isDragging = true;
        draggedItem = li;
        startY = e.touches[0].clientY;
        initialScroll = todoList.scrollTop;
        li.classList.add('dragging');
        document.body.style.overflow = 'hidden'; // EN: Prevent page scroll
    } else {
        // EN: Start long-press timer for editing
        // PL: Rozpocznij timer długiego przytrzymania do edycji
        longPressTimer = setTimeout(() => {
            startEditing(li);
            longPressTimer = null; 
        }, 500);
    }
}

function handleTouchMove(e) {
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
    if (isDragging && draggedItem) {
        e.preventDefault(); // EN: Prevent page scroll
        const currentY = e.touches[0].clientY;
        const afterElement = getDragAfterElement(todoList, currentY);
        if (afterElement == null) {
            todoList.appendChild(draggedItem);
        } else {
            todoList.insertBefore(draggedItem, afterElement);
        }
    }
}

function handleTouchEnd(e) {
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
    if (isDragging && draggedItem) {
        draggedItem.classList.remove('dragging');
        isDragging = false;
        draggedItem = null;
        document.body.style.overflow = ''; // EN: Restore page scroll
        // EN: Update array order after touch drag ends
        // PL: Zaktualizuj kolejność tablicy po zakończeniu przeciągania dotykiem
        const newOrderIds = [...todoList.children].map(li => parseInt(li.dataset.id));
        todos.sort((a, b) => newOrderIds.indexOf(a.id) - newOrderIds.indexOf(b.id));
        saveTodos();
    }
}

/**
 * @description EN: Helper function to find the element to drop 'before'.
 * PL: Funkcja pomocnicza znajdująca element, 'przed' którym należy upuścić.
 */
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.todo-app__item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

/**
 * @description
 * EN: Main initialization function for the To-Do module.
 * PL: Główna funkcja inicjalizująca moduł To-Do.
 */
export function initializeTodoApp(dependencies) {
    todoT = dependencies.t;
    showTodoConfirmationModal = dependencies.showConfirmationModal;
    playSound = dependencies.playSound;

    // EN: Get all necessary DOM elements
    // PL: Pobierz wszystkie niezbędne elementy DOM
    todoList = document.getElementById('todo-list');
    todoForm = document.getElementById('todo-form');
    todoInput = document.getElementById('todo-input');
    todoFooter = document.getElementById('todo-footer');
    todoCounter = document.getElementById('todo-counter');
    clearCompletedBtn = document.getElementById('clear-completed-btn');
    todoFilters = document.getElementById('todo-filters');

    // EN: Load from localStorage and render
    // PL: Załaduj z localStorage i renderuj
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.sort((a, b) => a.completed - b.completed);
    renderTodos();

    // EN: Add task listener
    // PL: Nasłuchiwacz dodawania zadań
    todoForm.addEventListener('submit', e => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            playSound('click');
            addTodo(text);
            todoInput.value = '';
        }
    });

    // EN: Main listener for the list (toggle/delete)
    // PL: Główny nasłuchiwacz listy (przełączanie/usuwanie)
    todoList.addEventListener('click', e => {
        if (isDragging) return;

        const target = e.target;
        const li = target.closest('.todo-app__item');
        if (!li) return;
        const id = parseInt(li.dataset.id, 10);

        if (target.classList.contains('todo-app__text')) {
             if(longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            } else {
                toggleTodo(id);
            }
        } else if (target.classList.contains('todo-app__delete-btn')) {
            deleteTodo(id);
        }
    });

    // EN: Edit listeners (double click, keyboard)
    // PL: Nasłuchiwacze edycji (podwójne kliknięcie, klawiatura)
    todoList.addEventListener('dblclick', e => {
        const li = e.target.closest('.todo-app__item');
        if (li && !li.classList.contains('todo-app__item--completed')) {
            startEditing(li);
        }
    });

    todoList.addEventListener('keydown', e => {
        const li = e.target.closest('.todo-app__item');
        if (li && li.classList.contains('todo-app__item--editing')) {
            if (e.key === 'Enter') {
                finishEditing(li, e.target.value.trim());
            } else if (e.key === 'Escape') {
                e.target.value = li.querySelector('.todo-app__text').textContent;
                li.classList.remove('todo-app__item--editing');
            }
        }
    });
    
    todoList.addEventListener('focusout', e => {
        const li = e.target.closest('.todo-app__item');
        if (li && li.classList.contains('todo-app__item--editing')) {
            finishEditing(li, e.target.value.trim());
        }
    });

    // EN: Filter listeners
    // PL: Nasłuchiwacze filtrów
    todoFilters.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            playSound('click');
            currentFilter = e.target.dataset.filter;
            renderTodos();
        }
    });

    clearCompletedBtn.addEventListener('click', () => {
        playSound('click');
        clearCompleted();
    });
    
    // EN: Drag & Drop (Mouse) Listeners
    // PL: Nasłuchiwacze Drag & Drop (Mysz)
    todoList.addEventListener('pointerdown', e => {
        if (e.target.closest('.todo-app__drag-handle')) {
            e.target.closest('.todo-app__item').draggable = true;
        }
    });
    
    todoList.addEventListener('pointerup', e => {
        if (e.target.closest('.todo-app__drag-handle')) {
            e.target.closest('.todo-app__item').draggable = false;
        }
    });

    todoList.addEventListener('dragstart', handleDragStart);
    todoList.addEventListener('dragend', handleDragEnd);
    todoList.addEventListener('dragover', handleDragOver);

    // EN: Drag & Drop (Touch) Listeners
    // PL: Nasłuchiwacze Drag & Drop (Dotyk)
    todoList.addEventListener('touchstart', handleTouchStart, { passive: true });
    todoList.addEventListener('touchmove', handleTouchMove, { passive: false });
    todoList.addEventListener('touchend', handleTouchEnd);


    return []; // No persistent intervals to clear
}
