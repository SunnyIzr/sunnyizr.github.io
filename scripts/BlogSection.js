var BlogSection = {
  init: function(){
    this.togglePopupListener();
    this.emailSubmitEventListener();
  },
  emailSubmitEventListener: function(){
    $('#blogEmailSignup').on('submit', function(event){
      event.preventDefault()
      var email = $(this).find('input').val()
      BlogSection.submitEmail(email)
    })
  },
  submitEmail: function(email){
    EmailSignUps.submitEmail(email, 'Blog Email Sign Up', BlogSection.renderSuccess, BlogSection.renderError, BlogSection.renderError, BlogSection.renderError)
  },
  togglePopupListener: function(){
      if (!BlogSection.getCookie('claspblogemail')){
        var timeout = setTimeout(function(){
          BlogSection.togglePopup();
          clearTimeout(timeout);
          timeout = null;
          BlogSection.setCookie()
        // }, 15000);
        }, 150);
        $('.closeImg.togglePopup').on('click', BlogSection.togglePopup);
        $('.sign-up.togglePopup').on('click',BlogSection.validate )
      }
    // }
  }, 
  validateEmail: function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  validate: function(){    
    var email = $("#artInput").val();
    console.log(validateEmail(email))
    if (validateEmail(email)){
      BlogSection.renderSuccess();
    }else{
      BlogSection.renderError();
    }
  },
  togglePopup: function(){
    $('body').toggleClass('activePopup');
    $('input[type=email]').focus()
  },
  renderSuccess: function(){
    $('.popupHolder').addClass('submit-success')
  },
  renderError: function(){
    $('.popupHolder').addClass('submit-error')
  },
  setCookie: function(){
    var now = new Date();
    var time = now.getTime();
    time += 14 * 24 * 60 * 60 * 1000;
    now.setTime(time);
    console.log("claspblogemail=true; " + now.toUTCString() + ";")
    document.cookie = "claspblogemail=true; expires=" + now.toUTCString() + "; path=/"
  },
  getCookie: function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
  }
}


