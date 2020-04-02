const addButton = document.querySelector('.button');
const lists = document.querySelector('.list');
const sortArr = document.querySelector('.icon_sort');
let count =0;

addButton.addEventListener('click',createDiv);
sortArr.addEventListener('click',() =>{
    let array =[];
    const values = document.querySelectorAll('.task_text');
    values.forEach(el => {
        array.push(el.value);
    });
    array.sort();
    if(!sortArr.classList.contains('active')){
        sortArr.classList.add('active');
        for (let i=0;i<array.length;i++){
            values[i].value = array[i];
        }
    }else
    if (sortArr.classList.contains('active')){
        sortArr.style.fill ='black';
        sortArr.classList.remove('active');
        array.reverse();
        for (let i=0;i<array.length;i++){
            values[i].value = array[i];
        }
    }

});


function createDiv() {
    //Создаю Блок
    let div = document.createElement('div');
    div.id = "taskId"+ count;
    div.classList.add('task');
    div.classList.add('draggable');
    //Добавляю в него cvg
    let moveIt =document.createElement('img');
    moveIt.classList.add('moveIt');
    moveIt.setAttribute('draggable','true');
    moveIt.setAttribute('src','img/points.svg');
    div.appendChild(moveIt);
    //Добалвяю поле ввода
    let inputText = document.createElement('input');
    inputText.setAttribute("type", "text");
    inputText.setAttribute('placeholder','Add Task');
    inputText.classList.add('task_text');
    div.appendChild(inputText);

    //Добавляю в него cvg
    let svgClose = `<svg class="icon">
                   <use xlink:href="#close"></use>
                </svg>`;
    div.innerHTML += svgClose;
    count++;
    addElement(div);
    removeElement();
}
function addElement(task) {
    lists.appendChild(task);
    let pointToMove = document.querySelectorAll('.moveIt');
    dragAndDrop(pointToMove);
}
function removeElement(){
    let closeButton = document.querySelectorAll('.icon');
    closeButton.forEach(el =>{
        el.addEventListener('click',() =>{
            el.parentNode.remove();
        });
    });
}


function dragAndDrop(points) {
    points.forEach(el =>{
        el.parentNode.setAttribute('disable','true');
           el.addEventListener('dragstart',()=>{
               el.parentNode.setAttribute('draggable','true');
              el.parentNode.classList.add('drag');
           },false);
           el.addEventListener('dragend',()=>{
               el.parentNode.setAttribute('draggable','false');
              el.parentNode.classList.remove('drag');
           },false);
    });
    lists.addEventListener('dragover', e=>{
        e.preventDefault();
        const afterEl = dragAfter(lists,e.clientY);
        const draggable = document.querySelector('.drag');
        console.log(afterEl);
        if (afterEl===null) lists.appendChild(draggable);
        else lists.insertBefore(draggable,afterEl);
    });
}
function dragAfter(list,y) {
    const draggableElements = [...list.querySelectorAll('.draggable:not(.drag)')];

    return draggableElements.reduce((closest, child) => {
        const dragPlaceIndex = child.getBoundingClientRect();
        const currentPlace = y - dragPlaceIndex.top - dragPlaceIndex.height / 2;
        if (currentPlace < 0 && currentPlace > closest.offset) {
            return { offset: currentPlace, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY}).element;
}











