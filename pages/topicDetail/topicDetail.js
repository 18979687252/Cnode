var fetch = require('../../utils/api')
import {navList} from '../../utils/utils'
var WxParse = require('../../wxParse/wxParse.js');
Page({
    data:{
        navList:navList,
        detailInfo:{},
        id:''
    },
    onLoad:function(){
        this.setData({
            id:this.options.id
        },() =>{
            this.getAction()
        })
    },
    getAction: function(){
        wx.showLoading({title:'加载中'})
        let that = this
        let url = fetch.topicUrl + '/' + that.data.id
        fetch.fetchHandler('',url,{},(res) =>{
            if(res.success){
                that.setData({detailInfo:res.data})
            }
            WxParse.wxParse('content', 'html', res.data.content, that, 5)
            wx.hideLoading()
        })
    }
})