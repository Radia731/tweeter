$(document).ready(function() {
  // Monitor input from #tweet-text textarea
  $('#tweet-text').on('input', function() {
    // textarea input
    let msg = $(this).val();
    let count = 140 - msg.length;
    
    // Add class max if the character count reach less than 0 otherwise remove if over 0
    $('.counter').text(count);
    if (count < 0) {
      $('.counter').addClass('max');
    } else {
      $('.counter').removeClass('max');
    }
  });
});