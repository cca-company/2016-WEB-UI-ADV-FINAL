define([
    'jquery',
    'qunit',
    '../js/todo'
],function( $, QUnit, todo){

	function run(){

		QUnit.module("group Model",{
			before:deleteAllTodo,
			after:deleteAllTodo
		});

		function deleteAllTodo(){
			todo.loadTodo()
				.then(function(response){
					for(var i = 0; i < response.length; ++i){
						var data = response[i];
						todo.deleteTodo(data.id);
					}
				})
		}

		QUnit.test( "saveTodo test", function( assert ) {
			expect(1);
			return todo
				.saveTodo("Test todo")
				.then(function(response){
					assert.equal( response.affectedRows , 1, "saveTodo pass!" );
				})
		});

		QUnit.test( "loadTodo test", function( assert ) {
			expect(1);

			return todo
				.saveTodo("Test todo")
				.then(function(){return todo.loadTodo()})
				.then(function(response){
					assert.ok( response.length>=1, "loadTodo pass!" );
				})
		});

		QUnit.test( "completeTodo test", function( assert ) {
			expect(1);

			return todo
				.saveTodo("Test todo")
				.then(function(response){return todo.completeTodo(response.insertId,1)})
				.then(function(response){
					assert.equal( response.changedRows , 1, "completeTodo pass!" );
				})
		});


		QUnit.test( "deleteTodo test", function( assert ) {
			expect(1);

			return todo
				.saveTodo("Test todo")
				.then(function(response){return todo.deleteTodo(response.insertId)})
				.then(function(response){
					assert.equal( response.affectedRows , 1, "deleteTodo pass!" );
				})
		});

	}

	return {run:run};
})