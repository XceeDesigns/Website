/**
 * @author    ThemePunch <info@themepunch.com>
 * @link      https://www.themepunch.com/
 * @copyright 2018 ThemePunch
 */
(function() {
	
	var $,
		touch = 'ontouchend' in document;
	
	window.RsLiquideffectAddOn = function(_$, slider) {
		
		if(!_$ || !slider || typeof PIXI === 'undefined') return;
		
		$ = _$;
		$.event.special.rsLiquidEffectDestroyed = {remove: function(evt) {evt.handler();}};
		
		var effects = slider.find('li[data-liquideffect]').each(function() {
			
			var url,
				$this = $(this),
				settings = JSON.parse($this.attr('data-liquideffect'));
				
			if(!settings) return; 
			
			var sprite,
				img = $this.children('img'),
				base = slider[0].opt.jsFileLocation || '';
				
			if(base) base = base.split('/revslider');
			base = base.length === 2 ? base[0] : '';
			
			if(!/all|smart/.test(slider[0].opt.lazyType)) slider[0].opt.lazyType = 'smart';
			if(!img.attr('data-lazyload')) {
				
				sprite = img.attr('src');
				img.attr('data-lazyload', sprite);
				img.attr('src', base.replace('/extensions', '') + '/revslider/admin/assets/images/dummy.png');
				
			}
			else {
				sprite = img.attr('data-lazyload');
			}
			
			if(!sprite) {
				
				sprite = $this.find('.slotholder').contents().filter(function() {return this.nodeType === 8;});
				if(sprite.length) {
					
					url = sprite[0].nodeValue;
					sprite = false;
					
					if(url) {
						
						url = url.split('data-lazyload="');
						if(url.length === 2) {
							
							url = url[1].split('"');
							if(url.length > 1) sprite = url[0];
							
						}
						else {
							
							url = url.split('src="');
							if(url.length === 2) {
								
								url = url[1].split('"');
								if(url.length > 1) sprite = url[0];
								
							}
							
						}
						
					}
					
				}
				else {
					
					sprite = false;
					
				}
				
			}
			
			if(sprite) {
				
				var easing;
				settings.sprite = sprite; 
				if(touch && settings.mobile) settings.interactive = false;
				
				var easing = settings.easing.split('.');
				settings.easing = punchgs[easing[0]][easing[1]];
					
				var trans = settings.transcross ? 'crossfade' : 'fade';
				$this.attr({
					
					'data-transition': trans, 
					'data-masterspeed': settings.transtime,
					'data-easein': settings.easing,
					'data-easeout': settings.easing
					
				}).removeAttr('data-kenburns').data({liquideffectsettings: settings, liquideffectorig: jQuery.extend({}, settings)});
				
				if(settings.interactive) {
					easing = settings.intereasing.split('.');
					settings.intereasing = punchgs[easing[0]][easing[1]];
				}
				
			}
			else {
				
				$this.removeData('liquideffect').removeAttr('data-liquideffect');
				
			}
			
		});
		
		effects = slider.find('li[data-liquideffect]');
		if(effects.length) return new LiquidEffect(slider, effects);
		else return false;
		
	};
	
	function LiquidEffect(slider, effects) {
		
		this.slider = slider;
		this.effects = effects;
		this.firstrun = true;
		
		slider.one('revolution.slide.onloaded', this.onLoaded.bind(this))
			  .one('rsLiquidEffectDestroyed', this.destroy.bind(this));
		
	}
	
	LiquidEffect.prototype = {
		
		onLoaded: function() {
			
			this.slider.on('revolution.slide.onbeforeswap', this.beforeChange.bind(this))
					   .on('revolution.slide.onchange', this.onChange.bind(this));
			
		},
		
		onChange: function(e, data) {
			
			if(!this.ranOnce) {
			
				this.beforeChange(false, {nextslide: data.currentslide});
				return;
			
			}
			
			var canvas = data.prevslide.removeClass('liquid-force-visible').data('liquideffectcanvas');
			if(canvas) {
				
				canvas.ticker.stop();
				canvas.tweenOut = null;
				
			}
			
			canvas = data.currentslide.data('liquideffectcanvas');
			if(canvas && !canvas.started) canvas.animateIn();
			
		},
		
		beforeChange: function(e, data) {
			
			this.ranOnce = true;
			
			var canvas,
				slides = [];
			
			if(!this.effectsCreated) {
				
				this.effectsCreated = true;
				this.effects.each(function() {
				
					var $this = $(this),
						sizes = $this.data('liquideffectsettings').imagesize.split('|');
					
					if(sizes.length === 2) {	
						
						$this.data('liquideffectcanvas', new LiquidCanvas($this, parseInt(sizes[0], 10), parseInt(sizes[1], 10)));
						
					}
					else {
						
						slides[slides.length] = this;
					
					}
					
				});
				
			}
			
			function loadImage($this, slide) {
						
				var img = new Image(),
					bgImg = slide.find('.tp-bgimg');
				
				img.crossOrigin = 'Anonymous';
				img.src = bgImg.css('background-image').slice(4, -1).replace(/"/g, '');
				img.onload = function() {
					
					var canvas = new LiquidCanvas(slide, parseInt(img.naturalWidth, 10), parseInt(img.naturalHeight, 10));
					slide.data('liquideffectcanvas', canvas);
					
					$this.imgCount++;
					if($this.imgCount === slides.length) $this.run(data);
					
				};
				
			}
			
			if(!slides.length) {
				
				this.run(data);
				
			}
			else {
				
				this.imgCount = 0;
				for(var i = 0; i < slides.length; i++) loadImage(this, $(slides[i]));
				
			}
			
		},
		
		run: function(data) {
			
			var canvas;
			if(!this.firstrun) {
			
				if(data.currentslide) {
					canvas = data.currentslide.data('liquideffectcanvas');
					if(canvas) canvas.animateOut(data.nextslide);
				}
			
				canvas = data.nextslide.data('liquideffectcanvas');
				if(canvas) {
					
					data.nextslide.addClass('liquid-force-visible');
					if(canvas.settings.transcross) canvas.animateIn();
					
				}
				
			}
			else {
				
				canvas = data.nextslide.data('liquideffectcanvas');
				if(canvas) canvas.animateIn(true);
				this.firstrun = false;
				
			}
			
		},
		
		destroy: function() {
			
			if(this.slider) this.slider.off('revolution.slide.onloaded revolution.slide.onbeforeswap revolution.slide.onafterswap');
			if(this.effects) this.effects.each(function() {jQuery(this).removeData('liquideffectcanvas liquideffectsettings liquideffectorig');});
			for(var prop in this) if(this.hasOwnProperty(prop)) delete this[prop];
			
		}
		
	};
	
	function LiquidCanvas(slide, w, h) {
		
		this.w = w;
		this.h = h;
		this.slide = slide;
		this.settings = slide.data('liquideffectsettings');  
		this.orig = slide.data('liquideffectorig');  
		
		this.displacement = new PIXI.Sprite.fromImage(this.settings.image, true);
		this.displacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;  
		this.displacement.scale.x = 2;
		this.displacement.scale.y = 2;
		this.displacement.anchor.set(0.5);
        this.displacement.x = w / 2;
        this.displacement.y = h / 2;  
		
		var sprite = this.settings.sprite,
			texture = new PIXI.Texture.fromImage(sprite, true),
			container = new PIXI.Container();
		
		this.img = new PIXI.Sprite(texture);
		this.img.anchor.set(0.5);
		this.img.x = w / 2;
		this.img.y = h / 2;  
		container.addChild(this.img);
		
		this.filter = new PIXI.filters.DisplacementFilter(this.displacement);
		this.filter.autoFit = true;
		
		this.stage = new PIXI.Container();
		this.stage.addChild(container);
		this.stage.addChild(this.displacement);
		this.stage.filters = [this.filter];
		this.stage.interactive = true;
		
		this.renderer = new PIXI.autoDetectRenderer(w, h, {transparent: true});
		var style = this.renderer.view.style;
		style.objectFit = 'cover';
		style.width = '100%';
		style.height = '100%';
		style.top = '50%';
		style.left = '50%';
		style.transform = 'translate( -50%, -50% ) scale(1.2)';  
		slide.find('.slotholder').append(this.renderer.view);
		
		if(this.settings.autoplay) {
			this.filter.scale.x = this.settings.scalex;
			this.filter.scale.y = this.settings.scaley;
		}
		else {
			this.filter.scale.x = 0;
			this.filter.scale.y = 0;
		}
		
		if(this.settings.interactive) {
			
			container.interactive = true;
			if(this.settings.event === 'mousedown') {
				
				container.buttonMode = true;
				container.pointerdown = this.onClick.bind(this);
				container.pointerup = container.pointerout = this.onReturn.bind(this);
				
			}
			else {
				
				container.pointerover = this.onMouseEnter.bind(this);
				container.pointermove = this.onMouseMove.bind(this);
				container.pointerout = this.onMouseLeave.bind(this);
				
			}
			
		}
		else {
			
			this.renderer.view.style.pointerEvents = 'none';
			
		}
		
		this.supressEvents = true;
		this.started = false;
		this.ticker = new PIXI.ticker.Ticker();
		this.ticker.add(this.tick.bind(this));
		
	}
	
	LiquidCanvas.prototype = {
		
		tick: function(delta) {
			
			if(this.settings.autoplay) {
				
				if(this.settings.speedx) this.displacement.x += this.settings.speedx * delta;
				if(this.settings.speedy) this.displacement.y += this.settings.speedy;
				if(this.settings.rotationx) this.displacement.rotation.x += this.settings.rotationx;
				if(this.settings.rotationy) this.displacement.rotation.y += this.settings.rotationy;
				if(this.settings.rotation) this.displacement.rotation += this.settings.rotation * Math.PI / 180;
				
			}

			this.renderer.render(this.stage);
			
		},
		
		onClick: function() {
			
			if(this.supressEvents) return;
			
			var $this = this,
				time = this.settings.intertime * 0.001;
			
			if(this.settings.interscalex || this.settings.interscaley) {
				
				var obj = {ease: this.settings.intereasing,overwrite: 'all'};
				
				if(this.settings.interscalex) obj.x = this.orig.scalex + this.settings.interscalex;
				if(this.settings.interscaley) obj.y = this.orig.scaley + this.settings.interscaley; 
				
				punchgs.TweenLite.to(this.filter.scale, time, obj);
				
			}
			
			punchgs.TweenLite.to(this.settings, time, {
				
				speedx: this.orig.speedx + this.settings.interspeedx, 
				speedy: this.orig.speedy + this.settings.interspeedy,
				rotation: this.orig.rotation + this.settings.interotation,
				ease: this.settings.intereasing,
				overwrite: 'all',
				
			});
			
		},
		
		onReturn: function() {
			
			if(this.supressEvents) return;			
			var time = this.settings.intertime * 0.001;
	
			punchgs.TweenLite.to(this.filter.scale, time, {
				
				x: this.orig.scalex,
				y: this.orig.scaley,  
				ease: this.settings.intereasing,
				overwrite: 'all'
				
			});
			
			punchgs.TweenLite.to(this.settings, time, {
				
				speedx: this.orig.speedx, 
				speedy: this.orig.speedy,
				rotation: this.orig.rotation,
				ease: this.settings.intereasing,
				overwrite: 'all',
				
			});
			
		},
		
		onMouseMove: function(e) {
			
			if(this.supressEvents) return;
			if(!this.entered) {
				
				this.onMouseEnter(e);
				return;
				
			}
				
			var complete,
				$this = this,
				x = e.data.global.x,
				y = e.data.global.y,
				distX = x - this.x,
				distY = y - this.y,
				t = Date.now(),
				distT = t - this.t,
				v = Math.sqrt(distX * distX + distY * distY) / distT,
				time = this.settings.intertime * 0.001;
				
			this.x = x;
			this.y = y;
			this.t = t;
			
			if(this.settings.interscalex || this.settings.interscaley) {
				
				var obj = {ease: this.settings.intereasing, overwrite: 'all', onComplete: this.onReturn.bind(this)};
				
				if(this.settings.interscalex) obj.x = this.settings.interscalex * v;
				if(this.settings.interscaley) obj.y = this.settings.interscaley * v; 
				
				complete = true;
				punchgs.TweenLite.to(this.filter.scale, time, obj);
				
			}
			
			var obj2 = {
				
				speedx: this.orig.speedx + this.settings.interspeedx, 
				speedy: this.orig.speedy + this.settings.interspeedy,
				rotation: this.orig.rotation + this.settings.interotation,
				ease: this.settings.intereasing,
				overwrite: 'all',
				
			};
			
			if(!complete) obj2.onComplete = this.onReturn.bind(this);
			punchgs.TweenLite.to(this.settings, time, obj2);
			
		},
		
		onMouseEnter: function(e) {
			
			if(this.supressEvents) return;
			
			this.entered = true;
			this.x = e.data.global.x;
			this.y = e.data.global.y;
			this.t = Date.now();
			
		},
		
		onMouseLeave: function() {
			
			this.entered = false;
			
		},
		
		eventsReady: function() {
			
			this.supressEvents = false;
			
		},

		onComplete: function() {
			
			var canvas = this.nextslide.data('liquideffectcanvas');
			if(canvas && !canvas.started) canvas.animateIn();
			this.nextslide = false;
			
		},
		
		onUpdateIn: function() {
			
			if(this.tweenIn) {
			
				this.displacement.rotation += this.tweenIn.progress() * 0.02;      
				this.displacement.scale.set(this.tweenIn.progress() * 3);
				
			}
			
		},
		
		onUpdateOut: function() {
			
			if(this.tweenOut) {
				
				this.displacement.rotation += this.tweenOut.progress() * 0.02;      
				this.displacement.scale.set(this.tweenOut.progress() * 3);
				
			}
			
		},
		
		transitionIn: function() {
			
			var transTime = this.settings.transtime * 0.001;
			var obj1 = {
				
				x: this.orig.scalex, 
				y: this.orig.scaley,  
				ease: this.settings.easing,
				overwrite: 'all',
				delay: this.del
				
			};
			
			var obj2 = {
				
				speedx: this.orig.speedx, 
				speedy: this.orig.speedy,
				rotationx: this.orig.rotationx, 
				rotationy: this.orig.rotationy, 
				rotation: this.orig.rotation, 
				ease: this.settings.easing,
				overwrite: 'all',
				delay: this.del
			
			};

			if(this.interactive && this.event === 'mousedown') obj1.onComplete = this.eventsReady.bind(this);
			else this.supressEvents = false;
			
			if(this.settings.transpower) obj2.onUpdate = this.onUpdateIn.bind(this);
			punchgs.TweenLite.to(this.filter.scale, transTime, obj1);
			
			this.tweenIn = punchgs.TweenLite.to(this.settings, transTime, obj2);
			punchgs.TweenLite.to(this.renderer.view, transTime * 0.5, {opacity: 1, ease: this.settings.easing, overwrite: 'all', delay: this.del});
			
			this.ticker.start(); 
			
		},
		
		animateIn: function(first) {
			
			this.reset();
			this.started = true;
			this.del = this.settings.transcross || first ? (this.settings.transtime * 0.001) * 0.5 : 0;
			this.timer = setTimeout(this.transitionIn.bind(this), this.del);
			
		},
		
		animateOut: function(nextslide) {
			
			clearTimeout(this.timer);
			
			this.tweenIn = null;
			this.supressEvents = true;
			this.started = false;
			
			var transTime = this.settings.transtime * 0.001;
			var obj = {
				
				speedx: this.orig.speedx + this.settings.transpeedx, 
				speedy: this.orig.speedy + this.settings.transpeedy,
				rotationx: this.orig.rotationx + this.settings.transrotx, 
				rotationy: this.orig.rotationy + this.settings.transroty, 
				rotation: this.orig.rotation + this.settings.transrot, 
				ease: this.settings.easing,
				overwrite: 'all',
				
			};
			
			if(this.settings.transcross && nextslide) {
				
				this.nextslide = nextslide;
				obj.onComplete = this.onComplete.bind(this);
				
			}
			
			if(this.settings.transpower) obj.onUpdate = this.onUpdateOut.bind(this);
			punchgs.TweenLite.to(this.filter.scale, transTime, {
				
				x: this.orig.scalex + this.settings.transitionx, 
				y: this.orig.scaley + this.settings.transitiony, 
				ease: this.settings.easing,
				overwrite: 'all'
				
			});	
			
			this.tweenOut = punchgs.TweenLite.to(this.settings, transTime, obj);
			punchgs.TweenLite.to(this.renderer.view, transTime, {opacity: 0, ease: this.settings.easing, delay: transTime * 0.5});
			
		},
		
		reset: function(kill) {
			
			this.tweenIn = null;
			this.tweenOut = null;
			this.ticker.stop();
			clearTimeout(this.timer);
			
			punchgs.TweenLite.killTweensOf(this.filter.scale);
			punchgs.TweenLite.killTweensOf(this.settings);
			punchgs.TweenLite.killTweensOf(this.renderer.view);
			
			if(kill) return;
			if(this.settings.power) {
				this.displacement.rotation = 0;
				this.displacement.scale.set(1);
			}
			
			this.displacement.x = this.w / 2;
			this.displacement.y = this.h / 2; 
			this.displacement.rotation.x = 0;
			this.displacement.rotation.y = 0;
			this.displacement.rotation = 0;
			this.settings.speedx = this.orig.speedx + this.settings.transpeedx;
			this.settings.speedy = this.orig.speedy + this.settings.transpeedy;
			this.settings.rotationx = this.orig.rotationx + this.settings.transrotx;
			this.settings.rotationy = this.orig.rotationy + this.settings.transroty;
			this.filter.scale.x = this.orig.scalex + this.settings.transitionx;
			this.filter.scale.y = this.orig.scaley + this.settings.transitiony;
			this.renderer.view.style.opacity = 0;
			
		},
		
		destroy: function() {
			
			if(this.ticker) {
				
				this.reset(true);
				this.container.pointerdown = null;
				this.container.pointerup = null;
				this.container.pointerover = null;
				this.container.pointerout = null;
				this.container.touchstart = null;
				this.container.touchend = null;
				
			}
			
			if(this.renderer) this.slide.remove(this.renderer.view);
			for(var prop in this) if(this.hasOwnProperty(prop)) delete this[prop];
			
		}
		
	};
	
})();














