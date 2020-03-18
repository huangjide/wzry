//=================================
// 商城通用Js
//=================================


/*#region ==========页面初始化加载==========*/
//动态加载js和css文件
var LoadExtentFile = {
    css: function (path) {
        if (!path || path.length === 0) {
            throw new Error('');
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function (path) {
        if (!path || path.length === 0) {
            throw new Error('');
        }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    }
}
//加载提示插件
LoadExtentFile.js("/scripts/layer/Common.js");

//layer全局变量
layer.config({
    extend: 'shop/layer.css',
    shade: 0.1 //遮罩
});

//手机端加载页面过度效果
//if (IsFromMobile()) {
//    LoadExtentFile.js("/scripts/loading/FourStar.js");
//    LoadExtentFile.css("/scripts/loading/FourStar.css");
//}
/*#endregion */


/*#region ==========公共方法==========*/
//切换验证码
function SwitchCode() {
    $("#verifyCode").children("img").eq(0).attr("src", "/Ajax/verify_code.ashx?time=" + Math.random());
    return false;
}

//切换验证码
function ToggleCode(obj, codeurl) {
    $(obj).children("img").eq(0).attr("src", codeurl + "?time=" + Math.random());
    return false;
}

//读取单选按钮选中的值
function getradio(radio) {
    var outstr = "";
    $("input[name='" + radio + "']:checked").each(function () {
        outstr = this.value;
    });
    return outstr;
}

//获取checkboxlist的值
function getcheckbox(name) {
    var outstr = "";
    $("input[name='" + name + "']:checked").each(function () {
        outstr += this.value + ",";
    });
    if (outstr != "") {
        outstr = "," + outstr;
    }
    return outstr;
}

//获取页面名称
function PageName() {
    var a = location.href;
    var b = a.split("/");
    var c = b.slice(b.length - 1, b.length).toString(String).split(".");
    return c.slice(0, 1);
}

//读取链接后面的参数
function GetQS(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return "";
}

//导航切换，一般用在li【ID，点击元素this，导航选中样式，盒子样式】
function TabSwitch(navid, clickele, clickclass, boxcss) {
    $(clickele).parent().children().removeClass(clickclass);
    $(clickele).addClass(clickclass);
    $("." + boxcss).addClass("hidden");
    $("#" + boxcss + navid).removeClass("hidden");
}

//显示隐藏分享提示
function wxshare(id) {
    if ($("#" + id).hasClass("hidden")) {
        $("#" + id).removeClass("hidden");
    }
    else {
        $("#" + id).addClass("hidden");
    }
}

//显示隐藏元素
function ShowHide(id) {
    if ($(id).hasClass("hidden")) {
        $(id).removeClass("hidden");
    }
    else {
        $(id).addClass("hidden");
    }
}
/*#endregion */


/*#region ==========ajax方法==========*/
//ajax执行状态
var ajaxing = 0;

//通用ajax基础方法
function ajaxpost(type, ajaxstr, posturl) {
    if (ajaxing != 0) {
        return "-100";
    }
    var datastr = "type=" + type + "&" + ajaxstr;
    var outstr = "-99"; //不想提示数据变化就改了
    $.ajax({
        async: false,
        type: "POST",
        dataType: "text",
        url: posturl,
        data: datastr,
        beforeSend: function (data) { ajaxing = 1; },
        success: function (data) {
            ajaxing = 0; outstr = data;
        },
        error: function (data) {
            ajaxing = 0; outstr = "-99"; //不想提示数据变化就改了
        }
    });
    return outstr;
}

//展示ajax
function AjaxWeb(type, ajaxstr) {
    return ajaxpost(type, ajaxstr, "/Ajax/Ajax_Web.ashx");
}
/*#endregion */


/*#region ==========设备判断==========*/
//手机检测跳转
function CheckMobileLink() {
    if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i))) {
        top.location = '/WeixinShop/index.html';
    }
}

//PC端检测跳转
function CheckPcLink() {
    if (!(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i))) {
        top.location = '/index.html';
    }
}

//判断是否手机端
function IsFromMobile() {
    if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i))) {
        return true;
    }
    else {
        return false;
    }
}

//判断是否微信
function IsFromWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    }
    else {
        return false;
    }
}

//是否ie浏览器
function IsIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) return true;
    else return false;
}
/*#endregion */


/*#region ==========cookie方法==========*/
//写入cookie，按分钟
function SetTimeCookie(name, value, minute) {
    var exp = new Date();
    exp.setTime(exp.getTime() + minute * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//写入cookie
function SetCookie(name, value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//写入cookie
function SetCookieSecond(name, value, Second) {
    var exp = new Date();
    exp.setTime(exp.getTime() + Second * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
///删除cookie
function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//读取cookie
function GetCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null)
        return unescape(arr[2]);
    return null;
}
/*#endregion */


/*#region ==========数据转换==========*/
//转换为数字，否则返回默认值
function StrToInt(expression, defvalue) {
    if (expression == null || expression == "") {
        return defvalue;
    }
    var rtn = parseInt(expression.toString());
    if (isNaN(rtn)) {
        return defvalue;
    }
    return rtn;
}

//转换为数字，否则返回默认值
function StrToFloat(expression, defvalue) {
    if (expression == null || expression == "") {
        return defvalue;
    }
    var rtn = parseFloat(expression.toString());
    if (isNaN(rtn)) {
        return defvalue;
    }
    return parseFloat(rtn.toFixed(2));
}
/*#endregion */


/*#region ==========验证方式==========*/
//判断是否有汉字
function CheckChinese(str) {
    if (escape(str).indexOf("%u") < 0) { return true; }
    else { return false; }
}

//判断账号名格式
function CheckAccount(str) {
    var myregstr = /^([a-zA-Z]|[a-zA-Z0-9]|[._]){6,20}$/;
    if (!myregstr.test(str)) { return false; }
    else { return true; }
}

//判断邮箱
function CheckEmail(str) {
    var myregstr = /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myregstr.test(str)) { return false; }
    else { return true; }
}

//判断手机
function CheckMobile(str) {
    var myregstr = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
    if (!myregstr.test(str)) { return false; }
    else { return true; }
}

//判断固话
function CheckPhone(str) {
    var myregstr = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    if (!myregstr.test(str)) { return false; }
    else { return true; }
}

//验证身份证号码
function CheckIdentity(num) {
    num = num.toUpperCase();
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        return false;
    }
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        }
        else {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return true;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        }
        else {
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                return false;
            }
            return true;
        }
    }
    return false;
}
/*#endregion */


/*#region ==========收藏首页==========*/
//添加收藏
function AddFavorite(url, title) {
    try { window.external.addFavorite(url, title); }
    catch (e) {
        try { window.sidebar.addPanel(title, url, ""); }
        catch (e) { alert("加入收藏失败，请使用Ctrl+D进行添加"); }
    }
}

//设为首页 <a onclick="SetHome(this,window.location)">设为首页</a>
function SetHome(obj, vrl) {
    try {
        obj.style.behavior = 'url(#default#homepage)'; obj.setHomePage(vrl);
    }
    catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        }
    }
}
/*#endregion */

function generateMixed(n) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var res = "";
    for (var i = 0; i < n ; i++) {
        var id = Math.floor(Math.random() * 10);
        res += chars[id];
    }
    return res;
}
/*#region ==========自定义方法==========*/
//网站留言
function WebMessage() {
    var nn = generateMixed(3);
    if ($("input[name='r1']:checked").val()) {
        var _txt_PingTai = $.trim($("input[name='r1']:checked").val());
    }//区服系统选项

    if ($("input[name='r2']:checked").val()) {
        var _txt_Scoure = $.trim($("input[name='r2']:checked").val());
    }//账号来源

    var _txt_Vip = $.trim($("#r3").val());//贵族等级
    var _txt_Jifen = $.trim($("#r32").val());//贵族积分
    var _txt_QuFu = $.trim($("#r666").val());//贵族积分
    var _txt_YNumber = $.trim($("#r4").val());//英雄数量
    var _txt_PNumber = $.trim($("#r5").val());//皮肤数量
    var _txt_MNumber = $.trim($("#r6").val());//五级铭文数量
    var _txt_CGrade = $.trim($("#r7").val());//成就等级
    var _txt_King = $.trim($("#r8").val());//王者印记
    var _txt_Paragraph = $.trim($("#r9").val());//当前段位

    var price = 0;
    var chva1 = [];
    var str1 = "";
    $(".xianying").each(function () {
        $(this).find("input[type='checkbox']:checkbox:checked").each(function () {
            str1 = str1 + $(this).attr("value") + ",";
           
            switch (_txt_PingTai) {
                case "苹果QQ":
                    if ($(this).attr("data-price_pq") != "") {
                        price = price + parseInt($(this).attr("data-price_pq"));
                    }
                    break;
                case "苹果微信":
                    if ($(this).attr("data-price_pw") != "") {
                        price = price + parseInt($(this).attr("data-price_pw"));
                    }
                    break;
                case "安卓QQ":
                    if ($(this).attr("data-price_aq") != "") {
                        price = price + parseInt($(this).attr("data-price_aq"));
                    }
                    break;
                case "安卓微信":
                    if ($(this).attr("data-price_aw") != "") {
                        price = price + parseInt($(this).attr("data-price_aw"));
                    }
                    break;
                default:
                    Tips("未知错误，提交失败！", 2); break;
            }
        })
    })
    chva1.push(str1);
    var _txt_XianHero = $.trim(chva1);


    var chva55 = [];
    var str55 = "";
    $(".saipi").each(function () {
        $(this).find("input[type='checkbox']:checkbox:checked").each(function () {
            str55 = str55 + $(this).attr("value") + ",";

            switch (_txt_PingTai) {
                case "苹果QQ":
                    if ($(this).attr("data-price_pq") != "") {
                        price = price + parseInt($(this).attr("data-price_pq"));
                    }
                    break;
                case "苹果微信":
                    if ($(this).attr("data-price_pw") != "") {
                        price = price + parseInt($(this).attr("data-price_pw"));
                    }
                    break;
                case "安卓QQ":
                    if ($(this).attr("data-price_aq") != "") {
                        price = price + parseInt($(this).attr("data-price_aq"));
                    }
                    break;
                case "安卓微信":
                    if ($(this).attr("data-price_aw") != "") {
                        price = price + parseInt($(this).attr("data-price_aw"));
                    }
                    break;
                default:
                    Tips("未知错误，提交失败！", 2); break;
            }
        })
    })
    chva55.push(str55);
    var _txt_SaiPi = $.trim(chva55);

    var chva66 = [];
    var str66 = "";
    $(".xingpi").each(function () {
        $(this).find("input[type='checkbox']:checkbox:checked").each(function () {
            str66 = str66 + $(this).attr("value") + ",";

            switch (_txt_PingTai) {
                case "苹果QQ":
                    if ($(this).attr("data-price_pq") != "") {
                        price = price + parseInt($(this).attr("data-price_pq"));
                    }
                    break;
                case "苹果微信":
                    if ($(this).attr("data-price_pw") != "") {
                        price = price + parseInt($(this).attr("data-price_pw"));
                    }
                    break;
                case "安卓QQ":
                    if ($(this).attr("data-price_aq") != "") {
                        price = price + parseInt($(this).attr("data-price_aq"));
                    }
                    break;
                case "安卓微信":
                    if ($(this).attr("data-price_aw") != "") {
                        price = price + parseInt($(this).attr("data-price_aw"));
                    }
                    break;
                default:
                    Tips("未知错误，提交失败！", 2); break;
            }
        })
    })
    chva66.push(str66);
    var _txt_XingPi = $.trim(chva66);


    var chva2 = [];
    var str2 = "";
    $(".rong").each(function () {
        $(this).find("input[type='checkbox']:checkbox:checked").each(function () {
            str2 = str2 + $(this).attr("value") + ",";
            switch (_txt_PingTai) {
                case "苹果QQ":
                    if ($(this).attr("data-price_pq") != "") {
                        price = price + parseInt($(this).attr("data-price_pq"));
                    }
                    break;
                case "苹果微信":
                    if ($(this).attr("data-price_pw") != "") {
                        price = price + parseInt($(this).attr("data-price_pw"));
                    }
                    break;
                case "安卓QQ":
                    if ($(this).attr("data-price_aq") != "") {
                        price = price + parseInt($(this).attr("data-price_aq"));
                    }
                    break;
                case "安卓微信":
                    if ($(this).attr("data-price_aw") != "") {
                        price = price + parseInt($(this).attr("data-price_aw"));
                    }
                    break;
                default:
                    Tips("未知错误，提交失败！", 2); break;
            }

        })
    })
    chva2.push(str2);
    var _txt_RongHero = $.trim(chva2);


    var chva3 = [];
    var str3 = "";
    $(".xianpi").each(function () {
        $(this).find("input[type='checkbox']:checkbox:checked").each(function () {
            str3 = str3 + $(this).attr("value") + ",";
            switch (_txt_PingTai) {
                case "苹果QQ":
                    if ($(this).attr("data-price_pq") != "") {
                        price = price + parseInt($(this).attr("data-price_pq"));
                    }
                    break;
                case "苹果微信":
                    if ($(this).attr("data-price_pw") != "") {
                        price = price + parseInt($(this).attr("data-price_pw"));
                    }
                    break;
                case "安卓QQ":
                    if ($(this).attr("data-price_aq") != "") {
                        price = price + parseInt($(this).attr("data-price_aq"));
                    }
                    break;
                case "安卓微信":
                    if ($(this).attr("data-price_aw") != "") {
                        price = price + parseInt($(this).attr("data-price_aw"));
                    }
                    break;
                default:
                    Tips("未知错误，提交失败！", 2); break;
            }

        })
    })
    chva3.push(str3);
    var _txt_XianPi = $.trim(chva3);


    var chva4 = [];
    var str4 = "";
    $(".shi").each(function () {
        $(this).find("input[type='checkbox']:checkbox:checked").each(function () {
            str4 = str4 + $(this).attr("value") + ",";
            switch (_txt_PingTai) {
                case "苹果QQ":
                    if ($(this).attr("data-price_pq") != "") {
                        price = price + parseInt($(this).attr("data-price_pq"));
                    }
                    break;
                case "苹果微信":
                    if ($(this).attr("data-price_pw") != "") {
                        price = price + parseInt($(this).attr("data-price_pw"));
                    }
                    break;
                case "安卓QQ":
                    if ($(this).attr("data-price_aq") != "") {
                        price = price + parseInt($(this).attr("data-price_aq"));
                    }
                    break;
                case "安卓微信":
                    if ($(this).attr("data-price_aw") != "") {
                        price = price + parseInt($(this).attr("data-price_aw"));
                    }
                    break;
                default:
                    Tips("未知错误，提交失败！", 2); break;
            }

        })
    })
    chva4.push(str4);
    var _txt_ShiPi = $.trim(chva4);


    var chva5 = [];
    var str5 = "";
    $(".chuan").each(function () {
        $(this).find("input[type='checkbox']:checkbox:checked").each(function () {
            str5 = str5 + $(this).attr("value") + ",";
            switch (_txt_PingTai) {
                case "苹果QQ":
                    if ($(this).attr("data-price_pq") != "") {
                        price = price + parseInt($(this).attr("data-price_pq"));
                    }
                    break;
                case "苹果微信":
                    if ($(this).attr("data-price_pw") != "") {
                        price = price + parseInt($(this).attr("data-price_pw"));
                    }
                    break;
                case "安卓QQ":
                    if ($(this).attr("data-price_aq") != "") {
                        price = price + parseInt($(this).attr("data-price_aq"));
                    }
                    break;
                case "安卓微信":
                    if ($(this).attr("data-price_aw") != "") {
                        price = price + parseInt($(this).attr("data-price_aw"));
                    }
                    break;
                default:
                    Tips("未知错误，提交失败！", 2); break;
            }

        })
    })
    chva5.push(str5);
    var _txt_ChuanPI = $.trim(chva5);


    var chva6 = [];
    var str6 = "";
    $(".nei").each(function () {
        $(this).find("input[type='checkbox']:checkbox:checked").each(function () {
            str6 = str6 + $(this).attr("value") + ",";
            switch (_txt_PingTai) {
                case "苹果QQ":
                    if ($(this).attr("data-price_pq") != "") {
                        price = price + parseInt($(this).attr("data-price_pq"));
                    }
                    break;
                case "苹果微信":
                    if ($(this).attr("data-price_pw") != "") {
                        price = price + parseInt($(this).attr("data-price_pw"));
                    }
                    break;
                case "安卓QQ":
                    if ($(this).attr("data-price_aq") != "") {
                        price = price + parseInt($(this).attr("data-price_aq"));
                    }
                    break;
                case "安卓微信":
                    if ($(this).attr("data-price_aw") != "") {
                        price = price + parseInt($(this).attr("data-price_aw"));
                    }
                    break;
                default:
                    Tips("未知错误，提交失败！", 2); break;
            }

        })
    })
    chva6.push(str6);
    var _txt_NeiPi = $.trim(chva6);


    var htmls ="<p>查询编号：" + nn + "</p>";
    htmls += "<p>区服系统选项：" + _txt_PingTai + "</p>";
    htmls += "<p>账号来源：" + _txt_Scoure + "</p>";
    htmls += "<p>区服：" + _txt_QuFu + "</p>";
    htmls += "<p>贵族等级：" + _txt_Vip + "</p>";
    htmls += "<p>贵族积分：" + _txt_Jifen + "</p>";
    htmls += "<p>英雄数量：" + _txt_YNumber + "</p>";
    htmls += "<p>皮肤数量：" + _txt_PNumber + "</p>";
    htmls += "<p>五级铭文数量：" + _txt_MNumber + "</p>";
    htmls += "<p>成就等级：" + _txt_CGrade + "</p>";
    htmls += "<p>王者印记：" + _txt_King + "</p>";
    htmls += "<p>当前段位：" + _txt_Paragraph + "</p>";
    htmls += "<p>限定英雄：" + _txt_XianHero + "</p>";
    htmls += "<p>赛季皮肤：" + _txt_SaiPi + "</p>";
    htmls += "<p>星元皮肤：" + _txt_XingPi + "</p>";
    htmls += "<p>荣耀水晶详细：" + _txt_RongHero + "</p>";
    htmls += "<p>限定皮肤：" + _txt_XianPi + "</p>";
    htmls += "<p>史诗皮肤：" + _txt_ShiPi + "</p>";
    htmls += "<p>传说皮肤：" + _txt_ChuanPI + "</p>";
    htmls += "内测英雄皮肤：" + _txt_NeiPi;


    var html = "查询编号：" + nn + "\n";
    html += "区服系统选项：" + _txt_PingTai + "\n";
    html += "区服：" + _txt_QuFu + "\n";
    html += "账号来源：" + _txt_Scoure + "\n";
    html += "贵族等级：" + _txt_Vip + "\n";
    html += "贵族积分：" + _txt_Jifen + "\n";
    html += "英雄数量：" + _txt_YNumber + "\n";
    html += "皮肤数量：" + _txt_PNumber + "\n";
    html += "五级铭文数量：" + _txt_MNumber + "\n";
    html += "成就等级：" + _txt_CGrade + "\n";
    html += "王者印记：" + _txt_King + "\n";
    html += "当前段位：" + _txt_Paragraph + "\n";
    html += "限定英雄：" + _txt_XianHero + "\n";
    html += "赛季皮肤：" + _txt_SaiPi + "\n";
    html += "星元皮肤：" + _txt_XingPi + "\n";
    html += "荣耀水晶详细：" + _txt_RongHero + "\n";
    html += "限定皮肤：" + _txt_XianPi + "\n";
    html += "史诗皮肤：" + _txt_ShiPi + "\n";
    html += "传说皮肤：" + _txt_ChuanPI + "\n";
    html += "内测英雄皮肤：" + _txt_NeiPi;
 

    var datastr = "_txt_PingTai=" + escape(_txt_PingTai);
    datastr += "&_txt_Scoure=" + escape(_txt_Scoure);
    datastr += "&_txt_QuFu=" + escape(_txt_QuFu);
    datastr += "&_txt_Vip=" + escape(_txt_Vip);
    datastr += "&_txt_Jifen=" + escape(_txt_Jifen);
    datastr += "&_txt_YNumber=" + escape(_txt_YNumber);
    datastr += "&_txt_PNumber=" + escape(_txt_PNumber);
    datastr += "&_txt_MNumber=" + escape(_txt_MNumber);
    datastr += "&_txt_CGrade=" + escape(_txt_CGrade);
    datastr += "&_txt_King=" + escape(_txt_King);
    datastr += "&_txt_Paragraph=" + escape(_txt_Paragraph);
    datastr += "&_txt_XianHero=" + escape(_txt_XianHero);
    datastr += "&_txt_XingPi=" + escape(_txt_XingPi);
    datastr += "&_txt_SaiPi=" + escape(_txt_SaiPi);
    datastr += "&_txt_RongHero=" + escape(_txt_RongHero);
    datastr += "&_txt_XianPi=" + escape(_txt_XianPi);
    datastr += "&_txt_ShiPi=" + escape(_txt_ShiPi);
    datastr += "&_txt_ChuanPI=" + escape(_txt_ChuanPI);
    datastr += "&_txt_NeiPi=" + escape(_txt_NeiPi);
    datastr += "&nn=" + escape(nn);
    datastr += "&htmls=" + escape(htmls);
    datastr += "&price=" + escape(price);
    

   
    

    $('#nr').val(html);




    // var data = AjaxWeb("WebMessage", datastr);
    // switch (data) {
    //     case "-100":
    //         return false; break;
    //     case "-99":
    //         Tips("网络繁忙，请稍后再试！", 2); break;
    //     case "1":
    //         Tips("提交成功！请复制框内的数字字母给客服！", 1);
    //         break;
    //     case "-2":
    //         Tips("留言提交失败，请稍后再试！", 2); break;
    //     case "-3":
    //         Tips("验证码输入错误！", 2); break;
    //     default:
    //         Tips("未知错误，提交失败！", 2); break;
    // }
}
function WebMessage_en() {
    var _txt_UserName = $.trim($("#txt_UserName").val());
    var _txt_Email = $.trim($("#txt_Email").val());
    var _txt_MobilePhone = $.trim($("#txt_MobilePhone").val());
    var _txt_Conts = $.trim($("#txt_Conts").val());
    var _txt_Verify = $.trim($("#txt_Verify").val());
    if (_txt_Verify == "") {
        Tips("Please enter a verification code！", 2); return false;
    }

    var datastr = "_txt_UserName=" + escape(_txt_UserName) + "&_txt_Email=" + escape(_txt_Email);
    datastr += "&_txt_MobilePhone=" + escape(_txt_MobilePhone) + "&_txt_Conts=" + escape(_txt_Conts);
    datastr += "&_txt_Verify=" + escape(_txt_Verify);
    var data = AjaxWeb("WebMessage", datastr);
    switch (data) {
        case "-100":
            return false; break;
        case "-99":
            Tips("The network is busy. Please try again later！", 2); break;
        case "1":
            Tips("Submit successfully！", 2);
            break;
        case "-2":
            Tips("Message submission failed. Please try again later！", 2); break;
        case "-3":
            Tips("Validation code entry error！", 2); break;
        default:
            Tips("Unknown error, submission failed！", 2); break;
    }
}
//文章上一个下一个
function PrevNext(ColumnID, DataId, Lang) {
    var datastr = "cid=" + escape(ColumnID) + "&id=" + escape(DataId) + "&lang=" + escape(Lang);
    var data = AjaxWeb("PrevNext", datastr);
    switch (data) {
        case "-100":
            return false; break;
        case "-99":
            break;
        default:
            if (data != "") {
                return data;
            } else {
                return "";
            }
            break;
    }
    return "";
}

function LoadHits(cid, id) {
    var data = AjaxWeb("LoadHits", "cid=" + escape(cid) + "&id=" + escape(id));
    if (data.length > 0) {
        $("#hits").html(data);
    }
}

function LoadNewbyHits(cid,pid,size,lang) {
    var datastr = "cid=" + escape(cid) + "&pid=" + escape(pid) + "&size=" + escape(size) + "&lang=" + escape(lang);
    var data = AjaxWeb("LoadNewbyHits", datastr);
    switch (data) {
        case "-100":
            return false; break;
        case "-99":
            break;
        default:
            if (data != "") {
                return data;
            } else {
                return "";
            }
            break;
    }
    return "";
}

function LoadNewbyTime(cid, pid, size, lang) {
    var datastr = "cid=" + escape(cid) + "&pid=" + escape(pid) + "&size=" + escape(size) + "&lang=" + escape(lang);
    var data = AjaxWeb("LoadNewbyTime", datastr);
    switch (data) {
        case "-100":
            return false; break;
        case "-99":
            break;
        default:
            if (data != "") {
                return data;
            } else {
                return "";
            }
            break;
    }
    return "";
}


function GetTags(cid, id, size, lang) {
    var datastr = "cid=" + escape(cid) + "&id=" + escape(id) + "&size=" + escape(size) + "&lang=" + escape(lang);
    var data = AjaxWeb("LoadTag", datastr);
    switch (data) {
        case "-100":
            return false; break;
        case "-99":
            break;
        default:
            if (data != "") {
                return data;
            } else {
                return "";
            }
            break;
    }
    return "";
}
/*#endregion */







/**if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
	new WOW().init();
};	**/
var a = document.getElementsByTagName('a');
for (var i = 0; i < a.length; i++) {
    a[i].addEventListener('touchstart', function () { }, false);
}//a标签点击后

$(function () {


    $(".icon2").bind("mousedown touchstart", function (event) {
        event.stopPropagation();
        event.preventDefault();
        $(".nav").slideToggle()
    })
    $(".icon3").bind("mousedown touchstart", function (event) {
        event.stopPropagation();
        event.preventDefault();
        $(".ssbox").slideDown()
    })
    $(".ssbox span").bind("mousedown touchstart", function (event) {
        event.stopPropagation();
        event.preventDefault();
        $(".ssbox").slideUp()
    })


    $('.icon8').click(function () {
        $('body,html').stop().animate({
            'scrollTop': 0,
            'duration': 100,
            'easing': 'ease-in'
        })
    });

});
