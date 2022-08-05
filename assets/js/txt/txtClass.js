const initArtCateList = () => {
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    success: (res) => {
      // 调用 template
      const htmlStr = template('tpl-table', res);
      $('tbody').empty().html(htmlStr);
    },
  });
};

initArtCateList();
let layerAdd = null;
const form = layui.form;
$('#addBtn').click(function () {
  layerAdd = layer.open({
    type: 1,
    area: ['500px', '250px'],
    title: '添加文章分类',
    content: $('#dialog-add').html(),
  });
});

$('body').on('submit', '#form-add', function (e) {
  e.preventDefault();
  $.ajax({
    type: 'POST',
    url: '/my/article/addcates',
    data: form.val('formAdd'),
    success: (res) => {
      const { status, message } = res;
      layer.msg(message);
      if (status !== 0) return;
      initArtCateList();
      layer.close(layerAdd);
    },
  });
});
// 通过事件委托方式，为 btn-edit 按钮绑定点击事件
let layerEdit = null;
$('tbody').on('click', '.btn-edit', function () {
  // 弹出修改文章分类的弹窗
  layerEdit = layer.open({
    type: 1,
    area: ['500px', '250px'],
    title: '修改文章分类',
    content: $('#dialog-edit').html(),
  });
  let id = $(this).attr('data-id');
  $.ajax({
    type: 'GET',
    url: '/my/article/cates/' + id,
    data: null,
    success: (res) => {
      const { data } = res;
      form.val('form-edit', data);
    },
  });
});

$('body').on('submit', '#form-edit', function (e) {
  e.preventDefault();
  $.ajax({
    type: 'POST',
    url: '/my/article/updatecate',
    data: form.val('form-edit'),
    success: (res) => {
      const { status, message } = res;
      if (status !== 0) return layer.msg(message);
      layer.close(layerEdit);
      initArtCateList();
    },
  });
});

$('tbody').on('click', '.btn-delete', function () {
  const id = $(this).attr('data-id');
  // 提示用户是否删除
  layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function (index) {
    $.ajax({
      method: 'GET',
      url: '/my/article/deletecate/' + id,
      success: function (res) {
        const { status, message } = res;
        if (status !== 0) return layer.msg(message);
        layer.msg(message);
        layer.close(index);
        initArtCateList();
      },
    });
  });
});
