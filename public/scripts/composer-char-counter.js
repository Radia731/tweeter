$(document).ready(function() {
  $('section.new-tweet form textarea').on('input', function() {
    var inputLength = $(this).val().length;
    var remainingChars = 140 - inputLength;
    $('.counter').text(remainingChars);

    if (remainingChars < 0) {
      $('.counter').addClass('invalid');
    } else {
      $('.counter').removeClass('invalid');
    }
  });
});
