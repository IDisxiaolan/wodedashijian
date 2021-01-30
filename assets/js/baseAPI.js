axios.defaults.baseURL = 'http://ajax.frontend.itheima.net';
$(() => {
    $.ajaxPrefilter(function(options) {
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        //不论请求成功失败都执行
        options.complete = function(res) {
            if (res.responseJSON.message == "身份认证失败！") {
                //清空token;返回登陆页
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    })
})