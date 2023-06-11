/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const jsonUrl = '/tweets';
// Target elements
const tweetBox = '#tweets-container';
const tweetForm = '#new-tweet-form';
const tweetTextArea = '#tweet-text';
const errorTweet = 'Unable to fetch JSON:';
const emptyTweet = 'Please enter a tweet before submitting.';
const charLimitTweet = 'Tweet exceeds the character limit of 139.';

// GET JSON Tweet Data
const loadTweets = () => {
  return new Promise((resolve, reject) => {
    $.get(jsonUrl, function(data) {
      resolve(data);
    })
    .fail(function(error) {
      reject(error);
    });
  });
};

// Iterate JSON tweets
const renderTweets = (data) => {
  $(tweetBox).empty();
  // loops through tweets
  for (let tweet of data) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container, prepend reverse newest at top.
    $(tweetBox).prepend($tweet);
  }
};

// HTML ouput for tweet
const createTweetElement = (data) => {
  const tweetHTML = `
  <article class="tweet">
    <div class="header">
      <div class="user">
        <img src="${data.user.avatars}"></img>
        <span>${data.user.name}</span>
      </div>
      <span class="tag">${data.user.handle}</span>
    </div>
    <div class="body">
      <span id="test">${data.content.text}</span>
    </div>
    <div class="footer">
      <span>${timeago.format(data.created_at)}</span>
      <span><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></span>
    </div>
  </article>
  `;
  return tweetHTML;
};

$(document).ready(function() {
  // SUBMIT POST Tweet Data
  $(tweetForm).on("submit", function(event) {
    event.preventDefault();

    // Validate form
    if ($(tweetTextArea).val().trim() === '') {
      renderWarning(emptyTweet);
      return;
    }
    if ($(tweetTextArea).val().trim().length > 139) {
      renderWarning(charLimitTweet);
      return;
    }

    // POST the tweet data to JSON
    $.post(jsonUrl, { text: escape($(tweetTextArea).val())})
    .done(() => {
      // Fetch the updated tweet data from the server
      loadTweets()
        .then((data) => {
          // Render the updated tweets on the page
          renderTweets(data);
          $(tweetTextArea).val('');
        })
        .catch((error) => {
          console.log(errorTweet, error);
        });
    });
  });

  // DOCUMENT LOAD call tweets from JSON
  loadTweets()
    .then((data) => {
      renderTweets(data);
    })
    .catch((error) => {
      console.log(errorTweet, error);
    });
});
