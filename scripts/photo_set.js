
	// 全局变量
	var templateTheme=$body.attr('templateTheme'),//模板主题
		templateNO="",//模板编号,
		templateSize = $body.attr('templateSize'),//模板尺寸
		root_src=_siteurl+'images/photo_theme/',//引入图片地址
		//以上数据变量需要修改，以下元素名称无需修改
		$templateSetting = $('.templateSetting'),
		$photoEdit = $('.photoEdit'),
		$body = $('body'),
		$photoEditWrap = $('.photoEditWrap'),
		editImgName='',//tphoto的当前名称
		tphotoBoxSize;//tphoto的外框尺寸

	// 初始化当前数据
	var $photoEditWrap = $('.photoEditWrap');
		worksObj=[],
		totalPage = parseInt($photoEditWrap.attr('total-page'));//当前页面总数
	// 添加当前数据长度
	for(var i =0;i<totalPage;i++){
		worksObj[i]=new Object();
	}

	// 左侧选项菜单
	var $settingMenuLi = $('.settingMenu li'),
		$settingBox = $('.settingBox');
	$settingMenuLi.click(function(){
		var $this = $(this),
			i = $this.index();
		if($this.hasClass('unClick') || $this.hasClass('Stand'))return false;
		$settingBox.stop(true,false).animate({'left':-200},300).eq(i).animate({'left':39},300);
		$settingMenuLi.removeClass('Stand').eq(i).addClass('Stand');
	}).eq(0).removeClass('unClick');


	// 添加、减少
	var $pTotaNum = $('.photoTotalNum'),
		minTotoNum = $photoEditWrap.attr('total-page'),//最小页面数量
		addPrice = parseInt($('.photoAddPrice').text());//添加页面价格

	$pTotaNum.html(totalPage);

	// 加页
	$('.addPhotoBtn').click(function(){
		var tp = parseInt($photoEditWrap.attr('total-page'))+1;//当前总页
		$photoEditWrap.attr('total-page',tp);
		$pTotaNum.html(tp);
		worksObj[tp-1]=new Object();//添加新的对象
		$('.nextPhotoBtn,.lessPhotoBtn').removeClass('unclick');

		//更改总价格
		var totalPrice = parseInt($('.photoTotalPrice').text());//总金额
		var apTipNum = 0;
		apTipNum++;
		var apTip = '<span style="right:0;top:-60px;color:#c00" ';
			apTip += 'class="apTip pa" name="'+apTipNum+'">'+'+'+addPrice.toFixed(2)+'</span>';
		$('.photoTotalPrice').append(apTip);
		$('.apTip[name="'+apTipNum+'"]').animate({'top':0,'opacity':0},100,function(){
			$('.photoTotalPrice').html((totalPrice+addPrice).toFixed(2));
		});

	});


	// 删除页面
	$('.lessPhotoBtn').click(function(){
		if(!$(this).hasClass('unclick')){
			var tp = parseInt($photoEditWrap.attr('total-page')-1),//当前总页
				np = parseInt($photoEditWrap.attr('data-page'));//当前页码
			$photoEditWrap.attr('total-page',tp);
			$pTotaNum.html(tp);

			if(tp==minTotoNum)$(this).addClass('unclick');

			if(tp==np)$('.prevPhotoBtn').click();

			if($('.photoNowNum').text()==$('.photoTotalNum').text())$('.nextPhotoBtn').addClass('unclick');

			var delObj=worksObj.splice(np,1);// 删除当前对象
			console.log(worksObj);

			photoViewSetting(worksObj,$photoEditWrap.attr('data-page'));

			//更改总价格
			var totalPrice = parseInt($('.photoTotalPrice').text());//总金额
			var lpTipNum = 0;
			lpTipNum++;
			var lpTip = '<span style="right:0;top:0;color:green" ';
				lpTip += 'class="lpTip pa" name="'+lpTipNum+'">'+'-'+addPrice.toFixed(2)+'</span>';
			$('.photoTotalPrice').append(lpTip);
			$('.lpTip[name="'+lpTipNum+'"]').animate({'top':60,'opacity':0},100,function(){
				$('.photoTotalPrice').html((totalPrice-addPrice).toFixed(2));
			});

		}
	});


	// 下一页
	$('.nextPhotoBtn').click(function(){
		if(!$(this).hasClass('unclick')){
			$('.prevPhotoBtn').removeClass('unclick');
			// 找到当前页面数量状态
			var tp = parseInt($photoEditWrap.attr('total-page')),
				np = parseInt($photoEditWrap.attr('data-page'));
			++np;
			if(tp==np+1)$(this).addClass('unclick');

			$photoEditWrap.attr('data-page',np);
			$('.photoNowNum').html(np+1);

			photoViewSetting(worksObj,$photoEditWrap.attr('data-page'));
			$settingMenuLi.eq(0).click();
		}
		console.log(worksObj);
	});

	// 上一页
	$('.prevPhotoBtn').click(function(){
		if(!$(this).hasClass('unclick')){
			$('.nextPhotoBtn').removeClass('unclick');
			// 找到当前页面数量状态
			var tp = parseInt($photoEditWrap.attr('total-page')),
				np = parseInt($photoEditWrap.attr('data-page'));
			--np;
			if(0==np)$(this).addClass('unclick');

			$photoEditWrap.attr('data-page',np);
			$('.photoNowNum').html(np+1);

			photoViewSetting(worksObj,$photoEditWrap.attr('data-page'));
			$settingMenuLi.eq(0).click();
		}
	});

	// 保存按键
	$('.photo_setting_save').click(function(){
		console.log(Object.keys(worksObj).length);
	});







/*----添加模拟滚动条----*/

	// 引入背景
	var bgLi='';
	for(var i=0;i<$body.attr('bgnum');i++){
		var num = i+1;
		num<10?num='0'+num:false;
		bgLi+='<li><img alt="'+num+'.png" ';
		bgLi+='src="'+root_src+templateSize+'/background_s/'+num+'.png" ></li>'
	}
	$('.bgSetting').append(bgLi);

	// 要更改的内容高度
	var wh = $(window).height()-150;
	// 找到要滚动内容的高度
	$('.scroll-cont').each(function(i){
		var cont_li = $(this).find('li'),
			cont_li_h = cont_li.height()+12,
			cont_li_len = Math.ceil(cont_li.length/2),
			cont_h = cont_li_len*cont_li_h,
			name = $(this).attr('name');
		if(cont_h>wh){
			$(this).height(wh);
			/**
			 * contSelector 滚动内容选择器 样式需要固定高度，超过隐藏
			 * barSelector 滚动条选择器
			 * sliderSelector 滚动滑块选择器
			 * wheelStep 滚轮步长，数字越大滚动范围越大
			**/
			new CusScollBar({
				contSelector : ".scroll-cont[name='"+name+"']", //滚动内容选择器
				barSelector : ".scroll-bar[name='"+name+"']", //滚动条选择器
				sliderSelector : ".scroll-slider[name='"+name+"']", //滚动滑块选择器
				wheelStep : 20, //滚轮步长
			});
		}else{
			$(this).next('.scroll-bar').hide();
		}
	});
