$(document).ready(function () {

const addList = document.getElementById('list-add');
const modalActivator = document.getElementById('button');

/*CREATE BUTTON GLOBAL METHOD*/ 
function createBtn(btnName) {
    let btn = document.createElement('button');
    btn.innerText = btnName;
    btn.className = 'g_btn';
    return btn;
};
/*CREATE BUTTON GLOBAL METHOD*/ 

class TodoList {
    constructor(name, target){
        this.name      = name;
        this.target    = document.getElementById(target);
        this.container = this.createContainer();
    }
    createContainer() {
        let newDiv = document.createElement('div');
        
        newDiv.className = 'container';
        this.title = this.createTitle();
        this.controls = this.createControls();
        this.trashContainer = this.createTrash();
        this.items = document.createElement('div');
        newDiv.appendChild(this.title);
        newDiv.appendChild(this.controls);
        newDiv.appendChild(this.items);
        newDiv.appendChild(this.trashContainer);
        this.target.appendChild(newDiv);
        return newDiv;
    }
    createTitle() {
        let newTitle = document.createElement('div');
        let btnDel   = createBtn('X');
        let span     = document.createElement('span');
        let self     = this;

        newTitle.className = 'title';
        span.innerText = this.name;
        newTitle.appendChild(span);
        newTitle.appendChild(btnDel);
        /*EVENT BLOCK*/
        btnDel.addEventListener('click', function(){
            self.target.removeChild(self.container);
        });
        /*EVENT BLOCK*/
        return newTitle;
    }
    createControls() {
        let newDiv      = document.createElement('div');
        let inputText   = document.createElement('input');
        let addListItem = createBtn('add');
        let self        = this;

        newDiv.className = 'controls';
        newDiv.appendChild(inputText);
        newDiv.appendChild(addListItem);
        /*EVENT BLOCK*/
        addListItem.addEventListener('click', function(){   
            self.createNewItem(inputText.value);
            inputText.value = '';
        });
        /*EVENT BLOCK*/
        return newDiv;
    }
    createNewItem(itemName) {
        let newDiv   = document.createElement('div');
        let span     = document.createElement('span');
        let btnDel   = createBtn('del');
        let sortUp   = createBtn('sortUp');
        let sortDown = createBtn('sortDown');
        let self     = this;

        newDiv.className = 'list_item';
        span.innerText = itemName;
        newDiv.appendChild(span);
        newDiv.appendChild(btnDel);
        newDiv.appendChild(sortUp);
        newDiv.appendChild(sortDown);
        this.items.appendChild(newDiv);
        
        /*EVENT BLOCK*/
        btnDel.addEventListener('click', function(){
            self.items.removeChild(newDiv);
            self.moveToTrash(itemName);
        });
        sortUp.addEventListener('click', this.sortUp);
        sortDown.addEventListener('click', this.sortDown);
        /*EVENT BLOCK*/
        return newDiv;
    }
    
    /*TRASH CREATE START*/ 
    createTrash() {
        let newDiv     = document.createElement('div');
        let span       = document.createElement('span');
        let btnClear   = createBtn('clean');
        let btnRestore = createBtn('restore');
        let self       = this;

        this.trashItems = [];
        span.innerText = 'trash: 0';
        newDiv.className = 'trash_block';
        newDiv.appendChild(span);
        newDiv.appendChild(btnClear);
        newDiv.appendChild(btnRestore);
        /*EVENTS BLOCK*/
        btnClear.addEventListener('click', function(){
            self.delFromTrash();
        });
        btnRestore.addEventListener('click', function(){
            self.restoreFromTrash();
        });
        /*EVENTS BLOCK*/
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
        this.text      = text;
        this.create    = this.createModal();
    }
    createModal () {
        let overlay      = document.createElement('div');
        let modalWrapper = document.createElement('div');
        let modalTitle   = document.createElement('span');
        let modalText    = document.createElement('span');
        let btnYes       = createBtn('yes');
        let btnNo        = createBtn('no');

        overlay.className      = 'modal_overlay';
        modalWrapper.className = 'modal_wrapper';
        modalTitle.className   = 'modal_title';
        modalText.className    = 'modal_text';

        modalTitle.innerText = this.modalName;
        modalText.innerText  = this.text;

        overlay.appendChild(modalWrapper);
        modalWrapper.appendChild(modalTitle);
        modalWrapper.appendChild(modalText);
        modalWrapper.appendChild(btnYes);
        modalWrapper.appendChild(btnNo);
        document.body.appendChild(overlay);
        overlay.style.display = 'none';
        /*EVENTS BLOCK*/
        modalActivator.addEventListener('click', function (e) {
            overlay.style.display = 'block';
        });
        btnNo.addEventListener('click', function () {
            overlay.style.display = 'none';
        });
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
        /*EVENTS BLOCK*/
        return overlay;
    }
}

new CreateModal('Confirm the action', 'Do you really want to delete this item?');

/*MODAL CONSTRUCTOR END*/






























}); //READY CLOSE