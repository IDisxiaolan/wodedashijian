$(() => {
    const { form, layer } = layui

    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
                if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                    return '用户名不能有特殊字符';
                }
                if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                    return '用户名首尾不能出现下划线\'_\'';
                }
                if (/^\d+\d+\d$/.test(value)) {
                    return '用户名不能全为数字';
                }

                //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
                if (value === 'xxx') {
                    alert('用户名不能为敏感词');
                    return true;
                }
            }
            //我们既支持上述函数式的方式，也支持下述数组的形式
            //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
            ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    });

    function getuserinfo() {
        $.ajax({
            method: 'get',
            url: 'http://ajax.frontend.itheima.net/my/userinfo',
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                layer.msg('获取用户信息成功')
                form.val('userinfo', res.data)

            }
        })

    }
    getuserinfo()

    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: 'http://ajax.frontend.itheima.net/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('更新用户信息失败')
                layer.msg('更新用户信息成功')

            }
        })
    })
    $('.reset_btn').click(function(e) {
        e.preventDefault()
        getuserinfo()
    })
})