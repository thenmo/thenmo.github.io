/*:
 * @author Created by 邪恶道具 on 2016/3/5.
 *
 * @param 图片数量
 * @default 15
 *
 * @param 选项名
 * @default 日记
 *
 * @param 初始化标签
 * @default 0
 *
 * @param 功能选择
 * @default 0
 *
 * @plugindesc
 * 初始化标签为1时,初始化时显示所有图片,为0时隐藏所有图片
 * 功能选择:1是改变标志,2和3分别是全部设置隐藏或显示
 *
 * @help
 *
 *
 * 将需要使用的图片放入img文件夹中的diary文件夹内
 * 文件名按照这种格式编辑 "diary (x).png",其中x为一个数字,此数字对应相应标签
 * 因此该数字最好是连续的,如:diary (1).png  ,diary (2).png...
 * Book.png,这种名称的图片为背景图片
 * 日记选项中显示的标签,需要自己新建一个diary_name.rpgsave文件
 * diary_name.rpgsave文件中的内容使用UTF-8字符,用英文逗号分割
 * 该文件需要放入save文件夹中
 *
 *
 */
var params = PluginManager.parameters("diary_new");
(function(){


    var tagName = String(params['选项名'] || "null" );

    //通过needsCommand指令添加Menu菜单中的Diary选项
    var _Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
    Window_MenuCommand.prototype.addMainCommands = function(){
        _Window_MenuCommand_addMainCommands.call(this);
        if (this.needsCommand('diary')) {
            this.addCommand(tagName, 'diary', 1);
        }
    };

    //将选项添加进去
    var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function(){
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler('diary',     diary_command.bind(this));
    };


})();

var diary_command = function(){
    this._commandWindow.deselect();
    diary_run();
};

var diary_command_activate = function(){
    SceneManager.goto(Scene_Menu);
};

/**
 * Created by 邪恶道具 on 2016/3/5.
 * 日记系统绘制窗口及其功能代码
 * 图片读取是在状态机执行的间隔中进行的
 */


var functionSelection = Number(params['功能选择'] || "null" );
var photoNum = Number(params['图片数量'] || 15);//需要载入的图片数量,从1开始，而不是0(也就是表示1-11(11个)，而不是往常的0-11(12个))

var diary_run = function(){
    if(!document.getElementById("theCanvas")){
        create_canvas();
    }else{
       var theCanvas = document.getElementById("theCanvas");
        theCanvas.style.zIndex = 20;
    }
    fileWriteAndRead( functionSelection,photoNum,null);
    diary(photoNum);
};

var diary = function(photoNum) {
    var theCanvas = document.getElementById("theCanvas");
    var context = theCanvas.getContext("2d");


    //状态机参数
    var state_photoLoad = 1;
    var state_initList = 2;
    var state_windowDraw = 3;
    var state_drawFont = 4;
    var state_nextPage = 5;
    var state_backPage = 6;
    var state_end = 7;
    var currentState = state_photoLoad;


    //参数
    var displayText = new Object();
    displayText.flag = new Array();//为0显示"???",为1显示text属性的内容
    displayText.text = new Array();//日记名称
    displayText.maxLine = 12;//最大行数
    displayText.textCount = 0;


    var photoLoadedCount = 0;//负责已载入图片的计数
    var offset = 2;//边框偏移量
    var line_x = 200;//分割线x坐标
    var currentPage = 1;//记录当前的页数,从1开始
    var rememberNameCount = 0;


    var coordinate = new Object();//该对象负责存储定位选项与显示的必要数据
    coordinate.backGround = null;
    coordinate.photoCache = new Array();//存储日记图片的数组
    coordinate.font_x = new Array();
    coordinate.font_y = new Array();
    coordinate.font_height = new Array();
    coordinate.font_width = new Array();


    var global_Count = 0;
    var global_Flag = 0;
    var tempFlag = 0;


    //coordinate.photoCache,从第0个元素开始是日记图片
    var photoLoad = function () {
        var backGround = new Image();
        backGround.src = "img/diary/book.png";
        backGround.addEventListener("load", load_done, false);
        coordinate.backGround = backGround;
        window.console.log("loading");

        for (var i = 0; i < photoNum; i++) {
            var number = i + 1;
            var temp = new Image();
            temp.src = "img/diary/diary (" + number + ").png";
            temp.addEventListener("load", load_done, false);
            coordinate.photoCache.push(temp);
        }

        currentState = state_end;
    };

    var load_done = function () {
        photoLoadedCount++;
        //coordinate.photoCache.length + 1,背景图加上日记图片的数量
        if (photoLoadedCount == (coordinate.photoCache.length + 1)) {
            coordinate.backGround.removeEventListener("load", load_done, false);
            for (var i = 0; i < coordinate.photoCache.length; i++) {
                coordinate.photoCache[i].removeEventListener("load", load_done, false);
            }
            currentState = state_initList;
            coordinate.time = setInterval(stateMachine, 33);
            photoLoadedCount--;//这下才是日记图片数（-1是为了去掉背景的计数）
        }
    };

    var initList = function () {
        var temp = initList_loadFile();
        var tempName = initList_string_Change_strArray();
        for (var i = 0; i < coordinate.photoCache.length; i++) {
            displayText.text.push(tempName[i]);
        }

        for(var i = 0;i < temp.length;i++){
            if(temp[i]==0||temp[i]==1){
                displayText.flag.push(temp[i]);
            }
        }

        currentState = state_windowDraw;
    };

    var initList_loadFile = function () {
        var fs = require('fs');
        var fileName = "diary.rpgsave";
        var savePath = StorageManager.localFileDirectoryPath() + fileName;
        var readData = null;
        readData = fs.readFileSync(savePath);
        readData = ""+readData;
        return readData;
    };

    //将中文字符串转换成数组
    var initList_string_Change_strArray = function () {
        var fs = require('fs');
        var fileName = "diary_name.rpgsave";
        var savePath = StorageManager.localFileDirectoryPath() + fileName;
        var data = fs.readFileSync(savePath,"utf-8");
        var temp = data.split(",");
        var tempArray = new Array();
        for(var i=0;i<temp.length;i++) {
            if (temp[i] != ",") {
                tempArray.push(temp[i]);
            }
        }
        return tempArray;
    };

    var windowDraw = function () {
        var width = theCanvas.width - offset;
        var height = theCanvas.height - offset;

        context.drawImage(coordinate.backGround, 0, 0);
        windowDraw_setAlpha(theCanvas,context,0.8);
        windowDraw_drawBorder(context);
        windowDraw_getContentInf(context);

        currentState = state_drawFont;
    };

    var windowDraw_setAlpha = function(theCanvas,context,alpahValue){
        context.beginPath();
        context.globalAlpha = alpahValue;
        context.fillStyle = "#000000";
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);
    }

    var windowDraw_drawBorder = function(context){
        context.beginPath();
        context.lineWidth = 4;
        context.lineJoin = "round";
        context.strokeStyle = "#FFFFFF";
        context.moveTo(offset, offset);
        context.lineTo(width, offset);
        context.lineTo(width, height);
        context.lineTo(offset, height);
        context.closePath();
        context.stroke();
    }

    var windowDraw_getContentInf = function(context){
        coordinate.diaryDisplayArea_minX = line_x;
        coordinate.diaryDisplayArea_maxX = width;
        coordinate.diaryDisplayArea_minY = offset;
        coordinate.diaryDisplayArea_maxY = height;
        context.beginPath();
        context.moveTo(line_x, offset);
        context.lineTo(line_x, height);
        context.stroke();
    }

    var drawFont = function () {
        var offset = 20;
        var tempStr = null;
        if(photoNum==(displayText.maxLine + rememberNameCount - 2)){
            rememberNameCount--;
            currentPage--;
        }
        var length = displayText.maxLine + rememberNameCount;

        for (var i = rememberNameCount; i < length; i++) {
            tempStr = drawFont_flagSelect(tempStr);
            tempStr = drawFont_drawStringSelect(tempStr);
            drawFont_font(context);
            drawFont_fontUnderline(context);
        }

        currentState = state_end;
    };

    var drawFont_flagSelect = function(tempStr){
        if (displayText.flag[i] == 1) {
            tempStr = 0;
        }

        if(displayText.flag[i] == 0){
            tempStr = 1;
        }

        if ((i + 1) == length) {
            if(global_Count == coordinate.photoCache.length-1 || (global_Count == coordinate.photoCache.length && tempFlag == 0)){
                tempStr = 4;
            }else{
                tempStr = 2;
            }
        }

        if(currentPage>1&&i==rememberNameCount){
            tempStr = 3;
        }

        return tempStr;
    }

    var drawFont_drawStringSelect = function(tempStr){
        switch(tempStr){
            case 0:
                tempStr = displayText.text[i];
                if(global_Flag==0){
                    global_Count++;
                }
                break;
            case 1:
                tempStr = "???";
                if(global_Flag==0){
                    global_Count++;
                }
                break;
            case 2:
                tempStr = "下一个";
                break;
            case 3:
                tempStr = "上一个";
                break;
            case 4:
                if(displayText.flag[i] == 1){
                    tempStr = displayText.text[i];
                    global_Count++;
                    break;
                }else{
                    tempStr = "???";
                    global_Count++;
                    break;
                }
            case null:
                tempStr = "";
                window.console.log("无剩余图片");
                break;
        }

        return tempStr;
    }

    var drawFont_font = function(context){
        if(global_Count > coordinate.photoCache.length && tempFlag == 0){
            global_Count = coordinate.photoCache.length;
        }

        var fontMaxWidth = line_x - offset;
        var fontSize = 30;
        var y = offset + fontSize;
        context.beginPath();
        context.font = "normal " + fontSize + "px Arial";
        context.fillStyle = "#FFFFFF";
        var str_width = Math.round(context.measureText(tempStr).width);
        var x = ((line_x - offset) / 2) - Math.floor(str_width / 2) + 10;//使字体居中
        context.fillText(tempStr, x, y * (i - rememberNameCount + 1), fontMaxWidth);

        coordinate.font_x.push(x);
        coordinate.font_y.push((y * (i- rememberNameCount + 1)) - fontSize);//不减去fontSize,那么y会位于字体下方
        coordinate.font_width.push(str_width);//压入字符串宽度

    }

    var drawFont_fontUnderline = function(context){
        context.beginPath();
        context.strokeStyle = "#FFFFFF";
        var fontOffset = 10;
        context.moveTo(x, y * (i- rememberNameCount + 1) + fontOffset);
        context.lineTo(x + str_width, y * (i- rememberNameCount + 1) + fontOffset);
        coordinate.font_height.push(fontSize + fontOffset);//压入字符串高度
        context.stroke();
        coordinate.fontOffset = fontOffset;
    }

    var game_end = function () {
        clearInterval(coordinate.time);
    };

    var checkClick = function (event) {
        if(event.button == 2 || exitKey(event)){
            exitDiary(theCanvas);
        }else {
            var x = Math.round(event.pageX);
            var y = Math.round(event.pageY);
            for (var i = 0; i < coordinate.photoCache.length; i++) {
                if (displayText.flag[i] == 1 || displayText.flag[i] == 0) {
                    if (boundaryCheck(coordinate, x, y)) {
                        theCanvas.width = theCanvas.width;
                        theCanvas.height = theCanvas.height;
                        global_Flag = 1;
                        windowDraw();
                        drawFont();
                        currentState = null;

                        //获取设置图片位置的必要信息
                        if (displayText.flag[i + rememberNameCount] == 1) {
                            var centext_width = coordinate.diaryDisplayArea_maxX - coordinate.diaryDisplayArea_minX;
                            var centext_height = coordinate.diaryDisplayArea_maxY - coordinate.diaryDisplayArea_minY;
                            var centerPoint_x = (centext_width / 2 + coordinate.diaryDisplayArea_minX);
                            var centerPoint_y = (centext_height / 2 + coordinate.diaryDisplayArea_minY);
                            var photo_width = coordinate.photoCache[i + rememberNameCount].width / 2;
                            var photo_height = coordinate.photoCache[i + rememberNameCount].height / 2;
                            var place_x = centerPoint_x - photo_width;
                            var place_y = centerPoint_y - photo_height;

                            if ((i + 1) == displayText.maxLine && global_Count < coordinate.photoCache.length) {
                                nextPage();
                                break;
                            }
                            if (i == 0 && currentPage > 1) {
                                backPage();
                                break;
                            }
                            //日记内容显示部分
                            if (!(((i + 1) == displayText.maxLine) && (i == 0 && currentPage > 1))) {
                                if (displayText.flag[i + rememberNameCount] == 1) {
                                    checkClick_drawContent(coordinate, place_x, place_y, i, rememberNameCount);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    //diary窗口的退出函数
    var exitDiary = function(theCanvas){
        theCanvas.removeEventListener("mouseup", checkClick,false);
        document.removeEventListener("keyup", checkClick,false);
        theCanvas.style.zIndex = -20;
        diary_command_activate();
        theCanvas.width = theCanvas.width;
        theCanvas.height = theCanvas.height;
    };

    var exitKey = function(event){
        switch (event.keyCode){
            case 27:
                return true;
                break;
            /*            case 93:
             return true;
             break;*/
        }
    };

    var checkClick_boundaryCheck = function(coordinate,x,y){
        var minX = coordinate.font_x[i];
        var minY = coordinate.font_y[i];
        var maxX = minX + Math.round(coordinate.font_width[i]);
        var maxY = minY + Math.round(coordinate.font_height[i]);
        var minBoundary = (x > minX && y > minY);
        var maxBoundary = (x < maxX && y < maxY);
        return (minBoundary && maxBoundary);
    }

    var checkClick_drawContent = function(coordinate, place_x, place_y,i,rememberNameCount){
        context.drawImage(coordinate.photoCache[i+rememberNameCount], place_x, place_y);
    }

    var nextPage = function () {
        if(global_Count < photoNum){
            tempFlag = 0;
        }
        global_Count++;
        currentPage++;
        rememberNameCount++;
        theCanvas.width = theCanvas.width;
        theCanvas.height = theCanvas.height;

        windowDraw();
        drawFont();
        currentState = null;
    };

    var backPage = function () {
        if(global_Count == photoNum && tempFlag == 0){
            global_Count--;
        }
        tempFlag = 1;
        global_Count--;
        currentPage--;
        rememberNameCount--;
        theCanvas.width = theCanvas.width;
        theCanvas.height = theCanvas.height;
        windowDraw();
        drawFont();
        currentState = null;
    };

    var stateMachine = function () {
        switch (currentState) {
            case state_photoLoad:
                photoLoad();
                break;
            case state_initList:
                initList();
                break;
            case state_windowDraw:
                windowDraw();
                break;
            case state_drawFont:
                drawFont();
                break;
            case state_nextPage:
                nextPage();
                break;
            case state_backPage:
                backPage();
                break;
            case state_end:
                game_end();
                break;
            case null:
                //window.console.log("错误的状态值");
                break;
        }
    };


    document.addEventListener('keyup', checkClick,false);
    theCanvas.addEventListener("mouseup", checkClick, false);
    coordinate.time = setInterval(stateMachine, 33);


};

var create_canvas = function(){
    var theCanvas = document.createElement("canvas");
    if(!theCanvas){
        document.write("no support canvas");
        return ;
    }
    //mv的是816*624
    theCanvas.width = 816;
    theCanvas.height = 624;
    theCanvas.style.position = "absolute";
    theCanvas.style.margin = "auto";
    theCanvas.style.top = 0 + "px";
    theCanvas.style.left = 0 + "px";
    theCanvas.style.right = 0 + "px";
    theCanvas.style.bottom = 0 + "px";
    theCanvas.style.zIndex = 20;
    theCanvas.id = "theCanvas";
    document.body.appendChild(theCanvas);

    return theCanvas;
};


/**
 * Created by 邪恶道具 on 16-4-19.
 * 负责文件的读取与存储,使用node.js
 */




var fileDisplay = Number(params['初始化标签'] || "null" );

var _Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    fileWriteAndRead( functionSelection,photoNum, args);
};

//第一个参数觉得运行那一个函数，第三个参数是包含被变换标志的位置和标志
fileWriteAndRead = function(select,photoNum, args) {
    var fs = require('fs');
    var fileName = "diary.rpgsave";
    var savePath = StorageManager.localFileDirectoryPath() + fileName;
    var length = photoNum;//为图片数量
    //intiData只在初始化时使用
    var initData = null;
    var readData = null;

    var initFile = function () {
        initData = new Array(length);
        for (var i = 0; i < length; i++) {
            initData[i] = fileDisplay;
        }
        saveFile(initData);
    };

    var saveFile = function (data) {
        fs.writeFileSync(savePath, data,"utf-8");
    };

    var loadFile = function () {
        readData = fs.readFileSync(savePath,"utf-8");
        readData = string_Change_array(readData);
        return readData;
    };

    //将数字字符串转换成数组
    var string_Change_array = function (data) {
        var temp = data.split("");
        var tempArray = new Array();
        for(var i=0;i<temp.length;i++){
            if(temp[i]==1||temp[i]==0){
                tempArray.push(temp[i]);
            }
        }
        return tempArray;
    };

    //index为要修改的位置,flag的值为0和1
    var changeFlag = function () {
        readData = loadFile();
        var count = 0;
        for(var i=0;i<readData.length;i++){
            if (count == args[0]) {
                readData[count] = args[1];
                break;
            }
            if((i % 2) == 0){
                count++;
            }
        }
        saveFile(readData);
    };

    //将中文字符串转换成数组
    var string_Change_strArray = function () {
        var fs = require('fs');
        var fileName = "diary_name.rpgsave";
        var savePath = StorageManager.localFileDirectoryPath() + fileName;
        var data = fs.readFileSync(savePath,"utf-8");
        var temp = data.split(",");
        var tempArray = new Array();
        for(var i=0;i<temp.length;i++) {
            if (temp[i] != ",") {
                tempArray.push(temp[i]);
            }
        }
        return tempArray;
    };

    var exist = function () {
        //为真表示文件已存在
        if (!fs.existsSync(savePath)) {
            initFile();
        }
    };

    var reInitFile = function(flag){
        var temp = null;
        if(flag == 2){
            temp = 0;
        }else{
            temp = 1;
        }
        readData = loadFile();
        for(var i=0;i<readData.length;i++){
            if (readData[i] != ",") {
                readData[i] = temp;
            }
        }
        saveFile(readData);
    };

    var fileWriteAndRead_run = function(select) {
        exist();
        var flag = 2;
        switch (select) {
            case 1:
                changeFlag();
                break;
            case 2:
                reInitFile(flag);
                break;
            case 3:
                reInitFile(flag+1);
                break;
        }
    };
    fileWriteAndRead_run(select);
};

