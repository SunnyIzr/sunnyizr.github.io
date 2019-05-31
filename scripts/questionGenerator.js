var QuestionGenerator = {
  init: function(){
  },
  sessionId: null,
  startQuiz: function(){
    $('body').addClass('cloak');

    $.ajax({
      url: apiUrl + '/spender_quiz_submissions',
      method: 'post'
    }).done(function(res){
      QuestionGenerator.sessionId = res.session_id;
      QuestionGenerator.populateQuestionAndProgress(res.question, res.progress, res.percent_complete);
      changePageAnim('quiz_active');
    })
  },
  submitQuestion: function(questionName, answer){
    $.ajax({
      url: apiUrl + '/spender_quiz_submissions',
      method: 'patch',
      data: {
        session_id: QuestionGenerator.sessionId,
        response: {
          question: questionName,
          answer: answer
        }
      }
    }).done(function(res){
      QuestionGenerator.sessionId = res.session_id;
      if (res.type == 'question'){
        QuestionGenerator.populateQuestionAndProgress(res.question, res.progress, res.percent_complete);
      } else if (res.type == 'result') {
        $('body').addClass('cloak');
        QuestionGenerator.populatesResult(res.result);
      }
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
      QuestionGenerator.submitQuestion(question.name, this.dataset.name);
    });
  },
  populatesResult: function(result){
    $('#resultTitle').text(result);
    changePageAnim('result_active', 'quiz_active');
  }
};