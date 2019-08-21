var stopTime;

var EmotionalSpenderQuiz = {
  init: function(){
    this.startQuizListener()
    this.loadLeadGenCopyListener()
    this.displayEmailInputListener()
    this.submitEmailListener()
    this.trackSocialShare()
  },
  startQuizListener: function(){
    mixpanel.track('Emotional Spender Quiz Start');
    $('#startQuiz, #startQuiz2').click(EmotionalSpenderQuiz.startQuiz);
  },
  loadLeadGenCopyListener: function(){
    $('#loadLeadGen').click(function(){
      mixpanel.track('Emotional Spender Quiz Show Lead Gen');
      $('.leadGenContent').show();

      $('.social_sp_block').animate({
          scrollTop: $(this)[0].scrollHeight
      }, 700);

      setTimeout (function(){
        $('.mainQuiz').animate({
          scrollTop: $("#leadGenContent").offset().top + 330},
        'slow');
      }, 300);

      setTimeout(function(){
        $('.leadGenContent').addClass('active');

        var result = $('#resultTitle').text();
        $('#resultSpan').html('So <span class="bold_text">' + result.toLowerCase() + '</span>, huh?');
        $('.start_here-button-holder').removeClass('active');
      }, 150)
    })
  },
  displayEmailInputListener: function(){
    $(".start-btn").click(function() {
      mixpanel.track('Emotional Spender Quiz Show Email Input');
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
  submitEmailListener: function(){
    $("#submitEmailButton2").click(function() {
      var result = $('#emailInput2').val();

      function successFunc(){
        $('#leadGenContent').fadeOut()
        $('.welcom-content, .start_here-button-holder').addClass('active');
      }
      function error1Func(){
        $('.start_here-button-holder, .welcome-content-erore-holder, .errore').addClass('active');
      }
      function error2Func(){
        $('.start_here-button-holder, .welcome-content-erore-holder, .try-again-later').addClass('active');
      }
      function errorRefreshFunc(){
        $('.start_here-button-holder, .welcome-content-erore-holder, .errore').removeClass('active');
      }
      var eventName = "Emotional Spender Quiz Email Sign Up"
      EmailSignUps.submitEmail(result, eventName, successFunc, error1Func, error2Func, errorRefreshFunc);
      EmotionalSpenderQuiz.submitEmailToClaspSubs(result)
    })
    $("#emailInput2").on('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        $("#submitEmailButton2").click();
      }
    });
  },
  submitEmailToClaspSubs: function(email){
    $.ajax({
      url: apiUrl + '/spender_quiz_email_submissions',
      method: 'post',
      data: {
        session_id: EmotionalSpenderQuiz.sessionId,
        response: {
          email: email
        }
      }
    }).done(function(res){
    })
  },
  sessionId: null,
  startQuiz: function(){
    $('body').addClass('cloak');

    $.ajax({
      url: apiUrl + '/spender_quiz_submissions',
      method: 'post'
    }).done(function(res){
      EmotionalSpenderQuiz.sessionId = res.session_id;
      EmotionalSpenderQuiz.populateQuestionAndProgress(res.question, res.progress, res.percent_complete);
      changePageAnim('quiz_active');
    })
  },
  submitQuestion: function(questionName, answer){
    mixpanel.track('Emotional Spender Quiz Submit Question', {'questionName': questionName, 'answer': answer});
    $.ajax({
      url: apiUrl + '/spender_quiz_submissions',
      method: 'patch',
      data: {
        session_id: EmotionalSpenderQuiz.sessionId,
        response: {
          question: questionName,
          answer: answer
        }
      }
    }).done(function(res){
      EmotionalSpenderQuiz.sessionId = res.session_id;

      if(stopTime) clearTimeout(stopTime);
      $('#quiz_question').addClass("animText");

      stopTime = setTimeout(function () {
        if (res.type === 'question'){
            EmotionalSpenderQuiz.populateQuestionAndProgress(res.question, res.progress, res.percent_complete);
            $('#quiz_choices').removeClass("active");
            $('#quiz_question').removeClass("animText");
        } else if (res.type === 'result') {
          $('body').addClass('cloak');
          EmotionalSpenderQuiz.populatesResult(res.result);
        }
    },2000); 
    })
  },
  populateQuestionAndProgress: function(question, progress, percent_complete){
    var choices_html = '';

    if($('#progress').length){
      $('#progress').width(100*percent_complete + '%');
      $('#progressNum').text(progress);
    }

    $('#quiz_question').text(question.body);

    question.choices.map(function(choice){
      choices_html += '<div class="storeBlock" data-name="' + choice.name + '">' +
        '<img src="./images/' + choice.image + '.png" alt="' + choice.name + '"/>' +
        '<p>' + choice.body + '</p></div>';
    });

    $('#quiz_choices').html(choices_html);

    $('.storeBlock').click(function(){
      $(this).addClass("active");
      $('#quiz_choices').addClass("active");  
      EmotionalSpenderQuiz.submitQuestion(question.name, this.dataset.name);
    });
  },
  populatesResult: function(result){
    $('#resultTitle').text(result.title);
    $('#resultImg').attr('src', './images/' + result.image + '.jpg');
    $('#resultTips').html(result.tips);
    $('#resultDesc').html(result.desc);
    mixpanel.track('Emotional Spender Show Result', {'result': result.title});

    changePageAnim('result_active', 'quiz_active');
  },
  trackSocialShare: function(){
    $(document).on('click','.social-shares a', function(e){
      var platform = $(this).data('platform')
      mixpanel.track('Emotional Spender Quiz Social Share', {'platform': platform});
    })
  }
};