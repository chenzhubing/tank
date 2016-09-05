<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
  </head>
  
  <body onkeydown="getKeyCommand()" onmousedown="getMouseCommand()">
     <canvas id="canvas" width="500" height="500" style="background-color:pink"> </canvas>
     
     <script src="<%=path %>/pages/verson1/constant.js" type="text/javascript" charset="utf-8"></script>
     <script src="<%=path %>/pages/verson1/node.js" type="text/javascript" charset="utf-8"></script>
     <script src="<%=path %>/pages/verson1/util.js" type="text/javascript" charset="utf-8"></script>
     <script src="<%=path %>/pages/verson1/search.js" type="text/javascript" charset="utf-8"></script>
     <script src="<%=path %>/pages/verson1/basicClass.js" type="text/javascript" charset="utf-8"></script>
     
     <script>
     
     
    var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
 	var myTank = new MyTank(50,100,1);
 	//子弹数组  
 	var bulletArr = [];
 	var image_mytank = new Image();
 	var image_mybullet = new Image();
 	image_mytank.src = "<%=path%>/images/myTankU.gif";
 	image_mybullet.src = "<%=path%>/images/tankmissile.gif";
 //	flashMap();
    //定时刷新地图	 
     function flashMap(){
    	 ctx.clearRect(0,0,500,500); //清空画布
    	 drawTank(myTank);
    	 drawBullet(bulletArr);
    	 drawObstacle();
     }
    //键盘监听
     function getKeyCommand(){
    	 var code=event.keyCode;
 		switch(code){
 			case 87:  //W
 			   break;
 			case 68:  //D
 			   break;
 			 case 83:  //S
 				break;
 			case 65:  //A
 				break;
 			case 32:    //space       只有在射击的时候才能产生子弹
 				myTank.shot();
 				break;
 		}
     }
    //鼠标监听
    function getMouseCommand(){
        var loc = getPointOnCanvas(canvas, event.pageX, event.pageY); 
        //向上取整
        var x = Math.ceil(loc.x/constant.UNIT);
        var y = Math.ceil(loc.y/constant.UNIT);
       //改变终点坐标
        constant.END_POINT = new Point(y,x);
       //起始坐标  坦克当前的位置
        constant.START_POINT = new Point(Math.ceil(myTank.y/constant.UNIT)+1,Math.ceil(myTank.x/constant.UNIT)+1);
       if(myTank.way.length != 0){
    	   myTank.nowfoot = 0;
       }
       //寻路
       myTank.way = search();
       myTank.runUnit();
    }
    //相对于canvas的坐标
    function getPointOnCanvas(canvas, x, y) {  
        var bbox = canvas.getBoundingClientRect();  
        return { x: x - bbox.left * (canvas.width  / bbox.width),  
                y: y - bbox.top  * (canvas.height / bbox.height)  
                };  
    }
    setInterval("flashMap()", 100); 
     </script>
  </body>
</html>
