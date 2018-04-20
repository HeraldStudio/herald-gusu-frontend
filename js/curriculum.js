/**
 * 作者：史旭龙
 * 功能：渲染课表
 */
var tb = $("#tb");      // 课表容器
var termstartt;
var weekn;
var timestampn;
var daynub = 5;
var fdkb = "";
var sjt = [28800000,31800000,35400000,38400000,41400000,50400000,
    53400000,57000000,60000000,63000000,66600000,69600000,72600000];
jQuery.fn.rowspan = function (colIdx) { //封装的一个JQuery小插件
    return this.each(function () {
        var that;
        $('tr', this).each(function (row) {
            $('td:eq(' + colIdx + ')', this).filter(':visible').each(function (col) {
                if (that != null && $(this).html() == $(that).html()) {
                    rowspan = $(that).attr("rowSpan");
                    if (rowspan == undefined) {
                        $(that).attr("rowSpan", 1);
                        rowspan = $(that).attr("rowSpan");
                    }
                    rowspan = Number(rowspan) + 1;
                    $(that).attr("rowSpan", rowspan);
                    $(this).hide();
                } else {
                    that = this;
                }
            });
        });
    });
}
function merge() {
    for (var i = 1; i < daynub + 1; i++) tb.rowspan(i);
}

function getweek() {
    timestampn = Date.parse(new Date());
    weekn = Math.ceil((timestampn - termstartt) / 604800000);
}

function process(data, gg) {
    termstartt = parseInt(data["result"]["term"]["startDate"]);
    fdkb = "";
    if (gg == "1")
        getweek();
    $("#weeks").val(weekn);
    var dataRC = data["result"]["curriculum"];
    for (pp in dataRC) {
        
        var courseName = dataRC[pp]["courseName"];
        var teacherName = dataRC[pp]["teacherName"];
        var credit = dataRC[pp]["credit"];
        if (!dataRC[pp].hasOwnProperty("events")) {
            fdkb += (courseName + " " + teacherName + " " + "学分:" + credit + "  第" + dataRC[pp]["beginWeek"] + "到" + dataRC[pp]["endWeek"] + "周\r\n");
            continue;
        }
        var location = dataRC[pp]["location"];
        var dayOfWeek = dataRC[pp]["dayOfWeek"];
        for (kk in dataRC[pp]["events"]) {
            if (dataRC[pp]["events"][kk]["week"] == weekn) {
                var startt = dataRC[pp]["events"][kk]["startTime"];
                var endt = dataRC[pp]["events"][kk]["endTime"];
                var startdayt = (startt - termstartt - (weekn - 1) * 604800000 - (dayOfWeek - 1) * 86400000);
                var enddayt = (endt - termstartt - (weekn - 1) * 604800000 - (dayOfWeek - 1) * 86400000);
                var startj;
                var endj;
                for (hh in sjt) {
                    if (startdayt <= sjt[hh]) {
                        startj = hh;
                        break;
                    }
                }
                for (gg in sjt) {
                    if (enddayt <= sjt[gg] + 2700000) {
                        endj = gg;
                        break;
                    }
                }
                for (var st = startj; st <= parseInt(endj); st++) {
                    $("#tb>tbody>tr").eq(2 + parseInt(st)).children('td').eq(dayOfWeek).css({"border-top":"2px solid #31a5f2","background":"#fff"  });
                    $("#tb>tbody>tr").eq(2 + parseInt(st)).children('td').eq(dayOfWeek).html('<font size="5" color="#31a5f2" style="font-weight: bold;">' + courseName + '</font>' + "<br>" + '<font size="5" >' + location + "<br>" + teacherName + '</font>');
                    if (dayOfWeek > 5) daynub = 7;
                }

            }

        }

    }
}

function getjosn(gg) {
    $.get({
        url: "http://myseu.cn/ws3/api/curriculum",
        headers: {
            'token': getCookie()["herald-gusu-token"]
        }
    }, function (data) {
        process(data, gg);
        if (daynub > 5) $.get("../../res/template/7.html", function (data1) {
            document.getElementById('tb').innerHTML = data1;
            process(data, gg);
            merge();
        });
        merge();
    });
}

function ff(gg) {
    $.get("../../res/template/5.html", function (data1) {
        document.getElementById('tb').innerHTML = data1;
        getjosn(gg);
    });
}

$('select#weeks').on("change", function () {
    weekn = parseInt($(this).val());
    ff("0");
});

$('button#button1').on("click", function () {
    if (fdkb == "")
        alert("您没有浮动课程");
    else
        alert(fdkb);
});

$(document).ready(function(){
    // 返回主菜单
    let backBtn = document.getElementById('g-back');
    backBtn.addEventListener('click',function (e) {
        e.preventDefault();
        window.history.back(-1);
    });
    ff("1");
});