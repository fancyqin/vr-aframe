/**
 * Created by qinfan on 2016/12/22.
 */


//EagleEyes
(function(){


    var data = {
        "status":1,
        "result":{
            "id":"",
            "name":"",
            "entry_scene":"1",
            "project_id":"",
            "scenes":[
                {
                    "id":"1",
                    "name":"Aerial panorama",
                    "child":[
                        {
                            "id":"2",
                            "name":"Show room"
                        },
                        {
                            "id":"3",
                            "name":"Workshop"
                        },
                        {
                            "id":"4",
                            "name":"Show room 2"
                        }
                    ]
                },
                {
                    "id":"2",
                    "name":"Show room"
                },
                {
                    "id":"3",
                    "name":"Workshop",
                    "child":[
                        {
                            "id":"2",
                            "name":"Show room"
                        },
                        {
                            "id":"4",
                            "name":"Show room 2"
                        }
                    ]
                },
                {
                    "id":"4",
                    "name":"Show room 2",
                    "child":[
                        {
                            "id":"5",
                            "name":"Washroom"
                        }
                    ]
                },
                {
                    "id":"5",
                    "name":"Washroom"
                }
            ],
            "setting":{}
        }
    };






    var drawEagleEyes = function(data){

        var html = document.getElementById('eagleHTML');

        var canvas = document.getElementById('eagleCANVAS');
        var ctx = canvas.getContext("2d");

        var DotHTML = '<div id="{id}" class="eagle-dot"><span>{name}</span></div>';
        var centerDot = [150,450]; //起始中心点
        var drewDots = [];

        if(!data){return;}


        var entryID = data.result.entry_scene;
        var scenes = data.result.scenes;



        drawSceneDot(centerDot[0],centerDot[1],entryID);

        drewDots.push(entryID);

        scenes.forEach(function(item,i){

        });

        function getItemFromID (id,cb){
            scenes.forEach(function(item,i){
                if(id === item.id){
                    cb(item,i);
                }
            });
        }




        //画虚线
        function drawDashLine(x1,y1,x2,y2,dashLen) {
            dashLen = dashLen === undefined ? 5 : dashLen;
            var beveling = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
            var num = Math.floor(beveling/dashLen);
            for(var i = 0 ; i < num; i++) {
                ctx[i%2 == 0 ? 'moveTo' : 'lineTo'](x1+(x2-x1)/num*i,y1+(y2-y1)/num*i);
            }
            ctx.stroke();
        }
        //画点

        function drawSceneDot (x,y,id){
            getItemFromID(id,function(item){
                $(html).append(DotHTML.replace('{name}',item.name).replace('{id}',item.id));
                var x1 = x - $('#'+item.id).width()/ 2,
                    y1 = y - $('#'+item.id).height()/ 2;
                $('#'+item.id).css({'left':x1,'top':y1});
                if(item.child && item.child.length>0){
                    item.child.forEach(function(itm,j){
                        drawSceneDot(x - 50,y -50,itm.id)
                    });

                }
            });

        }
        //画线
        function drawSceneLine(x,y,dot){

            var x1 = dot[0],y1 = dot[1];
            var cp1x =  x1 + 3*(x - x1)/7;
            var cp1y =  y1;
            var cp2x = x1 + 4*(x - x1)/7;
            var cp2y =  y;

            ctx.beginPath();
            ctx.strokeStyle = '#999999';
            ctx.lineWidth = 1;
            ctx.moveTo(x1,y1);
//            ctx.lineTo(x,y);  //直线
//            ctx.bezierCurveTo(cp1x, cp1y,cp2x,cp2y, x, y); //贝塞尔曲线
//            ctx.stroke();
            drawDashLine(x1,y1,x,y,5);

        }

        function SetScenesLocation(item,dot){

            var pos = item['position'].split(",");
            var x = dot[0] + Number(pos[0]);
            var y = dot[1] - Number(pos[1]);

            if(item['scenes'] && item['scenes'].length> 0){
                item['scenes'].forEach(function(itm,k){
                    SetScenesLocation(itm,[x,y]);
                });
            }

            drawSceneLine(x,y,dot);
            drawSceneDot(x,y,item);
        }

        //获取event 坐标
        function getEventPosition(ev){
            var x, y;
            if (ev.layerX || ev.layerX == 0) {
                x = ev.layerX;
                y = ev.layerY;
            } else if (ev.offsetX || ev.offsetX == 0) { // Opera
                x = ev.offsetX;
                y = ev.offsetY;
            }
            return {x: x, y: y};
        }

    };

    window.onload=function() {
        drawEagleEyes(data);
    };


})();