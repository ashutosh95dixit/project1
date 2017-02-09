sampleApp.controller('ShowtimeController', function($scope, $http, $log) {

    $scope.tagline = 'See the showtiming  here!';
    $scope.booking = 'booking';

    var refresh = function() {
        $http.get('/showtime/getShowtime').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.showtimeList = response;
            $scope.showtime = "";
        });
    };

    refresh();

    $scope.addShowtime = function(showtime) {


            $http({
                    method: 'POST',
                    url: '/showtime/addShowtime',
                    headers: {'Content-Type': 'application/json'},
                    data: showtime
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    refresh();
                });

        console.log($scope.contact);

    };

    $scope.removeShowtime = function(showtime) {
        //console.log(id);
        $http.delete('/showtime/deleteShowtime/' + showtime._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editShowtime = function(showtime) {
        $http.get('/showtime/getShowtime/' + showtime._id).success(function(response) {
            $scope.showtime = response[0];
        });
    };

    $scope.updateShowtime = function() {
        console.log("REACHED UPDATE");
        console.log($scope.showtime._id);
        $http.put('/showtime/updateShowtime/' + $scope.showtime._id, $scope.showtime).success(function(response) {
            refresh();
        })
    }

});
