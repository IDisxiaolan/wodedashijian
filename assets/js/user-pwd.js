$(() => {
    const { form, layer } = layui
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function(val) {
            if (val !== $('#newPass').val()) return '新旧密码不一致'
        }
    })
    $('.layui-form').submit(function(e) {
        e.preventDefault()

        $.ajax({
            method: 'post',
            url: 'http://ajax.frontend.itheima.net/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('原密码错误')
                layer.msg('更新密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })

})