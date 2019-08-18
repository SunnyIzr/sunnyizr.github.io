var LeadGenGenerator = {
  init: function(){
    this.loadLeadGen();
    this.displayEmailInput();
    this.successfulSignUp();
  },
  loadLeadGen: function(){
    $('#loadLeadGen').click(function(){
      $('.leadGenContent').show();

      $('.social_sp_block').animate({
          scrollTop: $(this)[0].scrollHeight
      }, 700);

      setTimeout(function(){
        $('.leadGenContent').addClass('active');

        var result = $('#resultTitle').text();
        $('#resultSpan').html('So <span class="bold_text">' + result.toLowerCase() + '</span>, huh?');
        $('.start_here-button-holder').removeClass('active');
      }, 150)
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
    $("#submitEmailButton2").click(function() {
      var result = $('#emailInput2').val();

      EmailSignUps.submitEmail(result);
    })
  }
};


