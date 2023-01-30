var app = new Vue({
	el: '#wrapper',
	data: {
		_body: null,
		sidebar_locked: 0,
		_menu_openers: null,
	},
	mounted: function() {
		var that = this;
		var	$window = $(window),
			$head = $('head');
		
		// Stops animations/transitions until the page has ...
		// ... loaded.
		this._body = document.querySelector('body');
		this._body.className = this._body.className.replace('is-preload', '');
		// ... stopped resizing.
		// var resizeTimeout;
		// $window.on('resize', function() {
		// 	// Mark as resizing.
		//  this._body.className = that._body.className.indexOf(' is-resizing')==-1? this._body.className.concat(' is-resizing'): this._body.className;
		// 	// Unmark after delay.
		// 	clearTimeout(resizeTimeout);
		// 	resizeTimeout = setTimeout(function() {
		//    that._body.className = that._body.className.replace(' is-resizing', '');
		// 	}, 100);
		// });
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

		// Fixes.
		// Object fit images.
			// if (!browser.canUse('object-fit')
			// ||	browser.name == 'safari')
			// 	$('.image.object').each(function() {
			// 		var $this = $(this),
			// 			$img = $this.children('img');
			// 		// Hide original image.
			// 			$img.css('opacity', '0');
			// 		// Set background.
			// 			$this
			// 				.css('background-image', 'url("' + $img.attr('src') + '")')
			// 				.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
			// 				.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');
			// 	});

		var resizeTimeout;
		// Mark as resizing.
		this._body.className = that._body.className.indexOf(' is-resizing')==-1? this._body.className.concat(' is-resizing'): this._body.className;
		// Unmark after delay.
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function() {
			that._body.className = that._body.className.replace(' is-resizing', '');
		}, 100);

		// Sidebar.
		console.log(this.$refs);
		// this.$refs.sidebar
		var $sidebar = $('#sidebar');
		// Inactive by default on <= large.
		breakpoints.on('<=large', function() {
			that.$refs.sidebar.className = that.$refs.sidebar.className.indexOf(' inactive')==-1? that.$refs.sidebar.className.concat(' inactive'): that.$refs.sidebar.className;
		});
		breakpoints.on('>large', function() {
			that.$refs.sidebar.className = that.$refs.sidebar.className.replace(' inactive', '');
		});

			// Hack: Workaround for Chrome/Android scrollbar position bug.
			// if (browser.os == 'android'
			// &&	browser.name == 'chrome')
			// 	$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
			// 		.appendTo($head);

		// Toggle.
		$('<a href="#sidebar" class="toggle">Toggle</a>')
			.appendTo($sidebar)
			.on('click', function(event) {
				// Prevent default.
				event.preventDefault();
				event.stopPropagation();
				// Toggle.
				that.$refs.sidebar.className = that.$refs.sidebar.className.indexOf(' inactive')==-1? that.$refs.sidebar.className.concat(' inactive'): that.$refs.sidebar.className.replace(' inactive', '');
			});

		// Events.
		// Link clicks.
			$sidebar.on('click', 'a', function(event) {
				// >large? Bail.
				if (breakpoints.active('>large'))
					return;
				// Vars.
				var $a = $(this),
					href = $a.attr('href'),
					target = $a.attr('target');
				// Prevent default.
				event.preventDefault();
				event.stopPropagation();
				// Check URL.
				if (!href || href == '#' || href == '')
					return;
				// Hide sidebar.
				that.$refs.sidebar.className = that.$refs.sidebar.className.indexOf(' inactive')==-1? that.$refs.sidebar.className.concat(' inactive'): that.$refs.sidebar.className;
				// Redirect to href.
				setTimeout(function() {
					if (target == '_blank')
						window.open(href);
					else
						window.location.href = href;
				}, 500);

			});

		// Prevent certain events inside the panel from bubbling.
		$sidebar.on('click touchend touchstart touchmove', function(event) {
			// >large? Bail.
			if (breakpoints.active('>large'))
				return;
			// Prevent propagation.
			event.stopPropagation();
		});

		// Hide panel on body click/tap. 'click touchend'
		this._body.addEventListener('click', function(event) {
			// >large? Bail.
			if (breakpoints.active('>large'))
				return;
			// Deactivate.
			that.$refs.sidebar.className = that.$refs.sidebar.className.indexOf(' inactive')==-1? that.$refs.sidebar.className.concat(' inactive'): that.$refs.sidebar.className;
		});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

		$window.on('load.sidebar-lock', function() {
			var sh, wh, st;
			// Reset scroll position to 0 if it's 1.
			if ($window.scrollTop() == 1)
				$window.scrollTop(0);
			$window.on('scroll.sidebar-lock', function() {
				var x, y;
				// <=large? Bail.
				if (breakpoints.active('<=large')) {
					that.sidebar_locked = 0;
					that.$refs.sidebar_inner.dataset.locked = 0;
					that.$refs.sidebar_inner.style.position = '';
					that.$refs.sidebar_inner.style.top = '';
					return;
				}

				// Calculate positions.
				x = Math.max(sh - wh, 0);
				y = Math.max(0, $window.scrollTop() - x);
				// Lock/unlock.
				if (that.sidebar_locked == 1) {
					if (y <= 0) {
						that.sidebar_locked = 0;
						that.$refs.sidebar_inner.style.position = '';
						that.$refs.sidebar_inner.style.top = '';
					} else {
						that.$refs.sidebar_inner.style.top = -1 * x + 'px';
					}
				}
				else {
					if (y > 0) {
						that.sidebar_locked = 1;
						that.$refs.sidebar_inner.style.position = 'fixed';
						that.$refs.sidebar_inner.style.top = -1 * x + 'px';
					}
				}
			}).on('resize.sidebar-lock', function() {
				// Calculate heights.
				wh = window.innerHeight;
				sh = that.$refs.sidebar_inner.offsetHeight + 30;
				// Trigger scroll.
				$window.trigger('scroll.sidebar-lock');
			}).trigger('resize.sidebar-lock');
		});

		// Menu.
		this._menu_openers = document.querySelectorAll('.opener');
		// Openers.
		for(var i = 0; i<this._menu_openers.length; i++) {
			this._menu_openers[i].addEventListener('click', function(event) {
				// Prevent default.
				event.preventDefault();
				// Toggle.
				for(var j = 0; j<that._menu_openers.length; j++) {
					that._menu_openers[j].className = that._menu_openers[j]!=event.target? that._menu_openers[j].className.replace(' active', ''):that._menu_openers[j].className;
				}
				event.target.className = event.target.className.indexOf(' active')==-1? event.target.className.concat(' active'):  event.target.className.replace(' active', '');
				// Trigger resize (sidebar lock).
				// $window.triggerHandler('resize.sidebar-lock');
			});
		}
	},
	methods: {}
});