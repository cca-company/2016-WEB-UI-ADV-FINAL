define([
    'jquery',
    'config',
    'statusTodo',
    'template',
    'todo',
    'pagenation'
], function(jQuery,config, TODOStatus, TODOTemplate, TODODataSync, pagenation){

	var SELECTOR = config.SELECTOR;
    var pageBar;
    var todos = [];

    function loadTodoList(e) {
        todos = [];
        TODODataSync.loadTodoByPage(e.index,3)
            .done( function( data ) {
                var todoNum = data.length;
                if ( todoNum > 0 ) {
                    for ( var i = 0; i < todoNum; ++i ) {
                        var todo = data[ i ];
                        var todoObj = {
                            id: todo.id,
                            todo: todo.todo,
                            completed: ( todo.completed ) ? true : false
                        };
                        todos.push( todoObj );
                    }
                    TODOTemplate.compileTemplate( todos );
                    changeCount();
                }
            } );
    };

    function newTodo( e ) {
        var key = e.keyCode;
        if ( key == config.ENTER_KEY ) {
            var input = $( SELECTOR.NEW_TODO );
            var todo = input.val();

            TODODataSync.saveTodo( todo ).done( function( data ) {
                addTodo( data.insertId, todo );
                input.val( "" );
            } );
        }
    };

    function addTodo( id, todo, completed ) {
        todos.unshift( {
            id: id,
            todo: todo,
            completed: ( completed ) ? true : false
        } );
        TODOTemplate.compileTemplate( todos );
        changeCount();
    };

    function completeTodo( e ) {
        var btn = $( e.target );
        var todo = btn.closest( "li" );
        var id = todo.data( "id" );
        var completed = ( todo.hasClass( "completed" ) ) ? 0 : 1;
        TODODataSync.completeTodo( id, completed ).done( function() {
            todo.toggleClass( "completed" );
            changeCount();
        } );
    };

    function deleteTodo( e ) {
        var btn = $( e.target );
        var todo = btn.closest( "li" );
        var id = todo.data( "id" );
        TODODataSync.deleteTodo( id ).done( function() {
            todo.remove();
            var removeTodoIdx = todos.indexOf( todos.find( function( todo ) {
                return todo.id == id;
            } ) );
            todos.splice( removeTodoIdx, 1 );

            changeCount();
        } );
    };

    function changeCount() {
        var todoNum = $( SELECTOR.TODO_LIST + " li.view:not(.completed)" ).length;
        $( SELECTOR.TODO_COUNT ).text( todoNum );
    }

    return {
        init: function() {
            $( SELECTOR.NEW_TODO ).on( "keydown", newTodo );
            $( SELECTOR.TODO_LIST ).on( "click", ".toggle", completeTodo );
            $( SELECTOR.TODO_LIST ).on( "click", ".destroy", deleteTodo );

            TODODataSync.getAllCount()
                .done(function(data){
                    pageBar = new pagenation($( SELECTOR.PAGEBAR), Math.ceil(data.cnt/3), 1 , 5);
                    pageBar.on('move',loadTodoList);
                });

            loadTodoList({index:1,max:0});
        }
    };


});