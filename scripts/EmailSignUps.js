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