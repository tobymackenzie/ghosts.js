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
		attr: {},
		className: 'ghostView',
		container: undefined,
		countFactor: 1,
		el: undefined,
		frameRate: 12,
		ghostSize: 48,
		maxSpeed: 3,
		name: 'GhostView',
		nodeName: 'div',
		offScreenPadding: 1,
		randAmount: 1.8,

		//--
		_count: 1,
		_elDimensions: undefined,

		activate: function(){
			var _self = this;
			if(!_self.el){
				_self.el = document.createElement(_self.nodeName);
			}
			if(_self.className){
				_self.el.className = _self.className;
			}
			for(var _key in _self.attr){
				if(_self.attr.hasOwnProperty(_key)){
					_self.el.setAttribute(_key, _self.attr[_key]);
				}
			}
			this.container.appendChild(this.el);
			_self._determineGhostCount();
			window.addEventListener('resize', function(){
				_self._determineGhostCount();
			});
			var _lastDraw = 0;
			var _frameDuration = 1000 / this.frameRate;
			var _go = function(_time){
				if(_time - _lastDraw >= _frameDuration){
					_self._step();
					_lastDraw = _time;
				}
				window.requestAnimationFrame(_go);
			};
			_go();
		},
		addGhost: function(_dim){
			var _self = this;
			if(!_dim){
				_dim = _self._getElDimensions();
			}
			var _ghost = {
				x: Math.round(Math.random()) ? 0 : _dim.width,
				xSpeed: Math.round(Math.random()) ? 1 : -1,
				y: Math.round(Math.random()) ? 0 : _dim.height,
				ySpeed: Math.round(Math.random()) ? 1 : -1,
			};
			_self.ghosts.push(_ghost);
			_ghost.el = document.createElement('div');
			_ghost.el.classList.add('ghost');
			_ghost.el.innerHTML = '👻';
			_self._positionGhostEl(_ghost);
			_self.el.appendChild(_ghost.el);
			_ghost.el.addEventListener('click', function(){
				_self._onGhostClick(_ghost);
			});
			return _ghost;
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

		_calcNewSpeed: function(_speed){
			_speed += Math.round(Math.random() * this.randAmount + .13) - Math.floor(this.randAmount);
			if(_speed < -1 * this.maxSpeed){
				_speed = -1 * this.maxSpeed;
			}else if(_speed > this.maxSpeed){
				_speed = this.maxSpeed;
			}
			return _speed;
		},
		_determineGhostCount: function(){
			var _dim = this._getElDimensions(true);
			this._count = Math.round((_dim.width + _dim.height) / 600 * this.countFactor);
			if(this._count > this.ghosts.length){
				for(var _i = 0, _end = this._count - this.ghosts.length; _i < _end; ++_i){
					this.addGhost(_dim);
				}
			}else if(this._count < this.ghosts.length){
				for(var _i = 0, _end = this.ghosts.length - this._count; _i < _end; ++_i){
					this.removeGhost();
				}
			}
			return this;
		},
		_getElDimensions: function(force){
			if(force || !this._elDimensions){
				this._elDimensions = {
					width: this.el.offsetWidth,
					height: this.el.offsetHeight,
				};
			}
			return this._elDimensions;
		},
		_moveGhostData: function(_ghost, _dim){
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
		_onGhostClick: function(_ghost){
			_ghost.el.dataset.state = 'boo';
			setTimeout(function(){
				alert('Boo');
				delete _ghost.el.dataset.state;
			}, 1100);
		},
		_positionGhostEl: function(_ghost){
			_ghost.el.style.left = parseInt(_ghost.x) + 'px';
			_ghost.el.style.top = parseInt(_ghost.y) + 'px';
		},
		_step: function(){
			var _dim = this._getElDimensions();
			for(var _i = 0; _i < this.ghosts.length; ++_i){
				var _ghost = this.ghosts[_i];
				_ghost.xSpeed = this._calcNewSpeed(_ghost.xSpeed);
				_ghost.ySpeed = this._calcNewSpeed(_ghost.ySpeed);
				this._moveGhostData(_ghost, _dim);
				this._positionGhostEl(_ghost);
			}
			return this;
		},
	},
});
export {GhostView};
