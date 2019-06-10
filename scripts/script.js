const apiUrl = 'https://clasp-subs.herokuapp.com';

const changePageAnim = function (class_name, remove_class) {
  setTimeout(function(){
    var removeClass = 'cloak ' + remove_class;

    $('body').addClass(class_name).removeClass(removeClass);
  }, 250);
};

$(document).ready(function(){
  $('#startQuiz, #startQuiz2').click(QuestionGenerator.startQuiz);

  LeadGenGenerator.init()

});