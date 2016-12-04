import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Load components.
import '/imports/ui/components/navigation.js';

// Load layout.
import '/imports/ui/layout/overlord.js';

// Load pages.
import '/imports/ui/pages';

FlowRouter.route('/', {
  action() {
    BlazeLayout.render('overlord', { main: 'home' });
  }
});
