define([
    'jquery',
    'qunit',
    '../js/pagenation',
],function( $, QUnit, pagenation){

	function run(){
		var pagebar;

		QUnit.module("group pagenation",{
			beforeEach:function(){
				pagebar = new pagenation($('.pagebar'),10);
			}
		});

		QUnit.test( "init test", function( assert ) {
			assert.ok($('.pagebar').children('a'));
		});

		QUnit.test( "event binding test", function( assert ) {
			expect(1);
			pagebar.on('move', function(e){
				assert.ok(e.index==2 && e.max==10);
			})
			return $($('.pagebar').children('a')[3]).trigger('click');
		});

	}

	return {run:run};
})