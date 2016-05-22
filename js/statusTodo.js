define(['config'],function(config) {

	var SELECTOR = config.SELECTOR;

	function changeFilter(e) {
		var url = location.hash.split('#')[1];
		window.history.replaceState(null, '', '.' + url);
		setFilter(url);
	}

	function setFilter(filter) {
		$(SELECTOR.TODO_LIST).attr('class', 'todo-list');
		$(SELECTOR.FILTER).removeClass('selected');
		$(SELECTOR.FILTER + '[href=\'#' + filter + '\']').addClass('selected');

		switch (filter) {
			case '/active' :
				$(SELECTOR.TODO_LIST).addClass('active');
				break;
			case '/completed' :
				$(SELECTOR.TODO_LIST).addClass('completed');
				break;
		}
	}

	return {
		init: function () {
			
		}
	};

})