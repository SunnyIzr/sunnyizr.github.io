const apiUrl = '@@apiUrl';

const changePageAnim = function (class_name, remove_class) {
  setTimeout(function(){
    var removeClass = 'cloak ' + remove_class;

    $('body').addClass(class_name).removeClass(removeClass);
  }, 250);
};


$(document).ready(function(){
  // BlogSection.init()
  LandingPage.init()
  EmotionalSpenderQuiz.init()
  ABTesting.init()
  AboutPage.init()
});