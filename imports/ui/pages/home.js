import './home.html';

import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { $ } from 'meteor/jquery';

import { Timeline } from '/imports/api/timeline.js';

import '/imports/library/jquery-plugin.js';
import '/imports/library/countdown.js';

Template.home.onCreated(function () {
  Tracker.autorun(() => {
    this.subscribe('timeline');
  });
});

Template.home.helpers({
  timeline() {
    return Timeline.find({}, {
      sort: {
        date: 1
      }
    });
  },

  renderDate(timestamp) {
    return new Date(timestamp).toDateString().substr(4);
  },

  registries() {
    return [
      {
        'link': 'http://www.target.com/gift-registry/giftgiver?registryId=xvwq0lbiB-4Plgy8dlIELw',
        'image': 'target-logo.png',
        'brand': 'Target',
        'category': 'Kitchen, Dining, Living'
      }, {
        'link': 'https://www.bedbathandbeyond.com/store/giftregistry/view_registry_guest.jsp?eventType=Wedding&inventoryCallEnabled=true&registryId=543758362',
        'image': 'bed-bath-and-beyond-logo.png',
        'brand': 'Bed Bath & Beyond',
        'category': 'Bedroom, Bathroom, Furniture'
      }, {
        'link': 'https://www.amazon.com/wedding/collin-haines-chelsea-coleburn-columbia-june-2017/registry/10EMNQK4IZLM6',
        'image': 'amazon-logo.png',
        'brand': 'Amazon',
        'category': 'Electronics, Games, Other'
      }
    ];
  }
});

Template.home.onRendered(function () {
  /*
   * Deal with the countdown plugin.
   */
  $('#countdown').countdown({
    until:  new Date('2017-06-17T17:00:00-04:00'),
    format: 'yowdHMS'
  });

  /*
   * Deal with the timeline plugin.
   */
  // On scrolling, show/animate timeline blocks when entering the viewport.
  $(window).on('scroll', function () {
    if (!window.requestAnimationFrame) {
      setTimeout(function () {
        showBlocks();
      }, 100);
    } else {
      window.requestAnimationFrame(function () {
        showBlocks();
      });
    }
  });

  function showBlocks() {
    $('.cd-timeline-block').each(function () {
      const $timelineImage = $(this).find('.cd-timeline-img');

      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.8 && $timelineImage.hasClass('is-hidden')) {
        $(this).find('.cd-timeline-img, .cd-timeline-content')
          .removeClass('is-hidden')
          .addClass('bounce-in');
      }
    });
  }
});

Template.home.onDestroyed(function () {
  $(window).off('scroll');
});
