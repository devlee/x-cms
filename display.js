// CMS 1.0 显示/隐藏商品图片脚本
// 作者 devlee@outlook.com
// 版权归作者所有 ©️2019

var getDisplayUrl = function (imgIdStr, goodId, key, isDisplay) {
  return "https://cms.jjshouse.com/index.php?q=admin/main/goodsImages/viewType&_=" + new Date().getTime() + "&act=batch_update_display&img_id_str=" + imgIdStr + "&is_display=" + (isDisplay ? 1 : 0) + "&image_type=" + key + "&goods_id=" + goodId
}
var doc = document.getElementById('_frm').contentWindow.document;
var ajaxDisplay = function (goodId, imgIdListStr, key, isDisplay) {
  var src = getDeleteUrl(imgIdListStr, goodId, key, isDisplay);
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status == 200) {
        console.log(`图片id:${imgIdListStr}${isDisplay ? '显示' : '隐藏'}成功`)
      } else {
        console.error(`图片id:${imgIdListStr}${isDisplay ? '显示' : '隐藏'}失败`)
      }
    }
  }
  xhr.open('get', src)
  xhr.send()
}
var runDisplay = function ({
  type,
  goodId,
  imgIdList,
  isDisplay,
  debug
}) {
  var key = type
  var imgList = imgIdList
  var id = "div" + key + String(goodId);
  var list = doc.getElementById(id);
  var targetList = [];
  Array.prototype.map.call(list.children, (item) => {
    var id = item.id.replace('divUpload0' + key, '');
    var isDeleted = item.classList.value.includes('none')
    var isHidden = item.classList.value.includes('not-display')
    if (isDeleted) {
      // 已经删除的图片，不做处理
      return
    }
    if (imgList && imgList.length) {
      targetList.push(id);
    } else {
      if (isDisplay) {
        if (isHidden) {
          // 只对隐藏的显示
          targetList.push(id)
        }
      }
      if (!isDisplay) {
        if (!isHidden) {
          // 只对显示的隐藏
          targetList.push(id)
        }
      }
    }
  });

  if (targetList.length) {
    var realTargetList = targetList.filter(item => (imgList || targetList).map(x => String(x)).includes(item));
    console.log(`
      请检查将要${isDisplay ? '显示' : '隐藏'}的图片信息：
        商品类型：${type}
        商品id：${goodId}
        图片id：${realTargetList.join(',')}
    `);
    if (!debug) {
      var idStrList = []
      realTargetList.map((item, idx) => {
        idStrList.push(item)
        if (idx % 10 === 9) {
          ajaxDisplay(goodId, idStrList.join(','), key, isDisplay);
          idStrList = []
        }
      })
      if (idStrList.length) {
        ajaxDisplay(goodId, idStrList.join(','), key, isDisplay);
      }
    }
  }
}

// 显示或隐藏某商品下对应的所有图片，执行以下代码
// runDisplay({
//  type: 商品类型,
//  goodId: 商品id,
//  isDisplay: 是否显示, true为显示，false为隐藏
// });
// 示例:
// runDisplay({
//  type: 'shopbycolor',
//  goodId: 1,
//  isDisplay: true
// }); // 显示颜色图分类下商品ID为1的商品下对应的所有图片

// 显示或隐藏某商品下特定集合的图片，执行以下代码
// runDisplay({
//  type: 商品类型,
//  goodId: 商品id,
//  imgIdList: [图片ID1,图片ID2,图片ID3,...], // ...代表省略号，指后面的数据格式以此类推
//  isDisplay: 是否显示, true为显示，false为隐藏
// });
// 示例:
// runDisplay({
//  type: 'shopbycolor',
//  goodId: 1,
//  imgIdList: [1,2,3,4,5],
//  isDisplay: true
// }); // 显示颜色图分类下商品ID为1的商品下图片ID为1，2，3，4，5的图片

// 执行代码步骤
// 1. 使用Chrome浏览器打开运营系统后台页面，执行搜索，直到页面上有图片展示出来
// 2. Ctrl+Shift+J 打开控制台 选择Scratch JS， 如果没装插件就先安装一下插件https://chrome.google.com/webstore/detail/scratch-js/alploljligeomonipppgaahpkenfnfkn
// 3. 将本代码粘贴复制到Scratch JS中
// 4. 自行修改下面最后一行runDel的代码的参数，点击界面右下角的Run按钮执行即可

runDisplay({
  type: 'shopbycolor', // 商品类型
  goodId: 105575, // 商品id
  imgIdList: [1, 2, 3], // 要显示或隐藏的图片的id
  isDisplay: true, // 是否显示隐藏的图片，或隐藏显示的图片，true代表显示隐藏的图片，false代表隐藏显示的图片
  debug: true, // 调试模式，true代表开启调试模式，不执行显示或隐藏操作，仅在控制台打印需要显示或隐藏的图片ID列表，false代表非调试模式，会执行显示或隐藏操作
});

