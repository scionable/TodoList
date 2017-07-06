$(document).ready(function () {

const addList = document.getElementById('list-add');
const modalActivator = document.getElementById('button');

/*CREATE BUTTON GLOBAL METHOD*/ 
function addButton(btnName) {
    let btn = document.createElement('button');
    btn.innerText = btnName;
    btn.className = 'g_btn';
    return btn;
};
/*CREATE BUTTON GLOBAL METHOD*/ 

class TodoList {
    constructor(name, target){
        this.name = name;
        this.target = document.getElementById(target);
        this.container = this.createContainer();
    }
    createContainer() {
        let newDiv = document.createElement('div');
        newDiv.className = 'container';
        this.title = this.createTitle();
        this.controls = this.createControls();
        this.items = document.createElement('div');
        this.trashContainer = this.createTrash();
        newDiv.appendChild(this.title);
        newDiv.appendChild(this.controls);
        newDiv.appendChild(this.items);
        newDiv.appendChild(this.trashContainer);
        this.target.appendChild(newDiv);
        return newDiv;
    }
    createTitle() {
        let newTitle = document.createElement('div');
        newTitle.className = 'title';
        let span = document.createElement('span');
        span.innerText = this.name;
        newTitle.appendChild(span);
        let btn = addButton('X');
        newTitle.appendChild(btn);
        let self = this;
        btn.addEventListener('click', function(){
            self.target.removeChild(self.container);
        });
        return newTitle;
    }
    createControls() {
        let newDiv = document.createElement('div');
        newDiv.className = 'controls';
        let inputText = document.createElement('input');
        let btn = addButton('add');
        let self = this;
        btn.addEventListener('click', function(){   
            self.createNewItem(inputText.value);
            inputText.value = '';
        });
        newDiv.appendChild(inputText);
        newDiv.appendChild(btn);
        return newDiv;
    }
    createNewItem(itemName) {
        let newDiv = document.createElement('div');
        newDiv.className = 'list_item';
        let span = document.createElement('span');
        let btn = addButton('del');
        let sortUp = addButton('sortUp');
        let sortDown = addButton('sortDown');
        span.innerText = itemName;
        newDiv.appendChild(span);
        newDiv.appendChild(btn);
        newDiv.appendChild(sortUp);
        newDiv.appendChild(sortDown);
        this.items.appendChild(newDiv);
        let self = this;
        btn.addEventListener('click', function(){
            self.items.removeChild(newDiv);
            self.moveToTrash(itemName);
        });

        sortUp.addEventListener('click', this.sortUp);
        sortDown.addEventListener('click', this.sortDown);
        return newDiv;
    }
    
    /*TRASH CREATE START*/ 
    createTrash() {
        this.trashItems = [];
        let newDiv = document.createElement('div');
        newDiv.className = 'trash_block';
        let span = document.createElement('span');
        let btn = addButton('clean');
        let btn2 = addButton('restore');
        newDiv.appendChild(span);
        newDiv.appendChild(btn);
        newDiv.appendChild(btn2);
        let self = this;
        btn.addEventListener('click', function(){
            self.delFromTrash();
        });
        btn2.addEventListener('click', function(){
            self.restoreFromTrash();
        });
        span.innerText = 'trash: 0';
        return newDiv;
    }
    moveToTrash(name) {
        this.trashItems.push(name);
        this.trashContainer.firstChild.innerText = 'trash: 0' + this.trashItems.length;
    }
    delFromTrash() {
        this.trashItems.splice(0,this.trashItems.length);
        this.trashContainer.firstChild.innerText = 'trash: 0';
    }
    restoreFromTrash () {
        for (let i = 0; i < this.trashItems.length; i++) {
            let element = this.trashItems[i];
            this.createNewItem(element);
        }
        this.trashItems.splice(0,this.trashItems.length);
        this.trashContainer.firstChild.innerText = 'trash: 0';
    }
    /*TRASH CREATE END*/ 

    /*BUTTONS START*/
    sortUp (e) {
        let el = e.target;
        el.parentNode.parentNode.insertBefore(el.parentNode, el.parentNode.previousSibling);
    }
    sortDown (e) {
        let el = e.target;
        el.parentNode.parentNode.insertBefore(el.parentNode, el.parentNode.nextSibling.nextSibling);
    }
    /*BUTTONS END*/
}

addList.addEventListener('click', function(e){
    let name = document.getElementById('list-test').value;
    new TodoList(name, 'lists');
});

/*MODAL CONSTRUCTOR START*/
class CreateModal {
    constructor(modalName, text) {
        this.modalName = modalName;
        this.text = text;
        this.create = this.createModal();
    }
    createModal () {
        let overlay = document.createElement('div');
        let modalWrapper = document.createElement('div');
        let modalTitle = document.createElement('span');
        let modalText = document.createElement('span');
        let btnYes = addButton('yes');
        let btnNo = addButton('no');
        overlay.className = 'modal_overlay';
        modalWrapper.className = 'modal_wrapper';
        modalTitle.className = 'modal_title';
        modalText.className = 'modal_text';
        modalTitle.innerText = this.modalName;
        modalText.innerText = this.text;
        overlay.appendChild(modalWrapper);
        modalWrapper.appendChild(modalTitle);
        modalWrapper.appendChild(modalText);
        modalWrapper.appendChild(btnYes);
        modalWrapper.appendChild(btnNo);
        document.body.appendChild(overlay);
        btnNo.addEventListener('click', this.closeModal );
        return overlay;
    }
    closeModal () {
        document.getElementsByClassName('modal_overlay');
        console.log(document.getElementsByClassName('modal_overlay'));
    }
}

modalActivator.addEventListener('click', function (e) {
	new CreateModal('Confirm the action', 'Do you really want to delete this item?');
});
/*MODAL CONSTRUCTOR END*/






























}); //READY CLOSE