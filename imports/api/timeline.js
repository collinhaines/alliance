import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Timeline = new Mongo.Collection('timeline');

if (Meteor.isServer) {
  Meteor.publish('timeline', () => {
    return Timeline.find();
  });
}

Timeline.deny({
  insert() { return false; },
  remove() { return false; },
  update() { return false; }
});
