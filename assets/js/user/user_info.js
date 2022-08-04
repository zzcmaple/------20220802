const form = layui.form;
// 自定义校验规则
form.verify({
  nickname: (val) => {
    if (val.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！';
  },
  email: [/@/, '邮箱格式错误'],
});

const layer = layui.layer;
// 初始化用户信息
const initUserInfo = () => {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    success: (res) => {
      if (res.status !== 0) return layer.msg('获取用户信息失败！');
      const { status, data, message } = res;
      if (status !== 0) return layer.msg(message);
      form.val('formUserInfo', data);
    },
  });
};

initUserInfo();
// 设置重置按钮
$('#resetBtn').click(function (e) {
  e.preventDefault();
  initUserInfo();
});

$('.layui-form').submit(function (e) {
  e.preventDefault();
  renderUserInfo();
});

// 更新用户信息函数

const renderUserInfo = () => {
  $.ajax({
    type: 'POST',
    url: '/my/userinfo',
    data: form.val('formUserInfo'),
    success: (res) => {
      const { status, message } = res;
      layer.msg(message);
      if (status !== 0) return;
      window.parent.getUserInfo();
    },
  });
};
