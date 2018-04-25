/**
 * 作者：杨昱昊
 * 时间：2018-4-16
 * 主要功能：
 *  1.通过 cookie 查找 token
 *      如果没有 token，显示登录界面
 *      如果有 token，直接显示三个功能链接，并进行跳转，在cookie中带上 token
 *  2.登录
 *  3.页面跳转
 */
window.onload = function () {

	// 判断登录状态
	var cookie = getCookie() || {};
	var token = cookie["herald-gusu-token"];
	if (token == null) {
		document.getElementsByClassName('login')[0].classList.remove('none');
	} else {
		document.getElementsByClassName('menu')[0].classList.remove('none');
	}

	// 登录事件注册
	var loginBtn = document.getElementById('loginBtn');
	loginBtn.addEventListener('click', function (event) {
		event.preventDefault();
		// 获取表单数据
		let cardnum = document.getElementById('cardnum').value;
		let psd = document.getElementById('password').value;
		let gpsd = document.getElementById('gpassword').value;

		// 发送请求 platform 是研究生会登录的默认值
		axios.post('https://myseu.cn/ws3/auth', {
				'cardnum': cardnum,
				'password': psd,
				'gpassword': gpsd,
				'platform': 'gusu'
			})
			.then(function (response) {
				token = response.data.result;
				console.log(token);
				setCookie('herald-gusu-token', token, 30);
				location.reload();
			})
			.catch(function (error) {
				console.log(error);
			});
	});

	// 注销事件注册
	var quitBtn = document.getElementById('g-quit');
	quitBtn.addEventListener('click', function (event) {
		event.preventDefault();
		clearCookie("herald-gusu-token");
		location.reload();
	});

	// 跳转功能入口
	var funcs = document.getElementsByClassName('m-item');
	for (var i = 0, length = funcs.length; i < length; i++) {
		(function (i) {
			funcs[i].addEventListener('click', function (event) {
				event.preventDefault();
				switch (i) {
					case 0:
						// 跳转到 curriculum
						window.location.href = "page/curriculum.html";
						break;
					case 1:
						//跳转到 gpa
						window.location.href = "page/gpa.html";
						break;
					case 2:
						// 跳转到 card
						window.location.href = "page/card.html";
						break;
					default:
						break;
				}
			});
		})(i);
	}
};