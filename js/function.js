// 解决获取元素时的兼容性

// 1、getElementsByClassName兼容性解决
function getClass(classname,obj){
	var obj=obj||document;
	if(document.getElementsByClassName!=undefined){  //如果浏览器支持getElementsByClassName这个属性，执行这个条件
		return obj.getElementsByClassName(classname);
	}else{
		var allTag=obj.getElementsByTagName('*');  //先找到对象下面的所有标签
		var arr=[];
		for(var i=0; i<allTag.length; i++){
			if(compare(allTag[i].className,classname)){  //如果标签的标签名和需要的标签名一样，则这个标签就是要找的标签
				arr.push(allTag[i]);
			}
		}
		return arr;
	}
}
function compare(allclassname,needclassname){   //解决多类名时想要获取其中某个类名的时候部分浏览器不兼容，获取不到
	var arr=allclassname.split(" ");  //把类名分割成数组
	for(var i=0; i<arr.length; i++){
		if (arr[i]==needclassname) {  //如果分割后的类名有和需要的类名相同，就返回真
			return true;
		}
	}
	return false;
}

//2、解决操作内容时innerText和textContent兼容性问题
function text(obj,val){  //两个参数，对象和设置文本参数
	if (val==undefined) {    //只有一个obj参数时，就是要获取，val形参没有传入实参，自动复制undefined  
		                     //就是函数重载的思想：根据实际参数的类型和数量的不同来分别实现不同的功能
		if(obj.textContent==undefined){   //若果不支持textContent这个属性，即支持innerText这个属性，就执行这一步
		    // alert(1);
		    return obj.innerText;
	    }else if(obj.textContent){  //如果支持textContent这个属性
		    // alert(2);
		    return obj.textContent;
	    }
	}
	else{    //设置文本内容
		if(obj.textContent==undefineds){
			// alert(1);
			obj.innerText=val;
	    }else if(obj.textContent){
		    // alert(2);
		    obj.textContent=val;
	   }
	}
}

//3、获取行内样式和外部样式的通用方法兼容性解决
function getStyle(obj,attr){
	if (obj.currentStyle) {   //IE支持
		// alert(1);
		return obj.currentStyle[attr];   //因为attr是一个变量，不是属性，所有加上中括号，attr就代表属性的名字，如obj.currentStyle["width"]
	}else {   //FF  chrome支持
		// alert(2);
		return getComputedStyle(obj,null)[attr];
	}
}

//4、轮播函数


// 5、选项卡函数
function tab(titles,tabs,titlestyle){
	for(var i=0; i<titles.length; i++){
		titles[i].index=i;
		titles[i].onmouseover=function(){
			for(var j=0; j<titles.length; j++){
				tabs[j].style.display="none";
				titles[j].className="";
			}
			tabs[this.index].style.display="block";
			titles[this.index].className=titlestyle;
		}
	}
}