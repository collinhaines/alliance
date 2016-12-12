import './overlord.html';

import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import '/imports/library/modernizr.js';

Template.overlord.onRendered(function () {
  if (Modernizr.cssanimations) {
    console.info('Hiding ' + $('.cssanimations-alert').length + ' cssanimations alerts.');

    $('.cssanimations-alert').hide();
  }
});
