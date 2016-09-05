//定义节点  1.point：坐标信息  2.parentNode：父节点  3.g:距离起点距离    4.h:距离终点距离（曼哈顿估值）    
	function Node(point,parentNode,g,h){
		if(!(point instanceof Point)  || isNaN(g) || isNaN(h)){
			throw new Error("非法参数"); 
		}
		this.point = point;
		this.g = g;
		this.h = h;
		this.f = g+h;
		this.parentNode = parentNode;
		this.equals = function(obj){
			if(!(obj instanceof Node)){
				return false;
			}
			return this.point.equals(obj.point);
		}
		
		
	}
	//记录坐标信息
	function Point(x,y){
		if(isNaN(x) || isNaN(y)){
			throw new Error("非法参数"); 
		}
		this.x = x;
		this.y = y;
		this.equals = function(obj){
			if(!(obj instanceof Point)){
				return false;
			}
			return this.x == obj.x && this.y == obj.y;
			
		}
	}