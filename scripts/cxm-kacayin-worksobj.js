/**
 * 相册制作js
 *
 * @author Kj<kj.lin@cx-m.com>
 * @time 2016.09.20 15:13:00
 */

// 校园毕业照
// 与210x285/template_school.json的t_01一致。
if(!worksObj){
    var worksObj=[];
}
if(!root_src){
	var root_src=_siteurl+'images/photo_theme/';
}
/**
 * 保存时提取数据。
 *
 * @param Object worksObj   某个作品。里面可能包含了多页（即多个模板）
 * @param JQuery selector photoEditWrap 模板的Css选择器，$('.photoEditWrap')
 * @param integer page 如果不指定页码，那么自动增加一页。
 * @return Object
 */
function fetchWorksObj(worksObj, photoEditWrap, page){
    // 页码
    if(!page || 0>page){
        page=worksObj.length;
    }
    if(0>page){
        page=0;
    }
    
    if(!worksObj[page]){
        worksObj[page]=new Object();
    }

    var f=parseInt(photoEditWrap.attr('frameStyleNum'));
    if(isNaN(f) || 0>f){
        f=0;
    }
    worksObj[page].frameStyleNum=f;

    var tn=photoEditWrap.attr('templateNO');
    worksObj[page].templateNO=tn;

    var hasBg=photoEditWrap.attr('hasBg');
    worksObj[page].hasBg=hasBg;

    var bg_img=photoEditWrap.find('.template').attr('alt');
    bg_img==undefined?bg_img="":false;
    worksObj[page].bgImgSrc=bg_img;
    
    var f_img=photoEditWrap.find('.frameSetting').attr('alt');
    f_img==undefined?f_img="":false;
    worksObj[page].frameImgSrc=f_img;

    if(!worksObj[page].tphoto){
        worksObj[page].tphoto=new Object();
    }

    // 图片的索引号
    //var pn=Object.keys(worksObj[page].tphoto).length-1;
    //if(0>pn){
        var pn=0;
    //}
    worksObj[page].tphoto=new Object();

    photoEditWrap.find('.tphoto').each(function(){
        worksObj[page].tphoto[pn++]=fetchPhotoData($(this));
    });

    // 文本的索引号
    
    var tn=0;
    //if(worksObj[page].ttext){
        //tn=Object.keys(worksObj[page].ttext).length-1;
    //}
    //else {
        worksObj[page].ttext=new Object();
   // }
    
    if(0>tn){
        tn=0;
    }
    photoEditWrap.find('.ttext').each(function(){
        worksObj[page].ttext[tn++]=fetchFontData($(this));
    });
    
    photoEditWrap.attr('data-page', page);
    return worksObj;
}

/**
 * 渲染作品的某一页（某个模板）
 * 
 * @param object worksObj
 * @param integer page
 * @param integer isview 0 load 1 预览
 * @return void
 */
function renderWorks(worksObj, page, isview) {
    if(!worksObj[page]){
        return;
    }
    // 当前百分比
    var percent = 1;
    if("" == isview || null == isview || undefined == isview ) {
    	isview=false;
    }
    
    /*load*/
	var $photoEditWrap = $('.photoEditWrap');
    if(isview){
    	/*预览*/
    	$photoEditWrap = $('.photoViewFrame');
    }
    
    var tplData=worksObj[page],
    	templateSize = $('body').attr('templateSize'),
    	templateTheme= $('body').attr('templateTheme'),
    	totalPage = parseInt($photoEditWrap.attr('total-page')),
        photoEditWrap= $photoEditWrap;
    
    photoEditWrap.attr('data-page', page);
    photoEditWrap.attr('total-page', totalPage);
    
    if(tplData.templateNO){
    	photoEditWrap.attr('templateNO', tplData.templateNO);
    	if(isview){
        	/*预览*/
        }else{
        	/*load*/
        	$('.templateSetting').find('li').removeClass('Stand');
        	$('.templateSetting').find('img[name="'+tplData.templateNO+'"]').parent('li').addClass('Stand');
        }
    }
    
    // 判断相框数量
    if(tplData.frameStyleNum){
        photoEditWrap.attr('frameStyleNum', tplData.frameStyleNum);
    }
    if(isview){
    	/*预览*/
    }else{
    	/*load*/
    	if(tplData.frameStyleNum &&　0<tplData.frameStyleNum){
        	$('.settingMenu li').eq(2).removeClass('unClick');
        	// 添加模板对应的相框样式
        	var ulObj = "<ul class='frameStyle'>";
        	for(var i=0;i<tplData.frameStyleNum;i++){
        		var num = i+1;
        		num<10?num='0'+num:false;
        		ulObj += "<li><img alt='frame_"+num+".png' "
        		ulObj += "src='"+root_src;
        		ulObj += templateSize+"/"+templateTheme+"/"+tplData.templateNO+"_s/frame_"+num+".png' /></li>"
        	}
        	ulObj += "</ul>";
        	$('.frameStyleList').html('').append(ulObj);
        }else{
        	$('.settingMenu li').eq(2).addClass('unClick');
        }
	}
    
	// 判断是否可以设置背景
    if(tplData.hasBg){
    	photoEditWrap.attr('hasBg', tplData.hasBg);
    }
    if(isview){
    	/*预览*/
    }else{
    	/*load*/
    	if('true'==tplData.hasBg){
        	$('.settingMenu li').eq(1).removeClass('unClick');
        }else{
        	$('.settingMenu li').eq(1).addClass('unClick');
        }
	}

    if(''!=tplData.bgImgSrc){
    	if(isview){
        	/*预览*/
        	
        }else{
        	/*load*/
	        $('.bgSetting').find('li').removeClass('Stand');
			$('img[alt="'+tplData.bgImgSrc+'"]').parent('li').addClass('Stand');
		}
		var bgImgSrc_m = root_src+templateSize+'/background_m/'+tplData.bgImgSrc;
		photoEditWrap.find('.template').css('background-image','url('+bgImgSrc_m+')');
    }

    if(''!=tplData.frameImgSrc){
    	if(isview){
        	/*预览*/
        	
        }else{
        	/*load*/
        	$('.frameStyleList').find('li').removeClass('Stand');
			$('img[alt="'+tplData.frameImgSrc+'"]').parent('li').addClass('Stand');
		}
    	var frameImgSrc_m = root_src+templateSize+"/"+templateTheme+"/"+tplData.templateNO+"_m/"+tplData.frameImgSrc;
    	photoEditWrap.find('.frameSetting').css('background-image','url('+frameImgSrc_m+')');
    }
    
    var eh=photoEditWrap.find('.template');
    // tphoto
    if(tplData.tphoto){
    	loadtphotoData(tplData.tphoto,eh,percent,page,totalPage,isview);
    }
    
    // ttext
    if(tplData.ttext){
    	loadttextData(tplData.ttext,eh,percent,page,totalPage,isview);
    }
}

/**
 * 编辑图片
 *
 * @param object worksObj
 * @param JQuery Selector tphotoSelector
 * @return object
 */
function editWorksPicture(worksObj, tphotoSelector){
    var page=tphotoSelector.attr('data-page'),
        pn=tphotoSelector.attr('data-pn');
    if(!pn || !page){
        return false;
    }
    
    worksObj[page].tphoto[pn]=fetchPhotoData(tphotoSelector);
    return worksObj;
}
function editWorksPicture2(worksObj, tphotoSelector, img){
	var page = parseInt($photoEditWrap.attr('data-page'))
	var pn = parseInt(tphotoSelector.replace(/tphoto_/,''));
	worksObj[page]['tphoto'][pn]['photoSrc']=img;
    return worksObj;
}

/**
 * 编辑文字
 *
 * @param object worksObj
 * @param JQuery Selector ttextSelector
 * @return object
 */
function editWorksText(worksObj, ttextSelector){
    var page=ttextSelector.attr('data-page'),
        tn=ttextSelector.attr('data-tn');
    if(!tn || !page){
        return false;
    }
    
    worksObj[page].ttext[tn]=fetchFontData(ttextSelector);
    return worksObj;
}
function editWorksText2(worksObj, ttextSelector, ttext){
	var page = parseInt($photoEditWrap.attr('data-page'))
	var tn = parseInt(ttextSelector.replace(/ttext_/,''));
	worksObj[page]['ttext'][tn]['text']=removeHTMLTag(ttext);
	return worksObj;
}

/**
 * 提取图片的数据
 *
 * @param JQuery Selector selector
 * @return object
 */
function fetchPhotoData(selector){
    var photo_w=selector.width(),
        photo_h=selector.height(),
        photo_x=parseInt(selector.css('left').replace(/px$/, '')),
        photo_y=parseInt(selector.css('top').replace(/px$/, '')),
        photo_t=selector.css('transform'),
        photo_img=selector.find('img').attr('alt');
    // 还有什么就添加什么
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 应该进行必要的检测
    // 
    return {
        w:photo_w,
            // 相片的宽度
        h:photo_h,
            // 相片的高度
        x:photo_x,
            // 相片左上角端点距离相框左上角的X轴
        y:photo_y,
            // 相片左上角端点距离相框左上角的Y轴
        photoSrc:photo_img,
        transform:photo_t
    };
}

/**
 * 提取模板中某段文本的数据
 *
 * @param JQuery Selector selector
 * @return object
 */
function fetchFontData(selector){
    var ttext_w         = selector.width(),
        ttext_h         = selector.height(),
        ttext_x         = parseInt(selector.css('left').replace(/px$/, '')),
        ttext_y         = parseInt(selector.css('top').replace(/px$/, '')),
        ttext_lh        = parseInt(selector.css('line-height').replace(/px$/, '')),
        ttext_fw        = selector.css('font-weight'),
        ttext_fs        = parseInt(selector.css('font-size').replace(/px$/, '')),
        ttext_textAlign = selector.css('text-align'),
        ttext_color     = selector.css('color'),
        ttext_text      = removeHTMLTag(selector.find('.ttext_p').html());
    // 还有什么就添加什么
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 应该进行必要的检测
    //
    
    return {
        w:ttext_w,
        h:ttext_h,
        x:ttext_x,
        y:ttext_y,
        lh:ttext_lh,
        fw:ttext_fw,
        fs:ttext_fs,
        textAlign:ttext_textAlign,
        color:ttext_color,
        text:ttext_text,
    };
}

/**
 * 加载-tphoto
 *
 * @param JQuery Selector selector
 * @return object
 */
function loadtphotoData(tphotoData,eh,percent,page,totalPage,isview){
    if(tphotoData){
	    $.each(tphotoData, function(i,v){
	        // 添加一条tphoto的html
	        var style='';
	
	        var px_field={
	            w:'width',
	            h:'height',
	            x:'left',
	            y:'top',
	        };
	        for(j in px_field){
	            if(!isNaN(parseInt(v[j]))){
	                style+=px_field[j]+':'+v[j]*percent+'px;';
	            }
	        }
	        var px2_field={
	        	transform:'transform'
	        };
	        for(j in px2_field){
	            if(v[j]){
	                style+=px2_field[j]+':'+v[j]+";";
	            }
	        }
	        var html='<div class="tphoto t_obj" name="tphoto_'+i+'" style="'+style+'" data-pn="'+i+'" '
	               +'  data-page="'+page+'" total-page="'+totalPage+'">';
	        
	        if(v.photoSrc && ''!=v.photoSrc){
	        	// 设置用户图片
	        	var photoSrc_m = v.photoSrc,
				loadImage = new Image(),
				imgBoxName,
				isXimg;
	        	loadImage.src = photoSrc_m;
				// 找到盒子的尺寸
	        	var thisWidth,thisHeight;
	        	if(!isNaN(parseInt(v.w))){
	        		thisWidth=v.w;
	        	}
	        	if(!isNaN(parseInt(v.h))){
	        		thisHeight=v.h;
	        	}
				var tphotoBoxSize = thisWidth/thisHeight;
				// 引入图片的比例
				var iWidth = loadImage.width,
				iHeight = loadImage.height;
				loadImageSize = iWidth/iHeight;
				// 获得图片比例
				if(loadImageSize>1){
					// 横向图片
					if(tphotoBoxSize>2){
						imgBoxName = 'x_img xl';
					}else if(tphotoBoxSize>1.8){
						imgBoxName = 'x_img l';
					}else if(tphotoBoxSize>1.5){
						imgBoxName = 'x_img m';
					}else if(tphotoBoxSize>1){
						imgBoxName = 'x_img s';
					}else{
						imgBoxName = 'y_x_img';
					}
				}else{
					// 竖向图片
					var blSize = loadImageSize-tphotoBoxSize;
					if(blSize>0.11){
						imgBoxName = 'y_img l';
					}else{
						imgBoxName = 'y_img s';
					}
				}
				html+=
		            '<div class="'+imgBoxName+'">'
		                +'<img alt="'+photoSrc_m+'" src="'+photoSrc_m+'">'
		            +'</div>';
	        }
	
	        html+='</div>';
	        
	        eh.append(html);
	    });
    }
}

/**
 * 加载-ttext
 *
 * @param JQuery Selector selector
 * @return object
 */
function loadttextData(ttextData,eh,percent,page,totalPage,isview){
	if(ttextData){
		$.each(ttextData, function(i,v){
			// 添加一条ttext的html
			var style='';
			
			var px_field={
					w:'width',
					h:'height',
					x:'left',
					y:'top',
					lh:'line-height',
					fs:'font-size'
			};
			for(j in px_field){
				if(!isNaN(parseInt(v[j]))){
					style+=px_field[j]+':'+v[j]*percent+'px;';
				}
			}
			
			var txt_field={
					fw:'font-weight',
					textAlign:'text-align',
					color:'color'
			};
			for(j in txt_field){
				if(v[j]){
					style+=txt_field[j]+':'+v[j]+';';
				}
			}
			
			var text=removeHTMLTag(v.text);
			
			var html='<div class="ttext t_obj" name="ttext_'+i+'" style="'+style+'" data-tn="'+i+'" '
			+' data-page="'+page+'" total-page="'+totalPage+'">'
			+'<p class="ttext_p" contenteditable="false">'+text+'</p>';
			if(isview){
				/*预览*/
				
			}else{
				/*load*/
				html+='<div class="ttext_edit pa cWhite"><i class="icon-write"></i></div>'
					+'<div class="ttextBtnBox none">'
					+'<span><i class="icon-write mr5"></i>修改</span>'
					+'<span class="editCancelBtn"><i class="icon-cross mr5"></i>取消</span>'
					+'</div>';
			}
			
			html+='</div>';
			eh.append(html);
		});
	}
}
