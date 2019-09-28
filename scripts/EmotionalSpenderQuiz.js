var stopTime;

var EmotionalSpenderQuiz = {
  init: function(){
    this.startQuizListener()
    this.loadLeadGenCopyListener()
    this.submitEmailAndNameListener()
    this.trackSocialShare()
  },
  sessionId: null,
  startQuizListener: function(){
    $('#startQuiz, #startQuiz2').click(EmotionalSpenderQuiz.startQuiz);
  },
  loadLeadGenCopyListener: function(){
    $('#loadLeadGen').click(function(){
      mixpanel.track('Emotional Spender Quiz Show More Content');
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
  submitEmailAndNameListener: function(){
    $('#spenderQuizEmailSubmission').on('submit', function(event){
      event.preventDefault()
      var email = $("#emailOfSpender").val();
      var phone = "1" + $("#PhoneOfSpender").cleanVal();
      var name = $("#NameOfSpender").val();

      function successFunc(){
        $(".spender-email-block" ).addClass("validation-complete");
        mixpanel.track('Emotional Spender Show Result');
      }

      function errorFunc(){
        $(".email-block-holder" ).addClass("error-active");  
      }
      if (validateEmail(email) && phone.length && !isNaN(phone) && name.length) {
        UserSignUps.submitData(name, phone, email, 'Emotional Spender Quiz Email Sign Up', null, false, EmotionalSpenderQuiz.sessionId, successFunc, errorFunc )
      } else {
        errorFunc()
      }
    })
  },
  startQuiz: function(){
    mixpanel.track('Emotional Spender Quiz Start');

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
    setTimeout(function(){
      $('#NameOfSpender').focus()
    }, 1000)

    mixpanel.track('Emotional Spender Show Email Capture', {'result': result.title});

    changePageAnim('result_active', 'quiz_active');
  },
  trackSocialShare: function(){
    $('.social-shares a').on('click', function(e){
      var platform = $(this).data('platform')

      mixpanel.track('Emotional Spender Quiz Social Share', {'platform': platform});
    })
  }
};