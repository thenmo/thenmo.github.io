//=============================================================================
// fuki.js
//=============================================================================

/*
@plugindesc :fuki对话框
@author :garfeng
@date :2015-12-12 21:44
使用方法：
文本显示 ： id|e文本正文
id：0表示角色，其他表示事件id
比如：1|e你好呀~
*/

Window_Message.prototype.startMessage = function() {
    this._textState = {};
    this._textState.index = 0;
    var string = $gameMessage._texts[0];
    // alert(string);
    var messagejson = string.split("|e");
    if(messagejson.length>=2)
    {
        $gameMessage._texts.splice(0,1,messagejson[1]);
        var eventid = messagejson[0];
        var idx,idy;
        if(eventid!=0){
            idx = $gameMap._events[eventid]._x;
            idy = $gameMap._events[eventid]._y;
        }
        else
        {
            idx = $gamePlayer._x;
            idy = $gamePlayer._y;
        }


        idx = $gameMap.adjustX(idx);
        idy = $gameMap.adjustY(idy);

        var width = this.windowWidth()/2;
        var height = this.windowHeight();

        var x = idx*48 + 24 - width/2;//
        var y = idy*48 - 24 - height;
        if(x+width>Graphics.boxWidth) x = (Graphics.boxWidth - width);
        else if(x<0) x = 0;


        if(y+height>Graphics.boxHeight) y = Graphics.boxHeight - height;
        else if(y<0) y=0;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    /*
    for(i in data)
    {
        $gameMessage._texts.push(i+":"+data[i]);
    }
    */
    this._textState.text = this.convertEscapeCharacters($gameMessage.allText());
    this.newPage(this._textState);
    if(messagejson.length==1)
    {
        this.width = this.windowWidth();
        this.height = this.windowHeight();
        this.x = (Graphics.boxWidth - this.width) / 2;
        this.updatePlacement();
    }

    //
    this.updateBackground();
    this.open();
};
