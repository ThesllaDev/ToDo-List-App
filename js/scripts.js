let taskList = []; // STORING VALUES RECEIVED IN THE ARRAY

function renderList() {
    document.querySelector('.todo-list').innerHTML = '';

    taskList.forEach(task => {

        let li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" id="task-${task.id}">
                        <label for="task-${task.id}">${task.title}</label>
                        <button class="delete-item fas fa-trash-alt"></button>`;
        
        li.querySelector('input').addEventListener("change", e => {

            if (e.target.checked) {
                li.classList.add('complete');
            } else {
                li.classList.remove('complete');
            }
        });

        li.querySelector('button').addEventListener('click', e => {

            let button = e.target;
            let li = button.parentNode;
            let input = li.querySelector('input');
            let id = input.id;
            let idArray = id.split('-');
            let idTodo = idArray[1];
            let titleTask = li.querySelector('label').innerText;

            if (confirm(`Do you really want to delete task ${titleTask}?`)){
                taskList = taskList.filter(task => (task.id !== parseInt(idTodo)));
            }

            renderList();
        });
    
        document.querySelector('.todo-list').append(li);
    });
}

// RECEIVED AND STORE A NEW TASK TO THE TASK LIST
document.querySelector('#new-task').addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        
        taskList.push({
            id: taskList.length+1,
            title: e.target.value
        });

        e.target.value = "";

        renderList();
    }
});

function addTask() {
    taskList.push({
        id: taskList.length+1,
        title: document.querySelector('#new-task').value
    });

    document.querySelector('#new-task').value = "";

    renderList();
}

document.querySelector('.btn-delete-all').addEventListener('click', e => {

    if (confirm(`Do you really want to delete ALL TASK!?`)){
        taskList = [];
    }

    renderList();
});

renderList();