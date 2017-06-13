import './pictures.html';

import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

Template.pictures.helpers({
  pictures() {
    return [
      {
        name: 'IMG_0770.jpg'
      }, {
        name: 'IMG_0777.jpg'
      }, {
        name: 'IMG_0794.jpg',
        top: -100
      }, {
        name: 'IMG_0810.jpg'
      }, {
        name: 'IMG_0815.jpg'
      }, {
        name: 'IMG_0831.jpg'
      }, {
        name: 'IMG_0835.jpg'
      }, {
        name: 'IMG_0846.jpg',
        top: -100
      }, {
        name: 'IMG_0850.jpg'
      }, {
        name: 'IMG_0963.jpg'
      }, {
        name: 'IMG_1003.jpg'
      }, {
        name: 'IMG_1031.jpg',
        top: -150
      }, {
        name: 'IMG_1036.jpg',
        top: -150
      }, {
        name: 'IMG_0776.JPG'
      }, {
        name: 'IMG_0784.JPG'
      }, {
        name: 'IMG_0829.JPG'
      }, {
        name: 'IMG_0843.JPG',
        top: -90
      }, {
        name: 'IMG_0858.JPG'
      }, {
        name: 'IMG_1015.JPG'
      }, {
        name: 'IMG_1016.JPG'
      }
    ];
  }
});

Template.pictures.onRendered(function () {
  $('.pictures-gallery-image').each(function () {
    const $image = $(this).find('img');
    const $hover = $(this).find('.pictures-gallery-image-link-hover');

    $hover.css('width', $(this).width());

    if ($image.data('margin-top') !== undefined) {
      $image.css('margin-top', $image.data('margin-top'));
    }
  });
});
