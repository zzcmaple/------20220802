$('#link_reg').on('click', function () {
  $('.login-box').hide();
  $('.reg-box').show();
});
$('#link_login').on('click', function () {
  $('.login-box').show();
  $('.reg-box').hide();
});
// @ ----------公用部分常量
const form = layui.form;
const layer = layui.layer;

// ?-------表单验证

form.verify({
  username: function (value, item) {
    //value：表单的值、item：表单的DOM对象
    if (!new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$').test(value)) {
      return '用户名不能有特殊字符';
    }
    if (/(^\_)|(\__)|(\_+$)/.test(value)) {
      return "用户名首尾不能出现下划线'_'";
    }
    if (/^\d+\d+\d$/.test(value)) {
      return '用户名不能全为数字';
    }

    //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
    if (value === 'xxx') {
      alert('用户名不能为敏感词');
      return true;
    }
  },

  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  repass: (value) => {
    const val = $('.reg-box [name=password').val();
    if (val !== value) return '两次密码输入的不一致';
  },
});

// ?------------- 注册请求ajax 提交数据

$('#form_reg').on('submit', function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: '/api/reguser',
    data,
    success: (res) => {
      const { status, message } = res;
      if (status !== 0) return layer.msg(message);
      layer.msg('注册成功，即将跳转登陆界面');
      setTimeout(function () {
        $('#link_login').click();
      }, 2000);
    },
  });
});

// ?------------- 登录请求ajax 提交数据

$('#form_login').on('submit', function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: '/api/login',
    data,
    success: (res) => {
      const { status, token } = res;
      if (status !== 0) return layer.msg('用户名或密码输入错误');

      localStorage.setItem('token', token);
      location.href = '../../index.html';
    },
  });
});
