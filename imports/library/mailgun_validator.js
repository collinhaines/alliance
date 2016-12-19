//
// Mailgun Address Validation Plugin
//
// Attaching to a form:
//
//  $('jquery_selector').mailgun_validator({
//    api_key: 'api-key',
//    in_progress: in_progress_callback, // called when request is made to validator
//    success: success_callback,         // called when validator has returned
//    error: validation_error,           // called when an error reaching the validator has occured
//  });
//
//
// Sample JSON in success callback:
//
//  {
//    "is_valid": true,
//    "parts": {
//      "local_part": "john.smith@example.com",
//      "domain": "example.com",
//      "display_name": ""
//    },
//    "address": "john.smith@example.com",
//    "did_you_mean": null
//  }
//
// More API details: https://api.mailgun.net/v2/address
//

(function($) {
  $.fn.mailgun_validator = function (options) {
    return this.each(function (event) {
      // Trim string and autocorrect whitespace issues.
      $(this).val($(this).val().trim());

      // Attach event to options.
      options.event = event;

      run_validator($(this).val(), options, $(this));
    });
  };

  function run_validator(address_text, options, element) {
    // Abort existing AJAX request to prevent flooding.
    if (element.mailgunRequest) {
      element.mailgunRequest.abort();
      element.mailgunRequest = null;
    }

    // Don't run validator without input.
    if (!address_text) {
      return;
    }

    // Validator is in progress.
    if (options && options.in_progress) {
      options.in_progress(options.event);
    }

    // Don't run duplicate calls.
    if (element.attr('data-last-success')) {
      if (address_text === JSON.parse(element.attr('data-last-success')).address) {
        if (options && options.success) {
          options.success(JSON.parse(element.attr('data-last-success')), options.event);
        }

        return;
      }
    }

    // Length and @ syntax check.
    let error_message = false;

    if (address_text.length > 512) {
      error_message = 'Email address exceeds maximum allowable length of 512.';
    } else if (1 !== address_text.split('@').length - 1) {
      error_message = 'Email address must contain only one @.';
    }

    if (error_message) {
      if (options && options.error) {
        options.error(error_message, options.event);
      } else {
        console.log(error_message);
      }

      return;
    }

    // Require api key.
    if (options && options.api_key === undefined) {
      console.log('Please pass in api_key to mailgun_validator.');
    }

    // Timeout in case of some kind of internal server error.
    const timeoutID = setTimeout(function () {
      error_message = 'Error occurred, unable to validate address.';

      if (!success) {
        // Abort existing AJAX request for a true timeout.
        if (element.mailgunRequest) {
          element.mailgunRequest.abort();
          element.mailgunRequest = null;
        }

        if (options && options.error) {
          options.error(error_message, options.event);
        } else {
          console.log(error_message);
        }
      }
    }, 30000); // 30 seconds

    // Make AJAX call to get validation results.
    element.mailgunRequest = $.ajax({
      url:         'https://api.mailgun.net/v2/address/validate?callback=?',
      type:        'GET',
      dataType:    'jsonp',
      crossDomain: true,
      data: {
        address: address_text,
        api_key: options.api_key
      },

      success: (data, status_text) => {
        clearTimeout(timeoutID);

        element.attr('data-last-success', JSON.stringify(data));

        if (options && options.success) {
          options.success(data, options.event);
        }
      },

      error: (request, status_text, error) => {
        clearTimeout(timeoutID);

        error_message = 'Error occurred, unable to validate address.';

        if (options && options.error) {
          options.error(error_message, options.event);
        } else {
          console.log(error_message);
        }
      }
    });
  }
})(jQuery);
