//==============================================================================
// MrTS_BattleCharacterLimit.js
//==============================================================================

/*:
* @plugindesc Changes character placement for battles.
* @author Mr. Trivel
* 
* @param Max Characters
* @desc 设置人物数量
* @default 4
*
* @param Characters Per Row
* @desc 设置人物数量
* @default 4
*
* @param Offset
* @desc Y坐标
* @default 120
* 
* @param Vertical Offset
* @desc X坐标
* @default 360
* 
* @param Lower Index
* @desc How further each character below is
* @default 48
*
* @param Forward Offset
* @desc Move the rows by an offset for each row in battle
* @default 100
*
* @param Row Spacing
* @desc Space between rows
* @default 100
*
* @param Vertical Chara Spacing
* @desc Space between rows
* @default 54
* 
* @help Version 1.1
*/

(function() {
	var parameters = PluginManager.parameters('人物战斗队伍');

	var maxCharacters = Number(parameters['Max Characters'] || 5);
	var charasPerRow = Number(parameters['Characters Per Row'] || 3);
	var rightOffset = Number(parameters['Offset'] || 120);
	var topOffset = Number(parameters['Vertical Offset'] || 360);
	var lowerCharaIndex = Number(parameters['Lower Index'] || 48);
	var forwardIndex = Number(parameters['Forward Offset'] || 100);
	var rowSpacing = Number(parameters['Row Spacing'] || 100);
	var charaVerticalSpacing = Number(parameters['Vertical Chara Spacing'] || 54);

	Game_Party.prototype.maxBattleMembers = function() {
	    return maxCharacters;
	};

	Sprite_Actor.prototype.setActorHome = function(index) {
		var c = Math.floor(index/charasPerRow);
		var x = (Graphics.boxWidth - rightOffset) - forwardIndex * Math.floor($gameParty.battleMembers().length/charasPerRow) + lowerCharaIndex * (index % charasPerRow) + rowSpacing * c;
		var y = topOffset + (index%charasPerRow) * charaVerticalSpacing;
	    this.setHome(x, y);
	};

})();