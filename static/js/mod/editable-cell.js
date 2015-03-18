function EditableCell(elem, saveFunc){
	var self = this;
	this.elem = $(elem);
	this.editing = false;
	this.saveFunc = saveFunc;
	this.buildContent();
	this.buildInput();
	this.content.click(function(){
		self.beginEdit();
	});
	this.textarea.blur(function(){
		self.endEdit();
	});
	this.textarea.keyup(function(e){
		if(e.which == 13){
			self.endEdit();
		}
	});
}

EditableCell.prototype.buildContent = function(){
	this.content = $("<div class='content' style='min-height:30px' />");
	this.content.html(this.elem.html());
	this.elem.empty().append(this.content);
	this.buildContent = function(){};
}

EditableCell.prototype.buildInput = function(){
	this.textarea = $("<textarea class='form-control' />");
	this.textarea.hide();
	this.textarea.appendTo(this.elem);
};

EditableCell.prototype.beginEdit = function(){
	this.textarea.val(this.content.html()).show();
	this.textarea.get(0).focus();
	this.content.hide();
};

EditableCell.prototype.endEdit = function(){
	var text = this.textarea.val();
	var saveFunc = this.saveFunc;
    var oldText = this.content.html();
	this.content.html(text).show();
	this.textarea.hide();
    if(oldText !== text){
	    saveFunc && saveFunc(text);
    }
};
