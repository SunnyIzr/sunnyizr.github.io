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

  // article js
  if($('#article-page').length){
  } else {
    // aboutUs js
    // $('.team').click(function() {
    //   $('.nav-bar, .aboutPage').addClass('active');
    //   $('.bio-section.' + this.dataset.member).addClass('active');
    //   $('.about-us-section.active').removeClass('active');
    //   // $('html, body').animate({ scrollTop : 0 }, 0);
    // });

    // $('.back-btn').click(function() {
    //   $('.bio-section.active, .nav-bar.active, .aboutPage.active').removeClass('active');
    //   $('.about-us-section').addClass('active');
    // });
    
  }
});