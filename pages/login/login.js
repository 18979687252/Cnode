import * as Api from '../../utils/api'

Page({
    data: {
        loading: false,
        accesstoken: "",
        error: ""
    },
    bindKeyInput: function (e) {
        this.setData({
            accesstoken: e.detail.value
        })
    },
    // 验证token(登录)
    accesstokenLogin: function () {
        var that = this;
        that.setData({loading: true});
        var data = {accesstoken: that.data.accesstoken}
        Api.fetchHandler('POST', Api.accessTokenUrl, data, (res) => {
            that.loginAfterHandler(res)
        })
    },
    loginByCodeHandler() {
        var that = this
        wx.scanCode({
            success: (res) => {
                //console.log(res.result)
                that.setData({accesstoken: res.result},()=>{
                    that.accesstokenLogin()
                })
            }
        })
    },
    loginAfterHandler(res) {
        var that = this
        if (res.success) {
            //console.log(res)
            var loginInfo = {
                accesstoken: that.data.accesstoken,
                id: res.id,
                loginname: res.loginname,
                avatar_url: res.avatar_url
            };
            //console.log(loginInfo)
            wx.setStorage({key:'loginInfo', data:loginInfo})
            setTimeout(function () {
                that.setData({loading: false})
                //登录后返回时不会刷新页面的，因为这个页面已经在页面栈中存在了，需要在登录页面更新数据
                //获取页面栈
                var pages = getCurrentPages();
                if (pages.length > 1) {
                    //上一个页面实例对象
                    var prePage = pages[pages.length - 2];
                    //console.log(pages,prePage)
                    //关键在这里,这里面是触发上个界面
                    // 不同的人里面的值是不同的，这个数据是我的，具体的你们要根据自己的来查看所要传的参数
                    prePage.getUserInfo(loginInfo)
                }
                wx.navigateBack()
            }, 1000);

        } else {
            that.setData({error: res.error_msg})
            that.setData({loading: false})
        }
    }
})
