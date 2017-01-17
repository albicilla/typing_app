phina.globalize();

var SCREEN_WIDTH    = 1280;
var SCREEN_HEIGHT   = 960;
var PIECE_SIZE      = 130;
var PIECE_SIZE_HALF = PIECE_SIZE/2;

var ASSETS = {
  sound: {
    'correct': './assets/sounds/correct.mp3',
    'bgm':'./assets/sounds/bgm_maoudamashii_neorock73.ogg',
    'se':'./assets/sounds/short_punch1.mp3'
  },
};


phina.define("MainScene", {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });

    this.fromJSON({
      children: {
        wordGroup: {
          className: 'DisplayElement',
        },
        scoreLabel: {
          className: 'Label',
          text: '999',
          x: this.gridX.span(15),
          y: this.gridX.span(1),
          align: 'right',
        },
        stageLabel:{
          className:'Label',
          text:'Stage',
          x: this.gridX.span(10),
          y: this.gridX.span(1),
          align: 'right',
        }
      },
    });

    this.stage = 1;
    this.stageLabel.text = "stage"+this.stage;

    this.score = 0;
    this.scoreLabel.text = this.score + '';

    AssetManager.get('sound', 'bgm').play();

  },

  onkeydown: function(e) {
    var ch = String.fromCharCode(e.keyCode)
    var wordGroup = this.wordGroup;
    var result = wordGroup.children.some(function(word) {
      if (word.enable && word.text === ch) {
        word.disappear();
      //word.colorChange();
        return true;
      }
      return false;
    });

    if (result) {
      this.score += 1;
      this.scoreLabel.text = this.score + '';

      AssetManager.get('sound', 'se').play();
    }

    // space if push space
    if (e.keyCode === 32) {
      this.app.stop();
    }
  },

  update: function(app) {

    //stage1
    if (this.score < 10&&app.frame % 20 === 0) {
      this.createWord();
    }

    //stage2
    if (this.score >= 10 &&app.frame % 25 === 0) {
      this.stage=2;
      this.stageLabel.text = "stage"+this.stage;
      this.createWord2();
      this.createWord3();
    }

  },

  createWord: function() {
    var ascii = [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89];

    var ch = String.fromCharCode(ascii.pickup());
    //var ch = String.fromCharCode(65,66,79,85,84);
    var word = Word(ch).addChildTo(this.wordGroup);
    word.x = Math.randint(PIECE_SIZE_HALF, this.gridX.width-PIECE_SIZE_HALF);
    word.y = -100;

    word.onattack = function() {
      this.exit({
        score: this.score,
      });
    }.bind(this);

    return word;
  },
  createWord2: function() {
    var ascii = [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89];

    var ch = String.fromCharCode(ascii.pickup());
    //var ch = String.fromCharCode(65,66,79,85,84);
    var word = Word2(ch).addChildTo(this.wordGroup);
    word.x = Math.randint(PIECE_SIZE_HALF, this.gridX.width-PIECE_SIZE_HALF);
    word.y = -100;

    word.onattack = function() {
      this.exit({
        score: this.score,
      });
    }.bind(this);

    return word;
  },
  createWord3: function() {
    var ascii = [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89];

    var ch = String.fromCharCode(ascii.pickup());
    //var ch = String.fromCharCode(65,66,79,85,84);
    var word = Word3(ch).addChildTo(this.wordGroup);
    word.x = Math.randint(PIECE_SIZE_HALF, this.gridX.width-PIECE_SIZE_HALF);
    word.y = -100;

    word.onattack = function() {
      this.exit({
        score: this.score,
      });
    }.bind(this);

    return word;
  },



});

phina.define('Word', {
  superClass: 'Button',

  init: function(word) {
    this.superInit({
      width: PIECE_SIZE,
      height: PIECE_SIZE,
      text: word,
    //  fontColor:'red',
    });
    this.enable = true;
  },

  update: function() {
    this.y += 8;

    if (this.y > 960) {
      AssetManager.get('sound', 'bgm').stop();
      this.flare('attack');
      this.remove();
    }
  },



  disappear: function() {
    this.enable = false;
    this.tweener
      .to({
        scaleX: 2,
        scaleY: 2,
        alpha:0,
      }, 250)
      .call(function() {
        this.target.remove();
      })
      ;
  }
});

phina.define('Word2', {
  superClass: 'Button',

  init: function(word) {
    this.superInit({
      width: PIECE_SIZE,
      height: PIECE_SIZE,
      text: word,
    //  fontColor:'red',
    });
    this.enable = true;
  },

  update: function() {
    this.y += 8;
    this.x += 2;

    if(this.x <0 || this.x>1280-PIECE_SIZE_HALF){
      this.x -= 4;
    }
    if (this.y > 960) {
      AssetManager.get('sound', 'bgm').stop();
      this.flare('attack');
      this.remove();
    }
  },



  disappear: function() {
    this.enable = false;
    this.tweener
      .to({
        scaleX: 2,
        scaleY: 2,

      }, 250)
      .call(function() {
        this.target.remove();
      })
      ;
  }
});

phina.define('Word3', {
  superClass: 'Button',

  init: function(word) {
    this.superInit({
      width: PIECE_SIZE,
      height: PIECE_SIZE,
      text: word,
    //  fontColor:'red',
    });
    this.enable = true;
  },

  update: function() {
    this.y += 8;
    this.x -= 2;

    if(this.x <PIECE_SIZE_HALF || this.x>1280-PIECE_SIZE_HALF){
      this.x += 4;
    }
    if (this.y > 960) {
      AssetManager.get('sound', 'bgm').stop();
      this.flare('attack');
      this.remove();
    }
  },



  disappear: function() {
    this.enable = false;
    this.tweener
      .to({
        scaleX: 2,
        scaleY: 2,

      }, 250)
      .call(function() {
        this.target.remove();
      })
      ;
  }
});


phina.main(function() {
  var app = GameApp({
    title: 'typing game',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
    startLabel: location.search.substr(1).toObject().scene || 'title',
  });

  app.enableStats();

  app.run();
});
