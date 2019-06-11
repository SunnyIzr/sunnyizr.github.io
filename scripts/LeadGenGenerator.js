var LeadGenGenerator = {
  init: function(){
    this.loadLeadGen()
    this.displayEmailInput()
    this.successfulSignUp()
  },
  loadLeadGen: function(){
    $('#loadLeadGen').click(function(){
      $('.leadGenContent').show()
      $('.social_sp_block').animate({
          scrollTop: $(".social_sp_block")[0].scrollHeight
      }, 700);
      setTimeout(function(){
        $('.leadGenContent').addClass('active')
      }, 200)
    })
  },
  displayEmailInput: function(){
    $(".start-btn").click(function() {
      $(".start-btn").addClass("grow");

      setTimeout(function(){
        $(".start-btn").css('opacity', '0.0')
        $('.input-holder input').focus()
      }, 700);

      setTimeout(function(){
        $(".input-holder, .sing-up-btn").css('opacity', '1.0')
        $(".start-btn").css('z-index', '-1')
      }, 900)
    });
  },
  successfulSignUp: function(){
    $(".sing-up-btn").click(function() {
      $('.social-sp-content').hide()
      $(".input-holder, .sing-up-btn").css('opacity', '0.0')
      $(".welcom-content").addClass("active");
      setTimeout(function(){
        $(".welcom-content").css('opacity', '1.0')
      }, 200)
    })
  }
};


