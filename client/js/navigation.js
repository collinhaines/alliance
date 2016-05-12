/*!
 * alliance
 *
 * Copyright 2016 Collin Haines
 * Licensed under the MIT license.
 */

Template.navigation.events({
  'click #navigation a': function (event) {
    if ($('#navigation li.active').length) {
      $('#navigation li.active').removeClass('active').find('span').remove();
    } // if ($('#navigation li.active').length)

    $(event.target).append(' <span class="sr-only">(current)</span>').parent().addClass('active');

    if ($('.navbar-collapse').hasClass('in')) {
      $('.navbar-toggle').trigger('click');
    } // if ($('.navbar-collapse').hasClass('in'))

    $('html, body').animate({
      scrollTop: $(event.target.hash).position().top
    });

    event.target.blur();
    event.preventDefault();
  } // 'click #navigation a': function (event)
});
