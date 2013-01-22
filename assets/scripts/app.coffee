(->

  $window = $ window

  $('[data-related]').on 'click', ->
    $related = $ $(@).attr 'data-related'
    $related.css top: $window.scrollTop() if $window.width() <= 480
    $related.fadeIn()

  $('.footer-overlay').on 'click', -> $(@).fadeOut()

)();