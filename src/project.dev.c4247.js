window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BeginGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eb047DzR0lHZ7OWWcHtl0c7", "BeginGame");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        Info_dlg: cc.Node
      },
      onLoad: function onLoad() {
        Global.gameover = 0;
        Global.gamepause = 0;
        Global.gamelevel = 1;
        Global.gamescore = 0;
        Global.gamesublevel = 1;
        Global.gamelevelscore = 0;
      },
      onStart: function onStart() {
        cc.director.loadScene("Game");
      },
      onInfo: function onInfo() {
        var anim = this.Info_dlg.getComponent(cc.Animation);
        anim.play("layerout");
      },
      onDlg: function onDlg() {
        this.Info_dlg.getComponent(cc.Animation).play("layerin");
      },
      onVolumeChange: function onVolumeChange() {
        Global.volume = !Global.volume;
      }
    });
    cc._RF.pop();
  }, {} ],
  BlockLine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5ae43rqOMNPsLDuh6p3f4EU", "BlockLine");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        block_count: cc.Integer,
        block: cc.Prefab,
        fog: cc.Prefab,
        r_blocks: []
      },
      start: function start() {},
      initBlocks: function initBlocks() {
        var top = 0, bottom = .834;
        this.block_count = 6;
        for (var i = 0; i < 6; i++) {
          var blocknode = cc.instantiate(this.block);
          blocknode.getComponent("Block").onChange(Math.round(8 * Math.random()));
          blocknode.getComponent(cc.Widget).isAbsoluteTop = false;
          blocknode.getComponent(cc.Widget).isAbsoluteBottom = false;
          blocknode.getComponent(cc.Widget).top = top;
          blocknode.getComponent(cc.Widget).bottom = bottom;
          top += .166;
          bottom -= .166;
          this.node.addChild(blocknode);
        }
      },
      onClickBlock: function onClickBlock(top) {
        this.node.getParent().getComponent("blockNode").onBlockClicked(top, this.node.getComponent(cc.Widget).left);
      },
      getBlockState: function getBlockState() {
        var row = [];
        var count = this.node.children.length;
        for (var i = count - 1; i >= 0; i--) row[count - i - 1] = this.node.children[i].getComponent("Block").block_flg;
        for (var i = row.length; i < 6; i++) row[i] = 0;
        return row;
      },
      setRemoveBlocks: function setRemoveBlocks(b_index) {
        this.r_blocks[this.r_blocks.length] = this.node.children.length - b_index - 1;
      },
      startFogBlock: function startFogBlock() {
        var fognode = cc.instantiate(this.fog);
        fognode.position = this.node.children[this.r_blocks[0]].position;
        fognode.getComponent(cc.Animation).play("fog");
        this.node.addChild(fognode);
        this.r_blocks = [];
      },
      getLineMark: function getLineMark() {
        var mark_arr = [];
        for (var i = 0; i < this.r_blocks.length; i++) {
          var t_mark = {
            left: 0,
            top: 0,
            mark: 0,
            type: 0,
            multi: 0
          };
          t_mark.left = this.node.getComponent(cc.Widget).left;
          t_mark.top = this.node.children[this.r_blocks[i]].getComponent(cc.Widget).top;
          var stat = this.node.children[this.r_blocks[i]].getComponent("Block").block_stat;
          if (4 == stat || 5 == stat || 7 == stat) t_mark.mark = 100; else if (6 == stat) {
            t_mark.mark = 10;
            t_mark.type = 1;
          } else if (8 == stat) {
            t_mark.mark = 10;
            t_mark.multi = 1;
            t_mark.type = 1;
          }
          mark_arr[mark_arr.length] = t_mark;
        }
        return mark_arr;
      },
      startRemoveBlocks: function startRemoveBlocks() {
        var t_down = [];
        for (var i = 0; i < this.node.children.length; i++) t_down[i] = {
          top: 0,
          bottom: 0
        };
        for (var i = 0; i < this.r_blocks.length; i++) for (var j = 0; j <= this.r_blocks[i]; j++) {
          t_down[j].top++;
          t_down[j].bottom++;
        }
        for (var i = 0; i < this.r_blocks.length; i++) {
          var fognode = cc.instantiate(this.fog);
          fognode.position = this.node.children[this.r_blocks[i]].position;
          fognode.getComponent(cc.Animation).play("fog");
          this.node.addChild(fognode);
          this.node.children[this.r_blocks[i]].destroy();
          this.block_count--;
        }
        for (var i = 0; i < t_down.length; i++) if (0 != t_down[i].top) {
          var t_top = this.node.children[i].getComponent(cc.Widget).top + .166 * t_down[i].top;
          var t_bottom = this.node.children[i].getComponent(cc.Widget).bottom - .166 * t_down[i].bottom;
          this.node.children[i].getComponent("Block").BlockDown(t_top, t_bottom);
        }
        if (0 == this.block_count) {
          var self = this;
          cc.tween(this.node).delay(.3).call(function() {
            self.node.destroy();
          }).start();
        }
        this.r_blocks = [];
      }
    });
    cc._RF.pop();
  }, {} ],
  Block: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b2b48e4ytlAzLF9BNvu6Xc+", "Block");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        block_stat: cc.Integer,
        block_flg: cc.Integer
      },
      start: function start() {},
      onChange: function onChange(state) {
        1 == state || 5 == state || 0 == state ? this.block_flg = 1 : 2 == state || 4 == state ? this.block_flg = 2 : 3 == state || 7 == state ? this.block_flg = 3 : 6 != state && 8 != state || (this.block_flg = 4);
        this.block_stat = 0 == state ? 1 : state;
        var self = this;
        cc.loader.loadRes("texture/block" + this.block_stat, cc.SpriteFrame, function(err, spriteFrame) {
          self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
      },
      onClickBlock: function onClickBlock() {
        this.node.getParent().getComponent("BlockLine").onClickBlock(this.node.getComponent(cc.Widget).top);
      },
      BlockDown: function BlockDown(t_top, t_bottom) {
        var _this = this;
        cc.tween(this.node.getComponent(cc.Widget)).to(.2, {
          top: t_top,
          bottom: t_bottom
        }, {
          progress: function progress(start, end, current, ratio) {
            return _this.progresscallback(start, end, ratio);
          }
        }).to(.07, {
          top: t_top - .05,
          bottom: t_bottom + .05
        }, {
          progress: function progress(start, end, current, ratio) {
            return _this.progresscallback(start, end, ratio);
          }
        }).to(.04, {
          top: t_top,
          bottom: t_bottom
        }, {
          progress: function progress(start, end, current, ratio) {
            return _this.progresscallback(start, end, ratio);
          }
        }).start();
      },
      progresscallback: function progresscallback(start, end, t) {
        try {
          this.node.getComponent(cc.Widget).enabled = true;
        } catch (e) {}
        return start + (end - start) * t;
      }
    });
    cc._RF.pop();
  }, {} ],
  Fog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d309ISIstKwpOZTuUaI2Cu", "Fog");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {
        var self = this;
        cc.tween(this.node).delay(.3).call(function() {
          self.node.destroy();
        }).start();
      }
    });
    cc._RF.pop();
  }, {} ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "197c9clbndF6Iq+nyMZ1Blf", "Game");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        guide_dlg: cc.Node,
        pause_dlg: cc.Node,
        level_dlg: cc.Node
      },
      makeResponsive: function makeResponsive(self) {
        var canvas = self.node.getComponent(cc.Canvas);
        var deviceResolution = cc.view.getFrameSize();
        var desiredRatio = canvas.designResolution.width / canvas.designResolution.height;
        var deviceRatio = deviceResolution.width / deviceResolution.height;
        if (deviceRatio >= desiredRatio) {
          canvas.fitHeight = true;
          canvas.fitWidth = false;
        } else if (deviceRatio < desiredRatio) {
          canvas.fitHeight = true;
          canvas.fitWidth = true;
        }
      },
      onLoad: function onLoad() {
        var _this = this;
        this.guide_dlg.active = true;
        this.makeResponsive(this);
        window.addEventListener("resize", function() {
          return _this.makeResponsive(_this);
        }, false);
      },
      onClose_guid: function onClose_guid() {
        this.guide_dlg.active = false;
      },
      onClose_pause: function onClose_pause() {
        this.pause_dlg.active = false;
      },
      onClose_level: function onClose_level() {
        this.level_dlg.active = false;
      },
      onPause_dlg: function onPause_dlg() {
        this.pause_dlg.active = true;
      }
    });
    cc._RF.pop();
  }, {} ],
  Globals: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dca88jpta1DuK/bXuQ1Lw8z", "Globals");
    "use strict";
    window.Global = {
      gameover: 0,
      gamepause: 0,
      gamelevel: 1,
      gamescore: 0,
      gamelevelscore: 0,
      gamesublevel: 1,
      volume: true
    };
    cc._RF.pop();
  }, {} ],
  Guide_dlg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c1ee3TLeDtCDrEYiXGmO1Vh", "Guide_dlg");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        guide_text: [ cc.Node ],
        index: 0
      },
      onLoad: function onLoad() {
        this.guide_text[0].active = true;
        this.guide_text[1].active = false;
        this.index = 0;
      },
      onPrev: function onPrev() {
        this.guide_text[this.index].active = false;
        0 === this.index ? this.index = this.guide_text.length - 1 : this.index--;
        this.guide_text[this.index].active = true;
      },
      onNext: function onNext() {
        this.guide_text[this.index].active = false;
        this.index === this.guide_text.length - 1 ? this.index = 0 : this.index++;
        this.guide_text[this.index].active = true;
      }
    });
    cc._RF.pop();
  }, {} ],
  Level_dlg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "994f7PfcrlGc7dwIlLJgR/8", "Level_dlg");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        level: cc.Label
      },
      start: function start() {
        level.string = "Level " + (Global.gamelevel + 1);
      },
      onHome: function onHome() {
        cc.director.loadScene("Splash");
        this.node.active = false;
      }
    });
    cc._RF.pop();
  }, {} ],
  Over_dlg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "716e2DnHM9Edr5+c+gBh4ad", "Over_dlg");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        gamescore: cc.Label,
        highscore: cc.Label
      },
      onLoad: function onLoad() {},
      onHome: function onHome() {
        cc.director.loadScene("Splash");
        this.node.active = false;
      },
      setScore: function setScore(gamescore, highscore) {
        this.gamescore.string = "Score: " + gamescore;
        this.highscore.string = "Best: " + highscore;
      }
    });
    cc._RF.pop();
  }, {} ],
  Pause_dlg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "287cbLQs3pHhKfBgDL21q36", "Pause_dlg");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      onHome: function onHome() {
        cc.director.loadScene("Splash");
        this.node.active = false;
      }
    });
    cc._RF.pop();
  }, {} ],
  Splash: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "527aam0To5AeYaCXZdm0Zxj", "Splash");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        loadingBar: cc.ProgressBar,
        SpriteMain: cc.Node
      },
      onLoad: function onLoad() {
        cc.view.adjustViewPort(true);
        cc.view.setDesignResolutionSize(cc.view.getFrameSize().width, cc.view.getFrameSize().height, cc.ResolutionPolicy.NO_BORDER);
        cc.view.resizeWithBrowserSize(true);
        cc.view.enableAutoFullScreen(true);
        this.loadingBar.progress = 0;
        this.schedule(function() {
          this.loadingBar.progress >= 1 && (this.SpriteMain.active = true);
          this.loadingBar.progress += .1;
        }, .3);
      }
    });
    cc._RF.pop();
  }, {} ],
  blockNode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "22bc4w96RZPq4OVadAiSHB7", "blockNode");
    "use strict";
    var storageManager = require("../storageManager");
    cc.Class({
      extends: cc.Component,
      properties: {
        blockline: cc.Prefab,
        moveTimer: cc.Integer,
        floor: cc.Node,
        ceil: cc.Node,
        level: cc.Label,
        sublevel: cc.Label,
        mark: cc.Label,
        over_dlg: cc.Node,
        level_dlg: cc.Node,
        complete_dlg: cc.Node,
        finish_move: 1,
        movecount: 0,
        dig: cc.Node,
        mousePos: cc.v2,
        digSpeed: cc.v2,
        digmoveflg: 0,
        selectedx: 0,
        selectedy: 0,
        mark_pre: cc.Prefab,
        mark_pos: cc.Node,
        Scene_node: cc.Node,
        mark_count: cc.Object,
        miner: cc.Node,
        firstmove: 0,
        woosh_audio: {
          default: null,
          type: cc.AudioClip
        },
        tap_audio: {
          default: null,
          type: cc.AudioClip
        },
        great_audio: {
          default: null,
          type: cc.AudioClip
        },
        punch_audio: {
          default: null,
          type: cc.AudioClip
        },
        score_audio: {
          default: null,
          type: cc.AudioClip
        },
        ball_audio: {
          default: null,
          type: cc.AudioClip
        },
        expo_audio: {
          default: null,
          type: cc.AudioClip
        }
      },
      start: function start() {
        Global.volume && cc.audioEngine.play(this.ball_audio, false, 100);
        var self = this;
        this.node.on("touchend", function(event) {
          0 == self.digmoveflg && (self.mousePos = cc.v2(event.getLocation().x, event.getLocation().y));
        });
        this.node.on("mousedown", function(event) {
          0 == self.digmoveflg && (self.mousePos = cc.v2(event.getLocation().x, event.getLocation().y));
        });
        this.onGameInit();
      },
      onGameInit: function onGameInit() {
        this.dig.zIndex = 999999;
        this.cloneBlockLine(0);
        Global.gamesublevel = 1;
        this.sublevel.string = Global.gamesublevel + "/" + (14 + 4 * Global.gamelevel);
        this.level.string = "LEVEL" + Global.gamelevel;
      },
      onGameStart: function onGameStart() {
        this.schedule(this.callback, 8);
      },
      callback: function callback() {
        this.moveBlock();
      },
      moveBlock: function moveBlock() {
        if (this.checkFinish()) return;
        Global.volume && cc.audioEngine.play(this.punch_audio);
        this.finish_move = 1;
        this.moveTimer = 0;
        this.cloneBlockLine(-100);
        this.movecount = 0;
        this.schedule(this.setMoveCount, .1);
      },
      setMoveCount: function setMoveCount() {
        this.unschedule(this.setMoveCount);
        for (var i = this.node.children.length - 1; i >= 0; i--) "dig" != this.node.children[i].name && this.node.children[i].getComponent(cc.Widget).left <= this.node.children[this.movecount].getComponent(cc.Widget).left + 100 && (this.movecount = i);
        this.schedule(this.moveCallback, .05);
        this.floor.getComponent(cc.Animation).play("floor");
        this.ceil.getComponent(cc.Animation).play("shake");
      },
      moveCallback: function moveCallback() {
        if (100 == this.moveTimer) {
          this.unschedule(this.moveCallback);
          Global.gamesublevel++;
          this.sublevel.string = Global.gamesublevel + "/" + (14 + 4 * Global.gamelevel);
          this.checkGameOver();
          this.finish_move = 0;
          return;
        }
        for (var i = this.node.children.length - 1; i >= this.movecount; i--) if ("dig" != this.node.children[i].name) {
          this.node.children[i].getComponent(cc.Widget).enabled = true;
          this.node.children[i].getComponent(cc.Widget).left += 20;
        }
        this.moveTimer += 20;
      },
      cloneBlockLine: function cloneBlockLine(left) {
        var blocknode = cc.instantiate(this.blockline);
        blocknode.getComponent(cc.Widget).left = left;
        blocknode.getComponent("BlockLine").initBlocks();
        this.node.addChild(blocknode);
      },
      onForceMove: function onForceMove() {
        if (0 == this.finish_move) {
          this.finish_move = 1;
          this.unschedule(this.callback);
          this.schedule(this.callback, 8);
          this.moveBlock();
        }
      },
      checkGameOver: function checkGameOver() {
        for (var i = 0; i < this.node.children.length - 1; i++) {
          var childnode = this.node.children[i];
          if (childnode.getComponent(cc.Widget).left >= 1e3) {
            Global.gameover = 1;
            Global.volume && cc.audioEngine.play(this.woosh_audio, false, 100);
            this.unschedule(this.callback);
            this.over_dlg.active = true;
            this.over_dlg.getComponent("Over_dlg").setScore(Global.gamescore, storageManager.getHighestScore());
          }
        }
      },
      onCloseOver: function onCloseOver() {
        for (var i = this.node.children.length - 2; i >= 0; i--) this.node.children[i].destroy();
        this.onGameInit();
        this.onGameStart();
      },
      onRestartGame: function onRestartGame() {
        this.onCloseOver();
        this.over_dlg.active = false;
        this.level_dlg.active = false;
        this.mark.string = Global.gamelevelscore;
      },
      onBlockClicked: function onBlockClicked(blocktop, lineleft) {
        var _this = this;
        if (0 == this.digmoveflg) {
          Global.volume && cc.audioEngine.play(this.tap_audio, false, 100);
          if (0 == this.firstmove) {
            this.firstmove = 1;
            this.finish_move = 0;
            this.onGameStart();
          }
          var self = this;
          this.dig.x = 1065;
          this.dig.y = 385;
          this.dig.setRotation(90);
          this.dig.zIndex = 999999;
          this.digSpeed = cc.v2((this.mousePos.x - this.dig.x) / 10, (this.mousePos.y - this.dig.y) / 10);
          this.digmoveflg = 0;
          self.miner.getComponent(cc.Animation).play("digup");
          cc.tween(this.node).delay(.1).call(function() {
            _this.dig.active = true;
            self.schedule(self.digmove, .01);
          }).delay(.3).call(function() {
            self.miner.getComponent(cc.Animation).play("miner");
          }).start();
          this.selectedx = lineleft / 100;
          this.selectedy = 5 - blocktop / .166;
        }
      },
      digmove: function digmove() {
        this.digmoveflg++;
        this.dig.x += this.digSpeed.x;
        this.dig.y += this.digSpeed.y;
        this.dig.setRotation(Math.abs(this.dig.rotation) - 10);
        if (10 == this.digmoveflg) {
          cc.tween(this).to(.5, {
            digmoveflg: 0
          }).start();
          this.unschedule(this.digmove);
          this.dig.setRotation(90);
          this.dig.active = false;
          this.getRemovable();
        }
      },
      getRemovable: function getRemovable() {
        var column = [];
        for (var i = this.node.children.length - 2; i >= 0; i--) {
          if (i != this.node.children.length - 2 && !this.node.children[i].getComponent(cc.Widget).left <= this.node.children[i + 1].getComponent(cc.Widget).left + 100) for (var j = 0; j < parseInt((this.node.children[i].getComponent(cc.Widget).left - this.node.children[i + 1].getComponent(cc.Widget).left - 100) / 100); j++) column[column.length] = [];
          column[column.length] = this.node.children[i].getComponent("BlockLine").getBlockState();
        }
        var d_arr = this.computeDestroy(this.selectedx, this.selectedy, column);
        var line_arr = [];
        for (var i = 0; i < d_arr.length; i++) {
          var t_cnt = 0;
          for (var j = 0; j <= d_arr[i].x; j++) 0 == column[j].length && t_cnt++;
          d_arr[i].x -= t_cnt;
        }
        for (var i = 0; i < d_arr.length; i++) {
          var line_flg = 0;
          for (var j = 0; j < line_arr.length; j++) line_arr[j] == d_arr[i].x && line_flg++;
          0 == line_flg && (line_arr[line_arr.length] = d_arr[i].x);
          this.node.children[this.node.children.length - 2 - d_arr[i].x].getComponent("BlockLine").setRemoveBlocks(d_arr[i].y);
        }
        if (1 == d_arr.length) {
          this.node.children[this.node.children.length - 2 - line_arr[0]].getComponent("BlockLine").startFogBlock();
          return;
        }
        var mark_arr = [];
        for (var i = 0; i < line_arr.length; i++) {
          var line_mar = this.node.children[this.node.children.length - 2 - line_arr[i]].getComponent("BlockLine").getLineMark();
          for (var j = 0; j < line_mar.length; j++) mark_arr[mark_arr.length] = line_mar[j];
        }
        this.showMark(mark_arr);
        for (var i = 0; i < line_arr.length; i++) this.node.children[this.node.children.length - 2 - line_arr[i]].getComponent("BlockLine").startRemoveBlocks();
      },
      showMark: function showMark(mark_arr) {
        var _this2 = this;
        var cu_mark = 0;
        var total_mark = parseInt(this.mark.string);
        for (var i = 0; i < mark_arr.length; i++) if (0 != mark_arr[i].mark) {
          var marknode = cc.instantiate(this.mark_pre);
          var ma = mark_arr[i].mark;
          1 == mark_arr[i].type && (ma = mark_arr[i].mark * mark_arr.length);
          1 == mark_arr[i].multi && (ma *= 2);
          marknode.getComponent("mark").setmark(ma);
          this.Scene_node.addChild(marknode);
          marknode.getComponent(cc.Widget).enabled = true;
          marknode.getComponent(cc.Widget).left = mark_arr[i].left;
          marknode.getComponent(cc.Widget).isAbsoluteTop = false;
          marknode.getComponent(cc.Widget).top = mark_arr[i].top / .166 * .116 + .1;
          marknode.getComponent("mark").movePos(this.mark_pos.position);
          cu_mark += ma;
          total_mark += ma;
        }
        if (0 == cu_mark) {
          if (0 == Global.gamescore) return;
          Global.gamescore -= 1;
          this.mark.string = Global.gamescore.toString();
          return;
        }
        cu_mark >= 200 && Global.volume && cc.audioEngine.play(this.great_audio, false, 100);
        var self = this;
        this.mark_count = {
          count: 0
        };
        this.mark_count.count = parseInt(this.mark.string);
        cc.tween(this.mark_count).delay(.3).call(function() {
          Global.volume && cc.audioEngine.play(self.score_audio, false, 100);
        }).to(.2, {
          count: total_mark
        }, {
          progress: function progress(start, end, current, ratio) {
            return _this2.updateMark(start, end, current, ratio);
          }
        }).start();
        Global.gamescore = total_mark;
        storageManager.getHighestScore() < total_mark && storageManager.setHighestScore(total_mark);
      },
      updateMark: function updateMark(start, end, current, ratio) {
        var cu = parseInt(start + (end - start) * ratio);
        this.mark.string = cu.toString();
        return cu;
      },
      computeDestroy: function computeDestroy(x, y, columns) {
        var computed = [];
        var exists = function exists(x, y) {
          var column = columns[x];
          if (null == column) return false;
          var value = column[y];
          if (null == value) return false;
          return true;
        };
        var recCompute = function recCompute(x, y, numFilter) {
          if (!exists(x, y) || columns[x][y] != numFilter) return;
          for (var i = 0; i < computed.length; ++i) if (computed[i].x == x && computed[i].y == y) return;
          computed.push({
            x: x,
            y: y
          });
          recCompute(x, y - 1, numFilter);
          recCompute(x, y + 1, numFilter);
          recCompute(x - 1, y, numFilter);
          recCompute(x + 1, y, numFilter);
        };
        recCompute(x, y, columns[x][y]);
        return computed;
      },
      checkFinish: function checkFinish() {
        if (Global.gamesublevel == 4 * Global.gamelevel + 14) {
          this.unschedule(this.callback);
          this.complete_dlg.active = true;
          this.complete_dlg.getComponent(cc.Animation).play("layerout");
          this.digmoveflg = 0;
          Global.volume && cc.audioEngine.play(this.expo_audio, false, 100);
          return true;
        }
      },
      completedlg_over: function completedlg_over() {
        this.complete_dlg.getComponent(cc.Animation).play("layerin");
        var self = this;
        cc.tween(this.node).delay(.4).call(function() {
          self.level_dlg.active = true;
        }).start();
      },
      onLevelDlgover: function onLevelDlgover() {
        this.level_dlg.active = false;
        Global.gamelevelscore = Global.gamescore;
        this.mark.string = Global.gamescore;
        Global.gamelevel++;
        this.onCloseOver();
      }
    });
    cc._RF.pop();
  }, {
    "../storageManager": "storageManager"
  } ],
  mark: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "98bcbGYLnBD76lQfUfaMLgt", "mark");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {},
      setmark: function setmark(mark) {
        this.node.getComponent(cc.Label).string = "+" + mark;
      },
      movePos: function movePos(pos) {
        var self = this;
        cc.tween(this.node).delay(.2).to(.3, {
          position: cc.v2(pos.x, pos.y)
        }).call(function() {
          self.node.destroy();
        }).start();
      }
    });
    cc._RF.pop();
  }, {} ],
  storageManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f7aa0qZxrxJhJ7omun042Ei", "storageManager");
    "use strict";
    var storageManager = function() {
      var spriteFrameCache = null;
      cc.sys.localStorage.highestScore || (cc.sys.localStorage.highestScore = 0);
      return {
        getHighestScore: function getHighestScore() {
          return cc.sys.localStorage.highestScore;
        },
        setHighestScore: function setHighestScore(score) {
          cc.sys.localStorage.highestScore = score;
        }
      };
    }();
    module.exports = storageManager;
    cc._RF.pop();
  }, {} ]
}, {}, [ "Globals", "BeginGame", "Block", "BlockLine", "Fog", "Game", "Guide_dlg", "Level_dlg", "Over_dlg", "Pause_dlg", "Splash", "blockNode", "mark", "storageManager" ]);