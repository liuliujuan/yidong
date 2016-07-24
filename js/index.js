window.onload=function(){	
	 //banner透明度轮播
	var banner=$(".banner")[0];
	var bannerson=$(".banner-son");
	var bannerleft=$(".banner-left")[0];
	var bannerright=$(".banner-right")[0];
	var btnbox=$(".btnbox")[0];
	var xiaoyuan=$(".xiaoyuan");
	var num=0;
	function move(type){
		if(type=="r"){
		num++;
	   if(num==bannerson.length){
		num=0;
	}
	}else if(type=="l"){
		num--;
		if(num<0){
		num=bannerson.length-1;
		}
	} 
//自动轮播
	for(var i=0;i<bannerson.length;i++){
		bannerson[i].style.display="none";
		xiaoyuan[i].style.background="#bbc7d4";
		bannerson[i].style.opacity=0;
		bannerson[i].style.filter='alpha(opacity:0);'
	}
	    animate(bannerson[num],{opacity:1},400);
	    bannerson[num].style.filter='alpha(opacity:100)';
	    bannerson[num].style.display="block";
	    xiaoyuan[num].style.background="#cb1188";
	}
	t=setInterval(function(){
		move("r");
	},2000)
//选项卡
for(var i=0;i<xiaoyuan.length;i++){
	xiaoyuan[i].index=i;
	xiaoyuan[i].onmouseover=function(){
		for(var j=0;j<xiaoyuan.length;j++){
			xiaoyuan[j].style.background="#bbc7d4";
			bannerson[j].style.display="none";
		}
		xiaoyuan[this.index].style.background="#cb1188";
		bannerson[this.index].style.display="block";
		num=this.index;
	}
}

//鼠标划上效果
	banner.onmouseover=function(){
	bannerleft.style.display="block";
	bannerright.style.display="block";	
	clearInterval(t);
}
    banner.onmouseout=function(){
    bannerleft.style.display="none";
	bannerright.style.display="none";
	t=setInterval(function(){
		move("r");
},2000);
}

//鼠标点击左右按钮效果
bannerright.onclick=function(){
	move("r");
}

bannerleft.onclick=function(){
	
	move("l");
}




//充值交费
var bottom=$(".bottom")[0];
var abo=$('a',bottom);
var jine=$(".jine");
var yibai=$("#yibai");
for(var i=0;i<jine.length;i++){
	jine[i].index=i;
	jine[i].onmouseover=function(){
		jine[this.index].style.background="#e40077";
		abo[this.index].style.color='white';
	}
	jine[i].onmouseout=function(){
		jine[this.index].style.background="#fff";
		yibai.style.background="#e40077";
		if(this.index!=1){
			abo[this.index].style.color='#666';
		}
		
	}
	
}

//登录下拉
var yiji0=$(".yiji0")[0];
var ej=$(".ej")[0];
var dlym=$(".dlym")[0];
	yiji0.onmouseover=function(){
	ej.style.display="block";
	dlym.style.background="url(images/denglvh.gif) 0px 0px no-repeat #fff";
}
    yiji0.onmouseout=function(){
	ej.style.display="none";
	dlym.style.background="";
}

//导航
var nav=$(".nav")[0];
var dh2=$(".dh2");
var dh1=$(".dh1");
var erji=$(".erji");
for(var i=0;i<dh2.length;i++){
	dh2[i].index=i;
		hover(dh2[i],function(){
			dh1[this.index].style.background="#f3f3f3";
			dh1[this.index].style.color="#0085d0";
			erji[this.index].style.display="block";
		},function(){
			dh1[this.index].style.background="";
			dh1[this.index].style.color="";
			erji[this.index].style.display="none";
		});
}
//优惠

//在线客服
var gddw=$(".gddw")[0];
var kflogo=$(".kflogo");
for(var i=0;i<kflogo.length;i++){
	kflogo[i].index=i;
	hover(kflogo[i],function(){
		for(var j=0;j<kflogo.length;j++){
			kflogo[j].style.right=-30+'px';
		}
	animate(kflogo[this.index],{right:32});
	},function(){
		animate(kflogo[this.index],{right:-30});
	})
}


var jiaofei=$('.jiaofei')[0];
		jiaofei.onfocus=function(){
			if(this.value=="请输入手机号码"){
				this.value="";
			}
		}
		jiaofei.onblur=function(){
			if(this.value==""){
				this.value="请输入手机号码";
			}
		}

var sous=$('.sous')[0];
		sous.onfocus=function(){
			if(this.value=="包月流量包"){
				this.value="";
			}
		}
		sous.onblur=function(){
			if(this.value==""){
				this.value="包月流量包";
			}
		}



//
// (function($){
// 	var topcolumn=$(".colu",".top-column");
// // var columntop=$(".column-top");
// 	function moveDown(){
// 		$(".column-top").animate({left:"-275px"},function(){
// 			$(".topcolumn-main").first().insertAfter($(".topcolumn-main:last"));
// 			$(".column-top").css({left:"0"});	
// 		});	
			
// 	}
// 	var tto=setInterval(moveDown,2000);
// 	$(".colu",".top-column").mouseover(function(){
// 		clearInterval(tto);
// 	}).mouseout(function(){
// 		tto=setInterval(moveDown,2000);
// 	});
// 	$(".main-left",".colu").click(function(){
// 		moveDown();		
// 	})
// 	$(".main-right",".colu").click(function(){
// 		$(".topcolumn-main").last().insertBefore($(".topcolumn-main").first());
// 		$(".column-top").css({left:"-275px"});
// 		$(".column-top").animate({left:"0"},function(){
// 		});	
// 	});	
// })(jQuery)

}



