var util = new Object();
    	//计算 周围可供选择的节点
    	util.search = function(node,map,endPoint){
    		var openList = [];
    		var point = node.point;
    		//上下左右方向节点
    		var up = new Point(point.x-1,point.y);
    		var down = new Point(point.x+1,point.y);
    		var left = new Point(point.x,point.y-1);
    		var right = new Point(point.x,point.y+1);
    		if(constant.OBSTACLE[up.x][up.y] != -1){
    			var g = node.g + 1;
    			var h = util.h(up,endPoint);
    			openList.push(new Node(up,node,g,h));
    		}
    		if(constant.OBSTACLE[down.x][down.y] != -1){
    			var g = node.g + 1;
    			var h = util.h(down,endPoint);
    			openList.push(new Node(down,node,g,h));
    		}
    		if(constant.OBSTACLE[left.x][left.y] != -1){
    			var g = node.g + 1;
    			var h = util.h(left,endPoint);
    			openList.push(new Node(left,node,g,h));
    		}
    		if(constant.OBSTACLE[right.x][right.y] != -1){
    			var g = node.g + 1;
    			var h = util.h(right,endPoint);
    			openList.push(new Node(right,node,g,h));
    		}
    		return openList;
    		
    	}
    	//计算 两节点间距离
    	util.h = function(point1,point2){
    		var x1 = point1.x;
    		var y1 = point1.y;
    		var x2 = point2.x;
    		var y2 = point2.y;
    		return Math.abs(x1-x2)+Math.abs(y1-y2);
    	}
    	
    	//节点排序
    	util.sortNode = function(node1,node2){
    		return node1.f-node2.f;
    	}
    	//判断两个节点的相对位置    判断
    	util.director = function(node1,node2){
    		if(!(node1 instanceof Node) || !(node2 instanceof Node)){
    			throw new Error("非法参数");
    		}
    		if(node2.point.x < node1.point.x && node2.point.y == node1.point.y){
    			return 1;
    		}
    		if(node2.point.x > node1.point.x && node2.point.y == node1.point.y){
    			return 2;
    		}
    		if(node2.point.y < node1.point.y && node2.point.x == node1.point.x){
    			return 3;
    		}
    		if(node2.point.y > node1.point.y && node2.point.x == node1.point.x){
    			return 4;
    		}
    		return null;
    	}
    	
    	//节点在数组中的位置
    	util.findLocation = function(node,nodeArray){
    		for(var i in nodeArray){
    			if(node.equals(nodeArray[i])){
    				return i;
    			}
    		}
    		return -1;
    	}
    	
    