const apiUrl = 'https://clasp-subs.herokuapp.com';

const changePageAnim = function (class_name, remove_class) {
  setTimeout(function(){
    var removeClass = 'cloak ' + remove_class;

    $('body').addClass(class_name).removeClass(removeClass);
  }, 250);
};

const togglePopup = function(){$('body').toggleClass('activePopup');};

$(document).ready(function(){
  // article js
  if($('#article-page').length){
    var timeout = setTimeout(function(){
      togglePopup();
      clearTimeout(timeout);
      timeout = null;
    // }, 15000);
    }, 15000);

    $('.togglePopup').on('click', togglePopup);
  } else {
    // aboutUs js
    $('.team').click(function() {
      $('.nav-bar, .aboutPage').addClass('active');
      $('.bio-section.' + this.dataset.member).addClass('active');
      $('.about-us-section.active').removeClass('active');
      // $('html, body').animate({ scrollTop : 0 }, 0);
    });

    $('.back-btn').click(function() {
      $('.bio-section.active, .nav-bar.active, .aboutPage.active').removeClass('active');
      $('.about-us-section').addClass('active');
    });


    LandingPage.init()
    EmotionalSpenderQuiz.init()
  }
});