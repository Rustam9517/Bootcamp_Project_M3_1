

//Переменные
let addToDo = document.querySelector('.addToDo');
addToDo.addEventListener('mousedown', createElement);
let sort = document.querySelector('.sort');
sort.addEventListener('mousedown', sortValues);
let pointscheck;
let creatToDoList = document.querySelector('.creatToDoList');

//Функция создание элементов
function createElement() {
    //Создание элементов
    let readyToDoList = document.createElement('div');
    let pointscheck = document.createElement('div');
    let deletecheck = document.createElement('div');
    let toDo = document.createElement('input');
    let points = document.createElement('img');
    let delet = document.createElement('i');
    // Добовление данных в элементы
    points.src = 'img/points.svg';
    readyToDoList.draggable = "true";
    // Добовление классов элементам
    readyToDoList.classList.add('readyToDoList');
    pointscheck.classList.add('pointscheck');
    toDo.classList.add('toDo');
    delet.classList.add('far', 'fa-times-circle');
    deletecheck.classList.add('deletecheck');
    //Добовление элементов в элементы
    pointscheck.append(points);
    deletecheck.append(delet);
    readyToDoList.append(pointscheck);
    readyToDoList.append(toDo);
    readyToDoList.append(deletecheck);
    addElements(readyToDoList)
};
//Функция добовление элемента
function addElements(toDolist) {
    creatToDoList.append(toDolist);
    sort.classList.remove('activ');
    pointscheck = document.querySelectorAll('.pointscheck');
    //Запуск Функиций Удаление и Передвижения
    moveToDoElement();
    deletElement();

};
//Функция удаления элемента
function deletElement() {
    let deletecheck = document.querySelectorAll('.deletecheck');
    deletecheck.forEach(element => {
        element.addEventListener('click', () => {
            element.parentNode.remove()
        });
    });
};
//Функиция сортирофки
function sortValues() {
    let toDoValue = document.querySelectorAll('.toDo');
    let toDoValueArr = [];
    //Выводим все переменные в массив
    toDoValue.forEach((item) => {
        toDoValueArr.push(item.value)
    });
    //Cоздаем новый массив и выводит в элемнты
    let newToDoValueArr = [...toDoValueArr];
    //Проверка на вид сортировки
    if (!sort.classList.contains('activ')) {
        sort.classList.toggle('activ')
        newToDoValueArr.sort()
    } else {
        sort.classList.toggle('activ')
        newToDoValueArr.sort((a, b) => b - a)
    };
    //Запуск сортировки
    toDoValue.forEach((item, i) => {
        item.value = newToDoValueArr[i]
    });
}
//Функция запуска движения
function moveToDoElement() {
    //Перебор кнопки полсе которой должно начаться движение
    pointscheck.forEach((pointscheck,i) => {
        //Добовления класса поднятым элементам
        let toDo = document.querySelectorAll('.toDo');
    pointscheck.addEventListener('dragstart', () => {
        pointscheck.parentNode.classList.add('dragging');
        toDo[i].style.backgroundColor = "#FFDC40";
    });
    //Удаление класса опущеным элементам
    pointscheck.addEventListener('dragend', () => {
        pointscheck.parentNode.classList.remove('dragging')
        toDo[i].style.backgroundColor = "white";
    });
});

    creatToDoList.addEventListener('dragover', e => {
        e.preventDefault();
        let afterElement = getDragAfterElements(creatToDoList, e.clientY);
        let draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            creatToDoList.appendChild(draggable);
        } else {
            creatToDoList.insertBefore(draggable,afterElement)
        }
    });
}
function getDragAfterElements(creatToDoList, y) {
    let draggableElements = [...creatToDoList.querySelectorAll('.readyToDoList:not(.dragging)')]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
