(function() {
  var Blog;

  Blog = angular.module('Blog', ['ngRoute']);

  Blog.config([
    '$routeProvider', function($routeProvider) {
      $routeProvider.when('/post/:postId', {
        templateUrl: "/assets/mainPost.html",
        controller: 'PostCtrl'
      });
      return $routeProvider.otherwise({
        templateUrl: "/assets/mainIndex.html",
        controller: 'IndexCtrl'
      });
    }
  ]);

}).call(this);
(function() {
  angular.module('Blog').factory('postData', [
    '$http', function($http) {
      var postData;
      postData = {
        data: {
          posts: [
            {
              title: 'Loading',
              contents: ''
            }
          ]
        },
        isLoaded: false
      };
      postData.loadPosts = function() {
        if (!postData.isLoaded) {
          return $http.get('./posts.json').success(function(data) {
            postData.data.posts = data;
            postData.isLoaded = true;
            return console.log('Successfully loaded posts.');
          }).error(function() {
            return console.error('Failed to load posts.');
          });
        }
      };
      return postData;
    }
  ]);

}).call(this);
(function() {
  this.IndexCtrl = function($scope, $location, $http, postData) {
    $scope.data = postData.data;
    postData.loadPosts();
    return $scope.viewPost = function(postId) {
      return $location.url('/post/' + postId);
    };
  };

  this.IndexCtrl.$inject = ['$scope', '$location', '$http', 'postData'];

}).call(this);
(function() {
  this.PostCtrl = function($scope, $routeParams, postData) {
    $scope.data = {
      postData: postData.data
    };
    postData.loadPosts();
    return $scope.data.postId = $routeParams.postId;
  };

  this.PostCtrl.$inject = ['$scope', '$routeParams', 'postData'];

}).call(this);
