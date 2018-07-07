var baseUrl = 'https://cnodejs.org/api/v1'
var topic = '/topic'
var topics = '/topics'
//url
var topicsUrl = baseUrl + topics
var topicUrl = baseUrl + topic

//请求函数
function fetchHandler(method,url,data,callback){
    wx.request({
        method:method || 'GET',
        url: url,
        data: data,
        success: function(res) {
            callback(res.data)
        }
    })
}
module.exports = {
    topicUrl,
    topicsUrl,
    fetchHandler
}