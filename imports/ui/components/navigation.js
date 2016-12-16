import './navigation.html';

import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import '/imports/library/collapse.js';
import '/imports/library/transition.js';

Template.navigation.events({
  'click .navbar-nav a'(event) {
    $('#navigation').collapse('hide');
  }
});
