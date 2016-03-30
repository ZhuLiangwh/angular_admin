define(['common/utils/store'], function (getStore) {
    var store = getStore('sessionStorage');
    var diName = 'cache';
    return {
        __register__: function (mod) {
            mod.factory(diName, ['session',cacheFactory]);
            return mod;
        }
    };

    function cacheFactory(session){
        return {
            set:function(key,value){
                var user = session.username,
                    userCache = store.get(user) || {};
                console.log(user);
                if(_.isString(key)){
                    return store.set(user, _.extend({},userCache,{key:value}));
                }
                if(_.isObject(key)){
                    return store.set(user, _.extend({},userCache,key));
                }
            },
            get:function(key){
                var user = session.username;
                return (store.get(user)||{})[key] || {};
            },
            remove:function(key){
                var c = store.get(user),items;
                items = _.isString(key) ?  [key] : key;
                if(!_.isArray(items)) return;
                items.each(function(item){
                    delete c[item];
                });
                return store.set(user, c);
            },
            clear:function(){
                return store.set(user,{});
            }
        }
    }
});