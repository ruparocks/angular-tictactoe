var app = angular.module('myApp', ['ui.bootstrap']);
app.factory('gameChecker', ['$q', function ($q) {
   var checkBoard = function (tiles) {
     var deferred = $q.defer();
     if (tiles[0].value.length > 0) {
       if (tiles[0].value === tiles[1].value && tiles[0].value === tiles[2].value) {
        deferred.resolve(tiles[0].value);
      } else if (tiles[0].value === tiles[3].value && tiles[0].value === tiles[6].value) {
        deferred.resolve(tiles[0].value);
      } else if (tiles[0].value === tiles[4].value && tiles[0].value === tiles[8].value) {
        deferred.resolve(tiles[0].value);
      }
    }
    if (tiles[1].value.length > 0 && tiles[1].value === tiles[4].value && tiles[1].value === tiles[7].value) {
      deferred.resolve(tiles[1].value);
    }
    if (tiles[2].value.length > 0) {
      if (tiles[2].value === tiles[5].value && tiles[2].value === tiles[8].value) {
        deferred.resolve(tiles[2].value);
      } else if (tiles[2].value === tiles[4].value && tiles[2].value === tiles[6]) {
        deferred.resolve(tiles[2].value);
      }
    }
    if(tiles[3].value.length > 0 && tiles[3].value === tiles[4].value && tiles[3].value === tiles[5]) {
      deferred.resolve(tiles[3].value);
    }
    if (tiles[6].value.length > 0 && tiles[6].value === tiles[7].value && tiles[6].value === tiles[8]) {
      deferred.resolve(tiles[3].value);
    }
    if (tiles[0].value.length && tiles[1].value.length && tiles[2].value.length && tiles[3].value.length && tiles[4].value.length && tiles[5].value.length && tiles[6].value.length && tiles[7].value.length && tiles[8].value.length) {
      deferred.resolve("none");
    }
    return deferred.promise;
  };

  return {
    checkBoard : checkBoard
  };
}]);

app.controller('MainController', ['$scope', 'gameChecker', '$uibModal', function($scope, gameChecker, $uibModal) {
  $scope.title = "Let's play Tic Tac Toe!";
  $scope.currentPlayer = "X";
  $scope.tiles = [{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}];

  $scope.ok = function () {
    $uibModalInstance.close();
  };
  // restart the board
  $scope.restartGame = function () {
    if ($scope.modalInstance) {
      $scope.modalInstance.close();
    }
    $scope.tiles = [{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}];
    $scope.currentPlayer = "X";
  };

  // open a modal function
  $scope.openModal = function() {
      $scope.modalInstance = $uibModal.open({
          template: '<div class="modal-header"><div class="modal-title text-center"><h4>Game Over</h4></div></div><div class="modal-body text-center"><p>{{outcome}}</p></div><div class="modal-footer"><button class="btn btn-success center-block" ng-click="restartGame()">REPLAY</button></div>',
          scope: $scope,
          size: 'sm'
        });
};     

  // make move
  $scope.makeMove = function (index) {
    if ($scope.tiles[index].value.length > 0) {
      return;
    }
    $scope.tiles[index].value = $scope.currentPlayer;
    $scope.currentPlayer = $scope.currentPlayer === "X" ? "O" : "X";
    gameChecker.checkBoard(this.tiles).then(function(winner){
      if (winner === "none") {
        $scope.outcome = "cat's game";
        $scope.openModal();
      } else {
        $scope.outcome = "The winner is player " + winner;
        $scope.openModal();
      }
      $scope.restartGame();
    }); 
  };


}]);