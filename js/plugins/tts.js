//=================================================================================
// System Data Extend
// Developed by Lohengrin
// [url]https://github.com/Lo-Aidas[/url]
//=================================================================================
var ExData = ExData || {};
 
//Ex data load ===================================================================
var $dataClassesEx = null;
var $dataWeaponsEx = null;
var $dataArmorsEx = null;
var $dataStatesEx = null;
var $dataItemsEx = null;
var $dataEnemiesEx = null;
var $dataSkillsEx = null;
var $dataAbilities = null;
 
ExData.Files = [
        {name: '$dataClassesEx', src: 'ClassesEx.json'},
        {name: '$dataWeaponsEx', src: 'WeaponsEx.json'},
        {name: '$dataArmorsEx', src: 'ArmorsEx.json'},
        {name: '$dataStatesEx', src: 'StatesEx.json'},
        {name: '$dataItemsEx', src: 'ItemsEx.json'},
        {name: '$dataEnemiesEx', src: 'EnemiesEx.json'},
        {name: '$dataSkillsEx', src: 'SkillsEx.json' },
        {name: '$dataActorsEx', src: 'ActorsEx.json'},
        {name: '$dataAbilities', src: 'Abilities.json'}
];
DataManager._databaseFiles = DataManager._databaseFiles.concat(ExData.Files);
 
DataManager.loadDatabase = function() {
        var test = this.isBattleTest() || this.isEventTest();
        var prefix = test ? 'Test_' : '';
        for (var i = 0; i < this._databaseFiles.length; i++) {
                var name = this._databaseFiles[i].name;
                var src = this._databaseFiles[i].src;
                this.loadDataFile(name, prefix + src);
        }
        if (this.isEventTest()) {
                this.loadDataFile('$testEvent', prefix + 'Event.json');
        }
};
 
DataManager.isDatabaseLoaded = function() {
        this.checkError();
        for (var i = 0; i < this._databaseFiles.length; i++) {
                if (!window[this._databaseFiles[i].name]) {
                        return false;
                }
        }
 
        // combine extra data
        var  name;
        for (var i = 0; i < this._databaseFiles.length; i++) {
                name = this._databaseFiles[i].name;
                if (window[name+"Ex"]) {
                        for (var j = 0; j < window[name].length; j++) {
                                if(window[name][j]&&window[name+"Ex"][j]) {
                                        for (var key in window[name+"Ex"][j]) {
                                                window[name][j][key] = window[name+"Ex"][j][key];
                                        }
                                }
                        }
                }
        }
 
        return true;
};
