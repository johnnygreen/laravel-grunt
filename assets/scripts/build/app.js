
(function() {
  var $window;
  $window = $(window);
  $('[data-related]').on('click', function() {
    var $related;
    $related = $($(this).attr('data-related'));
    if ($window.width() <= 480) {
      $related.css({
        top: $window.scrollTop()
      });
    }
    return $related.fadeIn();
  });
  return $('.footer-overlay').on('click', function() {
    return $(this).fadeOut();
  });
})();
