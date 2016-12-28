/**
 * Created by qinfan on 2016/12/28.
 */


//random
(function(){


    var testData = {
        "id":"",
        "name":"",
        "entry_scene":"1",
        "project_id":"",
        "scenes":[
            {
                "scene_id":"1",
                "name":"Aerial panorama",
                "child":[
                    {
                        "scene_id":"2",
                        "name":"Showroom"
                    },
                    {
                        "scene_id":"3",
                        "name":"Workshop"
                    },
                    {
                        "scene_id":"4",
                        "name":"Showroom 2"
                    },
                    {
                        "scene_id":"5",
                        "name":"Showroomfafa"
                    }
                ]
            },
            {
                "scene_id":"2",
                "name":"Showroom",
                "child":[
                    {
                        "scene_id":"3",
                        "name":"Showroom"
                    },
                    {
                        "scene_id":"4",
                        "name":"Showroom 2"
                    },
                    {
                        "scene_id":"6",
                        "name":"Showroom 2"
                    }
                ]
            },
            {
                "scene_id":"3",
                "name":"Workshop",
                "child":[
                    {
                        "scene_id":"4",
                        "name":"Showroom 2"
                    },
                    {
                        "scene_id":"2",
                        "name":"Showroom 2"
                    },
                    {
                        "scene_id":"5",
                        "name":"Showroom 2"
                    },
                    {
                        "scene_id":"7",
                        "name":"Washroom"
                    }
                ]
            },
            {
                "scene_id":"4",
                "name":"Showroom 2",
                "child":[
                    {
                        "scene_id":"5",
                        "name":"Washroom"
                    }
                ]
            },
            {
                "scene_id":"5",
                "name":"Washroom"
            },
            {
                "scene_id":"6",
                "name":"Washroom",
                "child":[
                    {
                        "scene_id":"7",
                        "name":"Washroom"
                    }
                ]
            }
        ],
        "setting":{}
    };


    var randomRoad = function (data) {
        if(!data){return;}
        var WRAP_W = 30; //random区域
        var WRAP_W_PAD = 100; //左右留白
        var WRAP_H_PAD = 30; //上下留白
        var ITEM_H = 50; //行块高度
        var ROAD_HTML = '<div id="random-road" class="random-road"></div>';
        var DotHTML = '<div id="{id}" class="random-dot-wrap"><div class="random-dot"></div><span>{name}</span></div>';

        $('body').append(ROAD_HTML);
        var randomRoad = $('#random-road');
        var scenes = data.scenes;

        randomRoad.width(WRAP_W + 2*WRAP_W_PAD);
        randomRoad.height(scenes.length*ITEM_H + 2*WRAP_H_PAD);

        var first = data.entry_scene;

        //画点 todo
        function drawSceneDot(x,y,item){
            var dom = DotHTML.replace('{name}',item.name).replace('{id}',item.id);
            $(html).append(dom);
            var thisItem = $('#'+item.id);
            var x1 = x - thisItem[0].offsetWidth/ 2,
                y1 = y - thisItem[0].offsetHeight/ 2;
            thisItem.css({'left':x1,'top':y1});
            drewDots.push({id:item.id,x:x,y:y});
            if(notDrewDots.length >0){
                notDrewDots.forEach(function(notDrew,i){
                    if(notDrew.id === item.id){
                        notDrewDots.splice(i,1);
                    }
                })
            }

        }




    };


    randomRoad(testData);




})();