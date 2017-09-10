document.addEventListener('DOMContentLoaded', function () {
  var ias = $.ias({
    container: '.posts',
    item: '.post',
    pagination: '.pager-next-url',
    next: '.pager-next-url'
  })
  ias.on('loaded', function (data, items) {
    console.log('loaded:', items)
    if (window.MathJax) MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  })
  ias.extension(new IASSpinnerExtension({
    src: '/assets/img/loading.gif'
  }))
  ias.extension(new IASNoneLeftExtension({
    text: '只有这些了~',
    html: '<div class="ias-noneleft" style="text-align: center;">{text}</div>'
  }))

  $.get('/api/tags.json').done(function (tags) {
    var tagEls = tags
    .sort(function (lhs, rhs) {
      return rhs.count - lhs.count
    })
    .filter(function (tag) {
      return tag.count > 1
    })
    .map(function (tag) {
      return $('<a>', {
        class: 'tag',
        href: '/tags.html#' + tag.name
      }).html(tag.name + '(' + tag.count + ')')
    })
    $('.tag-list').append(tagEls)
  })
  var links = [{
    icon: 'fa-code-fork',
    url: 'https://github.com/xudeyu/xudeyu.github.io',
    target: '_blank'
  }, {
    plugin: 'rss',
    url: 'http://xudeyu.github.io/feed.xml',
    target: '_blank'
  }, {
    icon: 'fa-envelope',
    background: '#5484d6',
    url: 'mailto:xvdeyu@gmail.com?subject=来自Deyu'
  }, {
    plugin: 'twitter',
    url: 'https://twitter.com/xvdeyu',
    target: '_blank'
  }, {
    plugin: 'linkedin',
    url: 'https://linkedin.com/in/xudeyu',
    target: '_blank'
  }]
  socialShare($('.follow').get(0), links, {size: 'sm'})
})
