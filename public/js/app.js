/**
 * Created by UdHaY on 05-Aug-16.
 */
//$('body').show();
var app = angular.module("UniHire", []);

app.controller("displayStudent", function($scope) {
    $scope.color="#283593";
    $scope.changeColor = function(){
        if($scope.color == "#283593")
            $scope.color = "#212121";
        else
            $scope.color="#283593";
    }
});

app.controller("loginForm", function($scope, $http) {

    $('#login_register_btn').click( function () { $scope.modalAnimate($('#login-form'), $('#register-form')) });
    $('#login_lost_btn').click( function () { $scope.modalAnimate($('#login-form'), $('#lost-form')); });

    $scope.login = function(cred){
        $http.get("/api/login/"+cred.username+"/"+cred.password)
            .success(function(data){
                if(data.userExists == false){
                    $scope.msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                }
                else{
                    $('#login-modal').modal('toggle');
                    $('.modal-backdrop').hide();
                    $scope.$parent.loggedIn = true;
                    $scope.$parent.setData(data);
                    $scope.$parent.setloggedIn();
                }

            });
    };
});

app.controller("registerForm", function($scope,$http) {
    $('#register_lost_btn').click( function () { $scope.modalAnimate($('#register-form'), $('#lost-form')); });
    $('#register_login_btn').click( function () { $scope.modalAnimate($('#register-form'), $('#login-form')); });

    $scope.register = function(user){
        if(user.password === user.passwordConfirm) {
            $http.post('/api/events', {firstName:user.firstName, lastName:user.lastName, email:user.email , pwd:user.password})
                .success(function(data){
                    if(data != "empty"){
                        $scope.msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
                        $scope.user.firstName = "";
                        $scope.user.lastName = "";
                        $scope.user.email = "";
                        $scope.user.passwordConfirm = "";
                        $scope.user.password = "";
                    }
                    else{
                        $scope.msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                    }

                });
        }
        else{
            $scope.msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Password mismatch");
        }

};

});

app.controller("collegeForm", function($scope,$http) {

    $scope.collegeData = {};
    $scope.degrees = {};
    $scope.collegeNamesData = {};

    $http.get('/api/data/colleges')
        .success(function(data){
            $scope.collegeData = data;
        });

    $scope.setDegree = function(index){
        console.log('setting deg');
        $scope.degrees = $scope.collegeData[index].degree.split(',');
        console.log($scope.collegeData[index].degree.split(','));
        console.log(JSON.stringify($scope.collegeData[index].degree.split(',')));
    };

    $scope.updateCollege = function(collegeNameId,degree){
        var studentId = $scope.student._id;
        var collegeNameSelected = $scope.collegeData[collegeNameId].name;
        var collegeDegreeSelected = degree;

        $http.post('/api/data/colleges/updateStudentCollege', {"_id":studentId,"collegeName":collegeNameSelected,"collegeDegree":collegeDegreeSelected})
            .success(function(res){
                if(res = "success"){
                    $scope.$parent.student.collegeName = collegeNameSelected;
                    $scope.$parent.student.degreeName = collegeDegreeSelected;
                    $scope.$parent.studentDet = true;
                    $('#college-modal').modal('toggle');
                }
                else{

                }
            });


    };
});

app.controller("mainController",function($scope){
    $scope.user = {};
    $scope.loggedIn = false;
    $scope.studentDet = false;
    $scope.student = {
        "name":"",
        "collegeName":"",
        "degreeName":""
    };

    $scope.setloggedIn = function(){
        $scope.loggedIn = true;
    };

    $scope.setData = function(data){
        $scope.student = data;
        //console.log(data);
        //console.log(typeof($scope.student.collegeName));
        //console.log(data);
        if(typeof($scope.student.collegeName) != 'undefined' || typeof($scope.student.degreeName) != 'undefined')
            $scope.studentDet = true;
        else{
            console.log('enter college data');
            $('#college-modal').modal('toggle');
        }
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
        console.log($iconClass + " " + $divClass);
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            $scope.msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
        }, $scope.$msgShowTime);
    }


});
