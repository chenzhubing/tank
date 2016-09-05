//坦克类   x,y:坐标   director：移动方向
function Tank(x,y,director) {
	this.x = x;
	this.y = y;
	this.director = director;
	this.isLive = true; 
	this.speed = 5;   //坦克的移动速度，这里暂时写死
	
	//坦克能移动
	/**
	this.moveUp = function() {
		this.y -=this.speed;
		this.director = 1;
	}
	this.moveDown = function() {
		this.y += this.speed;
		this.director = 2;
	}
	this.moveLeft = function() {
		this.x -= this.speed;
		this.director = 3;
	}
	this.moveRight = function() {
		this.x += this.speed;
		this.director = 4;
	}**/
	
	
	
	
}
//子弹类  x,y:坐标   director：移动方向    type:0.敌方坦克，1.我方坦克    tank：属于哪个坦克
function Bullet(x,y,director,type,tank) {
	this.x = x;
	this.y = y;
	this.director = director;
	this.tank = tank;
	this.isLive = true;
	this.timer = 0;             //用来表示子弹的消亡
	this.speed = 1;
	//子弹可以移动
	this.run = function() {
		//子弹不能移动：1.坐标是否越界    2.碰到敌方坦克  
		if(this.x<=0 || this.x>=500 || this.y<=0 || this.y>=500 || this.isLive==false){              //这里数值暂时写死  ，后面用变量表示
			//清除该子弹
			clearInterval(this.timer);
			isLive = false;
			
		}else{
			switch (this.director) {             //这里的方向要和坦克的移动方向或者转动方向保持一致
			case 1:                //up
				this.y -= this.speed;
				break;
			case 2:                //down
				this.y += this.speed;
				break;
			case 3:                //left
				this.x -= this.speed;
				break;
			case 4:                //right
				this.x += this.speed;
				break;				
			default:
				break;
			}
			
		}
	}
}

// 我方坦克类MyTank  继承Tank
function MyTank(x,y,director) {
	this.tank = Tank;
	this.tank(x,y,director);    //继承Tank
	this.timer = 0;
	this.nowfoot = 0;
	this.way = [];
	//射击函数
	this.shot = function() {
		switch (this.director) {
		case 1:                                                          //up
			bullet = new Bullet(this.x+10,this.y-10,this.director,1,this);
			break;
		case 2:             											 //down
			bullet = new Bullet(this.x+10,this.y+50,this.director,1,this);
			break;
		case 3:															 //left
			bullet = new Bullet(this.x-10,this.y+10,this.director,1,this);
			break;
	    case 4:															 //right
			bullet = new Bullet(this.x+50,this.y+10,this.director,1,this);
			break;
		default:
			break;
		}
		
		//将所有子弹放入数组
		bulletArr.push(bullet);
		//每隔一段时间调用bullet.run()  显示移动效果
		var timer = setInterval("bulletArr["+(bulletArr.length-1)+"].run()", 50);
		bulletArr[bulletArr.length-1].timer = timer;
	}
	this.run = function() {
//		alert(this.x+"坦克当前位置"+this.y+"----"+x+":"+y);
		if(this.way.length == 0){
			return;
		}
		var x = (this.way[this.nowfoot+1].point.y-1)*constant.UNIT;
		var y = (this.way[this.nowfoot+1].point.x-1)*constant.UNIT;
		this.director = util.director(this.way[this.nowfoot],this.way[this.nowfoot+1]);
		//坦克移动到指定位置停止
	//	alert(this.x+":"+x+":"+this.y+":"+y+"----"+this.way.length+":"+this.nowfoot);
		if(this.x==x && this.y==y ){ 
			clearInterval(this.timer);
			if (this.way.length-2 != this.nowfoot) {
				this.runUnit();
				this.nowfoot ++;
			}else{
				this.nowfoot = 0;
				this.way = [];
			}
			
		}else{
			switch (this.director) {             
			case 1:                //up
				this.y -= this.speed;
				break;
			case 2:                //down
				this.y += this.speed;
				break;
			case 3:                //left
				this.x -= this.speed;
				break;
			case 4:                //right
				this.x += this.speed;
				break;				
			default:
				break;
			}
			
		}
		
	}
	
	this.runUnit = function() {
		var timer = setInterval("myTank.run()", 50);
    	this.timer = timer;
	}
	
}


//敌方坦克类EnemyTank   继承Tank
function EnemyTank(){
	this.tank = Tank;
	this.tank(x,y,director);    //继承Tank
}

//draw  坦克
 function drawTank(tank) {
	if(image_mytank.complete){
		var dx = tank.x+constant.UNIT/2;
		var dy = tank.y+constant.UNIT/2;
	    ctx.save();
	    ctx.translate(dx,dy);
	    switch (tank.director) {
		case 1:
			ctx.rotate(0 * Math.PI / 180);//旋转0度
			break;
		case 2:
			ctx.rotate(180 * Math.PI / 180);//旋转180度
			break;
		case 3:
			ctx.rotate(-90 * Math.PI / 180);//旋转-90度
			break;
		case 4:
			ctx.rotate(90 * Math.PI / 180);//旋转90度
			break;
		default:
			break;
		}
	     ctx.translate(-dx,-dy);
	     ctx.drawImage(image_mytank,tank.x,tank.y,50,50);
	     ctx.restore();
		
		
	
	}
}
//draw  子弹
 function drawBullet(bulletArr) {
	
	 if(!(bulletArr instanceof Array) || bulletArr.length == 0){
		 return;
	 }
	 for(var i=0;i<bulletArr.length;i++){
		 if(image_mybullet.complete){
				ctx.drawImage(image_mybullet,bulletArr[i].x,bulletArr[i].y,25,25);
			
			}
		
	 }
	 
}
//draw 障碍物
 function drawObstacle() {
		ctx.fillStyle = "green";
		ctx.fillRect(constant.UNIT * 4, constant.UNIT * 1, constant.UNIT * 1, constant.UNIT * 6);
		ctx.fillRect(constant.UNIT * 2, constant.UNIT * 2, constant.UNIT * 1, constant.UNIT * 1);
		ctx.fillRect(constant.UNIT * 4, constant.UNIT * 2, constant.UNIT * 4, constant.UNIT * 1);
		ctx.fillRect(constant.UNIT * 4, constant.UNIT * 4, constant.UNIT * 1, constant.UNIT * 3);
		ctx.fillRect(constant.UNIT * 1, constant.UNIT * 3, constant.UNIT * 1, constant.UNIT * 4);
		ctx.fillRect(constant.UNIT * 0, constant.UNIT * 3, constant.UNIT * 2, constant.UNIT * 1);
}





