define(['handlebars','config'], function(Handlebars,config) {

	var SELECTOR = config.SELECTOR;

	function initPartial() {
		Handlebars.registerPartial('todoList',
			'<{{tagName}} class="view {{#completed}}completed{{/completed}}" data-id={{id}}>'
			+ '<div class="view">'
			+ '<input class="toggle" type="checkbox" {{#completed}}checked{{/completed}}>'
			+ '<label>{{todo}}</label>'
			+ '<button class="destroy"></button>'
			+ '</div>'
			+ '<input class="edit" value="{{todo}}">'
			+ '</{{tagName}}>');
	}

	return {
		compileTemplate: function (context) {
			initPartial();
			var source = $(SELECTOR.TODO_TEMPLATE).html();
			var template = Handlebars.compile(source);

			this.compileTemplate = function (context) {
				$(SELECTOR.TODO_LIST).empty().append(template({todos: context}));
			}
			return this.compileTemplate(context);
		}
	};

})