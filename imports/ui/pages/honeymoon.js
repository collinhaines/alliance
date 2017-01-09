import './honeymoon.html';

import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

Template.honeymoon.onCreated(function () {
  // Static coordinates of each visiting location in Ireland.
  const coordinates = [
    {
      title:    'Dublin',
      latitude:  53.349805,
      longitude: -6.260310
    }, {
      title:     'Galway City',
      latitude:  53.270668,
      longitude: -9.056791
    }, {
      title:     'Cliffs of Moher',
      latitude:  52.971880,
      longitude: -9.426510
    }, {
      title:     'Carrick-A-Rede',
      latitude:  55.239561,
      longitude: -6.332456
    }, {
      title:     'Belfast',
      latitude:  54.597285,
      longitude: -5.930120
    }, {
      title:     'Giants Causeway',
      latitude:  55.240807,
      longitude: -6.511555
    }, {
      title:     'Glendalough',
      latitude:  53.011980,
      longitude: -6.329840
    }, {
      title:     'Wicklow Mountains',
      latitude:  53.081805,
      longitude: -6.393859
    }, {
      title:     'Kilkenny',
      latitude:  52.654145,
      longitude: -7.244788
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
        note: 'Charleston, SC &dash; Dublin, Ireland',
        date: 'Monday, June 19',
        list: [
          'Flight Details:',
          'Charleston &dash; New York City: Jet Blue',
          'New York City &dash; Dublin: Aer Lingus'
        ],
        description: 'Accommodations provided by a private apartment through Airbnb.'
      }, {
        note: 'Dublin, Ireland: Self-paced exploring',
        date: 'Tuesday, June 20'
      }, {
        note: 'Day Tours from Dublin: Kilkenny, Wicklow Mountains, and Glendalough',
        date: 'Wednesday, June 21',
        description: 'Enjoy the stunning scenery, flora and fauna as we travel through the countryside and Kilkenny before continuing on to the wild and rugged Wicklow Mountains. Continuing over the mountains, we arrive at the famous heritage site of Glendalough; a glacial valley and medieval monastic settlement which played an important role in the religious and cultural history of Europe.'
      }, {
        note: 'Day Tours from Dublin: Giants Causeway, Belfast City, and Carrick-A-Rede Rope Bridge',
        date: 'Thursday, June 22',
        description: 'Arriving in Belfast City you will immediately observe how different it will look compared to the city which you departed, Dublin. Belfast was the only city in Ireland which experienced the Industrial Revolution of Britain during the 19<sup>th</sup> century. You choose between the world famous Black Taxi Political Tour or to visit the Titanic Experience and Quarter.'
      }, {
        note: 'Day Tours from Dublin: Cliffs of Moher, Atlantic Edge Ocean Walk, and Galway City',
        date: 'Friday, June 23',
        description: 'Travel with us to the Cliffs of Moher in County Clare located on Ireland\'s wild rugged Atlantic coast. The cliffs are the highest cliffs in Europe at 214 meters/700 feet high and were recently voted as the seventh most wonderful heritage site in the world, a global poll conducted by UNESCO.'
      }, {
        note: 'Dublin, Ireland: Self-paced exploring',
        date: 'Saturday, June 24'
      }, {
        note: 'Dublin, Ireland &dash; Charleston, SC',
        date: 'Sunday, June 25',
        list: [
          'Flight Details:',
          'Dublin &dash; New York City: Aer Lingus',
          'New York City &dash; Charleston: Jet Blue'
        ]
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
