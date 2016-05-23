define(['jquery','eventemitter'],function($, EventEmitter){

	function Pagebar(selector, maxPage, nowPage, limit){
		this.maxPage = maxPage;
		this.nowPage = nowPage || 1;
		this.limit = limit || 5;
		this.ele = $(selector);
		this.ee = new EventEmitter();
		this.init();
	}

	Pagebar.prototype = {
		init : function(){
			this.ele.on('click','a',$.proxy(this,'clickPage'));
			this.setPageButton();
			this.ee.emit('move',{index:this.nowPage, max:this.maxPage});
		},
		setPageButton : function(){
			this.ele.empty();
			var pageGroup = Math.ceil(this.nowPage/this.limit);
			var startPageButton = (pageGroup - 1) * 5 + 1
			var maxPageButton = pageGroup * this.limit;
			if(maxPageButton > this.maxPage) maxPageButton = this.maxPage;

			var pageButtons = [];

			pageButtons.push($('<a href="#">&lt;&lt;</a>')[(this.nowPage <= this.limit)?'addClass':'removeClass']('disabled'));
			pageButtons.push($('<a href="#">&lt;</a>')[(this.nowPage == 1)?'addClass':'removeClass']('disabled'));
			for(var i = startPageButton; i <= maxPageButton; ++i){
				var button = $('<a href="#">'+i+'</a>')[(this.nowPage == i)?'addClass':'removeClass']('selected');
				pageButtons.push(button);
			}
			pageButtons.push($('<a href="#">&gt;</a>')[(this.nowPage == this.maxPage)?'addClass':'removeClass']('disabled'));
			pageButtons.push($('<a href="#">&gt;&gt;</a>')[(this.nowPage > this.maxPage - this.limit)?'addClass':'removeClass']('disabled'));
			
			this.ele.append(pageButtons);
		},
		clickPage : function(e){
			var btn = $(e.target);
			var page = btn.text();

			if(btn.hasClass('disabled') || btn.hasClass('disabled')){
				return;
			}

			if(page == '<'){
				page = --this.nowPage;
			}else if(page == '>'){
				page = ++this.nowPage;
			}else if(page == '<<'){
				this.nowPage -= this.limit;
				page = this.nowPage;
			}else if(page == '>>'){
				this.nowPage = this.nowPage*1 + this.limit;
				page = this.nowPage;
			}else{
				this.nowPage = page;
			}
			this.setPageButton();
			this.ee.emit('move',{index:this.nowPage, max:this.maxPage});
		},
		on : function(eventName, fp){
			this.ee.on(eventName, fp);
		},
		off : function(eventName, fp){
			this.ee.off(eventName, fp);
		},
		getPage : function(){
			return this.nowPage;
		},
		getMaxPage : function(){
			return this.maxPage;
		}
	}

	return Pagebar;
})