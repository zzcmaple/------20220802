// 1.1 获取裁剪区域的 DOM 元素
const $image = $('#image');
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview',
};

// 1.3 创建裁剪区域
$image.cropper(options);

// 点击上传事件

$('#uploadBtn').click(function () {
  $('#file').click();
});
const layer = layui.layer;

// 为文件上传框绑定 change 事件
$('#file').change((e) => {
  const fileList = e.target.files;
  if (fileList.length === 0) return layer.msg('请选择上传的图片！');

  // 1. 拿到用户选择的文件
  let file = fileList[0];
  // 2. 将文件，转化为路径
  var imgURL = URL.createObjectURL(file);
  // 3. 重新初始化裁剪区域
  $image
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', imgURL) // 重新设置图片路径
    .cropper(options); // 重新初始化裁剪区域
});

//  为确定按钮绑定点击事件
$('#sendBtn').click(function () {
  const dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100,
    })
    .toDataURL('image/png');
  $.ajax({
    type: 'POST',
    url: '/my/update/avatar',
    data: {
      avatar: dataURL,
    },
    success: (res) => {
      layer.msg(res.message);
      if (res.status !== 0) return;
      window.parent.getUserInfo();
    },
  });
});
