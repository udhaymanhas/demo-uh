/**
 * Created by UdHaY on 05-Aug-16.
 */
var app = angular.module("UniHireAdmin", ["xeditable"]);

app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});

app.controller("displayPanel", function($scope,$http) {
    $scope.users = {};
    $scope.colleges = {};
    $scope.college = {};
    $scope.tab = 1;

    $scope.setTab = function(setTab){
        $scope.tab = setTab;
    };

    $scope.currentTab = function(checkTab){
        return $scope.tab == checkTab;
    };

    $scope.subTab = 1;

    $scope.setSubTab = function(setTab){
        $scope.subTab = setTab;
    };

    $scope.currentSubTab = function(checkTab){
        return $scope.subTab == checkTab;
    };

    $http.get('/api/data/students')
        .success(function(data){
            console.log(data);
            $scope.users = data;
            //if(data.name != false){
            //    $scope.$parent.setloggedIn();
            //    $scope.$parent.setData(data);
            //    $('#admin-login-modal').modal('toggle');
            //    $('.modal-backdrop').hide();
            //}
            //else{
            //    $scope.msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
            //}

        });

    $scope.getColleges = function(){
        $http.get('/api/data/colleges')
            .success(function(data){

                $scope.colleges = data;
                console.log($scope.colleges);
            });
    };

    $scope.addCollege = function(college){
        $http.post('/api/data/addCollege', {name:college.name, degree:college.degree})
            .success(function(data){
                $scope.college = {};
                $scope.getColleges();
            });
    };

    $scope.getColleges();

    $scope.saveCollege = function(data, id){
        console.log(data);
        console.log(id);
        angular.extend(data, {_id: id});
        return $http.post('/api/data/colleges/save', data);
    };

    $scope.delCollege = function(id, index){

        if(confirm('Press OK to confirm DELETE')){
            $http.post('/api/data/colleges/delete', {_id: id})
                .success(function(res){
                    if(res == "deleted")
                        $scope.colleges.splice(index, 1);
                });
        }

    };

});

app.controller("loginForm", function($scope, $http) {

    $scope.login = function(admin){
        //console.log(cred);
        $http.get("/api/admin/"+admin.username+"/"+admin.password)
            .success(function(data){
                //console.log(data);
                //console.log(data.userExists);
                //$scope.$parent.username = data.username ;
                if(typeof data.username !== 'undefined'){
                    $scope.$parent.setloggedIn();
                    $scope.$parent.setData(data);
                    $('#admin-login-modal').modal('toggle');
                    $('.modal-backdrop').hide();
                }
                else{
                    $scope.msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                }

            });
    };
});

app.controller("mainController",function($scope){
    $scope.user = {};
    $scope.loggedIn = false;
    $scope.username = "";

    $('#admin-login-modal').modal('toggle');
    console.log('running');
    $scope.setloggedIn = function(){
        $scope.loggedIn = true;
    };

    $scope.setData = function(data){
        $scope.username = data.username;
    };

    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    $scope.$modalAnimateTime = 300;
    $scope.$msgAnimateTime = 150;
    $scope.$msgShowTime = 2500;

    $scope.modalAnimate = function($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $('#div-forms').css("height",$oldH);
        $oldForm.fadeToggle($scope.$modalAnimateTime, function(){
            $('#div-forms').animate({height: $newH}, 300, function(){
                $newForm.fadeToggle(300);
            });
        });
    }

    $scope.msgFade = function($msgId, $msgText) {
        $msgId.fadeOut($scope.$msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($scope.$msgAnimateTime);
        });
    }

    $scope.msgChange = function($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        $scope.msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        //console.log($iconClass + " " + $divClass);
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            $scope.msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
        }, $scope.$msgShowTime);
    }


});
