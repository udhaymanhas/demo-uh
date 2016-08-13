/**
 * Created by UdHaY on 05-Aug-16.
 */
//$('body').show();
//var Fuse = require('/fuse/lib/fuse.js');
//var fuzzySearch = new Fuse(states, {
//    shouldSort: true,
//    caseSensitive: false,
//    threshold: 0.4
//});
var app = angular.module("UniHire", ['ngSanitize', 'MassAutoComplete']);

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
                    //console.log(data);
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

app.controller("collegeForm", function($scope,$http,  $sce, $q) {

    $scope.collegeData = {};
    $scope.degrees = {};
    $scope.collegeNamesData = {};

    $http.get('/api/data/colleges')
        .success(function(data){
            $scope.collegeData = data;
            //$scope.autocomplete_options = {
            //    suggest: suggest_college
            //};
        });

    $scope.setDegree = function(){
        console.log('setDegree Fired');
        for (var i = 0; i < $scope.collegeData.length && results.length < 10; i++) {
            if($scope.collegeData[i].name === $scope.selectCollege){
                $scope.degrees = $scope.collegeData[i].degree.split(',');
                console.log($scope.degrees);
                return true;
            }
        }
        //console.log('setting deg');
        //$scope.degrees = $scope.collegeData[index].degree.split(',');
        //console.log($scope.collegeData[index].degree.split(','));
        //console.log(JSON.stringify($scope.collegeData[index].degree.split(',')));

    };

    $scope.updateCollege = function(){
            //console.log($scope.selectCollege);
            //console.log($scope.selectDegree);
            //console.log($('.c').value );
            //console.log($('.d').value);
        if(typeof($scope.selectDegree) === 'undefined' || typeof($scope.selectCollege) === 'undefined' ){
            $scope.msgChange($('#div-college-modal-msg'), $('#icon-college-modal-msg'), $('#text-college-modal-msg'), "error", "glyphicon-remove", "Update error");
        }
        else{
            var studentId = $scope.student._id;
            //var collegeNameSelected = $scope.collegeData[collegeNameId].name;
            //var collegeDegreeSelected = degree;

            $http.post('/api/data/colleges/updateStudentCollege', {"_id":studentId,"collegeName":$scope.selectCollege,"collegeDegree":$scope.selectDegree})
                .success(function(res){
                    if(res = "success"){
                        $scope.$parent.student.collegeName = $scope.selectCollege;
                        $scope.$parent.student.degreeName = $scope.selectDegree;
                        $scope.$parent.studentDet = true;
                        $('#college-modal').modal('toggle');
                    }
                    else{

                    }
                });
//------------------------------------------------------------------------------

        }




    };


    function suggest_college(term) {
        $scope.selectCollege = undefined;
        $scope.selectDegree = undefined;
        var q = term.toLowerCase().trim();
        //console.log(q);
        var results = [];

        for (var i = 0; i < $scope.collegeData.length && results.length < 10; i++) {
            var college = $scope.collegeData[i].name;
            var l_college = college.toLowerCase();

            if (l_college.indexOf(q) >= 0){
                results.push({ label: college, value: college });
            }

        }
        if(results.length == 0) {
            //results.push({ label: "**Not Found**", value: 'na' });
            return results;
        }
        else{
            return results;
        }

    }


    $scope.autocomplete_college = {
        suggest: suggest_college,
        on_select: function (selected) {

            $scope.selectCollege = selected.label;
            for (var i = 0; i < $scope.collegeData.length ; i++) {
                if($scope.collegeData[i].name === selected.label){
                    $scope.degrees = $scope.collegeData[i].degree.split(',');
                    //console.log($scope.degrees);
                    //return true;
                }
            }
        }
    };


    function suggest_degree(term) {
        $scope.selectDegree = undefined;
        var q = term.toLowerCase().trim();
        //console.log(q);
        var results = [];

        //console.log($scope.degrees);
        for (var i = 0; i < $scope.degrees.length && results.length < 10; i++) {
            var degree = $scope.degrees[i];
            var l_degree = degree.toLowerCase();

            if (l_degree.indexOf(q) >= 0){
                results.push({ label: degree, value: degree });
            }

        }

        return results;
    }

    $scope.autocomplete_degree = {
        suggest: suggest_degree,
        on_select: function (selected) {
            $scope.selectDegree = selected.label;
        }
    };

});

app.controller("mainController",function($scope, $http, $window){

    //console.log('****LOGGED IN USER******');
    //console.log($scope.logged_in_user);
    $scope.user = {};
    $scope.loggedIn = false;
    $scope.studentDet = false;
    $scope.student = {
        "name":"xx",
        "collegeName":"xxx",
        "degreeName":"xxxxx"
    };

    $http.get('/confirm-login')
        .success(function (user) {
            //console.log('<--------------------------RUN----------------->');
            //console.log(user);
            if(typeof(user.name) == 'undefined' || typeof(user.collegeName) == 'undefined' || typeof(user.degreeName) == 'undefined'){
                //console.log('NO-SESSION');
            }
            else{
                //console.log('Found-SESSION');
                $scope.setData(user);
                $scope.setloggedIn();
            }

        });

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
            //console.log('enter college data');
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
        //console.log($iconClass + " " + $divClass);
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            $scope.msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
        }, $scope.$msgShowTime);
    }

    $scope.logout = function(){
        $http.get('/user/logout')
            .success(function(x){
                if(x.logout === 'success')
                    $window.location.reload();
            })
    };

});


