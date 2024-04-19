jQuery(document).ready(function($){

	var MQL = 1170;

  //FIXED HEADER ON
	$('#nav-stick').affix({
    offset: {
      top: 1,
    }
});

	//open/close primary navigation
	$('.fs-primary-nav-trigger').on('click', function(){
		$('.fs-menu-icon').toggleClass('is-clicked'); 
		$('.fs-header').toggleClass('menu-is-open');
    $('#nav-stick').addClass('affix-fix');
    $('#nav-stick2').addClass('affix-fix');
    $('.logo-hiding').addClass('logo-hide');
		
		//in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if( $('.fs-primary-nav').hasClass('is-visible') ) {
      $('#nav-stick').removeClass('affix-fix');
      $('#nav-stick2').removeClass('affix-fix');
      $('.logo-hiding').removeClass('logo-hide');
			$('.fs-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('body').removeClass('overflow-hidden');
			});
		} else {
			$('.fs-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('body').addClass('overflow-hidden');
			});	
		};
    
    return false;
    
	});
  
  // SUB MENU
  var fsParentSub = $(".fs-parent");
  var fsLiSub;
  
  fsParentSub.on('click', function(){
  
    fsLiSub = $(this).parent("li:first");
    if (fsLiSub.hasClass("fs-active")) {
      fsLiSub.find(".fs-sub:first").slideUp(function(){
        fsLiSub.removeClass("fs-active");
      });
    } else {
      
      var li = $(this).closest("li").parent("ul").children("li");
      if ($(li).is(".fs-active")) {
        $(li).removeClass("fs-active").children("ul").slideUp()
      }
      fsLiSub.addClass("fs-active");
      fsLiSub.find(".fs-sub:first").slideDown();
    }
    
    return false;
    
  });

});