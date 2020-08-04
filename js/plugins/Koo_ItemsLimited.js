//=============================================================================
// Koo_ItemsLimited.js
//=============================================================================
/*:
 * @plugindesc (v1.1) 物品种类限制。可能会与其他物品插件冲突，请注意。
 * @author 范夏jk
 *
 * @param maxItemsType
 * @desc 最大种类数/格子数
 * @default 30
 *
 * @param maxItems
 * @desc 单个物品最大数
 * @default 99
 *
 * 作者：范夏jk
 * 转载、使用请署名
 * 更新日志
 * 1.1版 修正原来考虑不周到的部分，增加了限制单个物品最大数目的功能
 *
 */
 
 
Game_Party.prototype.maxItems = function(item) {
    return Number(PluginManager.parameters('Koo_ItemsLimited')['maxItems'] || 99);//修改单个物品的最大数
};
 
Game_Party.prototype.numItemsType = function() {
    var container = Object.keys($gameParty._items);
    return container.length;
};
 
Game_Party.prototype.maxItemsType = function() {
    return Number(PluginManager.parameters('Koo_ItemsLimited')['maxItemsType'] || 30);//修改物品种类的最大数
};
 
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    var container = this.itemContainer(item);
    if (container) {
        var lastNumber = this.numItems(item);
        var newNumber = lastNumber + amount;
        if (this.numItemsType() >= this.maxItemsType()&& !container.hasOwnProperty(item.id)) {
            console.log("你的格子已满");
        }else{
            container[item.id] = newNumber.clamp(0, this.maxItems(item));
            if (container[item.id] === 0) {
                delete container[item.id];
            }
            if (includeEquip && newNumber < 0) {
                this.discardMembersEquip(item, -newNumber);
            }
        }
        $gameMap.requestRefresh();
    }
};
