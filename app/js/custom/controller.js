'use strict';

var bibleApp = angular.module('bibleApp', ['bibleAppControllers']);

var bibleAppControllers = angular.module('bibleAppControllers', []);

// bibleAppControllers.controller('openController', ['$scope', function (scope) {
//   scope.flipCover = function() {
//     console.log("clicked");
//     $("#homepageContainer").css("width", "-100em");
//   };
// }]); //end searchController

bibleAppControllers.controller('bibleController', ['$scope', '$http', function (scope, http) {
  scope.inputText = "";
  scope.key = "517d06fdbe90e270534625197ed15845";

  scope.open = function () {
  $(".navbar").css({
    "transition": "0.5s ease-in-out .5s",
    "-webkit-transition": "0.5s ease-in-out .5s",
    "-moz-transition": "0.5s ease-in-out .5s",
    "-o-transition": "0.5s ease-in-out .5s",
    "position": "absolute",
    "width": "100%",
    "top": "-3em",
    "height": "4em",
    "padding-top": "0.1em",
    "text-align": "center"
  });

  $( "div" ).hover(
  function() {
    $(".navbar").css({"top": "0"});
  }, function() {
    $(".navbar").css({"top": "-3em"});
  }
);
    scope.searchBible();
  }
  scope.searchBible = function() {
  
    if(!scope.inputText.trim()) {
      scope.info = "Input field must not be empty";
      return;
    }
    scope.info = "Please wait...";
    http({url: 'http://api.biblia.com/v1/bible/search/DARBY.js', method: 'GET', params: {query: scope.inputText,
        sort: "passage", key: scope.key}}).success(function (data) {
          scope.info = "Done";
    if(data.hitCount) {
      scope.info = "";
      scope.searchResponse = data;
      scope.searchResult = scope.searchResponse.results;
      $("#searchListContainer").fadeIn(1500);
    } else {
      scope.info = "Checking in Bible...";
      scope.openBible();
    }
  }).error(function (status) {
      scope.failEvent(scope.errorStatus);
  });  
} //end of function openBible

scope.openBible = function (status){
    http({url: 'http://api.biblia.com/v1/bible/content/DARBY.html.json', method: 'GET', params: {passage: scope.inputText,
        style: "fullyFormattedWithFootnotes",
        key: scope.key}}).success(function (data) {
          scope.info = "Done";
      scope.response = data;
      scope.verse = scope.response.text;
      scope.display = '<div id="content">' + scope.verse + '</div>';
      $("#container").html(scope.display);
      $("#container").fadeIn(1500);
      scope.info = "";
    }).error(function (data) {
      scope.failEvent(scope.errorStatus);
    }); 
  }

  scope.failEvent = function(error) {
      scope.info = "Sorry, didn't get that. Please check your input or internet connection.";
  }
}]);