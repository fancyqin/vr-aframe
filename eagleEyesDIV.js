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
                            "name":"Showroom"
                        },
                        {
                            "id":"3",
                            "name":"Workshop"
                        },
                        {
                            "id":"4",
                            "name":"Showroom 2"
                        }
                    ]
                },
                {
                    "id":"2",
                    "name":"Showroom"
                },
                {
                    "id":"3",
                    "name":"Workshop",
                    "child":[
                        {
                            "id":"2",
                            "name":"Showroom"
                        },
                        {
                            "id":"4",
                            "name":"Showroom 2"
                        }
                    ]
                },
                {
                    "id":"4",
                    "name":"Showroom 2",
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
            ]
            ,
            "setting":{}
        }
    };






    var drawEagleEyes = function(data){

        var html = document.getElementById('eagleHTML');

        var canvas = document.getElementById('eagleCANVAS');
        var ctx = canvas.getContext("2d");

        var DotHTML = '<div id="{id}" class="eagle-dot-wrap"><div class="eagle-dot"></div><span>{name}</span></div>';
        var centerDot = [150,450]; //起始中心点
        var drewDots = [];

        if(!data){return;}


        var entryID = data.result.entry_scene;
        var scenes = data.result.scenes;







        function getItemFromID (obj,id,cb){
            obj.forEach(function(item,i){
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
        function drawSceneDot(x,y,item){
            var dom = DotHTML.replace('{name}',item.name).replace('{id}',item.id);
            $(html).append(dom);
            var thisItem = $('#'+item.id);
            var x1 = x - thisItem[0].offsetWidth/ 2,
                y1 = y - thisItem[0].offsetHeight/ 2;
            thisItem.css({'left':x1,'top':y1});
            drewDots.push({id:item.id,x:x,y:y});
        }


        function beginDraw (x,y,id){
            getItemFromID(scenes,id,function(item){
                drawSceneDot(x, y,item);
                //如果第一个点有child
                if(item.child && item.child.length>0){
                    item.child.forEach(function(itm,j){
                        var newXY = getNewXY(x,y,item.child.length,j);
                        drawSceneDot(newXY.x,newXY.y,itm);
                        drawSceneLine(x,y,newXY.x,newXY.y);
                    });
                }
                //新的遍历
                scenes.forEach(function (itm,j) {
                    var isDrew = false;
                    drewDots.forEach(function(node,k){
                        //点已经画过
                        if(node.id === itm.id){
                            isDrew = true;
                        }
                    });


                    //找儿子
                    if(itm.child && itm.child.length>0){
                        if(isDrew){
                            var isChildDrew = false;
                            itm.child.forEach(function(child,k){
                                drewDots.forEach(function(node1,j){
                                    if(node1.id === child.id){
                                        isChildDrew = true;
                                    }
                                });
                                //儿子画过
                                if(isChildDrew){
                                    //老爹id连线儿子
                                    getItemFromID(drewDots,itm.id,function(node){
                                        var x = node.x;
                                        var y = node.y;
                                        getItemFromID(drewDots,child.id,function(childNode){
                                            drawSceneLine(x,y,childNode.x,childNode.y);
                                        });
                                    });
                                }else{
                                    //老爹id画新儿子
                                    getItemFromID(drewDots,itm.id,function(node){
                                        var x = node.x;
                                        var y = node.y;
                                        var newXY = getNewXY(x,y,itm.child.length,k);
                                        drawSceneDot(newXY.x,newXY.y,child);
                                        drawSceneLine(x,y,newXY.x,newXY.y);
                                    })
                                }
                            });

                        }else {

                            return;
                        }
                    }else{
                        return;
                    }



                })


            });

        }
        function getNewXY(x,y,num,i) {
            var l = 80;
            var arg = (i+1)*Math.PI/(num+1);
            var x1 = Math.floor(x - l*Math.cos(arg));
            var y1 = Math.floor(y - l*Math.sin(arg));

            return {x:x1,y:y1}
        }

        //画线
        function drawSceneLine(x1,y1,x,y){

            var cp1x =  x1 + 3*(x - x1)/7;
            var cp1y =  y1;
            var cp2x = x1 + 4*(x - x1)/7;
            var cp2y =  y;

            ctx.beginPath();
            ctx.strokeStyle = '#999999';
            ctx.lineWidth = 1;
            ctx.moveTo(x1,y1);
            // ctx.lineTo(x,y);  //直线
           ctx.bezierCurveTo(cp1x, cp1y,cp2x,cp2y, x, y); //贝塞尔曲线
            ctx.stroke();
//             drawDashLine(x1,y1,x,y,5);

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



        beginDraw(centerDot[0],centerDot[1],entryID);
        $('#'+entryID).addClass('now');


        $(html).on('click','.eagle-dot',function(e){
            var id = $(this).parent().attr('id');
            console.log(id);
            //todo 切换场景
            $('.eagle-dot-wrap').removeClass('now');
            $('#'+id).addClass('now');
            e.stopPropagation();
        })


    };

    window.onload=function() {
        drawEagleEyes(data);
    };


})();