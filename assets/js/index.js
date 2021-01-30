$(() => {
    const { form, layer } = layui

    function getuser_info() {
        $.ajax({
            method: 'get',
            url: 'http://ajax.frontend.itheima.net/my/userinfo',

            success: function(res) {
                if (res.message !== "获取用户基本信息成功！") return layer.msg('获取用户信息失败')
                layer.msg('获取用户信息成功')
                console.log(res);

                readerAvatar(res.data)
            }
        })
    }

    getuser_info()

    //渲染用户头像和用户名
    function readerAvatar(user) {
        var name = user.nickname || user.username
        $('.nm').text(' ' + name)
        if (user.user_pic == null) {
            $('.layui-nav-img').hide()
            var text = user.username[0].toUpperCase()
            $('.text-avatar').html(text)
        } else {
            $('.text-avatar').hide()

            $('.layui-nav-img').attr('url', user.user_pic).show()
        }
    }

    $('.tuichu').click(function() {
        localStorage.removeItem('token')
        location.href = '/login.html'
    })
})