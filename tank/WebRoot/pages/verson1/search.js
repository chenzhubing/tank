var rsNode = null;

var currentIndex = 0;
//该方法用来寻找最短路径    坐标节点记录在closeList     终点记录在rsNode
function search() {
	//起始节点
	var startNode = new Node(constant.START_POINT,null,0,util.h(constant.START_POINT, constant.END_POINT));
	//开放列表：记录可供选择的节点
	var openList = new Array();
	//关闭列表：记录最短路径的节点
	var closeList = new Array();
	closeList.push(startNode);
	//从起始节点  寻找可供选择的节点
	var choice = util.search(startNode, constant.OBSTACLE, constant.END_POINT);
	openList = openList.concat(choice);
	//按节点f降序   排列
	openList.sort(function(node1,node2){
    		return node1.f-node2.f;
    	});
	
	while(true){
		if(openList.length == 0){
			break;
		}
		//核心：    将f最小的  从开放列表中删除 ，加入到关闭列表
		var node = openList.shift();
		closeList.push(node);
		if(node.point.equals(constant.END_POINT)){
			rsNode = node;
			break;
		}
		
		var newNodeArr = util.search(node, constant.OBSTACLE, constant.END_POINT);
		for(var i in newNodeArr){
			//若当前节点存在于 关闭列表中 则不考虑
			if(util.findLocation(newNodeArr[i], closeList) == -1){
				var index = util.findLocation(newNodeArr[i], openList)
				//若当前节点    1.存在于 开放列表中：比较f大小
				//        2.不存在于当前列表中：加入
				if(index == -1){
					openList.push(newNodeArr[i]);
				}else{
					if(newNodeArr[i].f<openList[index].f){
						openList.splice(index, 1);
						openList.push(newNodeArr[i]);
					}
				}
			}
		}
		// 按f从小到大  更新开放列表
		openList.sort(function(node1,node2){
    		return node1.f-node2.f;
    	});
	}
	var falshback = [];
	falshback.unshift(rsNode);
	while(true){
		rsNode = rsNode.parentNode;
		if(rsNode == null){
	  		break;
	  	}
		falshback.unshift(rsNode);
	}
	return falshback;

	
}

		   
