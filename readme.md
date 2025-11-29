Ghosts.js
=======

Ghosts JS creates some ghosts that slowly float around over a web page.  Load `ghosts.js` file directly to use the default settings or instantiate `GhostView`.  [See the demo](https://tobymackenzie.github.io/ghosts.js/).  Moved from [my site's code](https://github.com/tobymackenzie/tobymackenzie.com.site).  I only load it near Hallowe'en time with something like:

``` js
var date = new Date();
if(date.getMonth() === 9 && date.getDate() > 20){
	import('./lib/ghosts.js/ghosts.js');
}
```

Also needs `ghosts.css` file, or styles applied to `.ghostView`.  The orange is `#ea7824` if you want to make your background that, but the project CSS won't mess with that.

Should support browsers that support [`requestAnimationFrame`](https://caniuse.com/requestanimationframe) and [`pointer-events: none`](https://caniuse.com/pointer-events), but computer must also have font with ghost emoji (common).

License
------

<footer>
<p>SPDX-License-Identifier: 0BSD</p>
</footer>
