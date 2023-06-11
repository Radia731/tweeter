// Error messages, target ID box
const warnBox = '#warning';
const emptyTweet = 'Please enter a tweet message.';
const charLimitTweet = 'Tweet has to be less than 140 characters.';

// Animation for the warning box
const renderWarning = (msg) => {
  $(warnBox).slideUp(250, function() {
    $(warnBox).html(createWarningElement(msg)).hide().slideDown(500);
  });
};

// HTML output for warning
const createWarningElement = (msg) => {
  const warningHTML = `<div class="warning-msg"><i class="fa-solid fa-circle-exclamation"></i>${msg}</div>`;
  return warningHTML;
};