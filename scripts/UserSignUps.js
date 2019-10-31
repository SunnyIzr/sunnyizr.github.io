var i = 0;

var UserSignUps = {
  submitData: function(name, phone, email, eventName, where, sendInvite, sessionId, successFunc, errorFunc){
    website_submission = {}
    if (phone != null){
      website_submission['phone'] = phone
    }
    if (email != null){
      website_submission['email'] = email
    }
    if (name != null){
      website_submission['name'] = name
    }
    submitData = {
      send_invite: sendInvite,
      website_submission: website_submission
    }
    if (sessionId != null){
      submitData['sessionId'] = sessionId
    }

    $.ajax({
      url: '@@emailUrl',
      method: 'post',
      data: submitData
    }).done(function(res){
      successFunc()

      // If submission is succesful, only then track on facebook
      fbq('track', 'Lead');

      // And then we track on MixPanel

      // First we obtain the distinct id 
      distinct_id = mixpanel.get_distinct_id();

      // Second step requires a phone # and depends on if phone # has been aliased or not
      if (phone != null){

        // If this hasnt been aliased, we should create a new alias (sign up)
        if (res['new_alias']){
          mixpanel.alias(phone, distinct_id);
          mixpanel.identify(distinct_id);

        // If this has been aliased we identify with phone
        } else {
          mixpanel.identify(phone)
        }


      }
      // NOTE: The reason we still use the existing distinct id and we dont use the phone number as the distinct id
      // is becuase it will break the funnel. An issue with MixPanel


      // Third we track the submission event event
      trackingSubmission = {"where": where}
      if (phone != null){
        trackingSubmission['phone'] = phone
      }
      if (email != null){
        trackingSubmission['email'] = email
      }
      if (name != null){
        trackingSubmission['name'] = name
      }
      mixpanel.track(eventName, trackingSubmission);

      // Finally we update the name, phone, email attribute on user profile but again only if we have the phone number
      // We will not be creating profiles for non-phone submissions
      if (phone != null){
        mixpanel.people.set({ "$phone": phone });
        if (email != null){
          mixpanel.people.set({ "$email": email });
        }
        if (name != null){
          mixpanel.people.set({ "$name": name });
        }
        
      }
    }).error(function(){
      errorFunc()
    })
  }
};