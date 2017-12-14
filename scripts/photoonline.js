

	// 模板选择
	settingClick('.templateSetting li img','templateSetting');
	// 背景图片选择
	settingClick('.bgSetting li img','bgSetting');
	// 相框样式选择
	settingClick('.frameStyle li img','frameSetting');
	// 照片选择
	settingClick('.photoSetting li img','photoSetting');

	// 模板照片选择
	$photoEdit.delegate('.tphoto','dblclick',function(){
		
		$('.tphoto').removeClass('Stand');
		$('.templatePopBg').show();
		$(this).addClass('Stand');
		editImgName = $(this).attr('name');
		$settingMenuLi.eq(3).click();
		$('.photoSetting').addClass('photoSelect');

		var $this = $(this),
			thisWidth = $this.width(),
			thisHeight = $this.height();
		tphotoBoxSize = thisWidth/thisHeight;

	});
	$('.photoSetting').hover(function(){
	},function(){
		$('.tphoto').removeClass('Stand');
		$('.templatePopBg').hide();
		editImgName="";

		$(this).removeClass('photoSelect');
	});

	// 主题模板选择
	$('.settingBoxBtn').each(function(){
		$(this).attr('name')!=templateTheme?$(this).remove():$(this).addClass('Stand');
	});
	// 主题模板数量
	var templateNum = $body.attr('templateNum');
		t_li = '<ul class="templateSetting settingOption pt10">';
		for(var i=0;i<templateNum;i++){
			var num = i+1;
			num<10?num='0'+num:false;
			t_li += '<li><img name="t_'+num+'" ';
			t_li += 'src="'+root_src+templateSize+"/"+templateTheme+"_icon/"+num+'.png"/ ></li>';
		}
		t_li += "</ul>";
	$('.settingBox').eq(0).append(t_li);

	// 设置参数选择
	function settingClick(obj,stype){
		$body.delegate(obj,'click',function(){
			var $this = $(this);
			if(!$this.parent('li').hasClass('Stand')){
				switch(stype){
					case 'templateSetting':
						templateNO = $this.attr('name');

						// 添加模板
						var nowTemplate = eval('{'+templateTheme+'.'+templateNO+'}');
						templateADD(nowTemplate);
						$photoEditWrap.attr('templateNO',templateNO);

						//初始配置文件
						fetchWorksObj(worksObj, $photoEditWrap, $photoEditWrap.attr('data-page'));
						console.log(worksObj);

						// 找到对应参数
						var frameStyleNum = $photoEditWrap.attr('frameStyleNum'),
							hasBg = $photoEditWrap.attr('hasBg');
						// 判断相框数量
						if(frameStyleNum>0){
							$settingMenuLi.eq(2).removeClass('unClick');
							// 添加模板对应的相框样式
							ulObj = "<ul class='frameStyle'>";
							for(var i=0;i<frameStyleNum;i++){
								var num = i+1;
								num<10?num='0'+num:false;
								ulObj += "<li><img alt='frame_"+num+".png' "
								ulObj += "src='"+root_src;
								ulObj += templateSize+"/"+templateTheme+"/"+templateNO+"_s/frame_"+num+".png' /></li>"
							}
							ulObj += "</ul>";
							$('.frameStyleList').html('').append(ulObj);
						}else{
							$settingMenuLi.eq(2).addClass('unClick');
						}

						// 判断是否可以设置背景
						if(hasBg=='true'){
							$settingMenuLi.eq(1).removeClass('unClick');
						}else{
							$settingMenuLi.eq(1).addClass('unClick');
						}


						// 加上选中状态
						$this.parents('ul').find('li').removeClass('Stand');
						$this.parent('li').addClass('Stand');

						break;
					case 'bgSetting':
						// 背景图片地址
						var bgImgSrc = $this.attr('alt'),
							bgImgSrc_m = root_src+templateSize+"/background_m/"+bgImgSrc;
						$('.template').attr('alt',bgImgSrc).css('background-image','url('+bgImgSrc_m+')');

						$this.parents('ul').find('li').removeClass('Stand');
						$this.parent('li').addClass('Stand');
						// 设置保存配置文件
						fetchWorksObj(worksObj, $photoEditWrap, $photoEditWrap.attr('data-page'));
						
						break;
					case 'photoSetting':
						// 设置用户图片
						var photoSrc = $this.attr('alt'),
							loadImage = new Image(),
							imgBoxName,
							isXimg,
							photoSrc_m = root_src+"photo_m/"+photoSrc;
							// alert(photoSrc_m)
						loadImage.src = photoSrc_m;

						if(!editImgName==""){
							// 引入图片的比例
							loadImage.onload = function(){
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
									console.log(blSize)
									if(blSize>0.11){
										imgBoxName = 'y_img l';
									}else{
										imgBoxName = 'y_img s';
									}
								}
								$('div[name="'+editImgName+'"]').html('<div class="'+imgBoxName+'"><img alt="'+photoSrc+'" src="'+photoSrc_m+'"></div>');
								// 设置保存配置文件
								editWorksPicture(worksObj, $('div[name="'+editImgName+'"]'));
							}

						}
						break;
					case 'frameSetting':
						// 相框背景地址
						var $this = $(this),
							frameImgSrc = $this.attr('alt');
						if(!$this.parent('li').hasClass('Stand')){
							var frameImgSrc_m = root_src+templateSize+"/"+templateTheme+"/"+templateNO+"_m/"+frameImgSrc;
							$('.frameSetting').attr('alt',frameImgSrc).css('background-image','url('+frameImgSrc_m+')');
							$this.parents('ul').find('li').removeClass('Stand');
							$this.parent('li').addClass('Stand');

							// 设置保存配置文件
							fetchWorksObj(worksObj, $photoEditWrap, $photoEditWrap.attr('data-page'));
							
						}
						break;
					default:
						break;
				}
			}
		});

	}
	// 加载模板文件
	function templateADD(addTemplateName){
		var templateHTML = '<div class="template pr h w">';
			templateHTML += '<div class="frameSetting pa w h"></div>';
			templateHTML += '<div class="templatePopBg pa w h"></div></div>';
		$photoEdit.html('').append(templateHTML);

		var dataPage = $photoEditWrap.attr('data-page');
		dataPage==undefined?dataPage=0:false;

		// 当前百分比
		var percent = 1;

		$.each(addTemplateName[0],function(setting,value){
			switch(setting){
				case "frameStyleNum":
					$photoEditWrap.attr('frameStyleNum',value);
					break;
				case "hasBg":
					$photoEditWrap.attr('hasBg',value);
					break;
				case "tphoto":
					$.each(value,function(i){
						var tphoto = '<div class="tphoto t_obj" name="tphoto_'+i+'" data-pn="'+i+'" data-page="'+dataPage+'"></div>';
						$photoEdit.find('.template').append(tphoto);
						var $t_obj = $photoEdit.find('.tphoto.t_obj').eq(i);
						$.each(value[i],function(key,val){
							switch(key){
								case "w":
									$t_obj.width(val*percent+'px');
								case "h":
									$t_obj.height(val*percent+'px');
								case "x":
									$t_obj.css('left',val*percent+'px');
									break;
								case "y":
									$t_obj.css('top',val*percent+'px');
									break;
								case "transform":
									$t_obj.css('transform',val);
									break;
								default:
									break;
							}
						});
					});
					break;
				case "ttext":
					$.each(value,function(i){

						var ttext = '<div class="ttext t_obj" name="ttext_'+i+'" data-tn="'+i+'" data-page="'+dataPage+'">';
							ttext += '<p class="ttext_p" contenteditable="false"></p>';
							ttext += '<div class="ttext_edit pa cWhite">';
							ttext += '<i class="icon-write"></i></div>';
							ttext += '<div class="ttextBtnBox none">';
							// 操作按键
							ttext += '<span><i class="icon-write mr5"></i>修改</span>';
							ttext += '<span class="editCancelBtn"><i class="icon-cross mr5"></i>取消</span>';
							ttext += '</div>';
						$photoEdit.find('.template').append(ttext);
						var $t_obj = $photoEdit.find('.ttext.t_obj').eq(i);
						$.each(value[i],function(key,val){
							switch(key){
								case "w":
									$t_obj.width(val*percent+'px');
								case "h":
									$t_obj.height(val*percent+'px');
								case "x":
									$t_obj.css('left',val*percent+'px');
									break;
								case "y":
									$t_obj.css('top',val*percent+'px');
									break;
								case "lh":
									$t_obj.css('line-height',val*percent+'px');
									break;
								case "fs":
									$t_obj.css('font-size',val*percent+'px');
									break;
								case "fw":
									$t_obj.css('font-weight',val);
									break;
								case "color":
									$t_obj.css('color',val);
									break;
								case "textAlign":
									$t_obj.css('text-align',val);
									break;
								case "text":
									$t_obj.children('p').html(val);
									break;
								default:
									break;
							}
						});
					});
					break;
				default:
					break;
			}
		});
	}




	var	thisTemplateName = $body.attr('templatename'),
		$spanBtn = $('span[name="'+thisTemplateName+'"]'),
		$templateSetting = $('.templateSetting');


	// 浏览页面
	// photoViewSetting(1);
	function photoViewSetting(worksObj,s_num){

		if(Object.keys(worksObj[s_num]).length<=0){
			// 清空所有状态
			$photoEdit.html('');
			$('.frameStyleList').html('');
			$('.bgSetting').find('li').removeClass('Stand');
			$settingMenuLi.eq(2).addClass('unClick');
			$templateSetting.find('li').removeClass('Stand');
			$settingMenuLi.eq(1).addClass('unClick');
			$settingMenuLi.removeClass('Stand').eq(0).addClass('Stand');
			$settingBox.css('left',-200).eq(0).css('left',39);
			return false;
		}

		var templateHTML = '<div class="template pr h w">';
			templateHTML += '<div class="frameSetting pa w h"></div>';
			templateHTML += '<div class="templatePopBg pa w h"></div></div>';
		$photoEdit.html('').append(templateHTML);

		$.each(worksObj[s_num],function(setting,value){
			switch(setting){
				case "templateNO":
					// 加载模板状态
					templateNO = value;
					$templateSetting.find('li').removeClass('Stand');
					$templateSetting.find('img[name="'+value+'"]').parent('li').addClass('Stand');

					var nowTemplate = eval('{'+templateTheme+'.'+templateNO+'}');
					// 找到对应参数
					var frameStyleNum = worksObj[s_num].frameStyleNum,
						hasBg = worksObj[s_num].hasBg;
					// 判断相框数量
					if(frameStyleNum!=0){
						$settingMenuLi.eq(2).removeClass('unClick');
						// 添加模板对应的相框样式
						ulObj = "<ul class='frameStyle'>";
						for(var i=0;i<frameStyleNum;i++){
							var num = i+1;
							num<10?num='0'+num:false;
							ulObj += "<li><img alt='frame_"+num+".png' "
							ulObj += "src='"+root_src;
							ulObj += templateSize+"/"+templateTheme+"/"+templateNO+"_s/frame_"+num+".png' /></li>"
						}
						ulObj += "</ul>";
						$('.frameStyleList').html('').append(ulObj);
					}else{
						$settingMenuLi.eq(2).addClass('unClick');
					}
					// 判断是否可以设置背景
					if(hasBg=='true'){
						$settingMenuLi.eq(1).removeClass('unClick');
					}else{
						$settingMenuLi.eq(1).addClass('unClick');
					}

					break;
				case "bgImgSrc":
					$('.bgSetting').find('li').removeClass('Stand');
					$('img[alt="'+value+'"]').parent('li').addClass('Stand');
					var bgImgSrc_m = root_src+templateSize+'/background_m/'+value;
					$('.template').css('background-image','url('+bgImgSrc_m+')');
					break;
				case "frameImgSrc":
					$('.frameStyleList').find('li').removeClass('Stand');
					if(!value==""){
						$('img[alt="'+value+'"]').parent('li').addClass('Stand');
						var frameImgSrc_m = root_src+templateSize+"/"+templateTheme+"/"+templateNO+"_m/"+value;
						$('.frameSetting').css('background-image','url('+frameImgSrc_m+')');
					}
					break;
				case "tphoto":
					$.each(value,function(i){
						var tphoto = '<div class="tphoto t_obj" name="tphoto_'+i+'"></div>';
						$photoEdit.find('.template').append(tphoto);
						var $t_obj = $photoEdit.find('.tphoto.t_obj').eq(i);
						$.each(value[i],function(key,val){
							switch(key){
								case "w":
									$t_obj.width(val+'px');
								case "h":
									$t_obj.height(val+'px');
								case "x":
									$t_obj.css('left',val+'px');
									break;
								case "y":
									$t_obj.css('top',val+'px');
									break;
								case "transform":
									$t_obj.css('transform',val);
									break;
								case "photoSrc":
									if(val==undefined)return false;
									// 设置用户图片
									var photoSrc = val,
										loadImage = new Image(),
										imgBoxName,
										isXimg,
										photoSrc_m = root_src+"photo_m/"+photoSrc;;
									loadImage.src = photoSrc_m;
									// 找到盒子的尺寸
									var thisWidth = $t_obj.width(),
										thisHeight = $t_obj.height(),
										tphotoBoxSize = thisWidth/thisHeight;

									// 引入图片的比例
									loadImage.onload = function(){
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
											console.log(blSize)
											if(blSize>0.11){
												imgBoxName = 'y_img l';
											}else{
												imgBoxName = 'y_img s';
											}
										}
										$t_obj.html("").append('<div class="'+imgBoxName+'"><img src="'+photoSrc_m+'"></div>');
									}

								default:
									break;
							}
						});
					});
					break;
				case "ttext":
					$.each(value,function(i){

						var ttext = '<div class="ttext t_obj" name="ttext_'+i+'">';
							ttext += '<p class="ttext_p" contenteditable="false"></p>';
							ttext += '<div class="ttext_edit pa cWhite">';
							ttext += '<i class="icon-write"></i></div>';
							ttext += '<div class="ttextBtnBox none">';
							// 操作按键
							ttext += '<span><i class="icon-write mr5"></i>修改</span>';
							ttext += '<span class="editCancelBtn"><i class="icon-cross mr5"></i>取消</span>';
							ttext += '</div>';
						$photoEdit.find('.template').append(ttext);
						var $t_obj = $photoEdit.find('.ttext.t_obj').eq(i);
						$.each(value[i],function(key,val){
							switch(key){
								case "w":
									$t_obj.width(val+'px');
								case "h":
									$t_obj.height(val+'px');
								case "x":
									$t_obj.css('left',val+'px');
									break;
								case "y":
									$t_obj.css('top',val+'px');
									break;
								case "lh":
									$t_obj.css('line-height',val+'px');
									break;
								case "fs":
									$t_obj.css('font-size',val+'px');
									break;
								case "fw":
									$t_obj.css('font-weight',val);
									break;
								case "color":
									$t_obj.css('color',val);
									break;
								case "textAlign":
									$t_obj.css('text-align',val);
									break;
								case "text":
									$t_obj.children('p').html(val);
									break;
								default:
									break;
							}
						});
					});
					break;
				default:
					break;
			}
		});
	}



var $photoEditFrame = $('.photoEditFrame');
// 关闭编辑
function closeEdit(obj){
	var $ttext = obj.parents('.ttext'),
		$ttextInput = $ttext.find('p'),
		$ttextBtnBox = $ttext.find('.ttextBtnBox');
		$templatePopBg = obj.parents('.template').find('.templatePopBg'),
	$ttext.removeClass('Stand');
	$templatePopBg.hide();
	$ttextBtnBox.addClass('none');
	$ttextBtnBox.children('span:first').removeClass('editSureBtn');
	$ttextInput.attr('contenteditable',false);
}
// 文本框离开后判断是否一样
var this_html,
	edit_html,
	editTtextName;
// 激活输入框
$body.delegate('.ttext_p','focus',function(){
	this_html = $(this).html();
});
// 离开输入框
$body.delegate('.ttext_p','blur',function(){
	var $ttextBtnBox = $(this).parent().find('.ttextBtnBox');
	edit_html = $(this).html();
	if(edit_html==this_html){
		$ttextBtnBox.children('span:first').removeClass('editSureBtn');
	}else{
		$ttextBtnBox.children('span:first').addClass('editSureBtn');
	}
});

// 取消修改
$photoEditFrame.delegate('.editCancelBtn','click',function(){
	closeEdit($(this));
	$(this).parents('.ttext').find('p').html(this_html);
});

// 点击修改按键
$photoEditFrame.delegate('.ttext_edit','click',function(){
	var $this = $(this),
		$this_template = $this.parents('.template'),
		$templatePopBg = $this_template.find('.templatePopBg'),
		$this_ttext = $this.parents('.ttext'),
		$this_p = $this_ttext.find('p'),
		$ttextBtnBox = $this_ttext.find('.ttextBtnBox');
	editTtextName = $this_ttext.attr('name');

	$ttextBtnBox.removeClass('none');
	$this_ttext.addClass('Stand');
	ttext_html = $this_p.html();

	$this_p.attr('contenteditable',true);
	
	$templatePopBg.show();

	// 获取当前编辑框内容
	this_html = $this_p.html();
	
});

// 确认修改
$photoEditFrame.delegate('.editSureBtn','click',function(){
	this_html = edit_html;
	$(this).removeClass('editSureBtn');
	closeEdit($(this));
	
	// 设置保存配置文件
	editWorksText(worksObj, $('div[name="'+editTtextName+'"]'));
	
});

