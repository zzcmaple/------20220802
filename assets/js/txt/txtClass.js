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

const form = layui.form;
$('#addBtn').click(function () {
  layer.open({
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
      console.log(res);
    },
  });
});
