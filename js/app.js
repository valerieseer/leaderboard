$(document).ready(function() {

  var ui = (function() {
    var opts = {
      bestAllTimeUrl: undefined,
      bestLastThirtyDaysUrl: undefined,
      bestAllTimeBtnSelector: undefined,
      bestLastThirtyDaysBtnSelector: undefined,
      headerSelector: undefined,
      leaderBoardContainerSelector: undefined,
      bestAllTimeHeaderText: undefined,
      bestLastThirtyDaysHeaderText: undefined
    }

    var init = function(options) {
      $.extend(true, options, opts);
      var bestAllTime = options.bestAllTimeUrl;
      var bestLastThirtyDays = options.bestLastThirtyDaysUrl;
      var $bestAllTimeBtn = $(options.bestAllTimeBtnSelector);
      var $bestLastThirtyDaysBtn = $(options.bestLastThirtyDaysBtnSelector);
      var $header = $(options.headerSelector);
      var $leaderBoardContainer = $(options.leaderBoardContainerSelector);
      var bestAllTimeHeaderText = options.bestAllTimeHeaderText;
      var bestLastThirtyDaysHeaderText = options.bestLastThirtyDaysHeaderText;

      $bestAllTimeBtn.on('click', function() {
        showFilteredUI(bestAllTime, bestAllTimeHeaderText);
      })

      $bestLastThirtyDaysBtn.on('click', function() {
        showFilteredUI(bestLastThirtyDays, bestLastThirtyDaysHeaderText);
      })

      showFilteredUI(bestLastThirtyDays, bestLastThirtyDaysHeaderText)

      function showFilteredUI(url, headerText) {
        $.ajax({
           url: url
        }).done(function(data) {
          $leaderBoardContainer.empty();
          $header.text(headerText);
          var $userNameContainer = $(`<div class="col-md-3">`);
          var $pointsContainer = $(`<div class="col-md-3">`);

          data.forEach(function(el, i) {
            var points;
            if (url === bestAllTime) {
              points = el.alltime
            } else {
              points = el.recent
            }
            var username = el.username;
            
            $userNameContainer.append(`<p>${i + 1}. <a href="https://www.freecodecamp.org/${username}" target="_blank">${username}</a></p>`);
            $pointsContainer.append(`<p>${points}</p>`);
            $leaderBoardContainer.append($userNameContainer);
            $leaderBoardContainer.append($pointsContainer);
          })
        })
      }

    }

    return {
      init: init
    }
  })();

  ui.init({
    // Urls
    bestAllTimeUrl: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
    bestLastThirtyDaysUrl: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',

    // Selectors
    bestAllTimeBtnSelector: '.best-all-time',
    bestLastThirtyDaysBtnSelector: '.best-thirty-days',
    headerSelector: 'h3',
    leaderBoardContainerSelector: '.camper-leaderboard',

    // Header texts
    bestAllTimeHeaderText: 'Best All-Time',
    bestLastThirtyDaysHeaderText: 'Best In the Last 30 Days'
  });
})
