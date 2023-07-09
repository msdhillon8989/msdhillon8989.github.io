gameApp.controller('gameController', function ($scope, $window, $interval, $location) {

    $scope.finished = false;
    $scope.loading = true;
    $scope.game = [];

    $scope.scoreBoard = {};
    $scope.range = [];
    var pos = [-1, 1, 0, 0];

    $scope.sol = [];
    $scope.level = 3;
    $scope.time = 0;

    var data = {};
    var interval;

    getNewGame();


    function assignGame() {
        //data = response
        //console.log(data);
        //data = JSON.parse(data);
        //$scope.game = Object.assign({}, data.game);
        $scope.range.length = 0;
        for (var i = 0; i < $scope.level * $scope.level; i++) {
            $scope.range.push(i);
        }
        $scope.loading = false;
        interval = $interval(function () {
            $scope.time = $scope.time + 1;
        }, 100);
        //getScoreBoard();
    }

    var warning = function (response) {
        $window.alert(response.data.message);
    };

    function getNewGame() {
        $interval.cancel(interval);
        $scope.time = 0;
        $scope.sol.length = 0;
        $scope.finished = false;

        //var xgame = new Game($scope.level);

        initNewGame($scope.level);

        assignGame()

        /* httpRequest("GET", server + "/" + $scope.level, "", function (response) {
             assignGame(response)
         }, function (response) {
             warning(response)
         });*/
    }


    function initNewGame(g) {
        const level = g;
        const arr = new Array(level).fill(0).map(() => new Array(level).fill(0));
        let x = 1;

        for (let i = 0; i < level; i++) {
            for (let j = 0; j < level; j++) {
                arr[i][j] = x++;
            }
        }

        arr[level - 1][level - 1] = 0;

        let posx = level - 1;
        let posy = level - 1;

        const posChange = [[0, -1], [0, 1], [1, 0], [-1, 0]];

        let lastx = posx;
        let lasty = posy;

        for (let i = 0; i < 50 * level; i++) {
            let newX, newY;

            while (true) {
                const shift = Math.floor(Math.random() * 4);
                const shiftTo = posChange[shift];

                newX = posx + shiftTo[0];
                newY = posy + shiftTo[1];

                if (newX >= 0 && newX < level && newY >= 0 && newY < level) {
                    if (!(lastx === newX && lasty === newY)) {
                        lastx = posx;
                        lasty = posy;
                        break;
                    }
                }
            }

            arr[posx][posy] = arr[newX][newY];
            arr[newX][newY] = 0;
            posx = newX;
            posy = newY;
        }
        $scope.game = [];
        for (let i = 0; i < level; i++) {
            for (let j = 0; j < level; j++) {
                $scope.game.push(arr[i][j]);
            }
        }
    }





    $scope.slide = function (id) {
        if (!$scope.finished) {
            if ($scope.game[id] > 0) {
                var emptyNeighbour = getEmptyNeighbour(id);
                if (emptyNeighbour > -1) {
                    $scope.sol.push(id);

                    $scope.game[emptyNeighbour] = $scope.game[id];

                    $scope.game[id] = 0;

                    if (id == ($scope.level * $scope.level - 1)) {
                        if (solved()) {
                            data.solution = $scope.sol;
                            data.timeTaken = $scope.time;
                            $interval.cancel(interval);
                            $scope.finished = true;
                        }
                    }
                }
            }

            function getEmptyNeighbour(id) {
                var x = id % $scope.level;
                var y = Math.floor(id / $scope.level);
                for (var i = 0, j = 3; i < 4; i++, j--) {
                    var emptyNeighbour = getIfEmpty(x + pos[i], y + pos[j]);
                    if (emptyNeighbour > -1) {
                        return emptyNeighbour;
                    }
                }
                return -1;
            }

            function getIfEmpty(x, y) {
                if (x >= 0 && x <= $scope.level && y >= 0 && y <= $scope.level) {
                    var neighbourId = y * $scope.level + x;
                    if ($scope.game[neighbourId] == 0) {
                        return neighbourId;
                    }
                }
                return -1;
            }

            function solved() {
                for (var i = 0; i < $scope.level * $scope.level - 1; i++) {
                    if ($scope.game[i] != (i + 1)) {
                        return false;
                    }
                }
                return true;
            }


        } else {
            $window.alert("Already solved");
        }
    };


    $scope.updatelevel = function (l) {
        console.log("sasdasd" + l);

        $scope.loading = true;
        $scope.level = l;
        getNewGame();


    };

    $scope.back = function () {
        $location.path('/');
   };

});







