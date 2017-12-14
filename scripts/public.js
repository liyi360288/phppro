	
// 背景样式
var $body = $('body');
var popUpBg='<div class="popUpBg w h t0 l0 none pf" style="z-index:1001;background-color:rgba(255,255,255,0.5);"></div>';
var popTipBg='<div class="popTipBg w h t0 l0 none pf" style="z-index:1002;background-color:rgba(255,255,255,0.5);"></div>';


/*
    弹出选择框
    popUpObj(html需要弹出框的类名，弹出框里面需要的元素需要在HTML编写好)
    popUpClose(此类名为关闭窗口按键，需要关闭的窗口的按键添加此类名)
*/
function popUp(popUpObj){
	var pObj = $('.'+popUpObj);
    var objMLW= Math.floor(pObj.outerWidth()/2);
    var objMLH= Math.floor(pObj.outerHeight()/2);
    pObj.show().css({'margin-top':-objMLH,'margin-left':-objMLW}).animate({'top':'50%'},500,function(){
        $(this).addClass('skewAnimate');
    });
    $body.append(popUpBg);
    $('.popUpBg').fadeIn(500);
    // 點擊關閉
    $('.popUpClose,.popUpBg').click(function(){
        pObj.stop(true,false).animate({'top':'150%'},500,function(){
            $(this).hide().removeClass('skewAnimate').css('top','-100%');
        });
        $('.popUpBg').stop(true,false).fadeOut(500,function(){
            $(this).remove();
        });
    });
};
// 弹出选择框 确认关闭
function popUpClose(obj){
    obj.find('.popUpClose').click()
};
/*
    文字提示框
    popTipTxt(需要彈出的文字(文字可加任何標籤))
    time(自動關閉時間)
    2016-6-24新增
    popUpCloseName(弹出框的类名)时间为0时，自动关闭popUp弹出框
*/
function popTip(popTipTxt,time,popUpCloseName){
	if(!time ||"" == time || null==time){time=6;}
    if($body.attr('name')!=='hasPopTip'){
        $body.attr('name','hasPopTip').append(popTipBg);
        $('.popTipBg').css('z-index',1002).fadeIn(500);
        var c=time;
        var t;

        var popTipBox='<div class="popTip t0 w400" style="z-index:1003;margin-left:-200px;background-color:white;';
        popTipBox+='box-shadow:0 0 5px rgba(0,0,0,0.5);position:fixed;left:50%;">';
        popTipBox+='<h3 class="hl40 bgGray c666 pl15 pr15"><i class="icon-cross fr cp mt10 popTipClose"></i>';
        popTipBox+='<i class="icon-message fs14 mr5"></i>信息提示</h3>';
        popTipBox+='<div style="padding:20px 5% 0">'+popTipTxt+'</div>';
        popTipBox+='<div class="tc pt20 pb20"><span class="normalBtn_red popTipClose cWhite hl40 cp">';
        popTipBox+='确定 (<span class="time"> '+c+' </span>)</span></div></div>';
        $body.append(popTipBox);
        var obj = $('.popTip');
        var objMLH= Math.floor(obj.outerHeight()/2);
        obj.css({'margin-top':-objMLH}).animate({'top':'50%'},500,function(){
            $(this).addClass('skewAnimate');
        });
        // 點擊關閉
        $('.popTipClose,.popTipBg').click(function(){
            // 同时popUp关闭
            obj.animate({'top':'150%'},500,function(){
                $(this).remove();
                $body.attr('name','');
                clearTimeout(t);
                // 动画完毕后popUp关闭
                popUpCloseName!==undefined?popUpClose(popUpCloseName):false;
            });
            $('.popTipBg').fadeOut(500,function(){
                $(this).remove();
            });
        });
        //定時關閉
        function ptime(){
            c=c-1;
            if(c==0){
                $('.popTipClose').click();
            }else{
                $('.time').html(c);
                t=setTimeout(ptime,1000);
            };
        };
        ptime();
    };

};


/*
放大查看
objClick 类名
isSwitch 是否有左右切换事件按钮
showimg 此参数直接放入图片链接进行放大显示
*/
var img_index = 0;
function zoomSee(objClick, isSwitch, showimg,event) {
	if(!isSwitch ||"" == isSwitch || null==isSwitch || undefined==isSwitch){isSwitch=0;} else {isSwitch=1;}
	var $this = $(objClick);
	var e = event || window.event || arguments.callee.caller.arguments[0];
	var thisobj = e.srcElement ? e.srcElement : e.target;
	img_index = thisobj ? $this.index($(thisobj).parent()) : $this.index();
	var img_parent_obj = $this.parent().find('span');
	// 图片长度
	var img_len = img_parent_obj.length;
	// 图片路径
	var img_url="";
	if(!showimg ||"" == showimg || null==showimg || undefined==showimg){
		img_url = img_parent_obj.eq(img_index).children('img').attr('data-url');
	} else {
		img_url=showimg;
	}
	var loadImage = new Image();
	loadImage.src = img_url;
	var imgDiv = "<div class='loadImgBg pf w h l0 t0' style='background-color:rgba(255,255,255,0.8);z-index:103'></div>";
	imgDiv += "<div class='loadImgDiv pf w150 h150' style='left:50%;top:50%;margin-left:-75px;margin-top:-75px;background-color:rgba(0,0,0,0.5);z-index:104'>";
	imgDiv += "<div class='loadImgTxt tc f14 cWhite' style='line-height:150px;'>LOADING...</div>";
	imgDiv += "<i class='loadImgClose icon-cross pa r0 cp tc none' style='height:80px;width:80px;background-color:rgba(255,255,255,0.6);line-height:80px;font-size:42px;'></i>";
	imgDiv += "<img class='loadImgDone' style='display:none;width:100%;height:100%;' src='"+img_url+"' /></div>";
	if(1==isSwitch){
		// 左右切换事件
		imgDiv += "<span class='ImgPrev icon-chevron-left pf l0 tc h200 w50 fs48 cp' style='line-height:200px;top:50%;margin-top:-100px;background-color:rgba(0,0,0,0.1);z-index:104;'></span>";
		imgDiv += "<span class='ImgNext icon-chevron-right pf r0 tc h200 w50 fs48 cp' style='line-height:200px;top:50%;margin-top:-100px;background-color:rgba(0,0,0,0.1);z-index:104;'></span>";
	}
	
	$('body').append(imgDiv);
	$('.loadImgClose,.loadImgBg').click(function(){
		$('.loadImgDiv,.loadImgBg,.ImgNext,.ImgPrev').fadeOut('fast',function(){
			$('.loadImgDiv,.loadImgBg,.ImgNext,.ImgPrev').remove();
		});
	});
	if(1==isSwitch){
		// 左右切换事件
		// 图片切换按键
		var ImgPrev = $('.ImgPrev');
		var ImgNext = $('.ImgNext');
		ImgPrev.click(function(){
			if(img_index>0){
				img_index--;
				ImgPrev.show();
				clickImgShow($(this));
			}else{
				popTip('<p class="fs16 tc l50 pb10">这是第一张图片！</p>',30);
			}
		});
		ImgNext.click(function(){
			if(img_index<img_len-1){
				img_index++;
				ImgNext.show();
				clickImgShow($(this));
			}else{
				popTip('<p class="fs16 tc l50 pb10">已经是最后一张图片了！</p>',30);
			}
		});
	}
	function clickImgShow(obj){
		obj.show();
		var img_url="";
		if(!showimg ||"" == showimg || null==showimg || undefined==showimg){
			img_url = img_parent_obj.eq(img_index).children('img').attr('data-url');
		} else {
			img_url=showimg;
		}
		
		$('.loadImgDone').attr('src',img_url);
		loadImage.src = img_url;
		loadImage.complete?LOADIMG():loadImage.onload = function(){LOADIMG()}
	}

	// 图片是否缓存
	loadImage.complete?LOADIMG():loadImage.onload = function(){LOADIMG()}
	function LOADIMG(){
		var iWidth = loadImage.width;
		var iHeight = loadImage.height;
		var winHeight = $(window).height();
		if(winHeight<iHeight){
			var ps = (winHeight/iHeight).toFixed(1)
			var iWidth = iWidth*ps - 100
			var iHeight = iHeight*ps - 100
		}
		$('.loadImgTxt').fadeOut('fast');
		$('.loadImgDiv').stop(true,false).animate({'marginLeft':-iWidth/2,'marginTop':-iHeight/2,'width':iWidth,'height':iHeight},500,function(){
			$('.loadImgDone').fadeIn('fast');
			$('.loadImgDiv').hover(function(){
				$('.loadImgClose').show();
			},function(){
				$('.loadImgClose').hide();
			});
		});
	}
}


// 模拟滚动条
(function(win,doc,$){
    function CusScollBar(options){
        this._init(options);
    }
    $.extend(CusScollBar.prototype,{
        _init:function(options){
            var self = this;
            self.options = {
                scrollDir : "y", //滚动的方向
                contSelector : "", //滚动内容选择器
                barSelector : "", //滚动条选择器
                sliderSelector : "", //滚动滑块选择器
                wheelStep : 10, //滚轮步长
            }
            // 合并两个参数self.options默认，options||{}新建参数
            $.extend(true,self.options,options||{});

            self._initDomEvent();

            return self;
        },
        /**
         * 初始化DOM引用
         * @mathod _initDomEvent
         * @return {CusScrollBar}
        */ 
        _initDomEvent : function(){
            var opts = this.options;
            // 滚动内容区对象
            this.$cont = $(opts.contSelector);
            // 滚动条滑块对象
            this.$slider = $(opts.sliderSelector);
            // 滚动对象
            this.$bar = opts.barSelector ? $(opts.barSelector) : self.$slider.parent();
            // 获取文档对象
            this.$doc = $(doc);
            // 触发拖动效果
            this._initSliderDragEvent()._bindContScroll()._bindMousewheel();
        },
        /**
         * 初始化滑块拖动功能
         * @return {{Object}[this]}
        */ 
        _initSliderDragEvent : function(){
            var self = this,
                slider = this.$slider,
                sliderEl = slider[0];
            if(sliderEl){
                var doc = this.$doc,
                    dragStarPagePosition,
                    dragStarScrollPosition,
                    dragContBarRate;
                // 滑块滚动改内容位置
                function mousemoveHandler(e){
                    e.preventDefault();
                    // console.log("mousemove");
                    if(dragStarPagePosition == null){
                        return;
                    }
                    self.scrollTo(dragStarScrollPosition + (e.pageY - dragStarPagePosition));
                }
                slider.on("mousedown",function(e){
                    e.preventDefault();
                    // 获取鼠标位置
                    dragStarPagePosition = e.pageY;
                    // 获取文档的滚动高度
                    dragStarScrollPosition = self.$cont[0].scrollTop;
                    dragContBarRate = self.getMaxScollPosition()/self.getMaxSliderPosition();
                    // mousemove后面的.scroll为.on,.off的命名空间
                    doc.on("mousemove.scroll",mousemoveHandler)
                    .on("mouseup.scroll",function(e){
                        doc.off(".scroll");
                    });
                });
            }
            return self;
        },
        // 监听内容的滚动，同步滑块位置
        _bindContScroll : function(){
            var self = this;
            // self.$cont.on("scroll",function(){
            self.$cont.on("scroll",function(){
                var sliderEl = self.$slider && self.$slider[0];
                if(sliderEl){
                    sliderEl.style.top = self.getSliderPosition() + "px";
                }
            });
            return self;
        },
        // 鼠标滚轮事件
        _bindMousewheel : function(){
            var self = this;
            // 滚轮事件默认mousewheel，火狐为DOMMouseScroll
            self.$cont.on("mousewheel DOMMouseScroll",
                function(e){
                    e.preventDefault();
                    // jQuery.Event.originalEvent指向原生事件
                    var oEv = e.originalEvent,
                        wheelRange = oEv.wheelDelta ? -oEv.wheelDelta/120 : (oEv.detail || 0)/3;
                    // 判断是否有wheelDelta这个属性
                    self.scrollTo(self.$cont[0].scrollTop + wheelRange * self.options.wheelStep);
                });
            return self;
        },
        // 计算滑块的当前位置
        getSliderPosition : function(){
            var self = this;
            var maxSliderPosition = self.getMaxSliderPosition();
            return Math.min(maxSliderPosition,maxSliderPosition * self.$cont[0].scrollTop/self.getMaxScollPosition());
        },
        // 内容可滚动高度
        getMaxScollPosition : function(){
            var self = this;
            // self.$cont.height()为可视区，self.$cont[0].scrollHeight为文旦第一个元素高度，取最大值
            return Math.max(self.$cont.height(),self.$cont[0].scrollHeight) - self.$cont.height();
        },
        // 滑块可移动距离
        getMaxSliderPosition : function(){
            var self = this;
            // 滚动条高度减去滑块高度
            return self.$bar.height() - self.$slider.height();
        },
        scrollTo : function(positionVal){
            var self = this;
            self.$cont.scrollTop(positionVal);
        }

    });
    win.CusScollBar = CusScollBar;
})(window,document,jQuery);


/*
    全选功能
    全选按键设置为#allChecked
    单选样式设置为.subCheckbox
*/
$('#allChecked').click(function(){
    if ($(this).prop("checked")) {
        $(".subCheckbox").each(function() {  
            $(this).prop("checked", true);  
        });  
    } else {
        $(".subCheckbox").each(function() {  
            $(this).prop("checked", false);  
        });  
    }
    checkedNum();
});

$('.subCheckbox').click(function(){
    checkedNum();
});

// 计算当前已选择数量
checkedNum();
function checkedNum(){
    var checkedLen = $('.subCheckbox:checked').length;
    $('.checkedNum').html(checkedLen);
}

function removeHTMLTag(str){
    return str.replace(/<[^>]+>/g,"");
}