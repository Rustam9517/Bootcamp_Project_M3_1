const addButton = document.querySelector('.add_button');
const lists = document.querySelector('.list');
const sortArr = document.querySelector('.icon_sort');
let count =0;
let space ={};

addButton.addEventListener('click',()=>{
    let addInput = document.querySelector('.addedLine').value;
    createDiv(addInput);

});
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


function createDiv(input) {
    //Создаю Блок
    let div = document.createElement('div');
    div.id = "taskId"+ count;
    div.setAttribute('draggable','true');
    div.classList.add('task');
    div.classList.add('draggable');
    lists.appendChild(div);
    lists.insertBefore(div,lists.childNodes[0]);
    //Добавляю в него cvg
    let svgPoint = `<svg class="points">
                    <use xlink:href="#points"></use>
                </svg>`;
    div.innerHTML +=svgPoint;

    //Добалвяю поле ввода
    let inputText = document.createElement('input');
    inputText.setAttribute("type", "text");
    inputText.setAttribute("value", `${input}`);
    inputText.classList.add('task_text');
    div.appendChild(inputText);

    //Добавляю в него cvg
    let svgClose = `<svg class="icon">
                   <use xlink:href="#close"></use>
                </svg>`;
    div.innerHTML += svgClose;

    div.style.display='flex';


    let closeButton = div.querySelectorAll('.icon');
    lists.style.visibility ='visible';
    document.querySelector('.addedLine').value = '';
    count++;
    removeElement(closeButton,div);


    let draggables = document.querySelectorAll('.task');
    const pointToMove = document.querySelectorAll('.points');
    pointToMove.forEach(el =>{
       el.addEventListener('mousedown',(e)=>{
           dragAndDrop(draggables,lists);
           const rect = el.getBoundingClientRect() ;
           space.y = e.pageY - rect.top ;
           el.addEventListener('mousemove', handleMouseMove) ;
           el.addEventListener('mouseup', handleMouseUp) ;
           draggables.style.top = rect.top + 'px' ;
        });
    });

}

function handleMouseUp() {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseMove);
}
function handleMouseMove(e) {
    e.style.top = (e.pageY - space.y) + 'px';
}

function dragAndDrop(draggedElement,elementContainer) {

    draggedElement.forEach(draggable =>{
        draggable.addEventListener('dragstart',() =>{
            draggable.classList.add('drag');
        });
        draggable.addEventListener('dragend',() =>{
            draggable.classList.remove('drag');
        });
    });
    lists.addEventListener('dragover', e=>{
        e.preventDefault();
        const afterEl = dragAfter(lists,e.clientY);
        const draggable = document.querySelector('.drag');
        if (afterEl===null) elementContainer.appendChild(draggable);
        else elementContainer.insertBefore(draggable,afterEl);
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
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
function removeElement(button,element){
    button.forEach(el =>{
        el.addEventListener('click',() =>{
            element.parentNode.removeChild(element);
        });
    });
}








