/**
 * Created by jhzhang on 2014/12/22.
 */
angular.module('dp.validator',['ng'])
    .provider('dpValidator',[function(){
        var defaultTips = {
            required      : "该选项不能为空",
            maxlength     : "该选项输入值长度不能大于{maxlength}",
            minlength     : "该选项输入值长度不能小于{minlength}",
            email         : "输入邮件的格式不正确",
            repeat        : "两次输入不一致",
            pattern       : "该选项输入格式不正确",
            number        : "必须输入数字",
            uniquecheck   : "该输入值已经存在，请重新输入",
            url           : "输入URL格式不正确",
            date          : "输入日期格式不正确",
            max           : "该选项输入值不能大于{max}",
            min           : "该选项输入值不能小于{min}"
        };

        var defaultRules = {
            username:{
                rule:/\d+/,
                required: "输入的用户名不能为空",
                pattern: "用户名必须输入字母、数字、下划线,以字母开头",
                uniquecheck:"输入用户名已经存在，请重新输入",
                backcheck:'http://www.ngnice.com/api/test/user/name/check?name=',
                beforeValiFn:function(){}
            }
        };

        var ValidatorFn = function(){
            this.config = {};
            this.rules = {};
        };
        ValidatorFn.prototype = {
            constructor:ValidatorFn,
            config:function(config){
                this.config = angular.extend(this.config,config);
            },
            setRule:function(rule){
                this.rules = angular.extend(this.rules,rule);
            },
            getErrorMsg:function(){},
            showErrorMsg:function(){},
            hideErrorMsg:function(){}
        };

        var validator = new ValidatorFn();

        this.config = function(config){
            validator.config(config);
        };

        this.serRule = function(rule){
            validator.setRule(rule);
        };

        this.setDefaultRules = function(rules){
            defaultRules = angular.extend(defaultRules, rules);
        };

        this.$get = function(){
            return validator;
        }
    }])
    .directive('dpFormValidator',['$parse','$timeout','dpValidator',function($parse,$timeout,dpValidator){
        return {
            compile:function(form,attr){
                console.log(form);
            },
            link:function(scope,form,attr){}
        }
    }])
    .directive('dpFormSubmit',['$parse',function($parse){
        return {
            require:'^dpFormValidator',
            link:function(){}
        }
    }])
    .directive('dpRepeat',[function(){
        return {
            require:'ngModel',
            link:function(){}
        }
    }])
    .directive('dpUnique',['$timeout','$http',function($timeout,$http){
        return {
            require:'ngModel',
            link:function(){}
        }
    }]);