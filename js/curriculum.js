/**
 * 作者：杨昱昊
 * 时间：2018-4-23
 * 功能：获取课表数据并渲染到页面上
 */

const TWO_CLASS = 5700000;      // 两课时课程的时长
const THREE_CLASS = 8700000;    // 三课时课程的时长
const WEEK_LENGTH = 604800000;  // 一周的时长


// 根据课程信息创建节点
function buildClass(options) {
    let start = options.beginPeriod;  // 一节课的开始时间
    let day = options.dayOfWeek;
    let length = options.endPeriod - start; // 一节课的时间长度

    // 根据不同的上课时间和课程长度，选择样式
    let temp =  `<div class="course day${day} start${start} Length${length}">
                <p class="courseName">${options.courseName}</p>
                <p class="teacherName">${options.teacherName}</p>
                <p class="location">${options.location}</p>          
            </div>`;

    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = temp;
    return tempDiv.firstChild;
}

// 构建课程表,data 是请求到的curriculum
function buildTable(ele,data,weekNum) {
    let fragment = document.createDocumentFragment();
    for(let i = 0,count = data.length;i<count;i++){
        if (weekNum >= data[i].beginWeek-1 && weekNum < data[i].endWeek){
            let tempClass = buildClass({
                courseName:data[i].courseName,
                teacherName:data[i].teacherName,
                location:data[i].location,
                beginPeriod:data[i].beginPeriod,
                endPeriod:data[i].endPeriod
            });
            fragment.appendChild(tempClass);
        }
    }
    ele.innerHTML = "";
    ele.appendChild(fragment);
}
// 初始化课表以及注册事件
function init(result){
    let table = document.getElementById("curriculum");
    let switchBtn = document.querySelectorAll(".result>.week>button");
    let weeks = document.getElementById("weekNum");

    let currentDate = new Date();
    let weekNum = parseInt((currentDate.getTime() - result.term.startDate) / WEEK_LENGTH);
    weeks.innerHTML = `第${weekNum+1}周`;
    buildTable(table,result.curriculum,weekNum);

    // 切换上下周
    switchBtn[0].addEventListener("click",(e)=>{
        e.preventDefault();
        if(weekNum>=1){
            weekNum--;
            weeks.innerHTML = `第${weekNum+1}周`;
            buildTable(table,result.curriculum,weekNum);
        }

    });
    switchBtn[1].addEventListener("click",(e)=>{
        e.preventDefault();
        if(weekNum<15){
            weekNum++;
            weeks.innerHTML = `第${weekNum+1}周`;
            buildTable(table,result.curriculum,weekNum);
        }
    });
}

window.onload = function () {
    // 返回主菜单
    let backBtn = document.getElementById('g-back');
    backBtn.addEventListener('click',(e) => {
        e.preventDefault();
        window.history.back(-1);
    });
    // 请求获得成绩数据
    let token = getCookie()["herald-gusu-token"];
    axios.get("https://myseu.cn/ws3/api/curriculum",{
        headers: {
            'token':token
        }
    })
        .then((response) =>{
            let result = response.data.result;
            init(result);
        })
        .catch((error) =>{
            console.log(error);
        });
};


let a = {
    "success":true,
    "code":200,
    "result":{
        "term":{
            "code":"17-18-3",
            "startDate":1519574400000
        },
        "curriculum":[
            {
                "courseName":"学位英语35班",
                "teacherName":"蔡旭东",
                "credit":4,
                "location":"九龙湖纪忠楼Y211",
                "beginWeek":1,
                "endWeek":16,
                "dayOfWeek":4,
                "beginPeriod":1,
                "endPeriod":2,
                "flip":"none",
                "events":[
                    {"week":1, "startTime":1519862400000, "endTime":1519868100000},
                    {"week":2, "startTime":1520467200000, "endTime":1520472900000},
                    {"week":3, "startTime":1521072000000, "endTime":1521077700000},
                    {"week":4, "startTime":1521676800000, "endTime":1521682500000},
                    {"week":5, "startTime":1522281600000, "endTime":1522287300000},
                    {"week":6, "startTime":1522886400000, "endTime":1522892100000},
                    {"week":7, "startTime":1523491200000, "endTime":1523496900000},
                    {"week":8, "startTime":1524096000000, "endTime":1524101700000},
                    {"week":9, "startTime":1524700800000, "endTime":1524706500000},
                    {"week":10,"startTime":1525305600000,"endTime":1525311300000},
                    {"week":11,"startTime":1525910400000,"endTime":1525916100000},
                    {"week":12,"startTime":1526515200000,"endTime":1526520900000},
                    {"week":13,"startTime":1527120000000,"endTime":1527125700000},
                    {"week":14,"startTime":1527724800000,"endTime":1527730500000},
                    {"week":15,"startTime":1528329600000,"endTime":1528335300000},
                    {"week":16,"startTime":1528934400000,"endTime":1528940100000}
                ]
            },
            {
                "courseName":"土木工程结构概念设计",
                "teacherName":"孟少平",
                "credit":2,
                "location":"九龙湖纪忠楼Y410",
                "beginWeek":1,
                "endWeek":16,
                "dayOfWeek":5,
                "beginPeriod":6,
                "endPeriod":8,
                "flip":"none",
                "events":[
                    {"week":1,"startTime":1519970400000,"endTime":1519979700000},
                    {"week":2,"startTime":1520575200000,"endTime":1520584500000},
                    {"week":3,"startTime":1521180000000,"endTime":1521189300000},
                    {"week":4,"startTime":1521784800000,"endTime":1521794100000},
                    {"week":5,"startTime":1522389600000,"endTime":1522398900000},
                    {"week":6,"startTime":1522994400000,"endTime":1523003700000},
                    {"week":7,"startTime":1523599200000,"endTime":1523608500000},
                    {"week":8,"startTime":1524204000000,"endTime":1524213300000},
                    {"week":9,"startTime":1524808800000,"endTime":1524818100000},
                    {"week":10,"startTime":1525413600000,"endTime":1525422900000},
                    {"week":11,"startTime":1526018400000,"endTime":1526027700000},
                    {"week":12,"startTime":1526623200000,"endTime":1526632500000},
                    {"week":13,"startTime":1527228000000,"endTime":1527237300000},
                    {"week":14,"startTime":1527832800000,"endTime":1527842100000},
                    {"week":15,"startTime":1528437600000,"endTime":1528446900000},
                    {"week":16,"startTime":1529042400000,"endTime":1529051700000}
                    ]
            },
            {
                "courseName":"工程结构抗震分析","teacherName":"丁幼亮","credit":3,"location":"九龙湖纪忠楼Y213","beginWeek":1,"endWeek":16,"dayOfWeek":3,"beginPeriod":6,"endPeriod":8,"flip":"none",
                "events":[
                    {"week":1,"startTime":1519797600000,"endTime":1519806900000},
                    {"week":2,"startTime":1520402400000,"endTime":1520411700000},
                    {"week":3,"startTime":1521007200000,"endTime":1521016500000},
                    {"week":4,"startTime":1521612000000,"endTime":1521621300000},
                    {"week":5,"startTime":1522216800000,"endTime":1522226100000},
                    {"week":6,"startTime":1522821600000,"endTime":1522830900000},
                    {"week":7,"startTime":1523426400000,"endTime":1523435700000},
                    {"week":8,"startTime":1524031200000,"endTime":1524040500000},
                    {"week":9,"startTime":1524636000000,"endTime":1524645300000},
                    {"week":10,"startTime":1525240800000,"endTime":1525250100000},
                    {"week":11,"startTime":1525845600000,"endTime":1525854900000},
                    {"week":12,"startTime":1526450400000,"endTime":1526459700000},
                    {"week":13,"startTime":1527055200000,"endTime":1527064500000},
                    {"week":14,"startTime":1527660000000,"endTime":1527669300000},
                    {"week":15,"startTime":1528264800000,"endTime":1528274100000},
                    {"week":16,"startTime":1528869600000,"endTime":1528878900000}]
            },
            {
                "courseName":"工程结构鉴定与加固技术","teacherName":"曹双寅","credit":2,"location":"九龙湖纪忠楼Y206","beginWeek":1,"endWeek":8,"dayOfWeek":1,"beginPeriod":3,"endPeriod":5,"flip":"none",
                "events":[
                    {"week":1,"startTime":1519609800000,"endTime":1519618500000},
                    {"week":2,"startTime":1520214600000,"endTime":1520223300000},
                    {"week":3,"startTime":1520819400000,"endTime":1520828100000},
                    {"week":4,"startTime":1521424200000,"endTime":1521432900000},
                    {"week":5,"startTime":1522029000000,"endTime":1522037700000},
                    {"week":6,"startTime":1522633800000,"endTime":1522642500000},
                    {"week":7,"startTime":1523238600000,"endTime":1523247300000},
                    {"week":8,"startTime":1523843400000,"endTime":1523852100000}
                    ]
            }

            ]}};


