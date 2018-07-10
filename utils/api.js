var baseUrl = 'https://cnodejs.org/api/v1'
var topic = '/topic'
var topics = '/topics'
var reply = '/reply'
var accesstoken = '/accesstoken'
//url
var topicsUrl = baseUrl + topics
var topicUrl = baseUrl + topic
var accessTokenUrl = baseUrl + accesstoken
var replyUrl = baseUrl + reply

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
    accessTokenUrl,
    replyUrl,
    fetchHandler,

}