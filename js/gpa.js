/**
 * 作者：杨昱昊
 * 时间：2018-4-17
 * 功能：查看当前绩点以及各科成绩
 */


function buildReport(data) {
    // 缓存数据
    var score = data.score;
    var credits = data.credits;
    var detail = data.detail;
    // 获取页面上的容器
    var creditsN = document.getElementById("credits");
    var detailN = document.getElementById("detail");
    // 填写学分信息
    var tempCredits = '<li>\n' +
        '                    <p class="c-type">学位学分</p>\n' +
        '                    <p>'+ credits.degree +'</p>\n' +
        '                </li>\n' +
        '                <li>\n' +
        '                    <p class="c-type">选修学分</p>\n' +
        '                    <p>'+ credits.optional +'</p>\n' +
        '                </li>\n' +
        '                <li>\n' +
        '                    <p class="c-type">学分合计</p>\n' +
        '                    <p>'+ credits.total +'</p>\n' +
        '                </li>\n' +
        '                <li>\n' +
        '                    <p class="c-type">应修学分</p>\n' +
        '                    <p>'+ credits.required +'</p>\n' +
        '                </li>';
    creditsN.innerHTML = tempCredits;

    // 填写课程信息

    // 创建一个文档片段和临时容器，减小添加元素的回流
    var fragment = document.createDocumentFragment(),tempdiv = document.createElement('div');
    for (var i = 0, length = detail.length; i < length; i++) {
        var courses = detail[i].courses;
        for (var j = 0,courseNum = courses.length; j < courseNum; j++) {
            var tempCourse = '<li class="d-item">\n' +
                '                    <div class="course">\n' +
                '                        <p class="courseName">'+ courses[j].courseName+'</p>\n' +
                '                    </div>\n' +
                '                    <div class="score">\n' +
                '                        <p>类型：'+ courses[j].scoreType+'</p>\n' +
                '                        <p>学分：'+ courses[j].credit +'</p>\n' +
                '                        <p class="right">成绩：'+ courses[j].score +'</p>\n' +
                '                    </div>\n' +
                '                </li>';
            tempdiv.innerHTML = tempCourse;
            fragment.appendChild(tempdiv.firstChild);
        }
        detailN.appendChild(fragment);
    }
}

window.onload = function () {
    // 返回主菜单
    let backBtn = document.getElementById('g-back');
    backBtn.addEventListener('click',function (e) {
        e.preventDefault();
        window.history.back(-1);
    });
    // 请求获得成绩数据
    var token = getCookie()["herald-gusu-token"];
    axios.get("https://myseu.cn/ws3/api/gpa",{
        headers: {
            'token':token
        }
    })
        .then(function (response) {
            var result = response.data.result;
            buildReport(result);
        })
        .catch(function (error) {
            console.log(error);
        });
};
