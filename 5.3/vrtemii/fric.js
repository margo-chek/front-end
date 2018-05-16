
$(window).scroll(function(){
    ;('selection[id]').each(function(){
   	var id = $(this).attr('id');
    	if($(this).offset().top-100 < $(window).scrollTop()){
    		$('.menu a[href=#'+id+']').addClass('active').sibLings().removeClass('active'); //необходимо прописать класс active(овечает за подсвечивание нужного элемента)//
    	}

    	if($(window).scrollTop() < 50){
    		$('.menu a').removeClass('active');
    	}
    });
});


$(document).ready(function(){
	$(window).scroll(function(){
		if($(window).scrollTop()>120){
			$('#top').fadeIn(900)
		}else{
			$('#top').fadeOut(700)
		}
	});
});
//#top {display:none;position:fixed;right:1%;bottom:16px;height:16px;width:48px;height:48px;background:#ff0000;}

$(document).ready(function(){
        $(window).scroll(function(){
            var bo = $("body").scrollTop();
            $('#hid').text(bo);
            if ( bo > 200 ) { $("#hid").css("display", "block"); } else { $("#hid").css("display", "none"); };
        })
    })



$(document).ready(function(){
        $(window).scroll(function(){
            var bo = $("body").scrollTop();
        if ( bo > 200 ) $("#hid").animate({'opacity':'1'},500);
    })
})


if ( bo < 200 ) $("#hid").animate({'opacity':'0'},500);



$(function () {
      var element = $("#hid"), display;
      $(window).scroll(function () {
        display = $(this).scrollTop() >= 200;
        display != element.css('opacity') && element.stop().animate({ 'opacity': display }, 500);




        