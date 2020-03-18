
//常用提示
function Tips(conts, type) {
    if (type == null || type == "") {
        layer.alert(conts, { title: '提示', shadeClose: true });
    }
    else {
        layer.alert(conts, { title: '提示', shadeClose: true, icon: type });
    }
}

//提示确定跳转，父页面跳转
function TipsLink(conts, url, type) {
    if (type == null || type == "") {
        layer.confirm(conts, {
            title: '提示', btn: ['确定'], shadeClose: true,
            end: function (index) { window.parent.location.href = url; }
        });
    }
    else {
        layer.confirm(conts, {
            title: '提示', btn: ['确定'], shadeClose: true, icon: type,
            end: function (index) { window.parent.location.href = url; }
        });
    }
}

//提示确定跳转，本页面跳转
function TipsGoto(conts, url, type) {
    if (type == null || type == "") {
        layer.confirm(conts, {
            title: '提示', btn: ['确定'], shadeClose: true,
            end: function (index) { window.location.href = url; }
        });
    }
    else {
        layer.confirm(conts, {
            title: '提示', btn: ['确定'], shadeClose: true, icon: type,
            end: function (index) { window.location.href = url; }
        });
    }
}

//提示确定刷新父页面
function TipsReload(conts, type) {
    if (type == null || type == "") {
        layer.confirm(conts, {
            title: '提示', btn: ['确定'], shadeClose: true,
            end: function (index) { window.parent.location.reload(); }
        });
    }
    else {
        layer.confirm(conts, {
            title: '提示', btn: ['确定'], shadeClose: true, icon: type,
            end: function (index) { window.parent.location.reload(); }
        });
    }
}

//提示确定刷新本页面
function TipsRefresh(conts, type) {
    if (type == null || type == "") {
        layer.confirm(conts, {
            title: '提示', btn: ['确定'], shadeClose: true,
            end: function (index) { window.location.reload(); }
        });
    }
    else {
        layer.confirm(conts, {
            title: '提示', btn: ['确定'], shadeClose: true, icon: type,
            end: function (index) { window.location.reload(); }
        });
    }
}

//提示确定关闭框架
function TipsClose(conts, type) {
    if (type == null || type == "") {
        layer.confirm(conts, {
            title: '提示', btn: ['确定'], shadeClose: true,
            end: function (index) { CloseFrame(); }
        });
    }
    else {
        layer.confirm(conts, {
            title: '提示', btn: ['确定'], shadeClose: true, icon: type,
            end: function (index) { CloseFrame(); }
        });
    }
}



//提示图片
function TipsImg(conts, imgurl) {
    var bodywidth = $(window).width() - 100;
    var bodyheight = $(window).height() - 100;

    var tipsconts = '<div style="overflow:hidden;margin:10px;text-align:center;"><img style="max-width:' + bodywidth + 'px;max-height:' + bodyheight + 'px;" src="' + imgurl + '" /></div>';
    if (conts == '')
        conts = '查看'
    layer.open({
        type: 1, title: conts, shadeClose: true, content: tipsconts, shade: 0.1, area: ['auto', 'auto']
    });
}

//提交确认提示
function TipsPostBack(objId, conts) {
    layer.confirm(conts, { icon: 3, title: '提示' }, function (index) {
        __doPostBack(objId, '');
        layer.close(index);
    });
    return false;
}

//确认执行方法
function TipsConfirm(conts, method) {
    layer.confirm(conts, { icon: 3, title: '提示' }, function (index) {
        method();
        layer.close(index);
    });
}

//表单小提示
function TipsForm(conts, objId, fangx) {
    if (fangx == null || fangx == "") {
        fangx = 2;
    }
    layer.tips(conts, '#' + objId, { tips: [fangx, '#007ee9'] });
    $("#" + objId).focus();
}

//关闭一个窗口
function CloseFrame() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}
