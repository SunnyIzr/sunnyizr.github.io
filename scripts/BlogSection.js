var BlogSection = {
  init: function(){
    this.togglePopupListener()
    this.emailSubmitEventListener()
  },
  emailSubmitEventListener: function(){
    $('#emailSignup').on('submit', function(event){
      event.preventDefault()
      BlogSection.submitEmail()
    })
  },
  submitEmail: function(){
    var email = $(".post-template input[type=email]").val()
    $('#submit-email').html(email)
    EmailSignUps.submitEmail(email, 'Blog Email Sign Up', BlogSection.renderSuccess, BlogSection.renderError, BlogSection.renderError, BlogSection.renderError)
  },
  togglePopupListener: function(){
    if($('.post-template').length){
      if ( BlogSection.getCookie('claspblogemail') != 'true'){
        var timeout = setTimeout(function(){
          BlogSection.togglePopup();
          clearTimeout(timeout);
          timeout = null;
          BlogSection.setCookie()
        }, 15000);
        $('.closeImg.togglePopup').on('click', BlogSection.togglePopup);
      }
    }
  }, 
  togglePopup: function(){
    $('body').toggleClass('activePopup');
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


