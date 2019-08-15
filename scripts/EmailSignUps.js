var i = 0;

var EmailSignUps = {
  submitEmail: function (email){
    $.ajax({
      url: apiUrl + '/email_submissions',
      method: 'post',
      data: {
        email_submission: {
          email: email
        }
      }
    }).done(function(){
      // If email submission is succesful, only then track on facebook
      fbq('track', 'Lead');

      // And we track on MixPanel
      // First we create an alias on MP Distinct Id which will be email
      distinct_id = mixpanel.get_distinct_id()
      mixpanel.alias(email, distinct_id)

      // Second we set up the user profile
      mixpanel.identify(distinct_id)

      // Third we track the sign up event
      mixpanel.track(
          "Website Email Sign Up",
          {"email": email, "where": "landing"}
      );

      // Finally we update the $email attribute on user profile
      mixpanel.people.set({ "$email": email });

      i = 0;
      $('.only-home-page').addClass('active');
    }).error(function(){
     i++;
     if(i === 6){
      $('.try-again-later').addClass('active');
     } else {
      $('.errore').addClass('active'); 
      
      setTimeout(function(){
        $('.errore, .welcom-content, .start_here-button-holder ').removeClass('active');
        $(".input-holder, .sing-up-btn").css('opacity', '1.0');
      }, 1500);
     }
    })
  }
};