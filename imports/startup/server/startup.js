import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Timeline } from '/imports/api/timeline.js';

Meteor.startup(function () {
  _.each(JSON.parse(Assets.getText('timeline.json')), (object) => {
    const item = Timeline.findOne({ date: object.date });

    if (item) {
      let setter = {};

      for (let key in object) {
        if (item[key] === object[key]) {
          continue;
        }

        setter[key] = object[key];
      }

      if (Object.getOwnPropertyNames(setter).length) {
        console.log('Updating timeline.', setter);

        Timeline.update({
          _id: item._id
        }, {
          $set: setter
        });
      }
    } else {
      console.log('Inserting into timeline: ' + object.title);

      Timeline.insert(object);
    }
  });
});
