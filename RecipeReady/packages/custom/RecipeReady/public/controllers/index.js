'use strict';

var request = require('../views/system/request.js');

angular.module('mean.system').controller('IndexController', ['$state','$scope', 'Global',
  function ($state, $scope, Global) {
    $scope.global = Global;
    $scope.sites = [{
      'name': 'makeapoint',
      'text': 'Makeapoint is a platform to craft and fine-tune ideas and messages providing a graphical experience which brough an offline methodlogy online',
      'author': 'Linnovate',
      'link': 'http://www.linnovate.net',
      'image': '/meanStarter/assets/img/makeapoint.png'
    }, {
      'name': 'Cactus Intranet',
      'text': 'Cactus Intranet is an enterprise social network with features like real-time newsfeed, notifications, groups, events, polls, referral system etc. The system has role based permission system, allowing different stakeholders access and controls relevant to them.',
      'author': 'QED42',
      'link': 'http://www.qed42.com',
      'image': '/meanStarter/assets/img/cactus.png'
    }];
    $scope.packages = {
      'gmap': {
        'name': 'gmap',
        'text': 'gmap lets you add geographical information to your applications objects',
        'author': 'Linnovate',
        'link': 'http://www.qed42.com',
        'image': '/meanStarter/assets/img/gmap.png'
      },
      'upload': {
        'name': 'Upload',
        'text': 'Upload lets you add upload functionality to MEAN stack',
        'author': 'Linnovate',
        'link': 'http://www.linnovate.net',
        'image': 'http://cdn.designbyhumans.com/pictures/blog/09-2013/pop-culture-cats/Pop_Culture_Cats_Hamilton_Hipster.jpg'
      },
      'socket': {
        'name': 'Socket',
        'text': 'Socket.io support',
        'author': 'Linnovate',
        'link': 'http://www.linnovate.net',
        'image': 'http://cdn.designbyhumans.com/pictures/blog/09-2013/pop-culture-cats/Pop_Culture_Cats_Hamilton_Hipster.jpg'
      }
    };

    $scope.docs = [{
      text: 'Overview',
      link: 'http://learn.mean.io/#mean-technologies'
    }, {
      text: 'Packages',
      link: 'http://learn.mean.io/#mean-packages'
    }, {
      text: 'CLI',
      link: 'http://learn.mean.io/#mean-cli'
    }, {
      text: 'Network',
      link: 'http://learn.mean.io/#mean-mean-network'
    }, {
      text: 'Overriding',
      link: 'http://learn.mean.io/#mean-packages-overriding-the-default-layouts'
    }, {
      text: 'Contribution',
      link: 'http://learn.mean.io/#mean-packages-contributing-your-package'
    }];

    $scope.communities = [{
      link: 'https://facebook.com/groups/mean.io/',
      text: 'Informal support, news and just hanging out',
      icon: 'facebook'
    }, {
      link: 'https://github.com/linnovate/mean/',
      text: 'Issues, Support, Code discussions and PRs',
      icon: 'facebook'
    }, {
      link: 'https://gitter.im/linnovate/mean/',
      text: 'Support and Technical discussions',
      icon: 'gitter'
    }, {
      link: 'https://hangout.mean.io/',
      text: 'Video support, shared coding and to meet the people behind mean.io',
      icon: 'hangout'
    }];

    $scope.$watch(function () {
      for (var i = 0; i < $scope.sites.length; i += 1) {
        if ($scope.sites[i].active) {
          return $scope.sites[i];
        }
      }
    }, function (currentSlide, previousSlide) {
      if (currentSlide !== previousSlide) {
        console.log('currentSlide:', currentSlide);
      }
    });
    $scope.redirectSearchPage = function(){

        console.log('LOL');
        $state.go('results');
    };
        $scope.getIngredients();
      };
      
    $scope.users = ['Chicken Parmesan', 'Fetuccine Alfredo', 'Falafel', 'Hummus', 'Tacos', 'Empenadas','Butter Chicken', 'Sushi', 'Ramen'];
    $scope.ingredientList = [];
    $scope.todoAdd = function() {
        console.log("ADDED!!!!");
        $scope.ingredientList.push({todoText:$scope.ingredientInput, done:false});
        $scope.todoInput = "";
    };

    $scope.remove = function() {
        console.log("REMOVE");
        var oldList = $scope.ingredientList;
        $scope.ingredientList = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) $scope.ingredientList.push(x);
        });
    };
        //TODO: Get a list of ingredients matching the given expression
    $scope.getIngredients = function() {
        console.log("Get Ingredients");
        $http.get(serverAddress + "api/getIngredients", $scope.prefix).then(
            function (resp) 
            {    
                console.log("success", resp);
                
                for each(var ingredient in resp)
                {
                    console.log(ingredient);
                }
                
                $scope.ingredients = resp;
            }, 
            function(resp)
            {
                console.log("failure", resp);
            }
        );
    };

    //TODO: get a listing of recipes containing the given ingredients
    $scope.getRecipesByIngredient = function() {
        $http.get(serverAddress + "api/getRecipesByIngredient", $scope.ingredients).then(
            function (resp) 
            {    
                console.log("success", resp);
                
                for each(var recipe in resp)
                {
                    console.log(recipe.name);
                }
                
                $scope.recipes = resp;
            }, 
            function(resp)
            {
                console.log("failure", resp);
            }
        );
    };

    //TODO: get the user's saved recipes
    $scope.getRecipesByUser = function() {
        $http.get(serverAddress + "/api/getRecipesByUser", $scope.user).then(
            function (resp) {    
                console.log("success", resp);
                
                for each(var recipe in resp) {
                    console.log(recipe.name);
                }
                $scope.recipes = resp;
            }, 
            function(resp) {
                console.log("failure", resp);
            }
        );
    };

    //TODO get the ingredients in the user's pantry
    $scope.getPantry = function() {
        $http.get(serverAddress + "api/getPantry", $scope.user).then(
            function (resp) {    
                console.log("success", resp);
                
                for each(var ingredient in resp) {
                    console.log(ingredient.name);
                }
                
                $scope.ingredients = resp;
            }, 
            function(resp) {
                console.log("failure", resp);
            }
        );
    }

    //TODO: get a list of the user's dietary restrictions
    $scope.getDietaryRestrictions = function() {
        $http.get(serverAddress + "api/getRecipesByUser", $scope.user).then(
            function (resp) {    
                console.log("success", resp);
            }, 
            function(resp) {
                console.log("failure", resp);
            }
        );
    }
   
  }
]);
