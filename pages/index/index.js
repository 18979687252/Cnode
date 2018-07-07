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
            tab:e.target.dataset.value
        },() =>{
            that.getAction()
        })
    },
    onPullDownRefresh:function() {
        let that = this
        that.setData({
            topicList:[],
            page:1
        },() => {
            that.getAction()
        })
    },
    onReachBottom:function(){
        let that = this
        let page = that.data.page
        that.setData({
            page:++page
        },() => {
            that.getAction()
        })
    },
    getAction(){
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
            }
        })
    },
    onLoad:function() {
        this.getAction()
    },

})
