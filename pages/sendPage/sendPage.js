import {navList,getLabel} from '../../utils/utils'
Page({
    data:{
        sendForm:{},
        topicArray:getLabel(navList),
        pickerIndex:0,
        disabled:false,
        loginInfo:{}
    },
    onLoad:function(){
        let that = this
      wx.getStorage({
          key:'loginInfo',
          success:function(res){
              that.setData({loginInfo:res.data})
          }
      })
    },
    pickerHandler:function(e){
        //console.log('携带数据为：', e.detail.value)
        this.setData({pickerIndex:e.detail.value})
    },
    formSubmit:function(e){
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        //发送请求
    }
})