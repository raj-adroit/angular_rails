# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

#= require_self
#= require_tree ./services/global
#= require_tree ./services/main
#= require_tree ./filters/global
#= require_tree ./filters/main
#= require_tree ./controllers/global
#= require_tree ./controllers/main
#= require_tree ./directives/global
#= require_tree ./directives/main

# Create a new angular module called Blog
Blog = angular.module('Blog',['ngRoute']	)

# Setup routing

# Sets up routing
Blog.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post'
  $routeProvider.when('/post/:postId', { templateUrl: "/assets/mainPost.html", controller: 'PostCtrl' } )
  # Default
  $routeProvider.otherwise({ templateUrl: "/assets/mainIndex.html", controller: 'IndexCtrl' } )
])