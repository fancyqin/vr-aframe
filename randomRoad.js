/**
 * Created by qinfan on 2016/12/28.
 */


//random
(function(){


    var testData = {
        "id":"",
        "name":"",
        "entry_scene":"fwfw",
        "project_id":"",
        "scenes":[
            {
                "scene_id":"hrte",
                "name":"Aerial panorama",
                "child":[
                    {
                        "scene_id":"tew",
                        "name":"Showroom"
                    }
                ]
            },
            {
                "scene_id":"kjyu",
                "name":"Showroom",
                "child":[
                    {
                        "scene_id":"twe",
                        "name":"Showroom"
                    }
                ]
            },
            {
                "scene_id":"fwfw",
                "name":"Workshop",
                "child":[
                    {
                        "scene_id":"hwre",
                        "name":"Showroom 2"
                    }
                ]
            },
            {
                "scene_id":"fw",
                "name":"Showroom 2",
                "child":[
                    {
                        "scene_id":"5",
                        "name":"Washroom"
                    }
                ]
            },
            {
                "scene_id":"rwq",
                "name":"Washroom"
            },
            {
                "scene_id":"sdfe",
                "name":"Washroom 2"
            }
        ],
        "setting":{}
    };


    var randomRoad = function (data) {
        if(!data){return;}
        var WRAP_W = 30; //random区域
        var WRAP_W_PAD = 100; //左右留白
        var WRAP_H_PAD = 36; //上下留白
        var ITEM_H = 50; //行块高度

        var ROAD_HTML = '<div id="random-road" class="random-road"></div>';
        var ROAD_CANVAS ='<canvas id="random-canvas" class="random-canvas" width="{w}" height="{h}"></canvas>';
        var DotHTML = '<div id="{id}" class="random-dot-wrap"><div class="random-dot"></div><span>{name}</span></div>';

        $('body').append(ROAD_HTML);

        var randomRoad = $('#random-road');
        var scenes = data.scenes;
        var first = data.entry_scene;
        var dots = [];

        var calW = WRAP_W + 2*WRAP_W_PAD;
        var calH = (scenes.length-1)*ITEM_H + 2*WRAP_H_PAD;

        randomRoad.width(calW);
        randomRoad.height(calH);
        randomRoad.html('');
        randomRoad.append(ROAD_CANVAS.replace('{w}',calW).replace('{h}',calH));

        var canvas = document.getElementById('random-canvas');
        var ctx = canvas.getContext ?  canvas.getContext("2d") : false;




        ctx && ctx.clearRect(0,0,300,500);




        scenes.forEach(function(item,i){
            if(item.id === first){
                scenes.splice(i,1);
                scenes.splice(0,0,item)

            }
        });

        scenes.forEach(function(item,i){
            var num = (i%2)*2 - 1;


            //随机出现
            //var random = Math.ceil(Math.random()*(WRAP_W/2));

            //根据id charCodeAt得到随机数

            var random = item.scene_id.charCodeAt(0)%(WRAP_W/2);



            var x = WRAP_W_PAD + WRAP_W/2 + random*num;
            var y = WRAP_H_PAD + ITEM_H*i;
            dots.push({x:x,y:y});
            drawSceneDot(x,y,item);
            if(i > 0){
                drawSceneLine(x,y,dots[i-1].x,dots[i-1].y);
            }


        });



        $('#'+first).addClass('now');
        console.log(dots);




        //画点 todo
        function drawSceneDot(x,y,item){
            var dom = DotHTML.replace('{name}',item.name).replace('{id}',item.scene_id);
            $(randomRoad).append(dom);
            var thisItem = $('#'+item.scene_id);
            var x1 = x - thisItem[0].offsetWidth/ 2,
                y1 = y - thisItem[0].offsetHeight/ 2;
            thisItem.css({'left':x1,'top':y1});

        }
        function drawSceneLine(x1,y1,x,y){
            if(!ctx){return;}

            var bbx = x1 + (x - x1)/7;
            var bby = y1 + (y - y1)/7;
            var bex = x1 + 6*(x - x1)/7;
            var bey = y1 + 6*(y - y1)/7;

            var cp1x =  x1-4;
            var cp1y =  y+20;
            var cp2x = x+4;
            var cp2y =  y1-20;

            ctx.beginPath();
            ctx.strokeStyle = '#999999';
            ctx.lineWidth = 2;
            ctx.moveTo(x1,y1);
            ctx.lineTo(bbx,bby);
            //ctx.lineTo(x,y);  //直线
            ctx.bezierCurveTo(cp1x, cp1y,cp2x,cp2y, bex, bey); //贝塞尔曲线
            ctx.lineTo(x,y);
            ctx.stroke();

        }


    };


    randomRoad(testData);


    window.randomRoad = randomRoad;

})();