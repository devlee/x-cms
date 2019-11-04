// CMS 1.0 删除商品图片脚本
// 作者 devlee@outlook.com
// 版权归作者所有 ©️2019

var getDeleteUrl = function (imgId, goodId, key) {
  return "https://cms.jjshouse.com/index.php?q=admin/main/goodsImages/viewType&_=" + new Date().getTime() + "&act=delete&img_id=" + imgId + "&is_delete=1&delete_type=normal&type=" + key + "&goods_id=" + goodId + "&is_operate_clone=0"
}
var doc = document.getElementById('_frm').contentWindow.document;
var ajaxDel = function (goodId, imgId, key) {
  var src = getDeleteUrl(imgId, goodId, key);
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status == 200) {
        console.log(`图片id:${imgId}删除成功`)
      } else {
        console.error(`图片id:${imgId}删除失败`)
      }
    }
  }
  xhr.open('get', src)
  xhr.send()
}
var runDel = function ({
  type,
  goodId,
  imgIdList,
  delHidden,
  delVisibility,
  debug
}) {
  var key = type
  var imgList = imgIdList
  var id = "div" + key + String(goodId);
  var list = doc.getElementById(id);
  var delList = [];
  Array.prototype.map.call(list.children, (item) => {
    var id = item.id.replace('divUpload0' + key, '');
    var isDeleted = item.classList.value.includes('none')
    var isHidden = item.classList.value.includes('not-display')
    if (isDeleted) {
      // 已经删除的图片，不做处理
      return
    }
    if (imgList && imgList.length) {
      delList.push(id);
    } else {
      if (delHidden) {
        if (isHidden) {
          delList.push(id)
        }
      }
      if (delVisibility) {
        if (!isHidden) {
          delList.push(id)
        }
      }
    }
  });

  if (delList.length) {
    var realDelList = delList.filter(item => (imgList || delList).map(x => String(x)).includes(item));
    console.log(`
      请检查将要删除的图片信息：
        商品类型：${type}
        商品id：${goodId}
        图片id：${realDelList.join(',')}
    `);
    realDelList.map((item) => {
      if (!debug) {
        ajaxDel(goodId, item, key);
      }
      return item;
    })
  }
}

// 删除某商品下对应的所有图片，执行以下代码
// runDel({
//  type: 商品类型,
//  goodId: 商品id
// });
// 示例:
// runDel({
//  type: 'shopbycolor',
//  goodId: 1
// }); // 删除颜色图分类下商品ID为1的商品下对应的所有图片

// 删除某商品下特定集合的图片，执行以下代码
// runDel({
//  type: 商品类型,
//  goodId: 商品id,
//  imgIdList: [图片ID1,图片ID2,图片ID3,...] // ...代表省略号，指后面的数据格式以此类推
// });
// 示例:
// runDel({
//  type: 'shopbycolor',
//  goodId: 1,
//  imgIdList: [1,2,3,4,5]
// }); // 删除颜色图分类下商品ID为1的商品下图片ID为1，2，3，4，5的图片

// 删除某商品下特定状态的图片，执行以下代码
// runDel({
//  type: 商品类型,
//  goodId: 商品id,
//  delHidden: true // 是否删除隐藏的图片，true代表删除，false代表不删除
//  delVisibility: true, // 是否删除显示的图片，true代表删除，false代表不删除
// });
// 示例:
// runDel({
//  type: 'shopbycolor',
//  goodId: 1,
//  delHidden: true
// }); // 删除颜色图分类下商品ID为1的商品下所有隐藏图片
// runDel({
//  type: 'shopbycolor',
//  goodId: 1,
//  delVisibility: true
// }); // 删除颜色图分类下商品ID为1的商品下所有显示图片

// 执行代码步骤
// 1. 使用Chrome浏览器打开运营系统后台页面，执行搜索，直到页面上有图片展示出来
// 2. Ctrl+Shift+J 打开控制台 选择Scratch JS， 如果没装插件就先安装一下插件https://chrome.google.com/webstore/detail/scratch-js/alploljligeomonipppgaahpkenfnfkn
// 3. 将本代码粘贴复制到Scratch JS中
// 4. 自行修改下面最后一行runDel的代码的参数，点击界面右下角的Run按钮执行即可

runDel({
  type: 'shopbycolor', // 商品类型
  goodId: 105575, // 商品id
  imgIdList: [1, 2, 3], // 要删除的图片的id，如果该参数不为空数组将无视delHidden，delVisibility这两个参数，因为删除的图片id是固定的，不再判断其当前状态是隐藏还是显示
  delHidden: true, // 是否删除隐藏的图片，true代表删除，false代表不删除
  delVisibility: true, // 是否删除显示的图片，true代表删除，false代表不删除
  debug: true, // 调试模式，true代表开启调试模式，不执行删除操作，仅在控制台打印需要删除的图片ID列表，false代表非调试模式，会执行删除操作
});
