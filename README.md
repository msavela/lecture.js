# lecture.js

A presentation framework written in Javascript. See [live demo](http://msavela.github.io/lecture.js).

# Usage

Setting up lecture.js is straightforward: add markup and include lecture.js and you are done.

## Markup

Following DOM represents your presentation:

```html
<article>
	<section>
		<h1>Header 1</h1>
		<p>This is the first slide</p>
	</section>
	<section>
		<h1>Header 2</h1>
		<p>This is the second slide</p>
	</section>
</article>

<!-- Include lecture.js at the end of your body tag -->
<script src="lecture.js"></script>
<!-- (Optional) Include plugins here -->
<!-- Initialize (see below) -->
```

## Javascript

Initialize lecture.js on page load:

```js
window.addEventListener("load", function(e) {
	// Add custom event listener(s) here
	lecture.init();
}, false);
```

Additionally the presentation can be initialized with custom element(s):

```js
lecture.init(document.querySelector('.custom'));
```

See [live demo](http://msavela.github.io/lecture.js) and [examples](https://github.com/msavela/lecture.js/tree/master/examples) for more details.

# Look & feel

Presentation styles and transitions are controlled by CSS. Each slide contains set of situational classes to describe it's current stage.

See [default theme](https://github.com/msavela/lecture.js/blob/master/themes/default.css) for example. 

## Classes

Following classes are supported by default:

* **active** Active slide
* **inactive** Inactive slide
* **before** Before active slide
* **before-n** Before active slide with offset of n
* **after** After active slide
* **after-n** After active slide with offset of n

Following CSS rules could be used to show active slide and hide inactive slide:

```css
section.inactive {
	opacity: 0;
}

section.active {
	opacity: 1;
}
```

# Plugins

lecture.js is built to be as modular as possible in order to easily extend the framework.

## Events

lecture.js dispatches several events for customization. See [lecture.js-plugins repository](https://github.com/msavela/lecture.js-plugins) for examples.

* **init** Presentation is initialized
* **activate** Slide is activated
* **deactivate** Slide is deactivated
* **next** Next slide is activated
* **prev** Previous slide is activated

Events usually contain parameters which can be debugged like this:

```js
(function(lecture) {
	lecture.on('next', function(e) {
		// Log event parameters
		console.log(e);
	});
}(lecture));
```

It is also possible to cancel events by returning false:

```js
(function(lecture) {
	lecture.on('prev', function(e) {
		// Cancel all 'prev' events
		return false;
	});
}(lecture));
```

Plugins can also dispatch custom events. Take a look at [lecture.progress.js](https://github.com/msavela/lecture.js-plugins/blob/master/src/lecture.progress.js) plugin for example.

# Requirements

A modern browser is recommended since lecture.js benefits from CSS3 specification and Javascript APIs such as [document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/document.querySelector).

Supported browsers:

* Google Chrome 31.0+
* Safari 7.0+
* Firefox 26.0+

# License

The MIT License (MIT)

Copyright (c) 2013 Matias Savela, [mati.as](http://mati.as)