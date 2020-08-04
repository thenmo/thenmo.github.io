﻿//=============================================================================
// MOG_ActorPictureCM.js
//=============================================================================

/*:
 * @plugindesc 战斗立绘
 * @author Moghunter
 *
 * @param CM 1 Visible
 * @desc Ativar为personagem do小学。
 * @default true
 *
 * @param CM 1 X-Axis
 * @desc给Definição posição给X-axis片。
 * @default 500
 *
 * @param CM 1 Y-Axis
 * @desc Definição da posição Y-axis da imagem.
 * @default 0 
 *
 * @param CM 2 Visible
 * @desc Ativar a imagem secundaria do personagem.
 * @default true
 *
 * @param CM 2 X-Axis
 * @desc Definição da posição Y-axis da imagem.
 * @default 0
 *
 * @param CM 2 Y-Axis
 * @desc Definição da posição Y-axis da imagem.
 * @default 0
 *
 * @help  
 * =============================================================================
 * +++ MOG - Actor Picture CM (v1.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta a imagem do personagem durante a seleção de comandos.
 * As imagens dos personagens devem ser gravadas na pasta. /img/pictures/
 * A nomeação dos arquivos devem ser feitas da seguinte forma.
 * 
 * Actor_ ID.png
 *
 * Exemplo
 *
 * Actor_1.png
 * Actor_2.png
 * Actor_3.png
 *
 * Para definir a imagem secundária do personagem nomeie o arquivo da seguinte
 * forma.
 *
 * Actor_ ID + b.png
 *
 * Exemplo
 *
 * Actor_1b.png
 * Actpr_2b.png
 * ...
 *
 * ============================================================================= 
 * HISTÓRICOS
 * =============================================================================
 * 战斗立绘
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_ActorPictureCM = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_ActorPictureCM');
    Moghunter.actor_cm1_visible = String(Moghunter.parameters['CM 1 Visible'] || "true");
	Moghunter.actor_cm_x = Number(Moghunter.parameters['CM 1 X-Axis'] || 500);
    Moghunter.actor_cm_y = Number(Moghunter.parameters['CM 1 Y-Axis'] || 0);
	Moghunter.actor_cm2_visible = String(Moghunter.parameters['CM 2 Visible'] || "true");
	Moghunter.actor_cm2_x = Number(Moghunter.parameters['CM 2 X-Axis'] || 0);
    Moghunter.actor_cm2_y = Number(Moghunter.parameters['CM 2 Y-Axis'] || 0);
	
//=============================================================================
// ** Scene Battle
//=============================================================================

//==============================
// * CreateSpriteset
//==============================
var _alias_mog_actorcm_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
    _alias_mog_actorcm_createSpriteset.call(this);
   this.create_actors_cm();
};

//==============================
// * Create Actors CM
//==============================	
Scene_Battle.prototype.create_actors_cm = function() {
    this.load_actor_cm_pictures();
	if (String(Moghunter.actor_cm2_visible) === "true") {
  	   this._sprite_actor_cm_lay = new Sprite();
	   this._sprite_actor_cm_lay.x = Graphics.boxWidth + Moghunter.actor_cm2_x;
	   this._sprite_actor_cm_lay.y = Moghunter.actor_cm2_y;
	   this._sprite_actor_cm_lay.opacity = 0;
	   this._sprite_actor_cm_lay.visible = false;
       this.addChild(this._sprite_actor_cm_lay);	
	};	
	if (String(Moghunter.actor_cm1_visible) === "true") {
	   this._sprite_actor_cm = new Sprite();
	   this._sprite_actor_cm.anchor.x = 0.5;
	   this._sprite_actor_cm.y = this._actor_cm_data[2];
	   this.addChild(this._sprite_actor_cm);
	};
};

//==============================
// * Load Actor CM Pictures
//==============================	
Scene_Battle.prototype.load_actor_cm_pictures = function() {
	this._sprite_actor_cm_data = [Graphics.width,0,0]
	this._actor_cm_data = [null,Moghunter.actor_cm_x,Moghunter.actor_cm_y];
	this._actor_cm_data[3] = this._actor_cm_data[1] - 100;
	this._actor_cm_img = [];
	var members = $gameParty.battleMembers();
	if (String(Moghunter.actor_cm1_visible) === "true") {		
		for (var i = 0; i < members.length; i++) {
			this._actor_cm_img[members[i]._actorId] = ImageManager.loadPicture("Actor_" + members[i]._actorId)
		};
	};
	if (String(Moghunter.actor_cm2_visible) === "true") {
		this._actor_cm2_img = [];
		for (var i = 0; i < members.length; i++) {
			this._actor_cm2_img[members[i]._actorId] = ImageManager.loadPicture("Actor_" + members[i]._actorId + "b")
		};		
	};
};

//==============================
// * Update
//==============================
var _alias_mog_actorcm_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_alias_mog_actorcm_update.call(this);
	this.update_actor_cm();
};


//==============================
// * Update Actor CM
//==============================
Scene_Battle.prototype.update_actor_cm = function() {
	if (this.sprite_actor_cm_visible()) {
		if (this._actor_cm_data[0] != BattleManager.actor()) {this.actor_cm_refresh()};	
        if (this._sprite_actor_cm) {this.update_actor_cm_show()};
		if (this._sprite_actor_cm_lay) {this.update_actor_cm_lay_show()};
	} else {
        if (this._sprite_actor_cm) {this.update_actor_cm_hide()};
		if (this._sprite_actor_cm_lay) {this.update_actor_cm_lay_hide()};
	};
};

//==============================
// * Update Actor CM Show
//==============================
Scene_Battle.prototype.update_actor_cm_show = function() {	
	this._sprite_actor_cm.opacity += 15;
	if (this._sprite_actor_cm.x < this._actor_cm_data[1])
	   {this._sprite_actor_cm.x += 7;
	   	   if (this._sprite_actor_cm.x > this._actor_cm_data[1]) {this._sprite_actor_cm.x = this._actor_cm_data[1]}; 
	};
};

//==============================
// * Update Actor CM Hide
//==============================
Scene_Battle.prototype.update_actor_cm_hide = function() {
	this._sprite_actor_cm.opacity -= 15;
	if ( (this._sprite_actor_cm.x > this._actor_cm_data[3])) {
		this._sprite_actor_cm.x -= 7;
	    if (this._sprite_actor_cm.x < this._actor_cm_data[3]) {this._sprite_actor_cm.x = this._actor_cm_data[3]};
	};
};

//==============================
// * Update Actor CM Lay Show
//==============================
Scene_Battle.prototype.update_actor_cm_lay_show = function() {	
    this._sprite_actor_cm_lay.opacity += 15;
	if (this._sprite_actor_cm_lay.x > this._sprite_actor_cm_data[0])
	   {this._sprite_actor_cm_lay.x -= this._sprite_actor_cm_data[1];
	  if (this._sprite_actor_cm_lay.x < this._sprite_actor_cm_data[0]) {this._sprite_actor_cm_lay.x = this._sprite_actor_cm_data[0]};
	};
};

//==============================
// * Update Actor CM Lay Hide
//==============================
Scene_Battle.prototype.update_actor_cm_lay_hide = function() {
	this._sprite_actor_cm_lay.opacity -= 15;
	if ( (this._sprite_actor_cm_lay.x < Graphics.boxWidth)) {
		this._sprite_actor_cm_lay.x += this._sprite_actor_cm_data[1];
	    if (this._sprite_actor_cm_lay.x > Graphics.boxWidth) {this._sprite_actor_cm_lay.x = Graphics.boxWidth};
	};
};

//==============================
// * Actor CM Refresh
//==============================
Scene_Battle.prototype.actor_cm_refresh = function() {
	this._actor_cm_data[0] = BattleManager.actor();
	var actor_id = this._actor_cm_data[0]._actorId
	if (this._sprite_actor_cm) {
		if (!this._actor_cm_img[actor_id]) {
			this._actor_cm_img[actor_id] = ImageManager.loadPicture("Actor_" + String(actor_id))
		};
		this._sprite_actor_cm.bitmap = this._actor_cm_img[actor_id];
		this._sprite_actor_cm.opacity = 0;	
		this._sprite_actor_cm.x = this._actor_cm_data[3];
		if (this._sprite_actor_cm.bitmap.isReady()) {
			this._sprite_actor_cm.y = this._actor_cm_data[2] + Graphics.boxHeight - this._sprite_actor_cm.bitmap.height;
		};
    };	
	if (this._sprite_actor_cm_lay) {
		if (!this._actor_cm2_img[actor_id]) {
			this._actor_cm2_img[actor_id] = ImageManager.loadPicture("Actor_" + String(actor_id) + "b");
		};		
		this._sprite_actor_cm_lay.bitmap = this._actor_cm2_img[actor_id];
		if (this._actor_cm2_img[actor_id].isReady()) {
     	   this._sprite_actor_cm_data[0] = Graphics.boxWidth - this._sprite_actor_cm_lay.bitmap.width + Moghunter.actor_cm2_x;
	       this._sprite_actor_cm_data[1] = Math.max((this._sprite_actor_cm_lay.bitmap.width / 13),1);
	    };
		this._sprite_actor_cm_lay.x = Graphics.boxWidth + Moghunter.actor_cm2_x;
		this._sprite_actor_cm_lay.opacity = 0;
		this._sprite_actor_cm_lay.visible = true;
	};
};

//==============================
// * Sprite Actor CM Visible
//==============================
Scene_Battle.prototype.sprite_actor_cm_visible = function() {
	if (!BattleManager.actor()) {return false};
	if(this._actorWindow.active) {return false};
	if(this._enemyWindow.active) {return false};
	if(this._partyCommandWindow.active) {return false};
	return true;
};