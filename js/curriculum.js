/**
 * 作者：杨昱昊
 * 时间：2018-4-23
 * 功能：获取课表数据并渲染到页面上
 */
const WEEK_LENGTH = 604800000; // 一周的时长

function initTable(ele){
	let fragment = document.createDocumentFragment();
	for(let i = 0;i<13;i++){
		let tempTr = document.createElement("tr");
		for(let j = 0;j<5;j++){
			let tempTd = document.createElement("td");
			tempTr.appendChild(tempTd);
		}
		fragment.appendChild(tempTr);
	}
	ele.appendChild(fragment);
}

// 根据课程信息创建节点
function buildClass(options) {
	let start = options.beginPeriod; // 课的开始时间
	let day = options.dayOfWeek; // 周几
	let length = options.endPeriod + 1 - start; // 课的课时长度
	// 根据不同的上课时间和课程长度，选择样式
	let temp = `<div class="course day${day} start${start} length${length}">
                <p class="courseName">${options.courseName}</p>
                <p class="teacherName">${options.teacherName}</p>
                <p class="location">${options.location}</p>          
            </div>`;

	let tempDiv = document.createElement("div");
	tempDiv.innerHTML = temp;
	return tempDiv.firstChild;
}

// 构建课程表,data 是请求到的curriculum
function buildTable(ele, data, weekNum) {
	let fragment = document.createDocumentFragment();
	for (let i = 0, count = data.length; i < count; i++) {
		if (weekNum >= data[i].beginWeek - 1 && weekNum < data[i].endWeek) {
			let tempClass = buildClass({
				courseName: data[i].courseName,
				teacherName: data[i].teacherName,
				location: data[i].location,
				beginPeriod: data[i].beginPeriod,
				endPeriod: data[i].endPeriod,
				dayOfWeek: data[i].dayOfWeek
			});
			fragment.appendChild(tempClass);
		}
	}
	ele.innerHTML = "";
	ele.appendChild(fragment);
}
// 初始化课表以及注册事件
function init(result) {
	let table = document.getElementById("curriculum");
	let switchBtn = document.querySelectorAll(".result>.week>button");
	let weeks = document.getElementById("weekNum");
	let termCode = document.getElementById("termCode");

	let currentDate = new Date();
	let weekNum = parseInt((currentDate.getTime() - result.term.startDate) / WEEK_LENGTH);
	weeks.innerHTML = `第${weekNum+1}周`;
	buildTable(table, result.curriculum, weekNum);
	initTable(table);
	// 切换上下周
	switchBtn[0].addEventListener("click", (e) => {
		e.preventDefault();
		if (weekNum >= 1) {
			weekNum--;
			weeks.innerHTML = `第${weekNum+1}周`;
			buildTable(table, result.curriculum, weekNum);
		}

	});
	switchBtn[1].addEventListener("click", (e) => {
		e.preventDefault();
		if (weekNum < 15) {
			weekNum++;
			weeks.innerHTML = `第${weekNum+1}周`;
			buildTable(table, result.curriculum, weekNum);
		}
	});
}

window.onload = function () {
	// 返回主菜单
	let backBtn = document.getElementById('g-back');
	backBtn.addEventListener('click', (e) => {
		e.preventDefault();
		window.history.back(-1);
	});
	// 请求获得成绩数据
	let token = getCookie()["herald-gusu-token"];
	axios.get("https://myseu.cn/ws3/api/curriculum", {
			headers: {
				'token': token
			}
		})
		.then((response) => {
			let result = response.data.result;
			init(result);
		})
		.catch((error) => {
			console.log(error);
		});
};