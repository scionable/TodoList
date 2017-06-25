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
    sortUp.addEventListener('click', function(){
        self.sortUp();
    });
    sortDown.addEventListener('click', function(){
        self.sortDown();
    });
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

TodoList.prototype.sortUp = function() {
    console.log(1);
};

TodoList.prototype.sortDown = function() {
    console.log(2);
};
/*BUTTONS END*/

addList.addEventListener('click', function(e){
    var name = document.getElementById('list-test').value;
    new TodoList(name, 'lists');
})































}); //READY CLOSE
