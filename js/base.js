$('footer>div').on('click',function(){
    let index=$(this).index();
    $('section').hide().eq(index).fadeIn();
    $(this).siblings().removeClass('active').end().addClass('active');
})
var index=0
var isLoading=false;

start()

function start(){
    if (isLoading){return;}
    isLoading=true;
    $('.loading').show();
    // ajax请求数据
    $.ajax({
        url:'http://api.douban.com/v2/movie/top250',
        type:'GET',
        data:{
            start:index,
            count:20
        },
        dataType:'jsonp'
    }).done(function(ret){
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

