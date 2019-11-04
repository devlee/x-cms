// CMS 1.0 查找商品图片id脚本
// 作者 devlee@outlook.com
// 版权归作者所有 ©️2019

var doc = document.getElementById('_frm').contentWindow.document;

var find = function (key, goodId, options) {
  var id = "div" + key + String(goodId);
  var list = doc.getElementById(id);
  var resAll = [];
  var res = [];
  Array.prototype.map.call(list.children, (item) => {
    var id = item.id.replace('divUpload0' + key, '');
    var versionDom = doc.getElementById('version' + id)
    var version = versionDom && versionDom.value
    var time = item.innerText.split(/\n/).filter((item) => item.indexOf('create:') === 0)[0].replace('create:', '')
    resAll.push({
      id,
      version,
      time
    })
    
  });

  res = resAll.filter((item) => {
    if (options.version) {
      if (item.version && (options.version.toUpperCase() === item.version.toUpperCase())) {
        return item
      }
    } else {
      return item
    }
  }).filter((item) => {
    if (options.time) {
      if (item.time && (new Date(item.time).getTime() <= new Date(options.time).getTime())) {
        return item
      }
    } else {
      return item
    }
  }).map(item => item.id)

  console.log(res.join(','))
  return res
}

// 查找某商品下对应的所有图片ID，执行以下代码，结果会在控制台上打印出来
// find(商品分类key, 商品ID);
// 示例: find('shopbycolor', 1); // 查找颜色图分类下商品ID为1的商品下对应的所有图片ID

// 查找某商品下含过滤条件的所有图片ID，执行以下代码，结果会在控制台上打印出来
// find(商品分类key, 商品ID, 过滤项);
// 示例: find('shopbycolor', 1, { version: 'A', time: '2019-01-01 00:00:00' }); // 查找颜色图分类下商品ID为1的商品下对应版本为A的且时间在2019-01-01 00:00:00（包含）之前的所有图片ID
// 示例: find('shopbycolor', 1, { version: 'A' }); // 查找颜色图分类下商品ID为1的商品下对应版本为A的所有图片ID
// 示例: find('shopbycolor', 1, { time: '2019-01-01 00:00:00' }); // 查找颜色图分类下商品ID为1的商品下时间在2019-01-01 00:00:00（包含）之前的所有图片ID

// 执行代码步骤
// 1. 使用Chrome浏览器打开运营系统后台页面，执行搜索，直到页面上有图片展示出来
// 2. Ctrl+Shift+J 打开控制台 选择Scratch JS， 如果没装插件就先安装一下插件https://chrome.google.com/webstore/detail/scratch-js/alploljligeomonipppgaahpkenfnfkn
// 3. 将本代码粘贴复制到Scratch JS中
// 4. 自行修改下面最后一行find的代码的参数，点击界面右下角的Run按钮执行即可

find('shopbycolor', 105575, { version: 'A', time: '2019-01-01 00:00:00' });
