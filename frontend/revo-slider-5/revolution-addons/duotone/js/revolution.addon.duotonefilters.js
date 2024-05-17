;var RsAddonDuotone = function($, api, simplified, easing, timing) {
	
	if(!$ || typeof api === 'undefined' || !api.length) return;
	var supports = "CSS" in window && "supports" in window.CSS;
	
	if(supports) {
		
		var blends = ["luminosity", "hue", "darken", "lighten", "hard-light", "soft-light", "color-dodge", "color", "screen"],
			len = blends.length;
			
		for(var i = 0; i < len; i++) {
			
			if(!window.CSS.supports("mix-blend-mode", blends[i])) {	
				supports = false;
				break;
				
			}
		}
		
	}
	
	if(supports) {
		
		var duotones = api.find('li[data-duotonefilter]');
		if(duotones.length) {
			
			if(simplified) {

				if(!isNaN(timing)) timing = parseInt(timing, 10);
				else timing = 750;
				timing = Math.max(100, Math.min(5000, timing));
				
				duotones.each(function() {
					
					this.setAttribute('data-transition', 'fade');
					this.setAttribute('data-masterspeed', timing);
					this.setAttribute('data-easein', 'Linear.easeInOut');
					this.setAttribute('data-easeout', 'Linear.easeInOut');
					
				});
				
				if(!easing) easing = 'ease-in';
				timing *= 0.001;
				
				api.addClass('rs-duotone-simplified');
				$('<style type="text/css">').html('#' + api[0].id + '.rs-duotone-simplified .tp-revslider-slidesli {transition: opacity ' + timing + 's ' + easing + '}').appendTo(jQuery('head'));
				
			}
			
			api.one('revolution.slide.onloaded', function() {
				
				duotones.each(function() {
					
					var $this = tpj(this),
					slotholder = $this.find('.slotholder');
					slotholder.wrap('<div class="' + $this.attr("data-duotonefilter") + '" />');
					
				});
				
			});
			
			if(simplified) {
				
				api.on('revolution.slide.onbeforeswap', function(e, data) {
           
					$('.rs-duotone-slide').removeClass('rs-duotone-slide');
					data.currentslide.addClass('rs-duotone-slide');
					
				}).on('revolution.slide.onafterswap', function(e, data) {
				   
					$('.rs-duotone-slide').removeClass('rs-duotone-slide');
					
				});
				
			}
			
		}
		
	}
	
};