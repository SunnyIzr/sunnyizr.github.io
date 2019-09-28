var BlogSection = {
  init: function(){
    if( ($('#article-page').length > 0) ||  ($('.home-template').length > 0)){
      this.togglePopupListener();
      this.emailSubmitPopupEventListener();
      this.emailSubmitBlockEventListener()
    }
  },
  emailSubmitPopupEventListener: function(){
    $('#blogEmailSignup').on('submit', function(event){
      event.preventDefault()
      var email = $(this).find('input').val()
      BlogSection.submitEmail(email, true)
    })
  },
  emailSubmitBlockEventListener: function(){
    $('#bottomBlogEmailSignup').on('submit', function(event){
      event.preventDefault()
      var email = $(this).find('input').val()
      BlogSection.submitEmail(email, false)
    })
  },
  submitEmail: function(email, popup){
    if (popup == true){
      UserSignUps.submitData(null, null, email, 'Blog Email Sign Up', 'Pop Up', false, null, BlogSection.renderPopupSuccess, BlogSection.renderPopupError)
    } else {
      UserSignUps.submitData(null, null, email, 'Blog Email Sign Up', 'Bottom Block', false, null, BlogSection.renderBlockSuccess, BlogSection.renderBlockError)
    }
  },
  togglePopupListener: function(){
    if (!BlogSection.getCookie('claspblogemail')){
      var timeout = setTimeout(function(){
        BlogSection.togglePopup();
        clearTimeout(timeout);
        timeout = null;
        BlogSection.setCookie()
      }, 15000);
      $('.closeImg.togglePopup').on('click', BlogSection.togglePopup);
    }
  }, 
  togglePopup: function(){
    if($('#article-page').length > 0){
      $('body').toggleClass('activePopup');
      $('input[type=email]').focus()
    }
  },
  renderPopupSuccess: function(){
    $('.popupHolder').addClass('submit-success')
  },
  renderPopupError: function(){
    $('.popupHolder').addClass('submit-error')
  },
  renderBlockSuccess: function(){
    $(".afterSignUp").addClass("active");
  },
  renderBlockError: function(){
    $('.signUpBlock').addClass('submit-error')
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
  },
  trackSocialShare: function(){
    $('#article-page .social-shares a').on('click', function(e){
      var platform = $(this).data('platform')

      mixpanel.track('Blog Social Share', {'platform': platform});

    })
  }
}


