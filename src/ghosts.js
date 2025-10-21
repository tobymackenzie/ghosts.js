import {ready as _ready} from './ready.js';
import {GhostView} from './GhostView.js';

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
