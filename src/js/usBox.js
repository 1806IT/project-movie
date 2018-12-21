!function(){
    var view = document.$("#usBox")
    var usBox = {
        init: function () {
            console.log('usBox ok');
            this.$container = this.$element.find('.container')
            this.start();
        },

        start: function () {/*获取数据并渲染*/
            var self = this
            this.getData(function (data) {
                self.render(data)
            })

        },
        getData: function (callback) {/*获取数据*/
            var self = this
            self.$element.find('.loading').show();
            // ajax请求数据
            $.ajax({
                url: 'http://api.douban.com/v2/movie/us_box',

                dataType: 'jsonp'
            }).done(function (ret) {
                console.log(ret)
                callback && callback(ret)
            }).fail(function () {
                console.log('北美电影数据异常');
            }).always(function () {
                self.isLoading = false;
                self.$element.find('.loading').hide();
            })
        },
        render: function (data) {
            var self = this
            data.subjects.forEach(function (movie) {
                movie = movie.subject
                var template = `
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
                var $node = $(template)
                $node.find('a').attr('href', movie.alt)
                $node.find('.cover img').attr('src', movie.images.medium);
                $node.find('.detail h2').text(movie.title);
                $node.find('.extra .score').text(movie.rating.average + '分')
                $node.find('.extra .collect').text(' /' + movie.collect_count)
                $node.find('.extra .year').text(movie.year + '年')
                $node.find('.extra .drama').text('   ' + movie.genres.join('/'))
                $node.find('.extra .director').text(function () {
                    let directorArr = [];
                    movie.directors.forEach(function (item) {
                        directorArr.push(item.name);
                    })
                    return directorArr.join('、');
                });
                $node.find('.extra .actors').text(function () {
                    let actorsArr = [];
                    movie.casts.forEach(function (item) {
                        actorsArr.push(item.name);
                    });
                    return actorsArr.join('、');
                })
                self.$container.append($node)
            })
        }
    }  
}()
