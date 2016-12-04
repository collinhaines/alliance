import './home.html';

import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import '/imports/library/jquery-plugin.js';
import '/imports/library/countdown.js';

Template.home.onRendered(function () {
  $('#countdown').countdown({
    until:  new Date('2017-06-17T17:00:00-05:00'),
    format: 'yowdHMS'
  });
});
