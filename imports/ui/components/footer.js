import './footer.html';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';

import { Information } from '/imports/api/information.js';

import '/imports/library/mailgun_validator.js';

Template.footer.events({
  /**
   * Email Submitter
   *
   * Validates and submits a user-inputted email to the information collection
   * indicating they would like to learn more information as it arrives.
   *
   * @param {Object} event -- The event occurring.
   */
  'submit #subscribe'(event) {
    /**
     * Disable Button
     *
     * Determines whether to disable a button from being multiple times or not.
     *
     * @param {Boolean} isBeingDisabled -- Determiner
     */
    const disable = (isBeingDisabled) => {
      let isDisabled   = false;
      let pointerEvent = '';

      if (isBeingDisabled) {
        isDisabled   = true;
        pointerEvent = 'none';
      }

      $('#subscribe-group-submit')
        .css('pointer-events', pointerEvent)
        .attr('disabled', isDisabled);
    };

    /**
     * Email Inserter
     *
     * Executes a Meteor API call to add an email to the collection.
     *
     * @param {String} email -- Email to be added.
     */
    const insert = (email) => {
      visual('info', 'Adding email...');

      Meteor.call('information.insert', email, (error, result) => {
        if (error) {
          visual('error', error.reason);

          return;
        }

        if (result === 'given') {
          visual('success', 'Email already added.');
        } else {
          visual('success', 'Email successfully added.');
        }
      });
    };

    /**
     * Visual Renderer
     *
     * Renders whatever visual text and its corresponding type to talk to the
     * user.
     *
     * @param {String} type -- The type (error, info, success, warning)
     * @param {String} text -- The text.
     */
    const visual = (type, text) => {
      $('#subscribe-group-alert').text(text);

      if ($('#subscribe-group-alert').hasClass('hide')) {
        $('#subscribe-group-alert').removeClass('hide');
      }

      $('#subscribe-group')
        .removeClass('has-error has-info has-success has-warning')
        .addClass('has-' + type);


      disable(type === 'info');
    };

    // Start off by telling the user we're validating their email.
    visual('info', 'Validating email...');

    // Validate the email through Mailgun.
    $('#subscribe-group-email').mailgun_validator({
      api_key: 'pubkey-3c029ef156565747a8a16fa31d7b9413',

      error: (error) => {
        visual('error', error);
      },

      success: (data) => {
        if (data.did_you_mean) {
          visual('warning', 'Did you mean \'' + data.did_you_mean + '\'?');
        } else if (!data.is_valid) {
          visual('error', 'This email address is invalid.');
        } else if (data.is_valid) {
          insert(data.address);
        }
      }
    });

    // Prevent browser-default form submission to occur.
    event.preventDefault();
  }
});
