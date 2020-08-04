//=============================================================================
// Ryo_TurnCount.js
//=============================================================================

/*:
 * @plugindesc 显示回合数的插件。
 * @author RyoSonic
 *
 * @param Turn Layout X
 * @desc 显示回合数的装饰X轴。
 * @default 720
 *
 * @param Turn Layout Y
 * @desc 显示回合数的装饰Y轴。
 * @default 128
 *
 * @param Turn Number X
 * @desc 显示当今回合数的数字X轴。
 * @default 0
 *
 * @param Turn Number Y
 * @desc 显示当今回合数的数字Y轴。
 * @default 0
 *
 * @param Turn Number 2 X
 * @desc 显示需要在几回合内解决的数字X轴。
 * @default 0
 *
 * @param Turn Number 2 Y
 * @desc 显示需要在几回合内解决的数字Y轴。
 * @default 0
 *
 * @param Turn VID
 * @desc 用什么变量决定最大回合限制？
 * 如果变量大小为小于0，自动显示为999。
 * @default 0
 * @help 
 * 将Layout与Number、Number2文件扔到img／Turn文件夹下。
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.Ryo_TurnCount = true;
var Ryo = Ryo || {}; 

Ryo.parameters = PluginManager.parameters('Ryo_TurnCount');

Ryo.CountLayoutX = Number(Ryo.parameters['Turn Layout X'] || 0);
Ryo.CountLayoutY = Number(Ryo.parameters['Turn Layout Y'] || 0);
Ryo.CountNumberX = Number(Ryo.parameters['Turn Number X'] || 0);
Ryo.CountNumberY = Number(Ryo.parameters['Turn Number Y'] || 0);
Ryo.CountNumber2X = Number(Ryo.parameters['Turn Number 2 X'] || 0);
Ryo.CountNumber2Y = Number(Ryo.parameters['Turn Number 2 Y'] || 0);
Ryo.CountNumberVId = Number(Ryo.parameters['Turn VID'] || 0);

//==============================
// * Load
//==============================
ImageManager.loadTurn = function(filename) {
    return this.loadBitmap('img/turn/', filename, 0, true);
};

//==============================
// ** createWindowLayer
//==============================
var _alias_ryo_count_createUpperLayer = Spriteset_Battle.prototype.createUpperLayer
Spriteset_Battle.prototype.createUpperLayer = function() {	
    _alias_ryo_count_createUpperLayer.call(this);
    this.create_TurnCount();
};

//==============================
// ** Create ATB Gauge
//==============================
Spriteset_Battle.prototype.create_TurnCount = function() {
    this._turncount = new TurnCount()
    this.addChild(this._turncount)
};

//=============================================================================
// * Actor Status Skill
//=============================================================================
function TurnCount() {
    this.initialize.apply(this, arguments);
};

TurnCount.prototype = Object.create(Sprite.prototype);
TurnCount.prototype.constructor = TurnCount;

//==============================
// * Initialize
//==============================
TurnCount.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.loadBitmaps();		
    this.update();
};

//==============================
// * Load Bitmaps
//==============================
TurnCount.prototype.loadBitmaps = function() {
    this._numberImg = ImageManager.loadTurn("Number");
    this._numberImg2 = ImageManager.loadTurn("Number2");
    this._layImg = ImageManager.loadTurn("Layout")
};

//==============================
// * create Layout
//==============================
TurnCount.prototype.createLayout = function() {
    this._layout = new Sprite(this._layImg);
    this._layout.x = Ryo.CountLayoutX;
    this._layout.y = Ryo.CountLayoutY;
    this.addChild(this._layout);
};

//==============================
// * Create Number
//==============================
TurnCount.prototype.createNumber = function() {
    if (this._number) {
        for (var i = 0; i < this._number.length; i++){
            this.removeChild(this._number[i]);
        }
    };
    this._number = [];
    this._img_data = [this._numberImg.width,this._numberImg.height,this._numberImg.width / 10,this._numberImg.height / 2,Ryo.CountNumberX + Ryo.CountLayoutX,Ryo.CountNumberY + Ryo.CountLayoutY,];
    for (var i = 0; i < 5; i++) {
        this._number[i] = new Sprite(this._numberImg);
        this._number[i].visible = false;
	this._number[i].x = this._img_data[4];
	this._number[i].y = this._img_data[5];
	this.addChild(this._number[i]);
    };	
    this._number_old = Math.max($gameTroop.turnCount(), 1);
    this.refreshNumber(this._number,this._number_old,this._img_data,this._img_data[4],this._img_data[5],0);	
};

//==============================
// * Create Number
//==============================
TurnCount.prototype.createNumber2 = function() {
    if (this._number2) {
        for (var i = 0; i < this._number2.length; i++){
            this.removeChild(this._number2[i]);
        }
    };
    this._number2 = [];
    this._img_data2 = [this._numberImg2.width,this._numberImg2.height,this._numberImg2.width / 10,this._numberImg2.height / 2,Ryo.CountNumber2X + Ryo.CountLayoutX,Ryo.CountNumber2Y + Ryo.CountLayoutY,];
    for (var i = 0; i < 5; i++) {
        this._number2[i] = new Sprite(this._numberImg2);
        this._number2[i].visible = false;
	this._number2[i].x = this._img_data2[4];
	this._number2[i].y = this._img_data2[5];
	this.addChild(this._number2[i]);
    };	
    
    this.refreshNumber(this._number2,this._number_old2,this._img_data2,this._img_data2[4],this._img_data2[5],0);	
};

//==============================
// * Refresh Number
//==============================
TurnCount.prototype.refreshNumber = function(sprites,value,img_data,x,y,type) {
    numbers = Math.abs(value).toString().split("");  
    var nx = 0;
    var ny = 0;
    var dir = 1;
    for (var i = 0; i < sprites.length ; i++) {sprites[i].visible = false;
	if (i > numbers.length) {return};
	var n = Number(numbers[i]);
	sprites[i].setFrame(n * img_data[2], 0, img_data[2], img_data[1]);
	sprites[i].visible = true;	
	var nx = -(img_data[2] * i) + (img_data[2] * numbers.length);		  
	sprites[i].x = x - nx;
	sprites[i].y = y - ny;
	dir = dir === 0 ? 1 : 0;
    };
};

//==============================
// * Update Number
//==============================
TurnCount.prototype.updateNumber = function() {
    if (this._number) {
        this._number_old = Math.max($gameTroop.turnCount(), 1);
	this.refreshNumber(this._number,this._number_old,this._img_data,this._img_data[4],this._img_data[5],0);
    };
};

//==============================
// * Update Number2
//==============================
TurnCount.prototype.updateNumber2 = function() {
    if (this._number2) {
        if ($gameVariables.value(Ryo.CountNumberVId) > 0) this._number_old2 = $gameVariables.value(Ryo.CountNumberVId);
        else this._number_old2 = 999;
	this.refreshNumber(this._number2,this._number_old2,this._img_data2,this._img_data2[4],this._img_data2[5],0);
    };
};

//==============================
// * Hide
//==============================
TurnCount.prototype.appear = function() {
    if ($gameMessage.isBusy()) {return false};
    if ($gameTemp._battleEnd) {return false};
    if (!$gameSystem._bhud_visible) {return false};
    return true
};

//==============================
// * Update
//==============================
TurnCount.prototype.update = function() {
    Sprite.prototype.update.call(this);	
    if (!this._layout && this._layImg.isReady()) {this.createLayout();}
    if (!this._number && this._numberImg.isReady() && this._numberImg2.isReady()) {
        this.createNumber()
        this.createNumber2()
    };
    if (this._number) {this.updateNumber()};
    if (this._number2) {this.updateNumber2()};
    if (this._layout && this._number && this._number2){
        if (this.appear()) {
             this.opacity += 10;
        } else {
             this.opacity -= 10;
        };
    }
};
