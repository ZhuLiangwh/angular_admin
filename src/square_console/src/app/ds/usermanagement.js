/**
 * Created by jhzhang on 2014/10/9.
 */
define(['./DataSource'],function(DataSource){
    var bashPath = 'auth/user';

    var UserListDS = DataSource.ext({
        //获取用户列表
        getUserList:function(params){
            return this._load(bashPath + '/list',{params: params});
        },
        disable:function(data){
            return this._update(bashPath+'/active',{data:data});
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
        //获取选中的Roles
        getSelectedGroups:function(){
            return this.selectedGroups;
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
        //获取用户权限列表
        getUserPermissions:function(params){
            //return this._load(bashPath +'/permissions',{params: params});
            return this._load(bashPath +'/perm/'+ params.userid);
        },
        getPermDisplayData: function() {
            return this._load('auth/perm/getDisplayData', {
                isModelData: false
            });
        },
        //保存修改后的权限数据
        saveUserPermissions:function(data){
            //return this._update(bashPath +'/permissions',{data: data});
            return this._update(bashPath +'/perm/'+ data.userid,{data: data});
        },
        showToast:function(){}
    });

    var ActionLogDS = DataSource.ext({
        getData:function(params){
            return this._load('auth/actionlog/list',{params: params});
        }
    });

    var rolePath = 'auth/group';
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
        getRolePermissions:function(params){
            //return this._load(rolePath + '/permissions',{params: params});
            return this._load(rolePath +'/perm/'+ params.roleid);
        },
        getPermDisplayData: function() {
            return this._load('auth/perm/getDisplayData', {
                isModelData: false
            });
        },
        getRoleUserList:function(params){
            return this._load(rolePath + '/' + params.roleid);

        },
        //保存修改后的权限数据
        saveRolePermissions:function(data){
            return this._update(rolePath +'/perm/'+ data.roleid,{data: data});
        },
        disable:function(data){
            return this._update(rolePath+'/active',{data:data});
        }
    });

    return {
        __register__:function(mod){
            mod.service('ds.userlist',UserListDS);
            mod.service('ds.actionlog',ActionLogDS);
            mod.service('ds.role',RoleDS);
        }
    }
});