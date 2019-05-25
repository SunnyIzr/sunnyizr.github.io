var QuestionGenerator = {
  init: function(){
  },
  sessionId: null,
  startQuiz: function(){
    $.ajax({
        url: apiUrl + '/spender_quiz_submissions',
        method: 'post'
      }).done(function(res){
        QuestionGenerator.sessionId = res.session_id
        QuestionGenerator.populateQuestionAndProgress(res.question, res.progress, res.percent_complete)
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
      QuestionGenerator.sessionId = res.session_id
      if (res.type == 'question'){
        QuestionGenerator.populateQuestionAndProgress(res.question, res.progress, res.percent_complete)
      } else if (res.type == 'result') {
        QuestionGenerator.populatesResult(res.result)
      }
    })
  },
  populateQuestionAndProgress: function(question, progress, percent_complete){
    // Populate a new question screen
    console.log(progress)
    console.log(percent_complete)
    console.log(question)
  },
  populatesResult: function(result){
    // Populate result screen
    console.log(result)
  }
}