MZW.InfiniteSlider = function(options) {

  options = options || {};
  if (!options.$parent) throw new Error("InfinteSlider -- missing required option $parent");

  this.selector = options.selector || '.slide';
  this.$parent  = options.$parent;
  this.$slides  = $(this.selector, this.$parent);
  this.count    = this.$slides.length;

  this.$parent.prepend(this.$slides.clone().addClass('cloned')).append(this.$slides.clone().addClass('cloned'));
  this.$slides  = $(this.selector, this.$parent);

  this.transit  = options.transition || 'swing';
  this.speed    = options.speed || 600;
  this.channel  = {};
  this.current  = 1;

  if (options.swipe) this.enableSwipe();

};

MZW.InfiniteSlider.prototype.enableSwipe = function() {

  if (Hammer) {

		var hammer = new Hammer(this.$parent.get(0));

    hammer.onswipe = $.proxy(function(e) {

      switch(e.direction) {
        case 'left' : this.next(); break;
        case 'right': this.prev(); break;
        default:
      }

    }, this);

  } else {

    throw new Error("InfinteSlider -- missing Hammer.js dependency for swipe option");

  }

};

MZW.InfiniteSlider.prototype.goto = function(num, options) {

  var $goto = this.$slides.eq(this.count + num - 1);
  options = options || {};

  if ( ! $goto.length || num < 1 || num > this.count) return false;

  this.$parent.stop().animate({left: -$goto.position().left}, options.speed, this.transit, options.callback || $.noop);
  this.current = num;
  $(this.channel).trigger('goto', this);

  return true;

};

MZW.InfiniteSlider.prototype.next = function() {

  if (this.current === this.count) {
    this.$parent.css({left: -this.$slides.eq(this.count - 1).position().left});
    this.current = 0;
  }

  if (this.goto(this.current + 1, {speed: this.speed})) $(this.channel).trigger('next', this);

};

MZW.InfiniteSlider.prototype.prev = function() {

  if (this.current === 1) {
    this.$parent.css({left: -this.$slides.eq(this.count * 2).position().left});
    this.current = this.count + 1;
  }

  if (this.goto(this.current - 1, {speed: this.speed})) $(this.channel).trigger('prev', this);

};