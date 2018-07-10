var navList = [
    {
        lable: '全部',
        value: ''
    },
    {
        lable: '精华',
        value: 'good'
    },
    {
        lable: '问答',
        value: 'ask'
    },
    {
        lable: '分享',
        value: 'share'
    },
    {
        lable: '招聘',
        value: 'job'
    }
]
function getLabel(data){
    var tempArr = []
    for(var i in data){
        if(data[i].value){
            tempArr.push(data[i].lable)
        }
    }
    return tempArr
}
module.exports = {
    navList,
    getLabel
}