import './details.html';

import { Template } from 'meteor/templating';

Template.details.onCreated(function () {
  GoogleMaps.ready('details', (map) => {
    let isRendered = false;

    const info = new google.maps.InfoWindow({
      content: '<div class="details-map-actual-content">' +
        '<div class="details-map-actual-content-title">Seibels House &amp; Garden</div>' +
          '<div class="details-map-actual-content-address">' +
            '<div>1601 Richland St</div>' +
            '<div>Columbia, SC 29201</div>' +
          '</div>' +
          '<div class="details-map-actual-content-link">' +
            '<a href="https://www.google.com/maps/place/Seibels+House+%26+Garden/">View on Google Maps</a>' +
          '</div>' +
        '</div>'
    });

    const marker = new google.maps.Marker({
      position: {
        lat: 34.012867,
        lng: -81.031091
      }
    });

    // Toggle a marker dependent on the zoom level.
    map.instance.addListener('zoom_changed', () => {
      if (map.instance.getZoom() < 17 && !isRendered) {
        marker.setMap(map.instance);
        marker.setAnimation(google.maps.Animation.DROP);

        isRendered = true;
      } else if (16 < map.instance.getZoom() && isRendered) {
        info.close();
        marker.setMap(null);

        isRendered = false;
      }
    });

    marker.addListener('click', () => {
      info.open(map.instance, marker);
    });
  });
});

Template.details.helpers({
  options() {
    if (GoogleMaps.loaded()) {
      return {
        zoom:        17,
        scrollwheel: false,
        center: {
          lat: 34.012867,
          lng: -81.031091
        }
      };
    }
  },

  schedule() {
    return [
      {
        time:  '5:00 PM',
        title: 'Ceremony Begins'
      }, {
        time:  '5:30 PM',
        title: 'Cocktail Hour'
      }, {
        time:  '6:30 PM',
        title: 'Reception'
      }
    ];
  }
});

Template.details.onRendered(function () {
  // Load Google Maps.
  GoogleMaps.load({
    key: 'AIzaSyBd-FrKLjFIUMazZ3dvIlWojjSzTgqD_-E'
  });
});
