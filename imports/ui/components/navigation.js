import './navigation.html';

import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import '/imports/library/collapse.js';
import '/imports/library/transition.js';

Template.navigation.events({
  /**
   * Navigation Collapse
   *
   * On smaller screens, collapse the navigation menu.
   *
   * By default, the navigation menu does not occur because it was created with
   * intention to be utilized for full-page-rendering rather than template
   * rendering that occurs with Meteor.
   *
   * @param {Object} event -- The event occurring.
   */
  'click .navbar-nav a'(event) {
    $('#navigation').collapse('hide');

    event.target.blur();
  }
});
