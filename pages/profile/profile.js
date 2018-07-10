//logs.js
Page({
    data: {
        tabActive:'replies',
        userInfo:{}
    },
    onLoad:function(){
        this.getUserInfo()
    },
    //登录后返回时不会刷新页面的，因为这个页面已经在页面栈中存在了，需要在登录页面执行该函数
    getUserInfo(data){
        if(data){
            this.setData({userInfo:data})
        }else {
            let that = this
            wx.getStorage({
                key: 'loginInfo',
                success: function (res) {
                    that.setData({userInfo: res.data})
                }
            })
        }
    },
    loginOutHandler(){
        let that = this
        wx.removeStorage({
            key: 'loginInfo',
            success: function(res) {
                that.setData({userInfo:{}})
            }
        })
    },
    tabChangeHandler(e){
        //console.log(e)
        this.setData({tabActive:e.target.dataset.tabactive})
    }
})
