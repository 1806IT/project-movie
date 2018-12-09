$('footer>div').on('click',function(){
    let index=$(this).index();
    $('section').hide().eq(index).fadeIn();
    $(this).siblings().removeClass('active').end().addClass('active');
})
// ajax请求数据
$.ajax({
    url:'http://api.douban.com/v2/movie/top250',
    type:'GET',
    data:{
        start:0,
        count:20
    },
    dataType:'jsonp'
}).done(function(ret){
    console.log(ret)
}).fail(function(){
    console.log('error...')
})
// 拼装数据，拼装DOM
function setData(data){
    data.subjects.forEach(function(movie){
        var tpl=``
        var node=
    })
}