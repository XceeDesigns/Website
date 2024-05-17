/* 
 * @author    ThemePunch <info@themepunch.com>
 * @link      http://www.themepunch.com/
 * @copyright 2018 ThemePunch
*/

;(function() {
	
	"use strict";
	
	var $,
		win;
	
	window.BubbleMorphAddOn = function(_$, slider, carousel) {
		
		if(!_$ || !slider) return;
		
		$ = _$;
		win = $(window);
		$.event.special.rsBubbleMorphDestroyed = {remove: function(evt) {evt.handler();}};
		
		return new BubbleMorph(slider, carousel);
		
	};
	
	function killBubbles() {
				
		var $this = $(this),
			bubbles = $this.data('bubbleaddon');
			
		if(bubbles) {
			
			bubbles.destroy();
			$this.removeData('bubbleaddon');
			
		}
		
	}
	
	function getValue(prop, level) {
		
		if(!prop) return false;
		if(level === 0) return prop[level];
		
		var minus = level,
			value = prop[level];
			
		while(value === 'inherit') {
			
			minus--;
			if(minus > -1) value = prop[minus];
			else value = prop[0];
			
		}
		
		return value;
		
	}
	
	function createBubbles() {
		
		var $this = $(this),
			bubbles = $this.data('bubbleaddon');
			
		if(bubbles) killBubbles.call(this);
		
		var bubbleObj = $this.data('bubbleObj');
		if(!bubbleObj) return;
		
		var levels = bubbleObj.levels,
			len = levels.length,
			width = win.width(),
			level = 0,
			scale,
			prev,
			levl;
			
		if(levels) {
		
			for(var i = 0; i < len; i++) {
				
				levl = levels[i];
				if(prev === levl) continue;
				if(width < levl) level = i;
				prev = levl;
				
			}
			
		}
		
		var wid = bubbleObj.layerW[level],
			high = bubbleObj.layerH[level],
			fullW = wid === '100%' || wid === 'full',
			fullH = high === '100%' || high === 'full';
		
		if(!fullW) {
			
			wid = parseInt(bubbleObj.layr.css('min-width'), 10);
			
		}
		else {
			
			var elem = !bubbleObj.carousel || bubbleObj.isStatic ? bubbleObj.slider : bubbleObj.slotholder;
			if(bubbleObj.fullAlign) {
			
				wid = elem.width();
				bubbleObj.wrapper[0].style.left = 0;
				
			}
			else {
				
				scale = Math.min(bubbleObj.slider.width() / bubbleObj.grids[level], 1);
				wid = bubbleObj.grids[level] * scale;
				
			}
			
		}
		
		if(!fullH) {
			
			high = parseInt(bubbleObj.layr.css('min-height'), 10);
			
		}
		else {
			
			high = !bubbleObj.isStatic ? bubbleObj.slotholder.height() : bubbleObj.slider.height();
			bubbleObj.wrapper[0].style.top = 0;
			
		}
		
		var blurStrength = getValue(bubbleObj.blurStrength, level),
			borderSize = getValue(bubbleObj.borderSize, level),
			borderColor = getValue(bubbleObj.borderColor, level),
			blurColor = getValue(bubbleObj.blurColor, level),
			blurX = getValue(bubbleObj.blurX, level),
			blurY = getValue(bubbleObj.blurY, level),
			bufferX = getValue(bubbleObj.bufferX, level),
			bufferY = getValue(bubbleObj.bufferY, level),
			numBubbles = getValue(bubbleObj.numBubbles, level),
			velX = getValue(bubbleObj.velX, level),
			velY = getValue(bubbleObj.velY, level);

		var newBubble = RsAddOnBubbles(
			
			wid,
			high,
			bubbleObj.slider,
			bubbleObj.canvas,
			parseInt(numBubbles, 10),
			bubbleObj.color,
			parseInt(blurStrength, 10),
			blurColor,
			parseInt(blurX, 10),
			parseInt(blurY, 10),
			borderColor,
			parseInt(borderSize, 10),
			parseInt(bufferX, 10),
			parseInt(bufferY, 10),
			parseFloat(velX),
			parseFloat(velY)
		
		);
		
		$this.data('bubbleaddon', newBubble);
		if($this.data('bubblesplaying')) playBubbles(newBubble, $this);
		
	}
	
	function playBubbles(bubbles, layr) {
		
		bubbles.pause = false;
		bubbles.screen.resize();
		
		if(!bubbles.started) {
				
			bubbles.started = true;
			bubbles.inited();
				
		}
		
		layr.data('bubblesplaying', true);
		bubbles.play();
		
	}
	
	function pauseBubbles(bubbles, layr) {
		
		bubbles.pause = true;
		layr.data('bubblesplaying', false);
		
	}
	
	function BubbleMorph(slider, carousel) {
		
		this.slider = slider;
		this.carousel = carousel;
		
		slider.one('revolution.slide.onloaded', this.onLoaded.bind(this))
			  .one('rsBubbleMorphDestroyed', this.destroy.bind(this));
		
	}
	
	BubbleMorph.prototype = {
		
		onLoaded: function() {
			
			var i,
				slider = this.slider,
				carousel = this.carousel,
				grids = slider[0].opt.gridwidth,
				levels = slider[0].opt.responsiveLevels;
			
			if(!Array.isArray(grids)) grids = [grids];
			while(grids.length < 4) grids[grids.length] = grids[grids.length - 1];
			for(i = 0; i < 4; i++) grids[i] = parseInt(grids[i], 10);
			
			if(levels) {
				
				if(!Array.isArray(levels)) levels = [levels];
				while(levels.length < 4) levels[levels.length] = levels[levels.length - 1];
				for(i = 0; i < 4; i++) levels[i] = parseInt(levels[i], 10);
				
			}
			
			this.morph = slider.find('.tp-bubblemorph').each(function() {

				var $this = $(this),
					canvas = $('<canvas />').appendTo($this),
					bubbles = this.getAttribute('data-numbubbles'),
					velX = this.getAttribute('data-bubblesspeedx'),
					velY = this.getAttribute('data-bubblesspeedy'),
					bufferX = this.getAttribute('data-bubblesbufferx'),
					bufferY = this.getAttribute('data-bubblesbuffery'),
					layerW = $this.attr('data-width').replace(/[[\]]/g, '').replace(/\'/g, '').split(','),
					layerH = $this.attr('data-height').replace(/[[\]]/g, '').replace(/\'/g, '').split(',');
				
				if(!Array.isArray(layerW)) layerW = [layerW];
				if(!Array.isArray(layerH)) layerH = [layerH];
				
				while(layerW.length < 4) layerW[layerW.length] = layerW[layerW.length - 1];
				while(layerH.length < 4) layerH[layerH.length] = layerH[layerH.length - 1];
				
				while(layerH.length < layerW.length) layerH[layerH.length] = layerH[layerH.length - 1];
				while(layerW.length < layerH.length) layerH[layerW.length] = layerW[layerW.length - 1];
				
				bubbles = bubbles.split('|');
				bufferX = bufferX.split('|');
				bufferY = bufferY.split('|');
				velX = velX.split('|');
				velY = velY.split('|');
				
				var obj = {
					
					velX: velX,
					velY: velY,
					layr: $this,
					grids: grids,
					layerW: layerW,
					layerH: layerH,
					slider: slider,
					levels: levels,
					bufferX: bufferX,
					bufferY: bufferY,
					canvas: canvas[0],
					carousel: carousel,
					numBubbles: bubbles,
					wrapper: $this.closest('.tp-parallax-wrap'),
					isStatic: $this.hasClass('tp-static-layer'),
					color: processColor(this.getAttribute('data-bubblesbg')),
					fullAlign: this.getAttribute('data-basealign') === 'slide',
					slotholder: $this.closest('.tp-revslider-slidesli').find('.slotholder')
					
				};
				
				var blurStrength = this.getAttribute('data-bubblesblur');
				if(blurStrength) {
					
					obj.blurStrength = blurStrength.split('|');
					obj.blurColor = $this.attr('data-bubblesblurcolor').split('|');
					obj.blurX = $this.attr('data-bubblesblurx').split('|');
					obj.blurY = $this.attr('data-bubblesblury').split('|');
					
				}
				
				var borderSize = this.getAttribute('data-bubblesbordersize');
				if(borderSize) {
					
					obj.borderSize = borderSize.split('|');
					obj.borderColor = $this.attr('data-bubblesbordercolor').split('|');
					
				}
				
				$this.data('bubbleObj', obj);
				
			});
			
			if(this.morph.length) {
				
				slider.on('revolution.slide.afterdraw', this.onResize.bind(this))
					  .on('revolution.slide.layeraction', this.layerAction.bind(this));
				
			}
			else {
				
				this.destroy();
				
			}
			
		},
		
		createBubbles: function() {
			
			this.morph.each(createBubbles);
			
		},
		
		onResize: function(e) {
			
			clearTimeout(this.resizeTimer);
			this.morph.each(killBubbles);
			this.resizeTimer = setTimeout(this.resize.bind(this), 250);
			
		},
		
		resize: function() {
			
			this.morph.each(createBubbles);
			
		},
		
		layerAction: function(e, data) {
			
			var bubbles = data.layer.data('bubbleaddon');
			if(!bubbles) {
				
				if(!data.layer.hasClass('tp-bubblemorph')) return;
				else this.createBubbles();
				
			}
			
			bubbles = data.layer.data('bubbleaddon');
			if(!bubbles.screen || !bubbles.screen.width || !bubbles.screen.height) {
				
				createBubbles.call(data.layer);
				bubbles = data.layer.data('bubbleaddon');
				
			}
			
			switch(data.eventtype) {
				
				case 'enterstage':
					
					playBubbles(bubbles, data.layer);
				
				break;
				
				case 'leftstage':
					
					pauseBubbles(bubbles, data.layer);
					
				break;
				
			}
			
		},
		
		checkRemoved: function() {
		
			// bounce if the slider has been removed from the DOM before the onloaded event fires
			if(!this.slider || !document.body.contains(this.slider[0])) {
				
				this.destroy();
				return true;
			
			}
			
			return false;
			
		},
		
		destroy: function() {
			
			this.slider.find('.tp-bubblemorph').each(function() {
				
				var $this = $(this),
					bubbles = $this.data('bubbleaddon');
					
				bubbles.pause = true;
				$this.removeData('bubbleaddon bubbleObj');
				
			});
			
			for(var prop in this) {
				
				if(this.hasOwnProperty(prop)) delete this[prop];
				
			}
			
		}
		
	};
	
	/*
		COLORS PROCESSING
	*/
	function sanitizeGradient(obj) {

		var colors = obj.colors,
			len = colors.length,
			ar = [],
			prev;
			

		for(var i = 0; i < len; i++) {
			
			var cur = colors[i];
			delete cur.align;
			
			if(prev) {
				if(JSON.stringify(cur) !== JSON.stringify(prev)) ar[ar.length] = cur;
			}
			else {
				ar[ar.length] = cur;
			}
			
			prev = cur;
			
		}
		
		obj.colors = ar;
		return obj;
		
	}
	
	function processColor(clr) {
		
		if(clr.trim() === 'transparent') {
			
			return ['#FFFFFF', false];
			
		}
		else if(clr.search(/\[\{/) !== -1) {

			try {
				
				clr = JSON.parse(clr.replace(/\&/g, '"'));
				clr = sanitizeGradient(clr); 
				return [clr, true];
				
			}
			catch(e) {
				
				return ['#FFFFFF', false];
				
			}
			
		}
		else if(clr.search('#') !== -1) {
			
			return [clr, false];
			
		}
		else if(clr.search('rgba') !== -1) {
			
			return [clr.replace(/\s/g, '').replace(/false/g, '1'), false];
			
		}
		else if(clr.search('rgb') !== -1) {
			
			return [clr.replace(/\s/g, ''), false];
			
		}
		else {
			
			return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(clr) ? [clr, false] : ['#FFFFFF', false];
			
		}
		
	}
	
	function rgbaString(r, g, b, a) {
		
		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
		
	}
	
	function radialGradient(ctx, w, h, colors) {
		
		w *= 0.5;
		h *= 0.5;
		
		var gradient = ctx.createRadialGradient(w, h, 0, w, h, w),
			len = colors.length,
			color;

		for(var i = 0; i < len; i++) {

			color = colors[i];
			gradient.addColorStop(color.position * 0.01, rgbaString(color.r, color.g, color.b, color.a));

		}

		return gradient;

	}
	
	function linearGradient(ctx, w, h, colors, angle) {
		
		var tx = 0, 
			ty = 0, 
			bx = 0, 
			by = 0,
			len;
		
		angle = parseInt(angle, 10);
		if(/0|90|180|270|360/.test(angle)) {
			
			switch(angle) {
				
				case 0:
				case 360:
					ty = h;
				break;
				
				case 90:
					bx = w;
				break;
				
				case 180:
					by = h;
				break;
				
				case 270:
					tx = w;
				break;
				
			}
			
		}
		else {
		
			w *= 0.5;
			h *= 0.5;
			
			var ang = (angle - 180) * (Math.PI / 180),
				hypt = h / Math.cos(ang),
				tr = w - Math.sqrt(hypt * hypt - h * h),
				diag = Math.sin(ang) * tr;
				
			len = hypt + diag;	
			tx = w + Math.cos(-Math.PI / 2 + ang) * len,
			ty = h + Math.sin(-Math.PI / 2 + ang) * len,
			bx = w + Math.cos( Math.PI / 2 + ang) * len,
			by = h + Math.sin( Math.PI / 2 + ang) * len;
				
		}
		
		var gradient = ctx.createLinearGradient(Math.round(tx), Math.round(ty), Math.round(bx), Math.round(by)),
		color,
		pos;
		
		len = colors.length;
		for(var i = 0; i < len; i++) {

			color = colors[i];
			pos = parseInt(color.position, 10);
			gradient.addColorStop(pos * 0.01, rgbaString(color.r, color.g, color.b, color.a));

		}
		
		return gradient;
	
	}
	
	/* ****************** */
	/* begin bubble magic */
	/* ****************** */
	function RsAddOnBubbles(wid, high, slider, canvas, numBubbles, color, blurStrength, blurColor, blurX, blurY, borderColor, borderSize, bufferx, buffery, velX, velY) {

	  var lava0;
	  var ge1doot = {
		screen: {
		  elem:     null,
		  callback: null,
		  ctx:      null,
		  width:    0,
		  height:   0,
		  left:     0,
		  top:      0,
		  init: function (callback, initRes) {
			  
			this.elem = canvas;
			this.callback = callback || null;
			if (this.elem.tagName == "CANVAS") this.ctx = this.elem.getContext("2d");
			
			/*
			window.addEventListener('resize', function () {
			  this.resize();
			}.bind(this), false);
			*/
			
			this.elem.onselectstart = function () { return false; };
			this.elem.ondrag        = function () { return false; };
			initRes && this.resize();
			return this;
		  },
		  resize: function () {

			var o = this.elem;
			
			this.width  = wid;
			this.height = high;
			
			for (this.left = 0, this.top = 0; o != null; o = o.offsetParent) {
			  this.left += o.offsetLeft;
			  this.top  += o.offsetTop;
			}
			
			if (this.ctx) {
			  this.elem.width  = this.width;
			  this.elem.height = this.height;
			}
			
			if(lava0) {
					
				lava0.width = this.width;
				lava0.height = this.height;
					
			}
			
			this.callback && this.callback();
			
		  },
		  
		  destroy: function() {
			  
			  for(var prop in this) if(this.hasOwnProperty(prop)) delete this[prop];
			  
		  }
		}
	  };

	  // Point constructor
	  var Point = function(x, y) {
		this.x = x;
		this.y = y;
		this.magnitude = x * x + y * y;
		this.computed = 0;
		this.force = 0;
	  };
	  Point.prototype.add = function(p) {
		return new Point(this.x + p.x, this.y + p.y);
	  };

	  // Ball constructor
	  var Ball = function(parent) {
		var min = 0.1;
		var max = 1.5;
		this.vel = new Point(
		  (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * velX), 
		  (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * velY)
		);
		
		this.pos = new Point(
		  parent.width * 0.2 + Math.random() * parent.width * 0.6,
		  parent.height * 0.2 + Math.random() * parent.height * 0.6
		);
		this.size = (parent.wh / 15) + ( Math.random() * (max - min) + min ) * (parent.wh / 15);
		
		this.width = parent.width;
		this.height = parent.height;
	  };

	  // move balls
	  Ball.prototype.move = function() {

		// bounce borders
		if (this.pos.x >= this.width - this.size - bufferx) {
		  if (this.vel.x > 0) this.vel.x = -this.vel.x;
		  this.pos.x = this.width - this.size - bufferx;
		} else if (this.pos.x <= this.size + bufferx) {
		  if (this.vel.x < 0) this.vel.x = -this.vel.x;
		  this.pos.x = this.size + bufferx;
		}

		if (this.pos.y >= this.height - this.size - buffery) {
		  if (this.vel.y > 0) this.vel.y = -this.vel.y;
		  this.pos.y = this.height - this.size - buffery;
		} else if (this.pos.y <= this.size + buffery) {
		  if (this.vel.y < 0) this.vel.y = -this.vel.y;
		  this.pos.y = this.size + buffery;
		}

		// velocity
		this.pos = this.pos.add(this.vel);

	  };

	  // lavalamp constructor
	  var LavaLamp = function(width, height, numBalls, color) {
		this.step = 5;
		this.width = width;
		this.height = height;
		this.wh = Math.min(width, height);
		this.sx = Math.floor(this.width / this.step);
		this.sy = Math.floor(this.height / this.step);
		this.paint = false;
		this.metaFill = drawFill(width, height, color);
		
		this.plx = [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
		this.ply = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1];
		this.mscases = [0, 3, 0, 3, 1, 3, 0, 3, 2, 2, 0, 2, 1, 1, 0];
		this.ix = [1, 0, -1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1];
		this.grid = [];
		this.balls = [];
		this.iter = 0;
		this.sign = 1;

		// init grid
		for (var i = 0; i < (this.sx + 2) * (this.sy + 2); i++) {
		  this.grid[i] = new Point(
			(i % (this.sx + 2)) * this.step, (Math.floor(i / (this.sx + 2))) * this.step
		  );
		}

		// create metaballs
		for (var k = 0; k < numBalls; k++) {
		  this.balls[k] = new Ball(this);
		}
	  };
	  
	   LavaLamp.prototype.destroy = function() {
		  
		  var prop;
		  for(prop in this.balls) if(this.balls.hasOwnProperty(prop)) delete this.balls[prop];
		  for(prop in this) if(this.hasOwnProperty(prop)) delete this[prop];
		   
	   };
	  
	  // compute cell force
	  LavaLamp.prototype.computeForce = function(x, y, idx) {

		var force;
		var id = idx || x + y * (this.sx + 2);

		if (x === 0 || y === 0 || x === this.sx || y === this.sy) {
		  force = 0.6 * this.sign;
		} else {
		  force = 0;
		  var cell = this.grid[id];
		  if(!cell) return;
		  var i = 0;
		  var ball;
		  while (ball = this.balls[i++]) {
			force += ball.size * ball.size / (-2 * cell.x * ball.pos.x - 2 * cell.y * ball.pos.y + ball.pos.magnitude + cell.magnitude);
		  }
		  force *= this.sign;
		}
		if(!this.grid[id]) return;
		this.grid[id].force = force;
		return force;
	  };
	  // compute cell
	  LavaLamp.prototype.marchingSquares = function(next) {
		var x = next[0];
		var y = next[1];
		var pdir = next[2];
		var id = x + y * (this.sx + 2);
		if(!this.grid[id]) return;
		if (this.grid[id].computed === this.iter) {
		  return false;
		}
		var dir, mscase = 0, toBounce;

		// neighbors force
		for (var i = 0; i < 4; i++) {
		  var idn = (x + this.ix[i + 12]) + (y + this.ix[i + 16]) * (this.sx + 2);
		  if(!this.grid[idn]) {
			  toBounce = true;
			  break;
		  }
		  var force = this.grid[idn].force;
		  if ((force > 0 && this.sign < 0) || (force < 0 && this.sign > 0) || !force) {
			// compute force if not in buffer
			force = this.computeForce(
			  x + this.ix[i + 12],
			  y + this.ix[i + 16],
			  idn
			);
		  }
		  if (Math.abs(force) > 1) mscase += Math.pow(2, i);
		}
		if(toBounce) return;
		if (mscase === 15) {
		  // inside
		  return [x, y - 1, false];
		} else {
		  // ambiguous cases
		  if (mscase === 5) dir = (pdir === 2) ? 3 : 1;
		  else if (mscase === 10) dir = (pdir === 3) ? 0 : 2;
		  else {
			// lookup
			dir = this.mscases[mscase];
			if(!this.grid[id]) return;
			this.grid[id].computed = this.iter;
		  }
		  // draw line
		  var ix = this.step / (
			  Math.abs(Math.abs(this.grid[(x + this.plx[4 * dir + 2]) + (y + this.ply[4 * dir + 2]) * (this.sx + 2)].force) - 1) /
			  Math.abs(Math.abs(this.grid[(x + this.plx[4 * dir + 3]) + (y + this.ply[4 * dir + 3]) * (this.sx + 2)].force) - 1) + 1
			);
		  ctx.lineTo(
			this.grid[(x + this.plx[4 * dir]) + (y + this.ply[4 * dir]) * (this.sx + 2)].x + this.ix[dir] * ix,
			this.grid[(x + this.plx[4 * dir + 1]) + (y + this.ply[4 * dir + 1]) * (this.sx + 2)].y + this.ix[dir + 4] * ix
		  );
		  this.paint = true;
		  // next
		  return [
			x + this.ix[dir + 4],
			y + this.ix[dir + 8],
			dir
		  ];
		}
	  };

	  LavaLamp.prototype.renderMetaballs = function() {
		var i = 0, ball;
		while (ball = this.balls[i++]) ball.move();
		// reset grid
		this.iter++;
		this.sign = -this.sign;
		this.paint = false;
		ctx.fillStyle = this.metaFill;
		
		if(blurStrength) {
		
			ctx.shadowBlur = blurStrength;
			ctx.shadowColor = blurColor;
			ctx.shadowOffsetX = blurX;
			ctx.shadowOffsetY = blurY;

		}
		
		if(borderSize) {
			
			ctx.strokeStyle = borderColor;
			ctx.lineWidth = borderSize;
			
		}
		
		ctx.beginPath();
		// compute metaballs
		i = 0;
		
		while (ball = this.balls[i++]) {
		  // first cell
		  var next = [
			Math.round(ball.pos.x / this.step),
			Math.round(ball.pos.y / this.step), false
		  ];
		  // marching squares
		  do {
			next = this.marchingSquares(next);
		  } while (next);
		  // fill and close path
		  if (this.paint) {
			ctx.fill();
			ctx.closePath();
			if(borderSize) ctx.stroke();
			ctx.beginPath();
			this.paint = false;
		  }
		}
	  };
	  
	  var drawFill = function(w, h, color) {
		  
		 if(color[1]) {
			 
			 color = color[0];
			 if(color.type === 'radial') {
				 
				 return radialGradient(ctx, w, h, color.colors);
				 
			 }
			 else {
				 
				 return linearGradient(ctx, w, h, color.colors, color.angle);
				 
			 }
			 
		 }
		 else {
			 
			 return color[0];
			 
		 }
		  
	  };

	  // main loop
	  var run = function() {
		
		if(!addonObj || addonObj.pause) return;
		
		ctx.clearRect(0, 0, screen.width, screen.height);
		lava0.renderMetaballs();
		requestAnimationFrame(run);
		
	  };
	  // canvas
	  var screen = ge1doot.screen.init(null, true),
		  ctx = screen.ctx;
	  
	  var inited = function() { 
	  
		lava0 = new LavaLamp(screen.width, screen.height, numBubbles, color);
		
	  };
	  
	  function destroy() {
		 
		 addonObj.pause = true;
		 cancelAnimationFrame(run);
		 ctx.clearRect(0, 0, screen.width, screen.height);
		 
		 if(lava0) lava0.destroy();
		 screen.destroy();
		 
		 lava0 = null;
		 ge1doot = null;
		 Point = null;
		 Ball = null;
		 LavaLamp = null;
		 run = null;
		 screen = null;
		 addonObj = null;
		 inited = null;
		 drawFill = null;
		 ctx = null;
		 
	  }
		
	  var addonObj = {
		  
		  play: run,
		  pause: false,
		  screen: screen,
		  inited: inited,
		  started: false,
		  destroy: destroy
		  
	  };

	  return addonObj;

	}

	
})();










