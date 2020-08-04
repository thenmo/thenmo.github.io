/*:
 * 原理：
 * 把敌人当成格子，根据纵向绘制横向。
 * 缺点：
 * 1.每个敌人都需要添加注释，否则这个敌人会失踪……
 * 例如：<EnemyGrid:1>
 * 2.在敌群添加敌人时必须恰好填满每列最大格子数。
 * 例如：一列规定为4个格子时，依次放一个占1个格子的敌人+一个占2个格子的敌人+一个占1个格子的敌人则视为填满这一列。
 *       若依次放三个占1个格子的敌人+一个占2个格子的敌人则超出这列的最大格子数，会发生诡异的排列。
 * @author XMJL
 * @plugindesc  sort troop as grid.
 *
 * @param EnemyColGrid
 * @default 4
 *
 * @param EnemyGridWidth
 * @default 200
 *
 * @param EnemyGridHeight
 * @default 150
 *
 * @param ScreenLeft
 * @default 100
 *
 * @param ScreenTop
 * @default 100
 */
(function()
{
    var param = PluginManager.parameters('XMJL_SortEnemyGrid');
    var EnemyColGrid=Number(param['EnemyColGrid']);
    var EnemyGridWidth=Number(param['EnemyGridWidth']);
    var EnemyGridHeight=Number(param['EnemyGridHeight']);
    var ScreenLeft=Number(param['ScreenLeft']);
    var ScreenTop=Number(param['ScreenTop']);
    var EnemyType;
    var FillFull;
    var _Game_Enemy_initMembers=Game_Enemy.prototype.initMembers;
    Game_Enemy.prototype.initMembers=function()
    {
        _Game_Enemy_initMembers.call(this);
        EnemyType=new Array();
        FillFull=0;
    }
    Game_Enemy.prototype.screenX = function()
    {
        if($gameSystem.isSideView())
        return ScreenLeft+FillFull*EnemyGridWidth;
        else
        return this._screenX;
    };
 
   Game_Enemy.prototype.screenY = function() {
          if($gameSystem.isSideView())
          {
              var index=this.index();
              var enemy=this.enemy();
              var type= Number(enemy.meta.EnemyGrid);
              var lockAnchor=type*EnemyGridHeight/2;
              var lastgrid=XMJL_caluEnemyGrid(index,type);
              if(lastgrid==0)
                  return ScreenTop+lockAnchor;
              else
                  return ScreenTop+lastgrid*EnemyGridHeight+lockAnchor;
          }
          else
          return this._screenY;
    };
    var XMJL_caluEnemyGrid=function(index,type)
    {
        var sum;
         if(index==0)
         {
             sum=0;
             EnemyType[index]=type;
             return 0;
         }
         else
         {
             sum=EnemyType[index-1]+type;
             if(sum>=EnemyColGrid)
             {
                 FillFull++;
                 EnemyType[index]=sum%EnemyColGrid;
             }
             else
             EnemyType[index]=sum;
             return EnemyType[index-1];
         }
    }
})();
