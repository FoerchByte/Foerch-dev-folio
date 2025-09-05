/*
  EN: This module handles the logic for the advanced To-Do List application. It's
  a showcase of comprehensive DOM manipulation, state management (using localStorage),
  and user experience enhancements like drag-and-drop reordering for both mouse
  and touch devices. It demonstrates a robust approach to building a
  feature-rich utility application.
  PL: Ten moduł zawiera logikę dla zaawansowanej aplikacji Lista Zadań. Jest on
  przykładem kompleksowej manipulacji DOM, zarządzania stanem (przy użyciu
  localStorage) i ulepszeń interfejsu, takich jak przeciąganie i upuszczanie
  zadań, zarówno dla myszy, jak i urządzeń dotykowych. Demonstruje solidne
  podejście do budowania bogatej w funkcje aplikacji użytkowej.
*/
let todoT, showTodoConfirmationModal, playSound;
let todos = [];
let currentFilter = 'all';
let draggedItem = null;

// ZMIANA: Zmienne do obsługi gestów dotykowych
let longPressTimer = null;
let isDragging = false;
let startY = 0;
let initialScroll = 0;

let todoList, todoForm, todoInput, todoFooter, todoCounter, clearCompletedBtn, todoFilters;

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const scrollTop = todoList.scrollTop; // Zapisz pozycję przewijania
    todoList.innerHTML = '';
    const filteredTodos = getFilteredTodos();
    filteredTodos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });
    updateFooter();
    todoList.scrollTop = scrollTop; // Przywróć pozycję przewijania
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-app__item ${todo.completed ? 'todo-app__item--completed' : ''}`;
    li.dataset.id = todo.id;
    // ZMIANA: Usunięto atrybut draggable, będziemy zarządzać tym przez JS
    // li.draggable = true;

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

function getFilteredTodos() {
    switch (currentFilter) {
        case 'active': return todos.filter(todo => !todo.completed);
        case 'completed': return todos.filter(todo => !todo.completed);
        default: return todos;
    }
}

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

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        if (todo.completed) {
            playSound('complete');
        }
        todos.sort((a, b) => a.completed - b.completed);
        saveTodos();
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    
    const todoElement = todoList.querySelector(`[data-id='${id}']`);
    if (todoElement) {
        todoElement.remove();
    }
    updateFooter();
}

function clearCompleted() {
    const completedCount = todos.filter(todo => todo.completed).length;
    if (completedCount === 0) return;

    showTodoConfirmationModal(todoT('todoConfirmClear', completedCount), () => {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        renderTodos();
    });
}

function startEditing(li) {
    // Zapobiegaj edycji, jeśli trwa przeciąganie
    if(isDragging) return;
    li.classList.add('todo-app__item--editing');
    const input = li.querySelector('.todo-app__edit-input');
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
}

function finishEditing(li, newText) {
    const id = parseInt(li.dataset.id, 10);
    const todo = todos.find(t => t.id === id);

    if (todo) {
        if (newText) {
            todo.text = newText;
            li.querySelector('.todo-app__text').textContent = newText;
        } else {
            deleteTodo(id);
            return;
        }
    }
    li.classList.remove('todo-app__item--editing');
    saveTodos();
}


// --- ZMIANA: Logika Drag & Drop dla myszy ---
function handleDragStart(e) {
    draggedItem = e.target;
    // Dajemy przeglądarce chwilę na "złapanie" elementu
    setTimeout(() => e.target.classList.add('dragging'), 0);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedItem = null;
    // Aktualizujemy tablicę todos na podstawie nowego porządku w DOM
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

// --- ZMIANA: Nowa logika dla gestów dotykowych ---
function handleTouchStart(e) {
    const target = e.target;
    const li = target.closest('.todo-app__item');
    if (!li) return;

    if (target.closest('.todo-app__drag-handle')) {
        // Start przeciągania dotykowego
        isDragging = true;
        draggedItem = li;
        startY = e.touches[0].clientY;
        initialScroll = todoList.scrollTop;
        li.classList.add('dragging');
        // Zapobiegamy przewijaniu strony podczas przeciągania zadania
        document.body.style.overflow = 'hidden';
    } else {
        // Start długiego przytrzymania do edycji
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
        e.preventDefault(); // Kluczowe, aby zapobiec scrollowaniu strony
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
        document.body.style.overflow = ''; // Przywracamy scrollowanie
        // Aktualizujemy tablicę po zakończeniu przeciągania
        const newOrderIds = [...todoList.children].map(li => parseInt(li.dataset.id));
        todos.sort((a, b) => newOrderIds.indexOf(a.id) - newOrderIds.indexOf(b.id));
        saveTodos();
    }
}


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


export function initializeTodoApp(dependencies) {
    todoT = dependencies.t;
    showTodoConfirmationModal = dependencies.showConfirmationModal;
    playSound = dependencies.playSound;

    todoList = document.getElementById('todo-list');
    todoForm = document.getElementById('todo-form');
    todoInput = document.getElementById('todo-input');
    todoFooter = document.getElementById('todo-footer');
    todoCounter = document.getElementById('todo-counter');
    clearCompletedBtn = document.getElementById('clear-completed-btn');
    todoFilters = document.getElementById('todo-filters');

    todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.sort((a, b) => a.completed - b.completed);
    renderTodos();

    todoForm.addEventListener('submit', e => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            playSound('click');
            addTodo(text);
            todoInput.value = '';
        }
    });

    todoList.addEventListener('click', e => {
        // Zapobiegaj kliknięciu jeśli trwało przeciąganie lub edycja
        if (isDragging) return;

        const target = e.target;
        const li = target.closest('.todo-app__item');
        if (!li) return;
        const id = parseInt(li.dataset.id, 10);

        if (target.classList.contains('todo-app__text')) {
             // Jeśli timer długiego przytrzymania nadal istnieje, nie przełączaj statusu
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
    
    // Ustawienie draggable dla elementów po ich stworzeniu
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

    // Dodanie obsługi gestów dotykowych
    todoList.addEventListener('touchstart', handleTouchStart, { passive: true });
    todoList.addEventListener('touchmove', handleTouchMove, { passive: false });
    todoList.addEventListener('touchend', handleTouchEnd);


    return [];
}
