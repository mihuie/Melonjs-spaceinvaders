game.PlayScreen = me.ScreenObject.extend({
    checkIfLoss: function (y) {
        if (y >= this.player.pos.y) {
            this.reset();
        }
    },
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        
        // reset the score
        game.data.score = 0;
      
        me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
        this.player = me.pool.pull("player");
        me.game.world.addChild(this.player, 1);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.SPACE, "shoot", true);

        this.enemyManager = new game.EnemyManager();
        this.enemyManager.createEnemies();
        me.game.world.addChild(this.enemyManager, 2);
      
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
      
        //function that makes score dynamic
        //more time longer i takes to complete the game less the bonus
        var counter=setInterval(timer, 800); 
        function timer()
        {
          game.data.bonus = game.data.bonus * 0.95;
          if (game.data.bonus <= 0.1)
            clearInterval(counter);
        }
    },


    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.A);
        me.input.unbindKey(me.input.KEY.D);
        me.input.unbindKey(me.input.KEY.SPACE);
    }
});
