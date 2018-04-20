/**
 * 作者：杨昱昊
 * 时间：2018-4-17
 * 功能：查看当前一卡通余额以及消费记录
 */

// 日期格式化，支持输入参数为number和date对象
function formatDate(date) {
    var temp;
    if(typeof date == "number"){
        temp = new Date(date);
    }else{
        temp = date;
    }
    var str = temp.getFullYear()+'-'+temp.getMonth()+1+'-'+temp.getDate()+' '+temp.getHours()+':'+temp.getMinutes()+':'+temp.getSeconds();
    return str;
}

// 构造一个账单
function buildBill(ele, data) {
    // 创建一个文档片段和临时容器，减小添加元素的回流
    var fragment = document.createDocumentFragment(),tempdiv = document.createElement("div");
    for (var i = 0,length = data.length; i < length; i++) {
        var temp = '<li class="d-item">\n' +
            '                    <p class="desc">'+ data[i].desc+'</p>\n' +
            '                    <p class="time">'+ formatDate(data[i].time) +'</p>\n' +
            '                    <p class="amount">'+ data[i].amount +'</p>\n' +
            '                </li>';
        tempdiv.innerHTML = temp;
        fragment.appendChild(tempdiv.firstChild);
    }
    ele.appendChild(fragment);
    fragment = null;

}

window.onload = function(){
    // 返回主菜单
    let backBtn = document.getElementById('g-back');
    backBtn.addEventListener('click',function (e) {
        e.preventDefault();
        window.history.back(-1);
    });

    // 缓存节点
    var balance = document.querySelector('.result>.info>.balance>span');
    var detail = document.getElementsByClassName('detail')[0];
    // 请求获得一卡通数据
    var token = getCookie()["herald-gusu-token"];
    axios.get("https://myseu.cn/ws3/api/card",{
        headers: {
            'token':token
        }
    })
        .then(function (response) {
            console.log(response);
            balance.innerHTML = response.data.result.info.balance;
            buildBill(detail,response.data.result.detail);
        })
        .catch(function (error) {
            console.log(error);
        });
};



