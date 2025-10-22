import {BaseClass, create as _createClass} from './classes.js';

var GhostView = _createClass({
	init: function(){
		this.ghosts = [];
		BaseClass.prototype.init.apply(this, arguments);
		if(!this.container){
			this.container = document.querySelector('body');
		}
	},
	props: {
		//--config
		className: 'ghostView',
		elAttr: {},
		container: undefined,
		countFactor: 1,
		frameRate: 12,
		ghostSize: 48,
		maxSpeed: 3,
		name: 'GhostView',
		nodeName: 'div',
		offScreenPadding: 1,
		randAmount: 1.8,

		//--
		el: undefined,
		ghostCount: 1,
		ghost: undefined,
		activate: function(){
			var _self = this;
			if(!_self.el){
				_self.el = document.createElement(_self.nodeName);
			}
			if(_self.className){
				_self.el.className = _self.className;
			}
			for(var _key in _self.elAttr){
				if(_self.elAttr.hasOwnProperty(_key)){
					_self.el.setAttribute(_key, _self.elAttr[_key]);
				}
			}
			this.container.appendChild(this.el);
			_self.determineGhostCount();
			window.addEventListener('resize', function(){
				_self.onResize();
			});
			var _lastDraw = 0;
			var _frameDuration = 1000 / this.frameRate;
			var _go = function(_time){
				if(_time - _lastDraw >= _frameDuration){
					_self.step();
					_lastDraw = _time;
				}
				window.requestAnimationFrame(_go);
			};
			_go();
		},
		addGhost: function(_dim){
			if(!_dim){
				_dim = this.getElDimensions();
			}
			var _ghost = {
				x: Math.round(Math.random()) ? 0 : _dim.width,
				xSpeed: Math.round(Math.random()) ? 1 : -1,
				y: Math.round(Math.random()) ? 0 : _dim.height,
				ySpeed: Math.round(Math.random()) ? 1 : -1,
			};
			this.ghosts.push(_ghost);
			this.createGhostEl(_ghost);
			this.el.appendChild(_ghost.el);
			this.addGhostEvents(_ghost);
			return _ghost;
		},
		addGhostEvents: function(_ghost){
			var _self = this;
			_ghost.el.addEventListener('click', function(){
				_self.onGhostClick(_ghost);
			});
		},
		createGhostEl: function(_ghost){
			_ghost.el = document.createElement('div');
			_ghost.el.classList.add('ghost');
			_ghost.el.innerHTML = '👻';
			this.positionGhostEl(_ghost);
		},
		determineGhostCount: function(){
			var _dim = this.getElDimensions();
			this.ghostCount = Math.round((_dim.width + _dim.height) / 600 * this.countFactor);
			if(this.ghostCount > this.ghosts.length){
				for(var _i = 0, _end = this.ghostCount - this.ghosts.length; _i < _end; ++_i){
					this.addGhost(_dim);
				}
			}else if(this.ghostCount < this.ghosts.length){
				for(var _i = 0, _end = this.ghosts.length - this.ghostCount; _i < _end; ++_i){
					this.removeGhost();
				}
			}
			return this;
		},
		getElDimensions: function(){
			return {
				width: this.el.offsetWidth,
				height: this.el.offsetHeight,
			};
		},
		_moveGhostData: function(_ghost){
			var _dim = this.getElDimensions();
			if(_ghost.x > _dim.width + this.offScreenPadding){
				_ghost.x = -1 * (this.offScreenPadding + this.ghostSize);
			}else if(_ghost.x < -1 * (this.offScreenPadding + this.ghostSize)){
				_ghost.x = _dim.width + this.offScreenPadding;
			}else{
				_ghost.x += _ghost.xSpeed;
			}
			if(_ghost.y > _dim.height + this.offScreenPadding){
				_ghost.y = -1 * (this.offScreenPadding + this.ghostSize);
			}else if(_ghost.y < -1 * (this.offScreenPadding + this.ghostSize)){
				_ghost.y = _dim.height + this.offScreenPadding;
			}else{
				_ghost.y += _ghost.ySpeed;
			}
		},
		onGhostClick: function(_ghost){
			_ghost.el.dataset.state = 'boo';
			setTimeout(function(){
				alert('Boo');
				delete _ghost.el.dataset.state;
			}, 1100);
		},
		onResize: function(){
			this.determineGhostCount();
		},
		positionGhostEl: function(_ghost){
			_ghost.el.style.left = parseInt(_ghost.x) + 'px';
			_ghost.el.style.top = parseInt(_ghost.y) + 'px';
		},
		removeGhost: function(){
			var _ghost = this.ghosts.pop();
			if(_ghost.el){
				var _self = this;
				var _gone = function(){
					_self.el.removeChild(_ghost.el);
				};
				if(_ghost.el.animate){
					var anim = _ghost.el.animate({opacity: 0}, {duration: 1000, iterations: 1});
					anim.addEventListener('finish', _gone);
				}else{
					_gone();
				}
			}
			return _ghost;
		},
		step: function(){
			for(var _i = 0; _i < this.ghosts.length; ++_i){
				var _ghost = this.ghosts[_i];
				this.stepGhost(_ghost);
				this.positionGhostEl(_ghost);
			}
			return this;
		},
		stepGhost: function(_ghost){
			_ghost.xSpeed += Math.round(Math.random() * this.randAmount + .13) - Math.floor(this.randAmount);
			if(_ghost.xSpeed < -1 * this.maxSpeed){
				_ghost.xSpeed = -1 * this.maxSpeed;
			}else if(_ghost.xSpeed > this.maxSpeed){
				_ghost.xSpeed = this.maxSpeed;
			}
			_ghost.ySpeed += Math.round(Math.random() * this.randAmount + .13) - Math.floor(this.randAmount);
			if(_ghost.ySpeed < -1 * this.maxSpeed){
				_ghost.ySpeed = -1 * this.maxSpeed;
			}else if(_ghost.ySpeed > this.maxSpeed){
				_ghost.ySpeed = this.maxSpeed;
			}
			this._moveGhostData(_ghost);
			return this;
		},
	},
});
export {GhostView};
