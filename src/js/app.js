
/*各个页面程序*/


/*主程序*/
var app={
    init:function(){
        this.$tabs=$('footer>div');
        this.$panels=$('section');
        this.bind();
        top250.init();
        usBox.init();
        search.init();
    },
    bind:function(){
        var self=this;
        this.$tabs.on('click',function(){
            $(this).addClass('active').siblings().removeClass('active');
            self.$panels.eq($(this).index()).fadeIn().siblings().hide();
        });
    }
};
app.init();


