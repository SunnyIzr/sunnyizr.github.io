var LandingPage = {
  init: function(){
    this.submitEmailListener()
  },
  submitEmailListener: function(){
    $("#emailInput").on('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        $("#submitEmailButton").click();
      }
    });
    $('#submitEmailButton').on('click', function() {
      var email =  $('#emailInput').val();
      function successFunc(){
        $('.only-home-page, .welcom-content, .start_here-button-holder').addClass('active');
      }
      function error2Func(){
        $('.start_here-button-holder, .try-again-later, .welcom-content').addClass('active');
      }
      function error1Func(){
        $('.start_here-button-holder, .errore, .welcom-content').addClass('active');
      }
      function errorRefreshFunc(){
        $('.errore, .welcom-content, .start_here-button-holder ').removeClass('active');
      }
      var eventName = "Website Email Sign Up"
      EmailSignUps.submitEmail(email, eventName, successFunc, error1Func, error2Func, errorRefreshFunc);
    });
  },
}