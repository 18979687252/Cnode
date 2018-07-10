var Api = require('../../utils/api')
import {navList} from '../../utils/utils'
var WxParse = require('../../wxParse/wxParse.js');
Page({
    data:{
        navList:navList,
        detailInfo:{},
        id:'',
        loginInfo:{}
    },
    onLoad:function(){
        this.setData({
            id:this.options.id
        },() =>{
            this.getAction()
        })
        let that = this
        wx.getStorage({
            key:'loginInfo',
            success:function(res){
                that.setDate({
                    loginInfo:res.data
                })
            }
        })
    },
    getAction: function(){
        wx.showLoading({title:'加载中'})
        let that = this
        let url = Api.topicUrl + '/' + that.data.id
        Api.fetchHandler('',url,{},(res) =>{
            if(res.success){
                that.setData({detailInfo:res.data})
            }
            WxParse.wxParse('content', 'html', res.data.content, that, 5)
            wx.hideLoading()
        })
    },
    replyUpsHandler(e){
        let id = e.target.id
        let url = Api.replyUrl + '/' + id + '/ups'
        let data = {accesstoken:this.data.loginInfo.accesstoken}
        Api.fetchHandler('POST',url,data,(res) =>{
            if(res.success){
                wx.showToast({title:"评论成功！"})
            }else{

                wx.showToast({title:res.error_msg})
             }
        })
    }
})