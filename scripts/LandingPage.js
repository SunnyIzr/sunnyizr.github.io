var LandingPage = {
  init: function(){
    this.displayPhoneInputListener()
    this.submitPhoneListener()
  },
  displayPhoneInputListener: function(){
    $(".home-page.start-btn").click(function() {
      mixpanel.track('Home Page Show Email Input');
      $(".start-btn").addClass("grow");

      setTimeout(function(){
        $(".start-btn").css('opacity', '0.0')
        $('.input-holder input').focus()
      }, 700);

      setTimeout(function(){
        $(".input-holder, .sing-up-btn").css('opacity', '1.0')
        $(".start-btn").css('z-index', '-1')
        $('.topText').addClass('show_instructions')
      }, 900)
    });
  },
  submitPhoneListener: function(){
    $("#phoneInput").on('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        $("#submitPhoneButton").click();
      }
    });
    $('#submitPhoneButton').on('click', function() {
      var phone =  "1" + $('#phoneInput').cleanVal();
      function successFunc(){
        $('.only-home-page, .welcom-content, .start_here-button-holder').addClass('active');
      }
      function errorFunc(){
        $('.start_here-button-holder, .errore, .welcom-content').addClass('active');
        setTimeout(function(){
          $('.errore, .welcom-content, .start_here-button-holder ').removeClass('active');
        }, 1000)
      }

      var eventName = "Website Landing Page Sign Up"
      UserSignUps.submitData(null, phone, null, eventName, null, true, null, successFunc, errorFunc);
    });
  },
}