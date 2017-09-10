$(function () {
  $('a.animate').click(scrollTop)
  initScrollTopButton()
})

function scrollTop () {
  $('body').animate({
    scrollTop: $($(this).attr('href')).offset().top
  }, 500)
  return false
}

function initScrollTopButton () {
  var $window = $(window)
  var topDistance = 300
  var shown = false
  var $btn = $('#site-scroll-top')
  $window.scroll(function () {
    if ($window.scrollTop() > topDistance) {
      if (!shown) {
        shown = true
        $btn.addClass('show')
      }
    } else if (shown) {
      $btn.removeClass('show')
      shown = false
    }
  })
}
