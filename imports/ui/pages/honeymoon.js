import './honeymoon.html';

import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

Template.honeymoon.onCreated(function () {
  // Static coordinates of each visiting location in Ireland.
  const coordinates = [
    {
      title:    'National Museum of Ireland',
      latitude:  53.339881,
      longitude: -6.253348
    }, {
      title:    'St. Patrick\'s Cathedral',
      latitude:  53.339515,
      longitude: -6.271455
    }, {
      title:    'Guinness Storehouse',
      latitude:  53.341324,
      longitude: -6.286883
    }, {
      title:     'Redcross',
      latitude:  52.889731,
      longitude: -6.145274
    }, {
      title:     'Wicklow Mountains',
      latitude:  53.081805,
      longitude: -6.393859
    }, {
      title:     'Kilkenny',
      latitude:  52.654145,
      longitude: -7.244788
    }, {
      title:     'Rock of Cashel',
      latitude:  52.520089,
      longitude: -7.890409
    }, {
      title:     'Blarney Stone',
      latitude:  51.929084,
      longitude: -8.570996
    }, {
      title:     'Cliffs of Moher',
      latitude:  52.971880,
      longitude: -9.426510
    }, {
      title:     'Dunluce Castle',
      latitude:  55.210674,
      longitude: -6.579606
    }, {
      title:     'Carrick-A-Rede',
      latitude:  55.239561,
      longitude: -6.332456
    }, {
      title:     'Giant\'s Causeway',
      latitude:  55.240807,
      longitude: -6.511555
    }, {
      title:     'Belfast',
      latitude:  54.597285,
      longitude: -5.930120
    }
  ];

  // Create a callback once the Google Maps is done initializing.
  GoogleMaps.ready('honeymoon', (map) => {
    console.info('Google Maps is ready.');
    console.info('Installing ' + coordinates.length + ' markers.');

    // Loop through each coordinate.
    for (let i = 0; i < coordinates.length; i++) {
      // Create a map marker.
      new google.maps.Marker({
        map:      map.instance,
        title:    coordinates[i].title,
        position: new google.maps.LatLng(coordinates[i].latitude, coordinates[i].longitude)
      });
    }
  });
});

Template.honeymoon.helpers({
  itinerary() {
    return [
      {
        note: 'Charlotte, NC &dash; Dublin, Ireland',
        date: 'Monday, June 19'
      }, {
        note: 'National Museum of Ireland, St. Patrick\'s Cathedral, and Guinness Storehouse',
        date: 'Tuesday, June 20'
      }, {
        note: 'Hiking in the Wicklow Mountains',
        date: 'Wednesday, June 21'
      }, {
        note: 'Kilkenny, The Rock of Cashel, and The Blarney Stone',
        date: 'Thursday, June 22',
      }, {
        note: 'Cliffs of Moher',
        date: 'Friday, June 23',
      }, {
        note: 'Dunluce Castle, Carrick-A-Rede Rope Bridge, and Giant\'s Causeway',
        date: 'Saturday, June 24'
      }, {
        note: 'Dublin, Ireland &dash; Charlotte, NC',
        date: 'Sunday, June 25'
      }
    ];
  },

  options() {
    if (GoogleMaps.loaded()) {
      return {
        zoom:        7,
        center:      new google.maps.LatLng(53.504522, -8.019456),
        scrollwheel: false
      };
    }
  }
});

Template.honeymoon.onRendered(function () {
  console.info('There are ' + $('.honeymoon-itinerary .itinerary-row').length + ' rows to sift through.');

  $('.honeymoon-itinerary .itinerary-row').each(function () {
    if ($(window).width() < 768) {
      return false;
    }

    const first = $(this).find('> div').first().height();
    const last  = $(this).find('> div').last().height();

    let height = 15;

    if (first > last) {
      height += first;
    } else {
      height += last;
    }

    $(this).find('> div').height(height);
  });

  /*
   * Load Google Maps.
   */
  GoogleMaps.load({
    key: 'AIzaSyBd-FrKLjFIUMazZ3dvIlWojjSzTgqD_-E'
  });
});
