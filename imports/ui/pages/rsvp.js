import './rsvp.html';

import { Template } from 'meteor/templating';

Template.rsvp.helpers({
  link() {
    return '//docs.google.com/forms/d/e/1FAIpQLSeXVEwhZ4iMrYDt_7gvwsBGmzltUH2IEaX2SVtHwwnZi8vAaw/viewform?embedded=true';
  }
});
