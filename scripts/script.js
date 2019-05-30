const apiUrl = 'https://clasp-subs.herokuapp.com';

const changePageAnim = function (class_name) {
  setTimeout(function(){
    $('body').addClass(class_name).removeClass('cloak');
  }, 250);
};

$(document).ready(function(){
  $('#startQuiz').click(QuestionGenerator.startQuiz);
});