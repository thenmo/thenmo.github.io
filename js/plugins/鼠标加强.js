//=============================================================================
// TDDP_MouseSystemEx.js
// Version: 1.8.1
//=============================================================================
Sprite_Destination.prototype.initialize = Sprite.prototype.initialize;
Sprite_Destination.prototype.update = function () {};
var Imported = Imported || {};
Imported.TDDP_MouseSystemEx = "1.8.1";

//=============================================================================
/*:
 * @plugindesc 1.8.1定制鼠标光标,突出菜单项在徘徊,自定义事件鼠标交互和更多!看帮助。                  id:TDDP_MouseSystemEx
 *
 * @author Tor Damian Design / Galenmereth
 *
 * @param ---Custom Cursor---
 * @desc 这是一个标题,不需要碰它。
 * @default
 *
 * @param Use Custom Cursor?
 * @desc 您是否想要使用一个自定义鼠标光标图像。
 * true => ON       false => OFF
 * @default false
 *
 * @param Custom Cursor Image
 * @desc 自定义光标的文件名。看起来对这个项目的自定义光标文件夹。
 * @default default.png
 *
 * @param Custom Cursors Folder
 * @desc 您希望存储自定义游标的文件夹。必须以斜杠结束。默认值: img/cursors/
 * @default img/cursors/
 *
 * @param ---Auto Change Cursors---
 * @desc 选择时自动改变鼠标光标悬停在事件与给定事件命令。
 * @default
 *
 * @param Show Text Cursor
 * @desc 自动显示自定义光标悬停事件时图像显示文本命令。
 *
 * @param Transfer Cursor
 * @desc 悬停时自动显示自定义光标图像与转会球员命令事件。
 *
 * @param Change Gold Cursor
 * @desc 悬停事件时自动显示自定义光标图像改变黄金的命令。
 *
 * @param Change Items Cursor
 * @desc 悬停事件时自动显示自定义光标图像变化项命令。
 *
 * @param Change Weapons Cursor
 * @desc 悬停事件时自动显示自定义光标图像改变武器的命令.
 *
 * @param Change Armors Cursor
 * @desc 悬停时自动显示自定义光标图像与改变铠甲命令事件。
 *
 * @param Battle Processing Cursor
 * @desc 时自动显示光标悬停在事件中处理命令。
 *
 * @param ---Auto Change Icons---
 * @desc 选择时自动显示图标悬停事件与给定事件命令。
 * @default
 *
 * @param Show Text Icon
 * @desc 悬停事件时自动显示这个图标,显示文本命令。
 *
 * @param Transfer Icon
 * @desc 悬停时自动显示这个图标与转会球员命令事件。
 *
 * @param Change Gold Icon
 * @desc 悬停事件时自动显示这个图标改变黄金的命令。
 *
 * @param Change Items Icon
 * @desc 悬停事件与变化时自动显示这个图标项命令。
 *
 * @param Change Weapons Icon
 * @desc 悬停事件时自动显示这个图标改变武器的命令。
 *
 * @param Change Armors Icon
 * @desc 悬停事件与变化时自动显示这个图标铠甲命令。
 *
 * @param Battle Processing Icon
 * @desc 时自动显示这个图标悬停事件中处理命令。
 *
 * @param ---Hover Select---
 * @desc 这是一个标题,不需要碰它。
 * @default
 *
 * @param Highlight On Hover
 * @desc 选中菜单项时用鼠标悬停。
 * true => ON       false => OFF
 * @default false
 *
 * @param Hover SE Cooldown
 * @desc 音频之间的冷却时间(帧)玩光标SE突出在悬停时设置为true。默认的4。
 * @default 4
 *
 * @param ---Customizeable Notetags---
 * @desc 这些都是通过鼠标交互选项激活事件而非玩家角色。
 * @default
 *
 * @param No Auto Cursor Notetag
 * @desc notetag用于禁用自动光标切换事件或事件页面。
 * @default no_auto_cursor!
 *
 * @param No Auto Icon Notetag
 * @desc notetag用于禁用自动图标打开这个事件或事件页面。
 * @default no_auto_icon!
 *
 * @param Click Notetag
 * @desc notetag用来当点击触发事件。
 * Default: click_activate!
 * @default click_activate!
 *
 * @param Hover Notetag
 * @desc notetag用于触发事件当鼠标。
 * Default: hover_activate!
 * @default hover_activate!
 *
 * @param Leave Notetag
 * @desc notetag用于触发事件当鼠标离开它。
 * Default: leave_activate!
 * @default leave_activate!
 *
 * @param ---Mouse Icons---
 * @desc 这是一个标题,不需要碰它。
 * @default
 *
 * @param Hide Cursor
 * @desc 隐藏图标显示时默认的鼠标光标。
 * true => ON       false => OFF
 * @default false
 *
 * @param Icon Offset X
 * @desc 图标的抵消鼠标水平。
 * Default: 9
 * @default 9
 *
 * @param Icon Offset Y
 * @desc 从垂直鼠标图标的偏移。
 * Default: 14
 * @default 14
 *
 * @param ---Mouse Icon Tags---
 * @desc 这是一个标题,不需要碰它。
 * @default
 *
 * @param Icon Tag 1
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default quest: 191
 *
 * @param Icon Tag 2
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default chest: 210
 *
 * @param Icon Tag 3
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default door: 106
 *
 * @param Icon Tag 4
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default world_map: 190
 *
 * @param Icon Tag 5
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default potion: 176
 *
 * @param Icon Tag 6
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default poison: 177
 *
 * @param Icon Tag 7
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default four_leaf_clover: 182
 *
 * @param Icon Tag 8
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default notebook: 187
 *
 * @param Icon Tag 9
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default letter: 192
 *
 * @param Icon Tag 10
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default key: 195
 *
 * @param Icon Tag 11
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default key: 195
 *
 * @param Icon Tag 12
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default key: 195
 *
 * @param Icon Tag 13
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default key: 195
 *
 * @param Icon Tag 14
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default key: 195
 *
 * @param Icon Tag 15
 * @desc 建立一个快捷方式图标标签使用用鼠标悬停图标notetag。有关更多信息,请参见插件帮助。
 * @default key: 195
 *
 * @help =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * Information
 * =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 *TDDP——MouseSystem修改基于鼠标的方法的集合
*在你的游戏互动。你可以设置自定义鼠标指针,显示图标旁边
*鼠标悬停事件时,通过鼠标激活事件等等。
*
*更新和易于使用的文档,请到插件的网站:
* http://mvplugins.tordamian.com/?p=26
*
*有你也可以下载一个PDF文档的离线使用,和
*拥有提供的文档在一个干净的地方意味着你可以
*一定是最近的。
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Terms & Conditions
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 这个插件是免费的非商业和商业用途。请参阅
* http://mvplugins.tordamian.com/terms-of-use以获得完整的使用条款。
*
*大感谢Degica使这个插件免费用于商业用途
*每个人!
 */
//=============================================================================
// All anonymous/helper functions are registered on this object for the convenience of other plugins.
var TDDP_MouseSystemEx = {};
(function($) {
    "use strict";
    /**
    * Return .png if no file extension present in filename
    */
    $._ext = function(filename) {
        if (String(filename).split(".").length > 1) {
            return filename;
        } else {
            // Default filetype extension
            return filename + ".png";
        }
    }
    //=============================================================================
    // Setting up parameters
    //=============================================================================
    var parameters = $plugins.filter(function(p){return p.description.contains("id:TDDP_MouseSystemEx")})[0].parameters;
    // Auto change cursors
    $.showTextCursor         = String(parameters['Show Text Cursor']) || false;
    $.changeGoldCursor       = String(parameters['Change Gold Cursor']) || false;
    $.changeItemCursor       = String(parameters['Change Items Cursor']) || false;
    $.changeWeaponCursor     = String(parameters['Change Weapons Cursor']) || false;
    $.changeArmorCursor      = String(parameters['Change Armors Cursor']) || false;
    $.transferPlayerCursor   = String(parameters['Transfer Cursor']) || false;
    $.battleProcessingCursor = String(parameters['Battle Processing Cursor']) || false;
    // Auto change icons
    $.showTextIcon         = String(parameters['Show Text Icon']) || false;
    $.changeGoldIcon       = String(parameters['Change Gold Icon']) || false;
    $.changeItemIcon       = String(parameters['Change Items Icon']) || false;
    $.changeWeaponIcon     = String(parameters['Change Weapons Icon']) || false;
    $.changeArmorIcon      = String(parameters['Change Armors Icon']) || false;
    $.transferPlayerIcon   = String(parameters['Transfer Icon']) || false;
    $.battleProcessingIcon = String(parameters['Battle Processing Icon']) || false;
    // Settings
    $.highlightOnHover     = Boolean(parameters['Highlight On Hover'] === 'true' || false);
    $.audioCooldownOnHover = Number(parameters['Hover SE Cooldown'] || 4)
    $.hideCursor           = Boolean(parameters['Hide Cursor']        === 'true' || false);
    $.iconOffsetX          = Number(parameters['Icon Offset X']) || 0;
    $.iconOffsetY          = Number(parameters['Icon Offset Y']) || 0;
    $.noAutoCursorNotetag  = String(parameters['No Auto Cursor Notetag']);
    $.noAutoIconNotetag    = String(parameters['No Auto Icon Notetag']);
    $.clickToActivateNote  = String(parameters['Click Notetag']);
    $.hoverToActivateNote  = String(parameters['Hover Notetag']);
    $.leaveToActivateNote  = String(parameters['Leave Notetag']);
    $.useCustomCursor      = Boolean(parameters['Use Custom Cursor?'] === 'true' || false);
    $.cursorImage          = $._ext(String(parameters['Custom Cursor Image']));
    $.defaultCursorImage   = $.cursorImage;
    $.customCursorPath     = String(parameters['Custom Cursors Folder']);

    $._cursorFilenameInUse = null;   // Helper to compare changes
    $._lastUpdateFrame     = 0;      // Last frame cursor got updated
    $._cssClassPrefix      = "TDDP_customCursor_";
    $._indexFilename       = "_index.json";

    // Add all mouse icon tags
    $.mouseIconTags        = {}
    for(var i = 1; i <= 15; ++i) {
        var tag = parameters['Icon Tag ' + i]
        if (!tag) continue;
        tag = tag.split(":");
        var key = tag[0];
        var val = tag[1].replace(' ', '');
        $.mouseIconTags[key] = val;
    }
    /**
    * Load and setup the custom cursor CSS additions
    */
    $._loadAndSetupCustomCursorCSS = function() {
        var xhr = new XMLHttpRequest();
        var url = this.customCursorPath + this._indexFilename;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = function() {
            if (xhr.status < 400) {
                var dummyContainerElement = document.createElement('div');
                dummyContainerElement.id = "TDD_MS_CursorDummies";
                document.body.appendChild(dummyContainerElement);
                // Next we iterate the cached cursor list
                var classPrefix = this._cssClassPrefix;
                var cachedCursors = JSON.parse(xhr.responseText);
                for (var i=0, max=cachedCursors.length; i<max; i++) {
                    var cursor = cachedCursors[i];
                    var cursorName = cursor.split(".")[0];
                    var ox = 0;
                    cursorName = cursorName.replace(/_x(\d*)/g, function(m, p1) {
                        if (p1) ox = p1;
                        return "";
                    });
                    var oy = 0;
                    cursorName = cursorName.replace(/_y(\d*)/, function(m, p1){
                        if (p1) oy = p1;
                        return "";
                    });
                    var cursorPath = this.customCursorPath + cursor;
                    var sheet = window.document.styleSheets[0];
                    sheet.insertRule('.' + classPrefix + cursorName + ' { cursor: url(../' + cursorPath + ')' + ox + ' ' + oy + ', default; }', sheet.cssRules.length);
                    // To ensure all the cursors get prefetched by browsers, we create dummy divs to hold all the styles...
                    var dummyLoaderElement = document.createElement('div');
                    dummyLoaderElement.id = cursorName + "_dummy";
                    dummyContainerElement.appendChild(dummyLoaderElement);
                    dummyLoaderElement.className = classPrefix + cursorName;
                }
            }
        }.bind(this);
        xhr.onerror = function() {
            //
        };
        xhr.send();
    }
    /**
    * Pre-cache all custom cursors when in test mode
    */
    // Check if playtest; if so, store file. If not, read stored
    $._precacheCustomCursors = function() {
        if (StorageManager.isLocalMode() && Utils.isOptionValid('test')) {
            var fs = require('fs');
            // Find that relative local path, using MV's own methods
            var path = window.location.pathname.replace(/\/[^\/]*$/, '/' + this.customCursorPath);
            if (path.match(/^\/([A-Z]\:)/)) {
                path = path.slice(1);
            }
            path = decodeURIComponent(path);
            // Check if cursors dir exists, make if not
            if (!fs.existsSync(path)) {
                alert('TDDP MouseSystemEx\nThe chosen cursor folder "' + this.customCursorPath + '" has been created for you. Please put any custom cursor image files in this folder.');
                fs.mkdirSync(path);
            }
            // Read dir
            var files = fs.readdirSync(path).filter(function(v) {
                if(v != this._indexFilename && v[1]) return v;
            }.bind(this));
            // Store in json
            fs.writeFile(path + this._indexFilename, JSON.stringify(files), 'utf8', this._loadAndSetupCustomCursorCSS.bind(this));
        } else {
            // Read stored file
            this._loadAndSetupCustomCursorCSS();
        }
    }.apply(TDDP_MouseSystemEx);
    //=============================================================================
    // Game_Interpreter - register plugin commands
    //=============================================================================
    /**
    * Alias and extend pluginCommand
    */
    var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        Game_Interpreter_pluginCommand.call(this, command, args)
        if (command === 'SetCustomCursor')      $._setCustomCursor(args);
        if (command === 'ResetCustomCursor')    $._resetCustomCursor();
    };
    //=============================================================================
    // Helper functions
    //=============================================================================
    /**
    * Get events at x and y coordinates. Separate function for compatibility
    *
    * @method _eventsXy
    * @param x {Number} Map X coordinate
    * @param y {Number} Map Y coordinate
    * @return {Array} of events at given coordinates
    */
    $._eventsXy = function(x, y) {
        return $gameMap.eventsXy(x, y);
    }
    /**
    * Show custom cursor
    */
    $._showCustomCursor = function(filename) {
        var filename = filename || this.cursorImage;
        document.body.className = this._cssClassPrefix + filename.split(".")[0];
    }
    /**
    * Set new default custom cursor
    */
    $._setCustomCursor = function(filename) {
        this.cursorImage = filename;
        this._showCustomCursor(TouchInput.cursorImage);
    }
    /**
    * Reset custom cursor to parameter setting defaults
    */
    $._resetCustomCursor = function() {
        this._setCustomCursor(this.defaultCursorImage);
    }
    /**
    * Show the mouse cursor
    */
    $._showMouseCursor = function() {
        if (this.useCustomCursor) {
            this._showCustomCursor();
        } else {
            document.body.style.cursor = 'inherit';
        }
    }
    /**
    * Hide the mouse cursor
    */
    $._hideMouseCursor = function() {
        document.body.style.cursor = 'none';
    }
    /**
    * Return Comments from event page. Multiline comments require an additional check (408)
    */
    $._filterComments = function(pageListObject) {
        var comments = (pageListObject.code == 108 || pageListObject.code == 408) ? true : false;
        return comments;
    }
    /**
    * Return Show Text messages from event page
    */
    $._filterMessages = function(pageListObject) {
        return pageListObject.code == 401;
    }
    /**
    * Return Transfer Player events from event page
    */
    $._filterTransferPlayer = function(pageListObject) {
        return pageListObject.code == 201;
    }
    /**
    * Return Battle Processing events from event page
    */
    $._filterBattleProcess = function(pageListObject) {
        return pageListObject.code == 301;
    }
    /**
    * Return Change Gold events from event page
    */
    $._filterChangeGold = function(pageListObject) {
        return pageListObject.code == 125;
    }
    /**
    * Return Change Items events from event page
    */
    $._filterChangeItems = function(pageListObject) {
        return pageListObject.code == 126;
    }
    /**
    * Return Change Weapons events from event page
    */
    $._filterChangeWeapons = function(pageListObject) {
        return pageListObject.code == 127;
    }
    /**
    * Return Change Armors events from event page
    */
    $._filterChangeArmors = function(pageListObject) {
        return pageListObject.code == 128;
    }
    /**
    * Check if current scene is of the type Scene_Map
    */
    $._isSceneMap = function() {
        return (SceneManager._scene instanceof Scene_Map);
    }
    /**
    * Find a given notetag either in a game_event's Note box or Comment box on current active page
    */
    $._findInEventNotetags = function(game_event, notetag, onMatch) {
        if (!game_event.page()) return false;
        var comments   = game_event.page().list.filter(this._filterComments);
        var result     = null;
        var foundMatch = false;
        var matchInString = function(string) {
            result = string.match(notetag);
            if (result !== null) {
                foundMatch = true;
            }
        }
        // First see if there's a relevant page comment, has higher priority
        if (comments.length > 0) {
            comments.forEach(function(comment) {
                if (foundMatch) return;
                matchInString(comment.parameters[0]);
            })
        }
        // If nothing found in page comment, check Note box
        if (!foundMatch) {
            if (game_event.event().note) {
                matchInString(game_event.event().note);
            }
        }
        if (foundMatch){ onMatch.call(game_event, result); }
    }
    /**
    * Arrays of pairs of cursors/icons and filters to run to check if they should be used
    */
    $.autoCursorFilters = [
        // The order is the priority; the first match stops further lookup
        [$.battleProcessingCursor,  $._filterBattleProcess],
        [$.transferPlayerCursor,    $._filterTransferPlayer],
        [$.changeGoldCursor,        $._filterChangeGold],
        [$.changeItemCursor,        $._filterChangeItems],
        [$.changeWeaponCursor,      $._filterChangeWeapons],
        [$.changeArmorCursor,       $._filterChangeArmors],
        [$.showTextCursor,          $._filterMessages],
    ];
    $.autoIconFilters = [
        // The order is the priority; the first match stops further lookup
        [$.battleProcessingIcon,  $._filterBattleProcess],
        [$.transferPlayerIcon,    $._filterTransferPlayer],
        [$.changeGoldIcon,        $._filterChangeGold],
        [$.changeItemIcon,        $._filterChangeItems],
        [$.changeWeaponIcon,      $._filterChangeWeapons],
        [$.changeArmorIcon,       $._filterChangeArmors],
        [$.showTextIcon,          $._filterMessages],
    ];
    /**
    * Function to check whether conditions are prime to check for events under the mouse
    */
    $.conditionsValidForMouseHoverCheck = function() {
        return (SceneManager.isCurrentSceneStarted() && this._isSceneMap() &&
            $gameMap !== null &&
            $dataMap !== null &&
            !$gameMap._interpreter.isRunning());
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // START - Highlight On Hover option
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if ($.highlightOnHover){
        //=========================================================================
        // TouchInput modifications
        //=========================================================================
        /**
        * Removing the check for whether _mousePressed is active to facilitate hover events
        */
        TouchInput._onMouseMove = function(event) {
            var x = Graphics.pageToCanvasX(event.pageX);
            var y = Graphics.pageToCanvasY(event.pageY);
            this._onMove(x, y);
        };
        //=========================================================================
        // Window_Selectable modifications
        //=========================================================================
        /**
        * Aliased update function, adds processMouseMoved() call
        */
        var _Window_Selectable_update = Window_Selectable.prototype.update;
        Window_Selectable.prototype.update = function() {
            this.processMouseMoved();
            _Window_Selectable_update.call(this);
        };
        /**
        * Check if conditions are right for calling onTouch when using mouse movement (for hover activation)
        */
        Window_Selectable.prototype.processMouseMoved = function() {
            if (this.isOpenAndActive() && TouchInput.isMoved() && this.cursorIsWithinWindow()) {
                this.onTouch(false);
            }
        };
        /**
        * Check if cursor is within window
        */
        Window_Selectable.prototype.cursorIsWithinWindow = function() {
            var _x = this.canvasToLocalX(TouchInput.x);
            var _y = this.canvasToLocalY(TouchInput.y);
            if (_x > this.padding && _x <= this.width - this.padding) {
                if (_y > this.padding && _y < this.height - this.padding) {
                    return true;
                }
            }
            return false;
        }

        //=============================================================================
        // SoundManager modifications
        //=============================================================================
        /*
        * Static var to keep track of last played cursor SE frame
        */
        SoundManager._lastPlayCursorFrame = 0;
        /**
        * Aliased function to add check for whether playCursor should play, based on cooldown setting
        */
        var _SoundManager_playCursor = SoundManager.playCursor;
        SoundManager.playCursor = function() {
            var _canPlay = SoundManager._lastPlayCursorFrame > Graphics.frameCount
                || Graphics.frameCount > SoundManager._lastPlayCursorFrame + $.audioCooldownOnHover;

            if (_canPlay) {
                _SoundManager_playCursor.call(this);
                SoundManager._lastPlayCursorFrame = Graphics.frameCount;
            }
        };
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // END - Highlight On Hover option
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //=============================================================================
    // TouchInput modifications
    //=============================================================================
    /**
    * Alias and extend initialize() with _setupCursorIconObject()
    */
    var _TouchInput_initialize = TouchInput.initialize;
    TouchInput.initialize = function() {
        this._setupCursorIconObject();
        _TouchInput_initialize.call(this);
    };
    /**
    * Setup cursorIcon object
    */
    TouchInput._setupCursorIconObject = function() {
        this.cursorIcon           = new Sprite();
        this.cursorIcon.drawIcon  = Window_Base.prototype.drawIcon;
        this.cursorIcon.bitmap    = new Bitmap(Window_Base._iconWidth, Window_Base._iconHeight);
        this.cursorIcon.contents  = this.cursorIcon.bitmap;
        this.cursorIcon.iconIndex = null;
    }
    /**
    * Alias and extend _onMouseMove() to use new function _checkCursorStatus()
    */
    var _TouchInput_onMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function(event) {
        _TouchInput_onMouseMove.call(this, event);
        this._checkCursorStatus(event.pageX, event.pageY);
    };
    /**
    * Check cursor's status and whether to alter cursor
    * @method _checkCursorStatus
    * @param pageX {Number} Mouse page X coordinate
    * @param pageY {Number} Mouse page Y coordinate
    */
    TouchInput._checkCursorStatus = function(pageX, pageY) {
        // Check for events under mouse and perform actions, and get event in result
        var overEvents = this._checkForEventUnderMouse(pageX, pageY);

        // Update cursor icon position
        if (this.cursorIcon.iconIndex) {
            this.cursorIcon.x = Graphics.pageToCanvasX(pageX) +
                (this.cursorIcon.customOffsetX !== null ? this.cursorIcon.customOffsetX : $.iconOffsetX);
            this.cursorIcon.y = Graphics.pageToCanvasY(pageY) +
                (this.cursorIcon.customOffsetY !== null ? this.cursorIcon.customOffsetY : $.iconOffsetY);
            this.cursorIcon.visible = true;
        }

        // Check if leave activate is to be triggered for a previously active event
        this._activeEvents = this._activeEvents || [];
        while (this._activeEvents.length > 0) {
            var activeEvent = this._activeEvents.shift();
            if (activeEvent.TDDP_MS.leaveActivate) {
                if (!overEvents || overEvents.length == 0 || overEvents.indexOf(activeEvent) == -1) {
                    activeEvent.start();
                }
            }
        }
        // Reset active events if new over events
        this._activeEvents = overEvents || this._activeEvents;
    }
    /**
    * Alias and extend update() to store last event coords for checking if cursor has left an event
    */
    var _TouchInput_update = TouchInput.update;
    TouchInput.update = function() {
        _TouchInput_update.call(this);
        if (this._lastEventPageX == this._curEventPageX && this._lastEventPageY == this._curEventPageY) {
            this._checkCursorStatus(this._lastEventPageX, this._lastEventPageY);
        }
        this._lastEventPageX = this._curEventPageX;
        this._lastEventPageY = this._curEventPageY;
    }
    /**
    * Perform check for event under mouse and perform functions depending on parsed notetag properties
    * @method _checkForEventUnderMouse
    * @param pageX {Number} Mouse page X coordinate
    * @param pageY {Number} Mouse page Y coordinate
    * @return {Array} of found events or {Boolean} false if none.
    */
    TouchInput._checkForEventUnderMouse = function(pageX, pageY) {
        this._curEventPageX = pageX;
        this._curEventPageY = pageY;
        if ($.conditionsValidForMouseHoverCheck()) {
            var x = $gameMap.canvasToMapX(Graphics.pageToCanvasX(pageX));
            var y = $gameMap.canvasToMapY(Graphics.pageToCanvasY(pageY));
            var events = $._eventsXy(x, y);
            events.reverse().forEach(function(game_event) {
                if (game_event.TDDP_MS.hoverIcon) {
                    TouchInput._updateCursorIcon(game_event.TDDP_MS.hoverIcon);
                    if ($.hideCursor) $._hideMouseCursor();
                } else {
                    TouchInput._hideCursorIcon();
                };
                if (game_event.TDDP_MS.hoverActivate && !$gameMessage.isBusy()) {
                    game_event.start();
                };
                if (game_event.TDDP_MS.hideCursor) {
                    $._hideMouseCursor();
                };
                if (game_event.TDDP_MS.customOffsetX && game_event.TDDP_MS.customOffsetY) {
                    TouchInput.cursorIcon.customOffsetX = game_event.TDDP_MS.customOffsetX;
                    TouchInput.cursorIcon.customOffsetY = game_event.TDDP_MS.customOffsetY;
                };
                if ($.useCustomCursor) {
                    if (game_event.TDDP_MS.customCursor) {
                        $._showCustomCursor(game_event.TDDP_MS.customCursor);
                    } else {
                        $._showCustomCursor();
                    }
                };
                if (game_event.TDDP_MS.hoverSwitch) {
                    var key = [$gameMap._mapId, game_event._eventId, game_event.TDDP_MS.hoverSwitch.key]
                    $gameSelfSwitches.setValue(key, game_event.TDDP_MS.hoverSwitch.val === 'true')
                };
            });
            if (events && events.length > 0) return events;
        }
        // If no events found under cursor perform default actions
        TouchInput._hideCursorIcon();
        $._showMouseCursor();
        return false;
    };
    /**
    * Update the cursor icon
    * @method _updateCursorIcon
    * @param iconIndex {Number} The icon index to show next to the cursor
    */
    TouchInput._updateCursorIcon = function(iconIndex) {
        if (this.cursorIcon.iconIndex != iconIndex) {
            this.cursorIcon.iconIndex = iconIndex;
            this.cursorIcon.contents.clear();
            this.cursorIcon.drawIcon(iconIndex, 0, 0);
            this.cursorIcon.visible = false;
        }
    };
    /**
    * Hide the cursor icon
    * @method _hideCursorIcon
    */
    TouchInput._hideCursorIcon = function() {
        this.cursorIcon.iconIndex     = null;
        this.cursorIcon.visible       = false;
        this.cursorIcon.customOffsetX = null;
        this.cursorIcon.customOffsetY = null;
    }
    /**
    * Alias and extend _onTrigger() to only fire if we're not activating on click
    */
    var _TouchInput_onTrigger = TouchInput._onTrigger;
    TouchInput._onTrigger = function(x, y) {
        if (TouchInput._activateClickEvents(x, y)) {
            $gameTemp.clearDestination(); // Invalidate destination
        } else {
            _TouchInput_onTrigger.call(this, x, y);
        }
    };
    /**
    * Activate click events if valid and return true if so
    * @method _activateClickEvents
    * @param x {Number} Map X coordinate
    * @param y {Number} Map Y coordinate
    */
    TouchInput._activateClickEvents = function(x, y) {
        var found_click_event = false;
        if ($.conditionsValidForMouseHoverCheck()) {
            var x = $gameMap.canvasToMapX(x);
            var y = $gameMap.canvasToMapY(y);
            $._eventsXy(x, y).reverse().forEach(function(game_event) {
                if (game_event.TDDP_MS.clickActivate) {
                    game_event.start();
                    found_click_event = true;
                };
                if (game_event.TDDP_MS.clickSwitch) {
                    var key = [$gameMap._mapId, game_event._eventId, game_event.TDDP_MS.clickSwitch.key]
                    $gameSelfSwitches.setValue(key, game_event.TDDP_MS.clickSwitch.val === 'true');
                    found_click_event = true;
                };
            });
        }
        return found_click_event;
    }
    //=============================================================================
    // Spriteset_Map modifications
    //=============================================================================
    /**
    * Alias and extend createScreenSprites() to also create cursor icon holder sprite
    */
    var _Spriteset_Map_createScreenSprites = Spriteset_Map.prototype.createScreenSprites;
    Spriteset_Map.prototype.createScreenSprites = function() {
        _Spriteset_Map_createScreenSprites.call(this);
        this.createCursorIconSprite();
    };
    /**
    * Create a container sprite for the cursor icon
    */
    Spriteset_Map.prototype.createCursorIconSprite = function() {
        this._cursorIconSprite = new Sprite();
        this._cursorIconSprite.setFrame(0, 0, Graphics.width, Graphics.height);
        this._cursorIconSprite.addChild(TouchInput.cursorIcon);
        this.addChild(this._cursorIconSprite);
    };
    //=============================================================================
    // Game_Event modifications
    //=============================================================================
    /**
    * Alias and extend setupPage() to also setup mouse system properties
    */
    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
        _Game_Event_setupPage.call(this);
        this.setupMouseSystemProperties();
    };
    /**
    * Setup mouse system properties on events, for storing notetag parsing on page updates
    */
    Game_Event.prototype.setupMouseSystemProperties = function() {
        this.TDDP_MS                 = {};
        this.TDDP_MS.hoverIcon       = false;
        this.TDDP_MS.allowAutoCursor = true;
        this.TDDP_MS.allowAutoIcon   = true;
        this.TDDP_MS.clickActivate   = false;
        this.TDDP_MS.hoverActivate   = false;
        this.TDDP_MS.leaveActivate   = false;
        this.TDDP_MS.hideCursor      = false;
        this.TDDP_MS.customOffsetX   = false;
        this.TDDP_MS.customOffsetY   = false;
        this.TDDP_MS.customCursor    = false;
        this.TDDP_MS.clickSwitch     = false;
        this.TDDP_MS.hoverSwitch     = false;
        $._findInEventNotetags(this, /hover_icon\s(.*?);/i, function(result) {
            if (!result) return;
            result = result[result.length - 1];
            if ($.mouseIconTags[result]) {
                result = $.mouseIconTags[result];
            }
            this.TDDP_MS.hoverIcon = Number(result);
        });
        $._findInEventNotetags(this, $.noAutoCursorNotetag, function() {
            this.TDDP_MS.allowAutoCursor = false;
        });
        $._findInEventNotetags(this, $.noAutoIconNotetag, function() {
            this.TDDP_MS.allowAutoIcon = false;
        });
        $._findInEventNotetags(this, $.clickToActivateNote, function() {
            this.TDDP_MS.clickActivate = true;
        });
        $._findInEventNotetags(this, $.hoverToActivateNote, function() {
            this.TDDP_MS.hoverActivate = true;
        });
        $._findInEventNotetags(this, $.leaveToActivateNote, function() {
            this.TDDP_MS.leaveActivate = true;
        });
        $._findInEventNotetags(this, 'hide_cursor!', function() {
            this.TDDP_MS.hideCursor = true;
        });
        $._findInEventNotetags(this, /icon_offset\s(.*?)\s(.*?);/i, function(result) {
            this.TDDP_MS.customOffsetX = Number(result[1]);
            this.TDDP_MS.customOffsetY = Number(result[2]);
        });
        $._findInEventNotetags(this, /hover_cursor\s(.*?);/i, function(result) {
            this.TDDP_MS.customCursor = result[result.length - 1];
        });
        $._findInEventNotetags(this, /click_switch\s(.*?)\s(.*?);/i, function(result) {
            this.TDDP_MS.clickSwitch = {};
            this.TDDP_MS.clickSwitch.key = String(result[1]);
            this.TDDP_MS.clickSwitch.val = String(result[2]);

        });
        $._findInEventNotetags(this, /hover_switch\s(.*?)\s(.*?);/i, function(result) {
            this.TDDP_MS.hoverSwitch = {};
            this.TDDP_MS.hoverSwitch.key = String(result[1]);
            this.TDDP_MS.hoverSwitch.val = String(result[2]);
        });
        // If no active event page, there's no event commands to go through
        if (!this.page()) return;
        // Auto cursor checks, only if there's a page and allowed
        if (this.TDDP_MS.allowAutoCursor) {
            for (var i=0, max=$.autoCursorFilters.length; i < max; i++) {
                if (this.TDDP_MS.customCursor) break;
                var entry = $.autoCursorFilters[i];
                var cursor = entry[0];
                var filter = entry[1];
                if (typeof cursor == "string") {
                    var matches = this.page().list.filter(filter);
                    if (matches.length > 0) {
                        this.TDDP_MS.customCursor = cursor;
                    }
                }
            }
        }
        // Auto icon checks
        if (this.TDDP_MS.allowAutoIcon) {
            for (var i=0, max=$.autoIconFilters.length; i < max; i++) {
                if (this.TDDP_MS.hoverIcon) break;
                var entry = $.autoIconFilters[i];
                var icon = entry[0];
                var filter = entry[1];
                if (typeof icon == "string") {
                    var matches = this.page().list.filter(filter);
                    if (matches.length > 0) {
                        if (isNaN(icon)) {
                            // Icon is a string, so let's look in Icon Tags
                            icon = $.mouseIconTags[icon]
                        }
                        this.TDDP_MS.hoverIcon = Number(icon);
                    }
                }
            }
        }
    }
})(TDDP_MouseSystemEx);
