$(document).ready(function () {

var addList = document.getElementById('list-add');

function TodoList(name, target) {
    this.name = name;
    this.target = document.getElementById(target);
    this.container = this.createContainer();
}

TodoList.prototype.createContainer = function() {
    var newDiv = document.createElement('div');
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
};

TodoList.prototype.createTitle = function() {
    var newTitle = document.createElement('div');
    newTitle.className = 'title';
    var span = document.createElement('span');
    span.innerText = this.name;
    newTitle.appendChild(span);
    var btn = this.addButton('X');
    newTitle.appendChild(btn);
    var self = this;
    btn.addEventListener('click', function(){
        self.target.removeChild(self.container);
    });
    return newTitle;
};

TodoList.prototype.createControls = function() {
    var newDiv = document.createElement('div');
    newDiv.className = 'controls';
    var inputText = document.createElement('input');
    var btn = this.addButton('add');
    var self = this;
    btn.addEventListener('click', function(){   
        self.createNewItem(inputText.value);
        inputText.value = '';
    });
    newDiv.appendChild(inputText);
    newDiv.appendChild(btn);
    return newDiv;
};

TodoList.prototype.createNewItem = function(itemName) {
    var newDiv = document.createElement('div');
    newDiv.className = 'list_item';
    var span = document.createElement('span');
    var btn = this.addButton('del');
    var sortUp = this.addButton('sortUp');
    var sortDown = this.addButton('sortDown');
    span.innerText = itemName;
    newDiv.appendChild(span);
    newDiv.appendChild(btn);
    newDiv.appendChild(sortUp);
    newDiv.appendChild(sortDown);
    this.items.appendChild(newDiv);
    var self = this;
    btn.addEventListener('click', function(){
        self.items.removeChild(newDiv);
        self.moveToTrash(itemName);
    });

	sortUp.addEventListener('click', this.sortUp);
	sortDown.addEventListener('click', this.sortDown);
    return newDiv;
};

/*TRASH CAN START*/
TodoList.prototype.createTrash = function() {
    this.trashItems = [];
    var newDiv = document.createElement('div');
    newDiv.className = 'trash_block';
    var span = document.createElement('span');
    var btn = this.addButton('clean');
    var btn2 = this.addButton('restore');
    newDiv.appendChild(span);
    newDiv.appendChild(btn);
    newDiv.appendChild(btn2);
    var self = this;
    btn.addEventListener('click', function(){
        self.delFromTrash();
    });
    btn2.addEventListener('click', function(){
        self.restoreFromTrash();
    });
    span.innerText = 'trash: 0';
    return newDiv;
};

TodoList.prototype.moveToTrash = function(name) {
    this.trashItems.push(name);
    this.trashContainer.firstChild.innerText = 'trash: 0' + this.trashItems.length;
};

TodoList.prototype.delFromTrash = function() {
    this.trashItems.splice(0,this.trashItems.length);
    this.trashContainer.firstChild.innerText = 'trash: 0';
};

TodoList.prototype.restoreFromTrash = function() {
    for (var i = 0; i < this.trashItems.length; i++) {
        var element = this.trashItems[i];
        this.createNewItem(element);
    }
    this.trashItems.splice(0,this.trashItems.length);
    this.trashContainer.firstChild.innerText = 'trash: 0';
};
/*TRASH CAN END*/

/*BUTTONS START*/
TodoList.prototype.addButton = function(btnName) {
    var btn = document.createElement('input');
    btn.type = 'button';
    btn.value = btnName;
    return btn;
};

TodoList.prototype.sortUp = function(e) {
    var el = e.target;
	el.parentNode.parentNode.insertBefore(el.parentNode, el.parentNode.previousSibling);
	if (el.parentNode.previousSibling === null) {
		this.disabled = true;
	}
};

TodoList.prototype.sortDown = function(e) {
	var el = e.target;
	el.parentNode.parentNode.insertBefore(el.parentNode, el.parentNode.nextSibling.nextSibling);
	if (el.parentNode.nextSibling === null) {
		this.disabled = true;
		console.log(this);
	} else {
		this.disabled = false;
	}
};
/*BUTTONS END*/

addList.addEventListener('click', function(e){
    var name = document.getElementById('list-test').value;
    new TodoList(name, 'lists');
});


/*MODAL CONSTRUCTOR START*/
var modalActivator = document.getElementById('button');

function CreateModal(modalName, text) {
    this.modalName = modalName;
	this.text = text;
	this.create = this.createModal();
}

CreateModal.prototype.createModal = function () {
	var overlay = document.createElement('div');
	var modalWrapper = document.createElement('div');
	var modalTitle = document.createElement('span');
	var modalText = document.createElement('span');
	overlay.className = 'modal_overlay';
	modalWrapper.className = 'modal_wrapper';
	modalTitle.className = 'modal_title';
	modalText.className = 'modal_text';
	modalTitle.innerText = this.modalName;
	modalText.innerText = this.text;
	overlay.appendChild(modalWrapper);
	modalWrapper.appendChild(modalTitle);
	modalWrapper.appendChild(modalText);
	document.body.appendChild(overlay);
	return overlay;
};

modalActivator.addEventListener('click', function (e) {
	new CreateModal('Confirm the action', 'Do you really want to delete this item?');
});
/*MODAL CONSTRUCTOR END*/






























}); //READY CLOSE
