

var top250={
    init:function(){
        console.log('us ok');
        this.index=0;
        this.isLoading=false;
        this.isFinish=false;
        this.$container=$('.container')

        this.bind()
        this.start()


    },
    bind:function(){
      let that=this;//保证回调函数里面的this始终指向top250
        this.$container.on('scroll',function(){
          that.start();
      })
    },
    start:function(){
        let that=this;//保证回调函数里面的this始终指向top250
        this.getData(function(data){
            that.drawing(data);
        })
    },
    getData:function(callback){
        let that =this;
        if(that.isLoading) return;
        that.isLoading=true;
        that.$container.find('.loading').show();
        // ajax请求数据
        $.ajax({
            url:'http://api.douban.com/v2/movie/top250',
            type:'GET',
            data:{
                start:that.index,
                count:20
            },
            dataType:'jsonp'
        }).done(function(ret){
            console.log(ret)
            that.index+=20;
            if(that.index>=ret.total){
                that.isFinish=true;
            }
            callback&&callback(ret)
        }).fail(function(){
            console.log('数据异常');
        }).always(function(){
            that.isLoading=false;
            that.$container.find('.loading').hide();
        });



    },
    drawing:function(data){
        let that=this;
        data.subjects.forEach(function(movie){
            var model=`
        <div class="item">
            <a href="#" class="clearfix">
                <div class="cover">
                    <img src="http://img1.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg" alt="第一张剧照">

                </div>
                <div class="detail">
                    <h2>肖申克的救赎</h2>
                    <div class="extra">
                        <span class="score">9.3分 </span><span class="collect"> / 1000</span><span>收藏</span>
                    </div>
                    <div class="extra">
                        <span class="year">1994 </span><span class="drama">/ 剧情、爱情</span>
                    </div>
                    <div class="extra">
                        <span>导演: </span><span class="director">张艺谋</span>
                    </div>
                    <div class="extra">
                        <span>主演:</span>
                        <span class="actors">张艺谋、巩俐、张曼玉</span>
                    </div>
                </div>
            </a>
        </div>
        `
            var $node=$(model)
            $node.find('.cover img').attr('src',movie.images.medium);
            $node.find('.detail h2').text(movie.title);
            $node.find('.extra .score').text(movie.rating.average+'分')
            $node.find('.extra .collect').text(' /'+movie.collect_count)
            $node.find('.extra .year').text(movie.year+'年')
            $node.find('.extra .drama').text('   '+movie.genres.join('/'))
            $node.find('.extra .director').text(function(){
                let directorArr=[];
                movie.directors.forEach(function(item){
                    directorArr.push(item.name);
                })
                return directorArr.join('、');
            });
            $node.find('.extra .actors').text(function(){
                let actorsArr=[];
                movie.casts.forEach(function(item){
                    actorsArr.push(item.name);
                });
                return actorsArr.join('、');
            });
           /* $node.appendTo($('.container'))*/

            that.$container.append($node);
            console.log('div:'+that.$container.height())
            console.log(that.$container.parents().parent().scrollTop())
        })
    },
    isToBottom:function(){
        console.log('div:'+this.$container.height())
        console.log(this.$('main').scrollTop())
        //return this.container.find('.item').height()*250<=$('main').scrollTop()
    }
};


/*

done(function(ret){
        console.log(ret);

        setData(ret);
        index+=20;
        console.log(index)
    }).fail(function(){
        console.log('error...');
    }).always(function(){
        isLoading=false;
        $('loading').hide();
    });
};

var clock;
$('main').scroll(function(){
    if(clock){
        clearTimeout(clock);
    }
    clock=setTimeout(function(){
        if(($('.item').height()*250)<=$('main').scrollTop()){
            alert('到底了');
        }else if($('section').eq(0).height()-600<=$('main').scrollTop()+$('main').height()){
            console.log('到15了');
            start();
        }
    },300);
});

// 拼装数据，拼装DOM

function setData(data){
    data.subjects.forEach(function(movie){
        var model=`
        <div class="item">
            <a href="#" class="clearfix">
                <div class="cover">
                    <img src="http://img1.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg" alt="第一张剧照">

                </div>
                <div class="detail">
                    <h2>肖申克的救赎</h2>
                    <div class="extra">
                        <span class="score">9.3分 </span><span class="collect"> / 1000</span><span>收藏</span>
                    </div>
                    <div class="extra">
                        <span class="year">1994 </span><span class="drama">/ 剧情、爱情</span>
                    </div>
                    <div class="extra">
                        <span>导演: </span><span class="director">张艺谋</span>
                    </div>
                    <div class="extra">
                        <span>主演:</span>
                        <span class="actors">张艺谋、巩俐、张曼玉</span>
                    </div>
                </div>
            </a>
        </div>
        `
        var $node=$(model)
        $node.find('.cover img').attr('src',movie.images.medium);
        $node.find('.detail h2').text(movie.title);
        $node.find('.extra .score').text(movie.rating.average+'分')
        $node.find('.extra .collect').text(' /'+movie.collect_count)
        $node.find('.extra .year').text(movie.year+'年')
        $node.find('.extra .drama').text('   '+movie.genres.join('/'))
        $node.find('.extra .director').text(function(){
            let directorArr=[];
            movie.directors.forEach(function(item){
                directorArr.push(item.name);
            })
            return directorArr.join('、');
        });
        $node.find('.extra .actors').text(function(){
            let actorsArr=[];
            movie.casts.forEach(function(item){
                actorsArr.push(item.name);
            });
            return actorsArr.join('、');
        });
        $('#top250').append($node)
    })
}
};*/
/*分割线*/
var usBox={
    init:function(){
        console.log('us ok');
    },
    bind:function(){},
    start:function(){}
};

var search={
    init:function(){
        console.log('search ok');
    },
    bind:function(){},
    start:function(){}
};

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
        var panels=this;
        this.$tabs.on('click',function(){
            $(this).addClass('active').siblings().removeClass('active');
            panels.$panels.eq($(this).index()).fadeIn().siblings().hide();
        });
    }
};
app.init();














