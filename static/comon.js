$(function(){
    var pie=$(".menu dl,.search_cen");
    pie.css({"behavior":"url(PIE/PIE.htc)"});
    $('input, textarea').placeholder();
    
    $(".btn2").click(function(){
        document.getElementById("nr").select();
        try{
            if(document.execCommand('copy', false, null)){
                //success info
                alert("复制成功！");
            } else{
                //fail info
                alert("请长按文本内容粘贴复制");
            }
        } catch(err){
            //fail info
            alert("请长按文本内容粘贴复制");
        }
    });
});