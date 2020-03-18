//banner



//向上
$(function(){
	$(window).scroll(function(){
		var _top = $(window).scrollTop();
		if(_top>300){
			$('.db_xs').fadeIn(600);
		}else{
			$('.db_xs').fadeOut(600);
		}
	});
	$(".db_xs").click(function(){
		$("html,body").animate({scrollTop:0},500);
	});
});