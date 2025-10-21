import {create as _createClass} from './classes.js';
import {DOMGhostView} from './DomGhostView.js';
var _parProto = DOMGhostView.prototype;
var _ns = 'http://www.w3.org/2000/svg';
var SVGGhostView = _createClass({
	parent: DOMGhostView,
	props: {
		//==config
		className: null,
		elAttr: {
			'aria-hidden': 'aria-hidden'
			,viewbox: '0 0 100 100'
			,xmlns: _ns
		},
		name: 'SVG',
		nodeName: 'svg',

		//--
		activate: function(){
			if(!this.el){
				this.el = document.createElementNS(_ns, this.nodeName);
				this.el.classList.add('ghostView', 'ghost-svg');
			}
			this.fixCanvDimensions();
			_parProto.activate.apply(this, arguments);
		},
		createGhostEl: function(_ghost){
			if(!_ghost.el){
				_ghost.el = document.createElementNS(_ns, 'text');
				_ghost.el.classList.add('ghost');
				_ghost.el.setAttributeNS(null, 'font-size', this.ghostSize + 'px')
				_ghost.el.appendChild(document.createTextNode('👻'));
				this.positionGhostEl(_ghost);
			}
			return _ghost;
		},
		fixCanvDimensions: function(){
			var _dim = this.getElDimensions();
			this.el.setAttribute('viewbox', '0 0 ' + _dim.width + ' ' + _dim.height);
		},
		getElDimensions: function(){
			return this.el.getBoundingClientRect();
		},
		_moveGhostData: function(_ghost){
			//-# overide for SVG bottom baseline coordinates
			var _dim = this.getElDimensions();
			if(_ghost.x > _dim.width + this.offScreenPadding){
				_ghost.x = -1 * (this.offScreenPadding + this.ghostSize);
			}else if(_ghost.x < -1 * (this.offScreenPadding + this.ghostSize)){
				_ghost.x = _dim.width + this.offScreenPadding;
			}else{
				_ghost.x += _ghost.xSpeed;
			}
			if(_ghost.y > _dim.height + this.offScreenPadding + this.ghostSize){
				_ghost.y = -1 * (this.offScreenPadding + this.ghostSize);
			}else if(_ghost.y < -1 * (this.offScreenPadding + this.ghostSize)){
				_ghost.y = _dim.height + this.offScreenPadding + this.ghostSize;
			}else{
				_ghost.y += _ghost.ySpeed;
			}
		},
		onGhostClick: function(_ghost){
			var _parent = _ghost.el.ownerSVGElement;
			_parent.removeChild(_ghost.el);
			_parent.appendChild(_ghost.el);
			//-# must be in timeout for animation to work properly
			setTimeout(function(){
				DOMGhostView.prototype.onGhostClick.call(this, _ghost);
			}, 50);
		},
		onResize: function(){
			_parProto.onResize.apply(this, arguments);
			this.fixCanvDimensions();
		},
		positionGhostEl: function(_ghost){
			_ghost.el.setAttributeNS(null, 'x', parseFloat(_ghost.x));
			_ghost.el.setAttributeNS(null, 'y', parseFloat(_ghost.y));
		},
	},
});
export {SVGGhostView};
