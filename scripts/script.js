const apiUrl = 'https://clasp-subs.herokuapp.com';

const changePageAnim = function (class_name, remove_class) {
  setTimeout(function(){
    var removeClass = 'cloak ' + remove_class;

    $('body').addClass(class_name).removeClass(removeClass);
  }, 250);
};

$(document).ready(function(){
  $('#startQuiz, #startQuiz2').click(QuestionGenerator.startQuiz);

  $(".sing-up-btn").click(function() {
    $(".welcom-content").addClass("active");
    $(".input-holder, .social-sp-content, .sing-up-btn").removeClass("active");
  });

  $(".start-btn").click(function() {
    $(".start-btn").addClass("grow");

    setTimeout(function(){
      $(".input-holder, .sing-up-btn").addClass("active");
      $(".start-btn").removeClass("active grow");
    }, 700);
  });
});