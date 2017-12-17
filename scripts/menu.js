
// 缩小菜单
var $menu = $('.menu'),
    isMax = true;
$('.menutoggle').click(function(){
    var $contentFrame = $('.contentFrame');
    if(!$menu.hasClass('mMini')){
        $menu.addClass('mMini');
        $contentFrame.css('margin-left','50px');
        $('.sMenu').attr('style','');
        isMax = false;
    }else{
        $menu.removeClass('mMini');
        $contentFrame.css('margin-left','210px');
        isMax = true;
    }
});
// 正常菜单点击
$('.menuBtn').click(function(){
    if(isMax){
        var $this = $(this),
            thisParents = $this.parents('dl'),
            thisUl = $(this).next('ul'),
            thisLi = thisUl.children('li'),
            liLen = thisLi.length;
        if(!$this.hasClass('Active')){
            var i = thisParents.find('.Active').parent('dd').index();
            thisParents.find('.Active').parent('dd').children('.menuBtn').removeClass('Active').next('ul').animate({'height':0},200,function(){
                $(this).hide();
            });
            $this.addClass('Active');
            thisUl.show().animate({'height':liLen*35},200);
        }else{
            $this.removeClass('Active');
            thisUl.animate({'height':0},200,function(){
                $(this).hide();
            });
        }
    }
});
var $menu_dd = $menu.children('dl').find('dd'),
    pagename = $('body').attr('pagename'),
    subpagenum = $('body').attr('subpagenum');
switch(pagename){
    case 'index':
        menuBtnStand(0);
        break;
    case 'settings':
        menuBtnStand(1);
        break;
    case 'product':
        menuBtnStand(2);
        break;
    case 'works':
        menuBtnStand(3);
        break;
    case 'user':
        menuBtnStand(4);
        break;
    case 'order':
        menuBtnStand(5);
        break;
    case 'message':
        menuBtnStand(6);
        break;
}

function menuBtnStand(index){
    var obj = $menu_dd.eq(index),
        obj_ul = obj.find('ul'),
        obj_li = obj.find('li');
        menu_dd_len = obj_li.length;
    obj.find('.menuBtn').addClass('Stand Active');
    obj_ul.show().css('height',menu_dd_len*35);
    obj_li.eq(subpagenum).children('a').addClass('Stand');

}


// 弹窗
$('.js_close_btn').bind('click', function() {
    $(this).parents('.dialog_wrap').hide();
})


