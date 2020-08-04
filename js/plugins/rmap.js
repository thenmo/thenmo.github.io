//=============================================================================
// MrLiu_MiniMap.js
//=============================================================================
/*:
* @plugindesc 在RMMV游戏的地图界面上显示小地图
* @author MrLiu-过眼云烟
 * @param NotShowMiniMap
 * @desc 开启此开关则不显示小地图，多用于剧情等特殊场景。
 * @default 49
 *
 * @param Name X
 * @desc 设置地图名称位置X值。
 * @default 155
 *
 * @param Name Y
 * @desc 设置地图名称位置Y值。
 * @default 537
 *
 * @param Layout X
 * @desc 设置地图名称装饰位置X值。
 * @default 0
 *
 * @param Layout Y
 * @desc 设置地图名称装饰位置Y值。
 * @default 420
* @help 这个插件的写法借鉴了rpg maker web 上的Hajime Hoshi的MiniMap的算法
* 使用方法是在地图的备注中加入<mini_map> 就会自动显示小地图，您可以通过打开开关
* 或者NPC对话或者事件页运行的时候会自动隐藏。您可自行修改本插件78行--110行对应的区块
* 颜色。实现您在小地图上的修改。能够更智能的画出您满意的小地图。请将minimap.png文件
* 放在picture目录下，UI图片制作者是我的好友高须小龙，在此对他致以诚挚的感谢。
* 目前我已经创建的图块颜色对应如下：1.边界[255,255,255,255] 2.通行补充[95, 147, 207, 212] 3不可通行补充[128, 128, 128, 192]4.场景出入口[255,256,75,50]
* 5.一般建筑[11,43,68,206] 6.商店[74,135,65,112]7.冒险者工会[144,9,24,255]8.教会[140,90,53,26]9.旅馆[40,32,47,25]
* 您可进行随意修改。
*/
 
var Imported = Imported || {};
Imported.MrLiu_MiniMap = true;
var MrLiu = MrLiu || {}; 
 
MrLiu.parameters = PluginManager.parameters('MrLiu_MiniMap');
MrLiu.notShowSwitch = Number(MrLiu.parameters['NotShowMiniMap']);
MrLiu.nameX = Number(MrLiu.parameters['Name X']);
MrLiu.nameY = Number(MrLiu.parameters['Name Y']);
MrLiu.layoutX = Number(MrLiu.parameters['Layout X']);
MrLiu.layoutY = Number(MrLiu.parameters['Layout Y']);
MrLiu.miniMapBitmaps = {};
 
MrLiu.POSITION_RADIUS = 4;
MrLiu.COLORS = {
    'walk':     [95, 147, 207, 212],
    'mountain': [255, 255, 255, 0],//224
    'other':    [128, 128, 128, 0],//192
};
 
Bitmap.prototype.replacePixels = function(pixels) {
    var imageData = this._context.createImageData(this.width, this.height);
    imageData.data.set(pixels);
    this._context.putImageData(imageData, 0, 0);
    this._setDirty();
};
 
function Scene_MapInfo() {
    this.initialize.apply(this, arguments);
}
 
Scene_MapInfo.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MapInfo.prototype.constructor = Scene_MapInfo;
 
Scene_MapInfo.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.onMapLoaded();
    this.createMiniMap();
    this.updateMiniMap();
    this.createLayout();
    this.createName();
};
 
Scene_MapInfo.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    this._field = new Sprite();
    this.addChild(this._field);
};
 
Scene_MapInfo.prototype.isWater = function(gameMap, x, y){
    if (gameMap.isOverworld()) {
        var tileId = gameMap.autotileType(x, y, 0);//regionId
        if ([0, 1, 2, 3, 7].some(function(id) {
            return id === tileId;
        })) {
            return true;
        }
    }
    return gameMap.isShipPassable(x, y);
}
 
Scene_MapInfo.prototype.onMapLoaded = function() {
    if (!$dataMap.meta.mini_map) {
        return;
    }
    if ($gameMap.mapId() in MrLiu.miniMapBitmaps) {
        return;
    }
    var pixels = new Uint8Array(4 * $dataMap.width * $dataMap.height); 
    var p = 0;
    for (var j = 0; j < $dataMap.height; j++) {
        for (var i = 0; i < $dataMap.width; i++) {
            var color = null;
            if ($gameMap.checkPassage(i, j, 0x0f)) {
                color = MrLiu.COLORS['walk'];
            } else if (!this.isWater($gameMap, i, j)) {
                color = MrLiu.COLORS['mountain'];
            } else {
                color = MrLiu.COLORS['other'];
            }
            switch($gameMap.regionId(i, j)) {
                case 0:
                break;
                case 1:
                color = [255,255,255,212];
                break;
                case 2:
                color = [95, 147, 207, 212];
                break;
                case 3:
                color = [128, 128, 128, 212];
                break;
                case 4:
                color = [125,256,75,212];
                break;
                case 5:
                color = [11,43,68,212];
                break;
                case 6:
                color = [74,135,65,212];
                break;
                case 7:
                color = [144,9,24,212];
                break;
                case 8:
                color = [140,90,53,212];
                break;
                case 9:
                color = [40,32,47,212];
                break;
                case 10:
                color = [74,135,65,212];
                break;
            };
            pixels[p]   = color[0];
            pixels[p+1] = color[1];
            pixels[p+2] = color[2];
            pixels[p+3] = color[3];
            p += 4;
        }
    }
    var bitmap = new Bitmap($dataMap.width, $dataMap.height);
    bitmap.replacePixels(pixels);
    MrLiu.miniMapBitmaps[$gameMap.mapId()] = bitmap;
};
 
Scene_MapInfo.prototype.createMiniMap = function() {
    this._miniMapSprite = new Sprite();
    this._miniMapCurrentPositionSprite = new Sprite();
    var positionBitmap = new Bitmap(MrLiu.POSITION_RADIUS * 2, MrLiu.POSITION_RADIUS * 2);
    positionBitmap.drawCircle(MrLiu.POSITION_RADIUS, MrLiu.POSITION_RADIUS, MrLiu.POSITION_RADIUS, '#ff0000');
    this._miniMapCurrentPositionSprite.bitmap = positionBitmap;
    this._field.addChild(this._miniMapSprite);
    this._field.addChild(this._miniMapCurrentPositionSprite);
};
 
Scene_MapInfo.prototype.createLayout = function() {
    this._miniMapLayout = new Sprite(ImageManager.loadSystem('MapLayout'));
    this._miniMapLayout.x = MrLiu.layoutX;
    this._miniMapLayout.y = MrLiu.layoutY;
    this._field.addChild(this._miniMapLayout);
};
 
Scene_MapInfo.prototype.updateMiniMap = function() {
    var miniMapBitmap = MrLiu.miniMapBitmaps[$gameMap.mapId()];
    var scaleX = Graphics.boxWidth / miniMapBitmap.width;
    var scaleY = Graphics.boxHeight / miniMapBitmap.height;
    var miniMapScale = scaleX < scaleY ? scaleX : scaleY
    miniMapScale *= 0.9
    var miniMapX = (Graphics.boxWidth - miniMapBitmap.width * miniMapScale) / 2;
    var miniMapY = (Graphics.boxHeight - miniMapBitmap.height * miniMapScale) / 2;
    this._miniMapSprite.bitmap = miniMapBitmap;
    this._miniMapSprite.x = miniMapX;
    this._miniMapSprite.y = miniMapY;
    this._miniMapSprite.scale.x = miniMapScale;
    this._miniMapSprite.scale.y = miniMapScale;
    this._miniMapCurrentPositionSprite.x = miniMapX + ($gamePlayer.x * miniMapScale) - MrLiu.POSITION_RADIUS;
    this._miniMapCurrentPositionSprite.y = miniMapY + ($gamePlayer.y * miniMapScale) - MrLiu.POSITION_RADIUS;
    this._miniMapSprite.visible = true;
    this._miniMapCurrentPositionSprite.visible = true;
};
 
Scene_MapInfo.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    if (Input.isTriggered("cancel") || Input.isTriggered("control")) this.popScene();
}
 
Scene_MapInfo.prototype.createName = function() {
    this._name = new Sprite(new Bitmap(200,40));
    this._name.x = MrLiu.nameX 
    this._name.y = MrLiu.nameY
    this._field.addChild(this._name)
    this._name.bitmap.drawText($gameMap.displayName(), 0, 0, this._name.bitmap.width, this._name.bitmap.height,0);        
};
 
var _ryo_Scene_Map_updateScene = Scene_Map.prototype.updateScene;
Scene_Map.prototype.updateScene = function() {
    _ryo_Scene_Map_updateScene.call(this);
    if (!SceneManager.isSceneChanging() && !$gameSwitches.value(MrLiu.notShowSwitch)) {
        this.updateCallMap();
    }
};
 
Scene_Map.prototype.updateCallMap = function() {
    if (Input.isTriggered("control") && !$gameMap.isEventRunning() && $dataMap.meta.mini_map) SceneManager.push(Scene_MapInfo);
}
