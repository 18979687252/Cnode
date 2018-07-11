# 仿CNode微社区小程序
    该项目主要是练习小程序，熟悉小程序的组件和部分语法
## 描述
 * 发开工具：微信开发工具v1.02.1806120
 * 实现了首页上拉加载，下拉刷新
 * token登录和扫码登录
 * 基本页面的开发：首页，详情，发帖，消息，用户，登录

 ## 问题描述
 * 使用HTML标签的特性异常，表现为行内元素；
    > 解决办法：建议统一使用小程序内的组件开发

 * 真机调试下拉刷新：下拉不反弹？
   下拉刷新进行请求后，需要主动触发停止下拉刷新；
   > 解决方法：
    ```
    onPullDownRefresh: function() {
        this.getData()//刷新时请求服务器的方法
        wx.stopPullDownRefresh();//为停止当前页面下拉刷新
    }
     ```

 * 注意:setData()同react的setState都是异步方法，需要同步怎么办？
    > 解决办法：
    ```
        that.setData({
             topicList:[],
             page:1
         },() => {
             that.getAction()
         })
     ```

 * 如果需要使用filter过滤器来对wxml文件的数据进行处理怎么办？(小程序暂时没有filter)
    > 解决办法：借助小程序模块wxs
    >> 1.自己定义一个filter.wxs文件
    ```
    var filter = {
         navValueToName:function(value,data){
            for(var i = 0; i < data.length; ++i){
            if(data[i].value == value){
                 return data[i].lable
             }
            }
            return ''
         }
     }
     module.exports = {
       navValueToName:filter.navValueToName
     }
     ```
    >> 2.在相应的wxml文件内引用filter.wxs,并使用这个模块

    ```<wxs module="filter" src="../../utils/filter.wxs"></wxs>```

    ```<text class="main-item-b-item">{{filter.formatTime(item.last_reply_at)}}</text>```

 * 页面跳转返回后发现原页面没有重新加载（需要更新数据未更新）；这个因为原页面已经存在于页面栈中，不会再次执行onLoad函数
    > 解决办法：在原页面定义一个更新数据的方法，在跳转后的页面的逻辑层去执行原页面的更新方法。
    ```
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
    wx.navigateBack()//返回
    ```