//index.js
var fetch = require('../../utils/api')
import {navList} from '../../utils/utils'
Page({
    data: {
        navList:navList,
        activeValue:'',
        topicList:[],
        showLoadMore:true,
        page:1,
        tab:'',
        limit:10
    },
    navHandler(e) {
        let that = this
        that.setData({
            activeValue:e.target.dataset.value,
            tab:e.target.dataset.value,
            topicList:[]
        },() =>{
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 300
            })
            that.getAction()
        })
    },
    onShareAppMessage: function () {
        return {
            title: '仿CNode微社区',
            path: '/page/index/index'
        }
    },
    onPullDownRefresh:function() {
        let that = this
        that.setData({
            topicList:[],
            page:1
        },() => {
            that.getAction()
            wx.stopPullDownRefresh()
        })
    },
    onReachBottom:function(){
        let that = this
        let page = that.data.page
        that.setData({
            page:++page
        },() => {
            setTimeout(()=>{
                that.getAction()
            },600)
        })
    },
    getAction(){
        wx.showLoading({title:''})
        let that = this
        let query = {
            page:that.data.page,
            tab:that.data.tab,
            limit:that.data.limit
        }
        fetch.fetchHandler('',fetch.topicsUrl,query,(res) => {
            if(res.success){
                let data = [...that.data.topicList,...res.data]
                this.setData({
                    topicList:data,
                })
                if(res.data.length <10){
                    this.setData({
                        showLoadMore:false
                    })
                }
                wx.hideLoading()
            }
        })
    },
    onLoad:function() {
        this.getAction()
    },

})
