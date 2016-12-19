import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Information = new Mongo.Collection('information');

Information.deny({
  insert() { return false; },
  remove() { return false; },
  update() { return false; }
});

Meteor.methods({
  /**
   * Information Inserter
   *
   * Inserts a given email into the information collection.
   *
   * @param  {String} email -- The email to be inserted.
   * @return {String}
   */
  'information.insert'(email) {
    console.info('Information is requesting to insert \'' + email + '\'.');

    if (Information.findOne({ email: email })) {
      console.info('Information already has \'' + email + '\'.');

      return 'given';
    }

    return Information.insert({
      email:      email,
      subscribed: true
    });
  },

  /**
   * Information Update - Unsubscribe
   *
   * Alerts the database that the given email is unsubscribing from all future
   * emails.
   *
   * @param  {String} email -- The email being updated.
   * @return {String}
   */
  'information.update.unsubscribe'(email) {
    console.info('Information is requesting to unsubscribe \'' + email + '\'.');

    return Information.update({
      email: email
    }, {
      $set: {
        subscribed: false
      }
    });
  }
});
