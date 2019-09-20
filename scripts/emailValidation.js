function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate() {
  var email = $("#emailOfSpender").val();
  var phone = $("#PhoneOfSpender").val();
  var name = $ ("#NameOfSpender").val();

  if (validateEmail(email) && phone.length && !isNaN(phone) && name.length) {
    $(".spender-email-block" ).addClass("validation-complete");
  } else {
    $(".email-block-holder" ).addClass("error-active");  
  }
  return false;
}

$("#validate").on("click", validate);

function articleSignUp() {
    $(".afterSignUp").addClass("active");
}
$("#articleSignBtn").on("click", articleSignUp);