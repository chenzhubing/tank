var constant = new Object();
//地图单位
constant.UNIT = 50;
//开始坐标
constant.START_POINT = null;
//终点坐标
constant.END_POINT = null;
//障碍物坐标 -1表示
constant.OBSTACLE = [
                     [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                     [-1,0,0,0,0,0,0,0,0,0,0],
                     [-1,0,0,0,0,-1,0,0,0,0,0],
                     [-1,0,0,-1,0,-1,-1,-1,-1,0,0],
                     [-1,-1,-1,0,0,-1,0,0,0,0,0],
                     [-1,0,-1,0,0,-1,0,0,0,0,0],
                     [-1,0,-1,0,0,-1,0,0,0,0,0],
                     [-1,0,-1,0,0,-1,0,0,0,0,0],
                     [-1,0,0,0,0,0,0,0,0,0,0],
                     [-1,0,0,0,0,0,0,0,0,0,0],
                     [-1,0,0,0,0,0,0,0,0,0,0],
                     [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                     ]