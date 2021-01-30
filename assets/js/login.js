$(() => {
    const { form, layer } = layui
    //密码框校验
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(val) {
            if (val !== $('#pass').val()) {
                return '两次密码不一致'
            }
        }
    });
    $('.link a').click(function() {
        $('.layui-form').toggle()
    })

    $('.reg-page').submit(function(e) {
        e.preventDefault()
        var info = $(this).serialize()
        axios.post('/api/reguser', info)
            .then(function(res) {
                console.log(res);
                if (res.data.status !== 0) return layer.msg('注册失败')
                layer.msg('注册成功')
            })
    })
    $('.login-page').submit(function(e) {
        e.preventDefault()
        var info = $(this).serialize()
        axios.post('/api/login', info)
            .then(function(res) {
                console.log(res);
                if (res.data.status !== 0) return layer.msg('登陆失败')
                layer.msg('登陆成功')
                location.href = '/index.html'
                localStorage.setItem('token', res.data.token)
            })
    })
})