import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Load layout.
import '/imports/ui/layout/overlord.js';

// Load pages.
import '/imports/ui/pages';

FlowRouter.route('/', {
  action() {
    BlazeLayout.render('overlord', { main: 'home' });
  }
});

FlowRouter.route('/details', {
  action() {
    BlazeLayout.render('overlord', { main: 'details' });
  }
});

FlowRouter.route('/honeymoon', {
  action() {
    BlazeLayout.render('overlord', { main: 'honeymoon' });
  }
});
