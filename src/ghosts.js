import {ready as _ready} from './ready.js';
// import {CanvasGhostView as GhostView} from './CanvasGhostView.js';
// import {DOMGhostView as GhostView} from './DomGhostView.js';
import {SVGGhostView as GhostView} from './SvgGhostView.js';

if(
	document.querySelector
	&& window.requestAnimationFrame
	&& !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
){
	_ready(function(){
		var _view = new GhostView();
		_view.activate();
	});
}
