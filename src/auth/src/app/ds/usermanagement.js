/**
 * Created by jhzhang on 2014/10/9.
 */
define(['./DataSource'],function(DataSource){
    var bashPath = '/user';

    var UserListDS = DataSource.ext({
        //获取用户列表
        getUserList:function(params){
            return this._load(bashPath + '/list',{params: params});
        },
        disable:function(data){
            return this._update('/active' + bashPath,{data:data});
        },
        delete:function(data){
            return this._update(bashPath+'/delete',{data:data});
        },
        getDisplayData: function() {
            return this._load(bashPath + '/getDisplayData', {
                isModelData: false
            });
        },
        /**************************create edit****************************/
        //创建新用户时获取Departments以及Roles数据
        getGroupsAndRoles:function(params){
            return this._load(bashPath+'/add',{params: params});
        },
        //获取选中的Groups
        getSelectedGroups:function(){
            return this.selectedGroups;
        },
        //获取选中的Roles
        getSelectedRoles:function(){
            return this.selectedRoles;
        },
        //创建新用户
        createUser:function(data){
            return this._update(bashPath + '/add', {data: data});
        },
        /**************************user edit****************************/
        getUserInfo:function(params){
            return this._load(bashPath+'/'+ params.userid);
        },
        saveUserInfo:function(data){
            return this._update(bashPath + '/'+ data.id,{data: data});
        },
        /**************************user Permissions****************************/
        getProjectName:function(params){
            return this._load('label/list',{params:params});
        },
        //获取用户权限列表
        getUserPermissions:function(params){
            return this._load(params.project.value +'/user/perm/'+ params.uid);
        },
        getPermDisplayData: function(params) {
            return this._load(params.project.value + '/perm/getDisplayData');
        },
        //保存修改后的权限数据
        saveUserPermissions:function(data){
            var postData = {
                perm_list:data.perm.perm_list,
                disable_list:data.perm.disabled
            };
            return this._update(data.project.value +'/user/perm/'+ data.uid,{data: postData});
        },
        showToast:function(){}
    });

    var ActionLogDS = DataSource.ext({
        getData:function(params){
            return this._load('actionlog/list',{params: params});
        }
    });

    var UserLogDS = DataSource.ext({
        getData:function(params){
            return this._load('userlog',{params: params});
        }
    });

    var rolePath = 'group';
    var RoleDS = DataSource.ext({
        getData:function(params){
            return this._load(rolePath + '/list',{params: params});
        },
        addRole:function(oRole){
            return this._update(rolePath + '/add',{data:oRole});
        },
        save:function(oRole){
            return this._update(rolePath +"/" + oRole.id,{data:oRole});
        },
        del:function(oRole){
            return this._update(rolePath + '/delete',{data:oRole});
        },
        getProjectName:function(params){
            return this._load('label/list',{params:params});
        },
        getRolePermissions:function(params){
            return this._load(params.project.value +'/group/perm/'+ params.roleid);
        },
        getPermDisplayData: function(params) {
            return this._load(params.project.value + '/perm/getDisplayData');
        },
        getRoleUserList:function(params){
            return this._load(rolePath + '/' + params.roleid);
        },
        //保存修改后的权限数据
        saveRolePermissions:function(data){
            var postData = {
                perm_list:data.perm.perm_list,
                disable_list:data.perm.disabled
            };
            return this._update(data.project.value +'/group/perm/' + data.roleid,{data: postData});
        },
        disable:function(data){
            //return this._update(rolePath+'/active',{data:data});
            return this._update('/active' + bashPath,{data:data});
        }
    });

    return {
        __register__:function(mod){
            mod.service('ds.userlist',UserListDS);
            mod.service('ds.actionlog',ActionLogDS);
            mod.service('ds.role',RoleDS);
            mod.service('ds.userlog',UserLogDS);
        }
    }
});