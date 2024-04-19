jQuery(document).ready(function($) {

// Flex Slider
  $(window).ready(function() {
    
    //FLEX SLIDER CAROUSEL INITIALIZE ---------------------------------------------
    if ( $('.carousel-post-style1').length ){
			$('.carousel-post-style1').flexslider({ });    
    }; 
     
    $('.flexslider').flexslider({
      animation: 'fade',
      animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
      slideshow: true,                //Boolean: Animate slider automatically
      slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
      animationSpeed: 800,             //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
      pauseOnHover: true, 
      pauseOnAction:false,
      controlNav: false,
      directionNav: true,
      controlsContainer: '.flex-container',
      prevText: '',
      nextText: '',
      start: function(slider) {
        var sliderMain = $('.slider-1 .flex-active-slide');
         var toptitle = $('.slider-1 .flex-active-slide .flex-top-bot').data('toptitle');
         var topimage = $('.slider-1 .flex-active-slide .item').data('topimage');
         var topfade = $('.slider-1 .flex-active-slide .fade-flex').data('topfade');
         var bottomtext = $('.slider-1 .flex-active-slide .flex-bot-top').data('bottomtext');
         var bottomlinks = $('.slider-1 .flex-active-slide .links').data('bottomlinks');
         
         sliderMain.find('.item').css({ top: topimage});
         sliderMain.find('.item').animate({ right: '0', opacity: '1'}, 1000);
         sliderMain.find('.fade-flex').css({ top: topfade});
         sliderMain.find('.fade-flex').animate({ opacity: '1'}, 1000);
         sliderMain.find('.flex-top-bot').animate({ left: '0', top: toptitle, opacity: '1'}, 1500);
         sliderMain.find('.flex-bot-top').animate({ left: '0', bottom: bottomtext, opacity: '1'}, 1500);
         sliderMain.find('.links').css({ bottom: bottomlinks});
         sliderMain.find('.links').animate({ left: '0', opacity: '1'}, 1800);
         
         // remove class loading after start
         slider.removeClass('loading');
          },
      before: function(slider) {
        var sliderMain = $('.slider-1 .flex-active-slide');
        
         sliderMain.find('.item').animate({ right: '-100%', opacity: '0'}, 1000);
         sliderMain.find('.fade-flex').animate({ opacity: '0'}, 1000);
         sliderMain.find('.flex-top-bot').animate({ left: '0', opacity: '0'}, 1500);
         sliderMain.find('.flex-bot-top').animate({ left: '0', bottom: '-50%', opacity: '0'}, 1500);
         sliderMain.find('.links').animate({ left: '-100%', opacity: '0'}, 1800);
          },
      after: function(slider) {
        var sliderMain = $('.slider-1 .flex-active-slide');
        
         var toptitle = $('.slider-1 .flex-active-slide .flex-top-bot').data('toptitle');
         var topimage = $('.slider-1 .flex-active-slide .item').data('topimage');
         var topfade = $('.slider-1 .flex-active-slide .fade-flex').data('topfade');
         var bottomtext = $('.slider-1 .flex-active-slide .flex-bot-top').data('bottomtext');
         var bottomlinks = $('.slider-1 .flex-active-slide .links').data('bottomlinks');
         
         sliderMain.find('.item').css({ top: topimage});
         sliderMain.find('.item').animate({ right: '0', opacity: '1'}, 1000);
         sliderMain.find('.fade-flex').css({ top: topfade});
         sliderMain.find('.fade-flex').animate({ opacity: '1'}, 1000);
         sliderMain.find('.flex-top-bot').animate({ left: '0', top: toptitle, opacity: '1'}, 1500);
         sliderMain.find('.flex-bot-top').animate({ left: '0', bottom: bottomtext, opacity: '1'}, 1500);
         sliderMain.find('.links').css({ bottom: bottomlinks});
         sliderMain.find('.links').animate({ left: '0', opacity: '1'}, 1800);
          }
    });

	});
								
});