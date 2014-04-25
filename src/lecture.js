(function(module, window) {
	window[module] = {

		listeners: {},

		init: function(element) {
			this.parent = element || document.querySelector('article');
			this.populate();

			this.dispatch('init') && this.activate(0);

			return this;
		},
		activate: function(n) {
			if(n < 0 || n > this.deck.length - 1)
				return;

			if(this.index >= 0 && !this.dispatch('deactivate', {
				index: this.index,
				element: this.deck[this.index]
			})) return;

			this.index = n;
			this.update();

			this.dispatch('activate', {
				index: this.index,
				element: this.deck[this.index]
			});
		},
		populate: function() {
			this.deck = this.parent.querySelectorAll('section');
		},
		update: function() {
			for(var i=0;i<this.deck.length;i++) {
				this.deck[i].className =
					this.deck[i].className.replace(
						RegExp('((active|inactive)|(before|after)(-\\d+)?)', 'g')
					, '').trim();

				if(i == this.index)
					this.deck[i].classList.add('active');
				else {
					this.deck[i].classList.add('inactive', (i < this.index) ? 'before' : 'after',
						((i < this.index) ? 'before' : 'after') + '-' + Math.abs(i - this.index));
				}
			}
		},
		next: function() {
			this.dispatch('next', {
				index: this.index
			}) && this.activate(this.index + 1);
		},
		prev: function() {
			this.dispatch('prev', {
				index: this.index
			}) && this.activate(this.index - 1);
		},
		on: function(event, callback) {
			(this.listeners[event] || (this.listeners[event] = [])).push(callback);
		},
		dispatch: function(event, data) {
			var ret = true;
			if(!this.listeners[event]) return ret;
			for(var i=0;i<this.listeners[event].length;i++)
				if(this.listeners[event][i](data) == false)
					ret = false;
			return ret;
		},
	};

	document.addEventListener('keydown', function(e) {
		[
			34, // Page down
			32, // Space
			13, // Enter
			39, // Right
			40  // Down
		].indexOf(e.which) > -1 && window[module].next();
		
		[
			33, // Page up
			37, // Left
			38  // Up
		].indexOf(e.which) > -1 && window[module].prev();
	});
}('lecture', this));