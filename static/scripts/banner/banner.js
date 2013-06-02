(function(){
	var allScripts = document.getElementsByTagName("script");
	var theScript = null;
	for(var c=0, l=allScripts.length;c<l;++c){
		var tempScript = allScripts[c];
		if(tempScript.src.match("banner.js") != null && !tempScript.getAttribute("data-banner-used")){
			theScript = tempScript;
			break;
		}
	}
	if(!theScript){
		throw("Error in recognize script in the DOM. Is your browser crazy? :)");
		return; // Nothing to do
	}
	if(!document.createElement("canvas").getContext && !window.FlashCanvas){ 
		/* It's IE? */
		window.FlashCanvasOptions = {
		    swfPath: "flash/"
		};
		var url = "http://fjorgemota.com/static/scripts/banner/flashcanvas.js";
		var callback = arguments.callee; 
		(function(){
			if(!window.FlashCanvas){ // It's loaded?
				setTimeout(arguments.callee, 200); // Re-call it in a interval!
			}
			else{
				callback(); // Call the callback!
			}
		})()
		var element = document.createElement("script");
		element.src = url;
		element.async = true; // It's async! :D
		theScript.parentNode.insertBefore(element, theScript);// Load!
		return // Just return!
	}
	theScript.setAttribute("data-banner-used", "true");
	/* Start RequestAnimationFrame */;
	var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
    window.Color = (function(){
    	var obj = (function(color_name){
	    	var color_name = color_name;
	    	var hex_code = null;
	    	var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
		    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
		    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
		    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
		    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
		    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
		    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
		    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
		    "honeydew":"#f0fff0","hotpink":"#ff69b4",
		    "indianred ":"#cd5c5c","indigo ":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
		    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
		    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
		    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
		    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
		    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
		    "navajowhite":"#ffdead","navy":"#000080",
		    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
		    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
		    "red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
		    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
		    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
		    "violet":"#ee82ee",
		    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
		    "yellow":"#ffff00","yellowgreen":"#9acd32"};
		
		    if (typeof colours[color_name.toLowerCase()] != 'undefined'){
		    	var hex_code = colours[color_name.toLowerCase()];
		    }
		    else{
		    	var hex_code = color_name;
		    }
		    function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
		    this.getRed = function(){
		    	return parseInt((cutHex(hex_code)).substring(0,2),16)
		    }
		    this.getGreen = function(){
		    	return parseInt((cutHex(hex_code)).substring(2,4),16)
		    }
		    this.getBlue = function(){
		    	return parseInt((cutHex(hex_code)).substring(4,6),16)
		    }
		    this.toString = function(){
		    	return hex_code;
		    }
	    });
	   var colors_names = ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","honeydew","hotpink","indianred ","indigo ","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgrey","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"];
	   for(var c=0,l=colors_names.length;c<l;++c){
	   	var color_name = colors_names[c];
	   	obj[color_name] = new obj(color_name);
	   	obj[color_name.toUpperCase()] = new obj(color_name);
	   }
	   return obj;
    })();
    window.TextAlign = {
    	"LEFT": "left",
    	"CENTER":"center",
    	"RIGHT": "right"
    };
    window.Font = (function(){
    	var obj = (function(name, style, size){
    		if(typeof(style) != "object"){
    			style = [style||""];
    		}
    		var l = style.pop();
    		if(l != ""){
    			style.push(l);
    			style.push("");
    		}
    		this.toString = function(){
    			return style.join(" ")+size+"pt"+" "+name;
    		}
    	});
    	obj.BOLD = "bold";
    	obj.ITALIC = "italic";
    	return obj;
    })
    window.Graphics = (function(context){
    	this.context = context;
    	this.actualColor = null;
    	this.actualAlign = TextAlign.LEFT;
    	this.actualFont = null;
    	this.setColor = function(color){
    		if(this.actualColor != color.toString()){
    			this.actualColor = color.toString();
    			context.fillStyle = this.context.strokeStyle = this.actualColor;
    		}
    	}
    	this.setFont = function(font){
    		if(this.actualFont != font.toString()){
    			this.actualFont = font.toString();
    			this.context.font = font;
    		}
    	}
    	this.getColor = function(){
    		return new Color(this.actualColor);
    	}
    	this.setTextAlign = function(align){
    		if(this.actualAlign != align){
    			this.actualAlign = align;
    			this.context.textAlign = align;
    		}
    	}
    	this.getContext = function(){
    		return this.context;
    	}
    	this.setColor(Color.WHITE);
    	var self = this;
    	function proxy(fn){
    		return (function(){
    			self.context[fn].apply(self.context, arguments);
    		});
    	}
    	var fns = ["fillRect", "drawRect", ["drawString","fillText"]];
    	for(var c=0,l=fns.length;c<l;++c){
    		var fn = fns[c];
    		if((typeof(fn) == "object" && fn.length < 2) || typeof(fn) == "string"){
    			fn = [fn, fn]; 
    		}
    		this[fn[0]] = proxy(fn[1]);
    	}
    	this.drawImage = function(){
    		var drawImage = proxy("drawImage");
    		var args = arguments;
		    var l = args.length;
    		if(typeof(arguments[0]) == "string"){
    			if(!Graphics.image_cache[arguments[0]]){
			        Graphics.loadImage(arguments[0],function(theImage){
			        	args[0] = theImage;
			        	self.drawImage.apply(self, args);
			        })
			        return true;
    			}
    			else{
    				args[0] = Graphics.image_cache[args[0]];
    			}
		    }
		    args[1] = args[1] || 0;
		    args[2] = args[2] || 0;
		    if(l > 2){
		    	args[l-2] = args[l-2] || image.width;
		    	args[l-1] = args[l-1] || image.height;
		    }
		    drawImage.apply(null, args);
   			return true;
    	}
    	this.getFontMetrics = function(font){
    		var oldFont = this.actualFont;
    		if(!font){
    			font = oldFont;
    		}
    		var self = this;
    		return {
    			"stringWidth":function(s){
    				var oldFont = self.actualFont;
    				self.setFont(font);
    				var result = self.context.measureText(s);
    				self.setFont(oldFont);
    				return result.width;
    			},
    			"charWidth":function(s){
    				var oldFont = self.font;
    				self.setFont(font);
    				var result = self.context.measureText(s[0]);
    				self.setFont(oldFont);
    				return result.width;
    			}
    		}
    	}
    });
    Graphics.image_cache = {};
    Graphics.loadImage = function(src, callback){
    	callback = callback || function(i){};
    	var newImage = new Image();
		newImage.onload = function(){
		   	Graphics.image_cache[src] = newImage;
		    callback(newImage);
		}
		newImage.src = src;
    }
	window.Frame = (function(frame){
		frame = frame||{};
		this.load = frame.load || function(){};
		this.step = frame.step || function(t){};
		this.draw = frame.draw || function(g){};
		this.start = frame.start || function(){};
		this.stop = frame.stop || function(){};
	});
	window.Animation = (function(id){
		
		var canvas = document.getElementById(id) || id;
		if(!!window.FlashCanvas){ /* It's in IE? */
			canvas =  FlashCanvas.initElement(canvas);// Apply!
		}
		else{
			var tempCanvas = document.createElement("canvas"); // A temp canvas!
			tempCanvas.width = canvas.width; // It's the same width/height!
			tempCanvas.height = canvas.height;
			var tempContext = tempCanvas.getContext("2d"); // Temporary context!
		}
		var self = this;
		var theContext = canvas.getContext("2d"); // Principal Context!
		self.currentFrame = new Frame(); // Just a fallback to a dummy frame
		self.interval = 1000/25; // 25 FPS
		self.width = canvas.width;
		self.height = canvas.height;
		self.frames = {};
		self.lastTime = 0;
		self.addFrame = function(id, f){
			if(!!self.frames[id]){
				throw("The frame "+id+" exists!")
			}
			self.frames[id] = f;
			f.load();
		}
		self.setCurrentFrame = function(id){
			self.currentFrame.stop();
			self.currentFrame = self.frames[id];
			self.currentFrame.start();
		}
		self.getCurrentFrame = function(){
			return currentFrame;
		}
		self.setFPS = function(n){
			self.interval = 1000/n;
		}
		self.getFPS = function(){
			return 1000/self.interval;
		}
		self.stopped = false;
		self.stop = function(){
			self.stopped = true;
		}
		self.play = function(){
			self.stopped = false;
		}
		self.run_buffered = function(){
			self.width = canvas.width;
			self.height = canvas.height;
			tempCanvas.width = canvas.width; // It's the same width/height!
			tempCanvas.height = canvas.height;
			var now = (new Date()).getTime();
			if(now < self.lastTime){ // It's to run?
				requestAnimationFrame(self.run_buffered); // It's battery friendly! 
				return; // If not, we just return! :D
			}
			tempCanvas.width = tempCanvas.width; // Clear it
			self.currentFrame.step(now); // Just a new step in the current frame
			self.currentFrame.draw(new Graphics(tempContext)); // Call with it the temporary context
			canvas.width = canvas.width; // Clear it too!
			theContext.drawImage(tempCanvas, 0, 0); // Paint the temporary canvas in it new canvas
			self.lastTime = now+self.interval; 
			requestAnimationFrame(self.run_buffered); // It's battery friendly! 
		}
		self.run_unbuffered = function(){
			self.width = canvas.width;
			self.height = canvas.height;
			var now = (new Date()).getTime();
			if(now < self.lastTime){ // It's to run?
				requestAnimationFrame(self.run_unbuffered); // It's battery friendly! 
				return; // If not, we just return! :D
			}
			canvas.width = canvas.width; // Clear it too!
			self.currentFrame.step(now); // Just a new step in the current frame
			self.currentFrame.draw(new Graphics(theContext)); // Call with it the temporary context
			self.lastTime = now+self.interval; 
			requestAnimationFrame(self.run_unbuffered); // It's battery friendly! 
		}
		self.run = function(){
			if(!window.FlashCanvas){
				self.run_buffered();
			}
			else{
				self.run_unbuffered();
			}
		}
	});
	var canvas = document.createElement("canvas");
	canvas.width = parseInt(theScript.getAttribute("data-width") || 468);
	canvas.height = parseInt(theScript.getAttribute("data-height") || 60);
	canvas.onclick = function(){
	    window.open("http://fjorgemota.com");
	}
	theScript.parentNode.insertBefore(canvas, theScript);
	var banner = new Animation(canvas);
	var AnimatedText = (function(text, step, draw){
		draw = draw||function(g){};
		step = step||function(){};
		return (new Frame({
		"start":function(){
			this.x = 0;
			this.y = 0;
			this.color = "#000";
			this.font = 'bold 30px sans-serif';
			this.text = text;
			this.align = "left";
		},
		"step":step,
		"draw":function(g){
			draw.call(this, g);
			g.setColor(new Color(this.color));
			g.setTextAlign(this.align);
			g.setFont(this.font);
			g.drawString(this.text,this.x, this.y);
		}
		}));
	});
	banner.addFrame(1, AnimatedText("Você quer um site?", function(){
		if(!this.fontSize){
			this.fontSize = 1;
		}
		this.x = banner.width/2;
		this.y = banner.height/2;
		this.align = "center";
		this.font = "bold "+this.fontSize+"px sans-serif";
		if(this.fontSize > 30){
			this.fontSize = null;
			banner.setCurrentFrame(2);
		}
		this.fontSize += 1;
		}));
	banner.addFrame(2, AnimatedText("Um blog?", function(){
		if(!this.fontSize){
			this.fontSize = 1;
		}
		this.x = (banner.width/2);
		this.y = banner.height/2;
		this.font = "bold "+this.fontSize+"px sans-serif";
		this.align = "center";
		if(this.fontSize > 30){
			this.fontSize = null;
			banner.setCurrentFrame(3);
		}
		this.fontSize += 1;
		}));
	banner.addFrame(3, AnimatedText("Então conheça...", function(){
		this.y = banner.height/2;
		this.font = "bold 30px sans-serif";
		if(!this.x){
			return;
		}
		this.x -= 2;
		if(this.x < this.widthFont){
			banner.setFPS(25);
			banner.setCurrentFrame(4);
			this.x = null;
		}
		else if(this.x == 0){
			this.x -= 1;
		}
		},function(g){
			g.setFont(this.font);
			var context = g.getContext();
			var widthFont = context.measureText(this.text).width;
			if(!this.x){
				banner.setFPS(1000);
				this.x = banner.width+widthFont-2;
				this.widthFont = 0;
			}
			this.widthFont = 0-widthFont;
		}));
	banner.addFrame(4, AnimatedText("", function(){
		var now = new Date().getTime();
		if(!!this.lastTime){
			if(now > this.lastTime){
				banner.setFPS(25);
				banner.setCurrentFrame(5);
				this.lastTime = null;
				this.bufferText = null;
				this.text = "";
			}
			return;
		}
		if(!this.bufferText){
			this.bufferText = "http://fjorgemota.com ".split("");// It's an array!
		}
		this.x = banner.width/2;
		this.y = banner.height/2;
		this.align = "center";
		this.font = "bold "+(banner.width>300?"28":"24")+"px sans-serif";
		this.text += this.bufferText.shift();
		if(this.bufferText.length == 0){
			this.lastTime = now+3000;
		}
		else if(this.text.length == 1){
			banner.setFPS(6); 
		}
		}));	
	banner.addFrame(5, AnimatedText("Blogs em Wordpress",function(){
		if(!this.fontSize){
			this.fontSize = 1;
		}
		this.x = (banner.width/2);
		this.y = banner.height/2;
		this.font = "bold "+this.fontSize+"px sans-serif";
		this.align = "center";
		if(this.fontSize > 50){
			this.fontSize = null;
			banner.setCurrentFrame(6);
		}
		this.fontSize += 1;		
	}, function(graphics){
		var g = graphics.context;
		if(!window.FlashCanvas){
			g.globalAlpha = 1;
			var x = banner.width/2;
			graphics.setFont(this.font);
			x -= g.measureText(this.text).width/2;
			x -= 50;
			graphics.drawImage("/static/images/banner/wordpress-icon.png",x, this.y-25, 50,50);
			var x = banner.width/2;
			x += g.measureText(this.text).width/2;
			graphics.drawImage("/static/images/banner/wordpress-icon.png",x, this.y-25, 50,50);
		}
		if(this.fontSize){
			g.globalAlpha = 10/this.fontSize;
		}
		else{
			g.globalAlpha = 1;
		}
		
	}));
	banner.addFrame(6, AnimatedText("Hacks para Blogger",function(){
		if(!this.fontSize){
			this.fontSize = 1;
		}
		this.x = (banner.width/2);
		this.y = banner.height/2;
		this.font = "bold "+this.fontSize+"px sans-serif";
		this.align = "center";
		if(this.fontSize > 50){
			this.fontSize = null;
			banner.setCurrentFrame(7);
		}
		this.fontSize += 1;		
	}, function(graphics){
		var g = graphics.context;
		if(!window.FlashCanvas){
			g.globalAlpha = 1;
			var x = banner.width/2;
			graphics.setFont(this.font);
			x -= g.measureText(this.text).width/2;
			x -= 50;
			graphics.drawImage("/static/images/banner/blogger-icon.png",x, this.y-25, 50,50);
			var x = banner.width/2;
			x += g.measureText(this.text).width/2;
			graphics.drawImage("/static/images/banner/blogger-icon.png",x, this.y-25, 50,50);
		}
		if(this.fontSize){
			g.globalAlpha = 10/this.fontSize;
		}
		else{
			g.globalAlpha = 1;
		}
	}));
	banner.addFrame(7, AnimatedText("Sistemas",function(){
		if(!this.fontSize){
			this.fontSize = 1;
			this.x = 1;
			this.addX = (banner.width/30)/2;
		}
		this.x += this.addX;
		this.y = banner.height/2;
		this.font = "bold "+this.fontSize+"px sans-serif";
		this.align = "center";
		if(this.x < banner.width/2){
			this.fontSize += 1;		
			
		}
		else if(this.x > banner.width/2){
			this.fontSize -= 1;	
			if(!this.fontSize){
				this.fontSize = null;
				banner.setCurrentFrame(8);
			}	
		}
	}));
	banner.addFrame(8, AnimatedText("Sites",function(){
		if(!this.fontSize){
			this.fontSize = 1;
			this.y = 1;
			this.addY = (banner.height/30)/2;
		}
		this.x = banner.width/2;
		this.y += this.addY;
		this.font = "bold "+this.fontSize+"px sans-serif";
		this.align = "center";
		if(this.y < banner.height/2){
			this.fontSize += 1;		
		}
		else if(this.y > banner.height/2){
			this.fontSize -= 1;		
			if(!this.fontSize){
				this.fontSize = null;
				banner.setCurrentFrame(9);
			}
		}
	}));
	banner.addFrame(9, AnimatedText("E o que você imaginar...", function(){
		if(!this.fontSize){
			this.fontSize = 50;
		}
		this.x = (banner.width/2);
		this.y = banner.height/2;
		this.font = "bold "+this.fontSize+"px sans-serif";
		this.align = "center";
		this.fontSize -= 1;
		if(!this.fontSize){
			this.fontSize = null;
			banner.setCurrentFrame(10);
		}
		
		}, function(g){
			g.setFont("10px sans-serif");
			var x = g.getFontMetrics().stringWidth("(Que seja possivel, claro)");
			g.setColor(Color.BLACK);
			g.drawString("(Que seja possivel, claro)", banner.width-x, banner.height-10);
		}));
	banner.addFrame(10, AnimatedText("", function(){
		var now = new Date().getTime();
		if(!!this.lastTime){
			if(now > this.lastTime){
				banner.setFPS(25);
				banner.setCurrentFrame(1);
				this.lastTime = null;
				this.bufferText = null;
				this.text = "";
			}
			return;
		}
		if(!this.bufferText){
			this.bufferText = "http://fjorgemota.com ".split("");// It's an array!
		}
		this.x = banner.width/2;
		this.y = banner.height/2;
		this.font = "bold "+(banner.width>300?"28":"24")+"px sans-serif";
		this.align = "center";
		this.text += this.bufferText.shift();
		if(this.bufferText.length == 0){
			this.lastTime = now+3000;
		}
		else if(this.text.length == 1){
			banner.setFPS(5); 
		}
		}, function(g){
			g.setTextAlign(TextAlign.CENTER);
			g.setColor(Color.BLACK);
			g.setFont("12"+"px sans-serif");
			if(this.y < 40){
				this.y += 5;
			}
			if(banner.width > 300){
				g.drawString("Acesse já e faça seu orçamento sem compromisso em..", (banner.width/2), this.y-25);
			}
			else{
				g.drawString("Acesse já e faça", (banner.width/2), this.y-40);
				g.drawString("seu orçamento sem compromisso em..", banner.width/2, this.y-25);
			}
			}));	
	banner.setCurrentFrame(1);
	banner.run();
	
})()
