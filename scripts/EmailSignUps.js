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
      // If email submission is succesful, only then track on facebook and mixpanel
      fbq('track', 'Lead');
      mixpanel.track(
          "Website Email Sign Up",
          {"email": email}
      );
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