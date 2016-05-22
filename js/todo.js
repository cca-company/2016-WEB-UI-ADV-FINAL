define(function(){

	var userId = 'cca-company';
	var serverUrl = 'http://128.199.76.9:8002/:'+userId+'/';

	return {
		saveTodo : function(todo){
			return $.ajax({
				url : serverUrl,
				method : 'POST',
				data : {nickname : userId, todo : todo}
			});
		},
		loadTodo : function(){
			return $.ajax({
				url : serverUrl,
				method : 'GET',
				data : {nickname : userId}
			});
		},
		deleteTodo : function(todoId){
			return $.ajax({
				url : serverUrl+todoId,
				method : 'DELETE',
				data : {nickname : userId, id : todoId}
			});
		},
		completeTodo : function(todoId, completed){
			return $.ajax({
				url : serverUrl+todoId,
				method : 'PUT',
				data : {nickname : userId, id : todoId, completed : (completed)?1:0}
			});
		},
		getAllCount : function(){
			return $.ajax({
				url : serverUrl+'count',
				method : 'GET'
			});
		},
		loadTodoByPage : function(page,limit){
			return $.ajax({
				url : serverUrl+'page',
				method : 'GET',
				data : {start : (page-1) * 3, limit : limit}
			});
		}
	}
})