//2016.4.28 
//1.解决类名的兼容函数
//classname: 所要找的类名
//father: 通过父元素来找这个类名
function getClass(classname,father){//IE兼容函数
    father=father||document;
    // 判断浏览器
    if(father.getElementsByClassName){//条件为真时，代表就是FF和chrome
        return father.getElementsByClassName(classname);
    }else{//条件为假时，代表是IE浏览器
      var all=father.getElementsByTagName("*");//取出所有的标签名
      var newarr=[];//创建一个新数组用来存放找到的classname
      for (var i = 0; i < all.length; i++) {//遍历数组
      	  if(checkRep(all[i].className,classname)){//调用checkRep函数,用来实现判断
            newarr.push(all[i]);
      	  }
      };
      return newarr;
    }
  }
  function checkRep(str,classname){// 判断str与classname是否一样
    var arr=str.split(" ");//以空格做分隔符转换数组
    for(var i in arr){//遍历数组
    	if(arr[i]==classname){//判断元素与classname是否相同，相同时返回true(上面函数调用时使用)
    		return true;
    	}
    }
    return false;// 所有比较以后，没有找到返回false
  }



  //2016.5.3
  /*2.纯文本的兼容函数(获取与设置)*/
  //obj :对象
  //val:要设置的内容(纯文本)
  function getText(obj,val){
    if(val==undefined){//获取功能
      //第二个参数没有传，要获取
       if(obj.textContent){//FF/chrome
          return obj.textContent;
         }else{//IE
           return obj.innerText;}
      }else{//设置功能
        if(obj.textContent){
         obj.textContent=val;
       }else{
      obj.innerText=val;
    }
    }
  }  
  
 //3.获取样式的兼容函数
  //2016.5.5
  //obj：对象
  //attr:属性
  function getStyle(obj,attr){
    if(obj.currentStyle){//ie
      return parseInt(obj.currentStyle[attr]);//转换为数值型
    }else{//FF/chrome
      return parseInt(getComputedStyle(obj,null)[attr]);
    }
  }

//4.获取元素的兼容函数
//2016.5.5
/*$(".box")
$("#box")
$("li")
*/
//selector:表示选择器，与css一样
//father:父容器
//document有的对象 ".father"转换为document对象
function $(selector,father){
  //给父容器设置默认值
  father=father||document;
  //对selector做判断
  if(typeof selector=="string"){//是字符串
    selector=selector.replace(/^\s*|\s*$/g,"")//去除字符串左右的空格
    if(selector.charAt(0)=="."){//条件为真时，字符串为类名
      return getClass((selector.slice(1)),father);
    }else if(selector.charAt(0)=="#"){//是Id
      return father.getElementById(selector.slice(1));
    }else if(/^[a-zA-Z1-6]{1,6}$/.test(selector)){//标签名
      return father.getElementsByTagName(selector);
    }
  }else if(typeof selector=="function"){
    //是一个函数执行window.onload事件
    window.onload=function(){
      selector();//让函数运行
    }
  }

}

//2016.5.6
//5.获取子元素的兼容函数
function getChild(father,type){
  type=type||"a";
  var all=father.childNodes;
  var arr=[];
  for(var i=0;i<all.length;i++){
    if(type=="a"){
      //只获取元素子节点
      if(all[i].nodeType==1){
        arr.push(all[i]);
    }
    }else if(type=="b"){//获取元素子节点+文本子节点
        if(all[i].nodeType==1 || (all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="" 
          && all[i].nodeType==3)){
            arr.push(arr[i]);
        }
    }    
  }
  return arr;
}

//6.获得子节点的第一个
function getFirst(father,type){
 return getChild(father,type)[0];
}

//7.获得子节点的最后一个
function getLast(father,type){
  return getChild(father,type)[getChild(father).length-1];
}

//8.通过指定下标获得子节点中的一个
function getNum(father,type,num){
  return getChild(father,type)[num];
}

//2016.5.7
//9.获取上一个兄弟节点的兼容函数
//boj:是一个元素节点
function getUp(obj){
  var up=obj.previousSibling;//上一个
  if(up==null){
    return false;
  }
  while(up.nodeType==8 || (up.nodeType==3 && up.nodeValue.replace(/^\s*|\s*$/g,"")=="")){//条件满足时，接着再找()
    up=up.previousSibling;
    if(up==null){
      return false;
    }
  }
return up;
}

//10.获取下一个兄弟节点的兼容函数
function  getnext(obj){
  var next=obj.nextSibling;//下一个
  if(next==null){
    return false;
  }
  while(next.nodeType==8 || (next.nodeType==3 && next.nodeValue.replace(/^\s*|\s*$/g,"")==""))
  {
    next=next.nextSibling;
    if(next==null){
    return false;
  }
  }
  return next;
}

//11.插入到某个对象之后
function insertAfter(father,newNode,obj){
  var next=getNext(obj);
  if(next){
    father.insertBefore(newNode,next);
  }else{
    father.appendChild(next);
  }
}

//2016.5.9
//12.事件绑定的兼容函数
function addEvent(obj,event,fun){
  if(obj.addEventListener){
    return obj.addEventListener(event,fun,false);
  }else{
    return obj.attachEvent("on"+event,function(){
      fun.call(obj);
    })
  }
}

//13.删除绑定事件
function deleteEvent(obj,event,fun){
  if(obj.detachEvent){
    return obj.detachEvent("on"+event,fun);
  }else{
    return obj.removeEventListener(event,fun,false);
  }
}

//14.滚轮事件
function mouseWheel(obj,up,down){
  if(obj.attachEvent){
     obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
      }else if(obj.addEventListener){
obj.addEventListener("mousewheel",scrollFn,false);
//chrome,safari -webkit-
obj.addEventListener("DOMMouseScroll",scrollFn,false);
//firefox -moz-
}

function scrollFn(e){
  var ev=e||window.event;
  //阻止浏览器的默认行为
  if(ev.preventDefault){
    ev.preventDefault(); 
      }//阻止默认浏览器动作(W3C)
   else{
      ev.returnValue = false;
    }//IE中阻止函数器默认动作的

  var val=ev.detail||ev.wheelDelta;
  if(val==-3||val==120){
    if(up){
       up();
    }
  }else if(val==3|| val==-120){
   if(down){
      down();
    }
  }
}
}


//2016.5.10
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function(e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }