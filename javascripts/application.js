document.observe('dom:loaded', function(){
	if($('home')) {
		$('slider').select('img').invoke('setStyle', {display: 'none'});
		$$('img').last().observe('load', initializeSlider);
	}
});

function initializeSlider() {
	var images = $('slider').select('img'),
			imgContainer = new Element('div', {id: 'slide-container', 'class': 'clearfix'}),
			i = 1;
	images.invoke('setStyle', {display: 'block', 'float': 'left'});
	images.each(function(img) {
		imgContainer.insert(img);
		img.writeAttribute('id', 'image_' + i);
		i++;	
  });
  $('slider').insert(imgContainer);
  (images.length > 3) ? createSlider() : images.last().addClassName('last');
}

function createSlider() {
	var slider = $('slider'),
			container = $('slide-container').writeAttribute('data-image', 1),
			images = container.select('img'),
			contWidth = 0,
			imgH = images.first().getHeight();
			
	images.each(function(img) { contWidth += img.getWidth() + 10; });
	container.setStyle({
		width: contWidth + 'px',
		position: 'absolute',
		top: 0,
		left: 0
	});
	slider.setStyle({
		position: 'relative',
		height: imgH + 'px',
	  overflowX: 'hidden'
	});
	
	addSliderLinks();
}

function addSliderLinks() {
	var slider = $('slider'),
			leftLink = new Element('a', {href: "#left", id: 'slide-left', 'class': 'hidden'}).insert("Scroll Left"),
			rightLink = new Element('a', {href: "#right", id: 'slide-right', 'class': 'hidden'}).insert("Scroll Right");
  slider.insert({before: leftLink, after: rightLink});
  [leftLink, rightLink].invoke('observe','click', scrollGallery);
}

function scrollGallery(e) {
	e.stop();
	var el = Event.element(e),
			last = determineLastSlide(el.up('section')),
			href = el.readAttribute('href'),
			container = $('slide-container'),
			slideOn = container.readAttribute('data-image'),
			images = container.select('img'),
			slide, next;
			if(slideOn != 1 && href == '#right') {
				slide = $('image_' + (slideOn - 1)).getWidth() + 10;
				next = parseInt(slideOn) - 1;
				container.writeAttribute('data-image', next);
			} else if(slideOn != images.size() + last && href == '#left') {
				slide = ($('image_' + parseInt(slideOn)).getWidth() + 10) * -1;
				next = parseInt(slideOn) + 1;
				container.writeAttribute('data-image', next);
			}
	
	new Effect.Move(container, {
		x: slide,
		mode: 'relative',
		duration: 1.5,
		transition: Effect.Transitions.spring
	});
}

function determineLastSlide(section) {
	var width = section.getWidth();
	num = (width > 980) ? -2 : (width > 760) ? -1 : 0;
  
  return num;
}
