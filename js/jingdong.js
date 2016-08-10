window.onload=function(){

// banner轮播
	var bannerBox=getClass('banner_new')[0];
	var imgs=getClass('img_box',bannerBox)[0].getElementsByTagName('a');
	var imgNum=getClass('img_num',bannerBox)[0].getElementsByTagName('p');
	var btnLeft=getClass('btn_left',bannerBox)[0];
	var btnRight=getClass('btn_right',bannerBox)[0];
	var num=0;
	//自动轮播
	var t=setInterval(bannermove,3000);
	function bannermove(){
		num++;
		if (num>imgs.length-1) {
			num=0;
		}
		for(var i=0; i<imgs.length; i++){
			imgs[i].style.opacity=0;
			imgNum[i].className="";
		}
		animate(imgs[num],{opacity:1},400);
		// imgs[num].style.opacity=1;
		imgNum[num].className="img_num_style";
	}
	//鼠标移动到轮播块停止轮播。离开后继续
	bannerBox.onmouseover=function(){
		clearInterval(t);
	}
	bannerBox.onmouseout=function(){
		t=setInterval(bannermove,3000);  //注意要保证t是全局变量，始终要保证一个时间间隔进程
	}
	//点击小点点跳转到其对应的图片
	for(var i=0; i<imgNum.length; i++){
		imgNum[i].index=i;  //把下标保存在index属性中
		imgNum[i].onclick=function(){
			for(var i=0; i<imgNum.length; i++){
				imgNum[i].className="";
				imgs[i].style.opacity=0;  //注意轮播用的层级，这儿也要用层级
			}
			imgNum[this.index].className="img_num_style";
			animate(imgs[this.index],{opacity:1},400);
			// imgs[this.index].style.opacity=1;
			num=this.index;
		}
	}
	//点击左右按钮切换图片
	btnRight.onclick=function(){
		bannermove();
	}
	btnLeft.onclick=function(){
		num--;
		if (num<0) {
			num=imgs.length-1;
		}
		for(var i=0; i<imgs.length; i++){
			imgs[i].style.opacity=0;
			imgNum[i].className="";
		}
		animate(imgs[num],{opacity:1},400);
		// imgs[num].style.opacity=1;
		imgNum[num].className="img_num_style";
	}


//slider轮播
for(var i=0; i<getClass('slider').length; i++){
    var sliderBox=getClass('slider')[i];  //获取大盒子
	// console.log(sliderBox);
	var imgBox=getClass('slider_img_box',sliderBox)[0];  //获取图片盒子
	// console.log(imgBox);
	var images=imgBox.getElementsByTagName('li');   //获取图片集合
	// console.log(images);
	var imgW=parseInt(getStyle(images[0],'width'));  //获取图片宽度,注意转为整形
	// alert(imgW);
	var imageNum=getClass('slider-num',sliderBox)[0].getElementsByTagName('p');  //获取图片号码
	// console.log(imageNum);
	imgBox.style.width=imgW*images.length+'px';  //修改图片盒子宽度
	// alert(imgBox.style.width);
	var btnL=getClass('left',sliderBox)[0];
	// console.log(btnL);
	var btnR=getClass('right',sliderBox)[0];
	// console.log(btnR);
	slider(sliderBox,imgBox,images,imgW,imageNum,btnL,btnR);
}
function slider(sliderBox,imgBox,images,imgW,imageNum,btnL,btnR){
	//自动轮播
	var index=0;
	var r=setInterval(move,2000);
	function move(){
		index++;
		if (index>images.length-1) {
			index=0;
		}
		animate(imgBox,{left:-index*imgW},200);
		for(var i=0; i<imageNum.length; i++){
				imageNum[i].className="";
			}
		imageNum[index].className="slider-num-style";
	}
	//鼠标移上去停止
	sliderBox.onmouseover=function(){
		clearInterval(r);
	}
	sliderBox.onmouseout=function(){
		r=setInterval(move,2000);
	}
	//选项卡模式
	for(var i=0; i<imageNum.length; i++){
		imageNum[i].index=i;
		imageNum[i].onclick=function(){
			for(var i=0; i<imageNum.length; i++){
				imageNum[i].className="";
			}
			imageNum[this.index].className="slider-num-style";
			animate(imgBox,{left:-this.index*imgW},200)
			index=this.index;
		}
	}
	//左右按钮切换
	btnR.onclick=function(){
		move();
	}
	btnL.onclick=function(){
		index--;
		if (index<0) {
			index=images.length-1;
		}
		animate(imgBox,{left:-index*imgW},200);
		for(var i=0; i<imageNum.length; i++){
				imageNum[i].className="";
			}
		imageNum[index].className="slider-num-style";
	}
}


//今日推荐
    var todayImgBox=getClass('today_img_box')[0];
    var todayImgs=todayImgBox.getElementsByTagName('li');  //获取轮播块
    var todayImgW=parseInt(getStyle(todayImgs[0],'width'));  //获取每个轮播块的宽度
    todayImgBox.style.width=todayImgW*todayImgs.length   //装所有轮播块的盒子的高度=每个轮播块的宽度*轮播块个数
    var todayBtnL=getClass('btn',getClass('todays-right')[0])[0].getElementsByTagName('a')[0];
    var todayBtnR=getClass('btn',getClass('todays-right')[0])[0].getElementsByTagName('a')[1];
    var n=0;
    todayBtnR.onclick=function(){
    	n++;
    	if (n>todayImgs.length-1) {
    		n=0;
    	}
    	animate(todayImgBox,{left:-n*todayImgW},300);
    }
    todayBtnL.onclick=function(){
    	n--;
    	if (n<0) {
    		n=todayImgs.length-1;
    	}
    	animate(todayImgBox,{left:-n*todayImgW},300);
    }


//搜索输入框
	var shuru=getClass('shuru',getClass('serch-top')[0])[0];
	// console.log(shuru);
	var oldval=shuru.value;
	shuru.onfocus=function(){  //表单事件，光标落在文本框时
		if (this.value==oldval) {  //如果输入框中没有输入文字，也就是说还是默认文本，光标落上去时清空默认值
			this.value=""
		}
	}
	shuru.onblur=function(){  //光标失去焦点时
		if (this.value=="") {  //失去光标是，如果输入框中没有输入文本，则应该显示默认的文本
			this.value=oldval;
		}
	}


//京东品质生活鼠标移上去图片向左动
    var imgMove=getClass('xfx')[0].getElementsByTagName('img')[0];
    // console.log(imgMove);
    imgmove(imgMove,imgMove,0,10);
    function imgmove(objMouse,objMove,newmargin,oldmargin){
		objMouse.onmouseover=function(){
		    animate(objMove,{marginLeft:newmargin},200)
		}
		objMouse.onmouseout=function(){
		    animate(objMove,{marginLeft:oldmargin},200)
		}
    }


//天天低价鼠标移上去图片向左动
    for(var i=0; i<getClass('img_move',getClass('ttdj-c')[0]).length; i++){  //遍历出所有的父元素
		var imgsMouse=getClass('img_move',getClass('ttdj-c')[0])[i];
		// console.log(imgsMouse);
		var imgsMove=imgsMouse.getElementsByTagName('a')[0];   //获取每一个父元素下面的图片盒子
		// console.log(imgsMove);
		imgmove(imgsMouse,imgsMove,-10,0);
    }
    


//侧边竖条
    for(var i=0; i<getClass('box').length; i++){   //把所有的元素遍历出来
		var boxs=getClass('box')[i];
		var boxU=getClass('box_up')[i];
		var boxD=getClass('box_down')[i];
		show(boxs,boxU,boxD);
	}
	function show(boxs,boxU,boxD){
		boxs.onmouseover=function(){
		    animate(boxD,{left:-58},200);
		    boxU.style.backgroundColor="#c81623";
		    boxD.style.backgroundColor="#c81623";
		}
		boxs.onmouseout=function(){
		    animate(boxD,{left:0},800,Tween.Bounce.easeOut);
		    boxU.style.backgroundColor="#7a6e6e";
		    boxD.style.backgroundColor="#7a6e6e";
		}
	}


// 选项卡
	for(var i=0; i<getClass('tab_title').length; i++){
		var titles=getClass('tab_title')[i].getElementsByTagName('a');
		var tabs=getClass('tab_content',getClass('tab_box')[i]);
		// console.log(tabTitles);
		// console.log(tabs);
		// alert(tabTitles.length);
		// alert(tabs.length);
		tab(titles,tabs,"tab_style");
	}

}