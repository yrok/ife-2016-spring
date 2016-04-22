/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 *@author yrok
 *@param {string} aqiData - 存储用户输入的空气指数数据
 *@param {string} cityData - city data input
 *@param {string} valData - value data input
 *@param {object} aqiTable - generate the weather list
 *@param {object} delBtn - delete button's className
 *@param {object} cityReg - the regular expression of cityData
 *@param {object} valReg - the regular expression of valData
 *@param {object} spaceReg - the regular expression ,use to remove useless space
 */
var aqiData = {};
var cityData = document.getElementById("aqi-city-input");
var valData = document.getElementById("aqi-value-input");
var aqiTable = document.getElementById("aqi-table");
var delBtn = aqiTable.getElementsByClassName('del-btn');
var cityReg = /^[\u4e00-\u9fa5a-zA-Z]*$/g; // city 正则
var valReg = /^-?\d*$/g; // value正则
var spaceReg = / |　/g; // 去除空格全角/半角
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 *
 *@argument {string} data - cityData or valData.
 *@description remove space both inside the string and ourside;
 */
function removeSpace(data) {
  data.trim().replace("spaceReg", "");
  return data;
}
/**
 *@description 判断city输入是否合法，如果不符合规则，边框变红色，符合，恢复默认。
 *@param {boolean} cityKey 判断是否是英文或者汉字
 */
cityData.onblur = function() {
  var cityKey = removeSpace(cityData.value).match(cityReg);
  if (!cityKey) {
    cityData.style.border = "1px red solid";
    return;
  } else {
    cityData.style.border = "";
  }
};
/**
 *@description 判断val输入是否合法，如果不符合规则，边框变红色,符合，恢复默认。
 *@param {boolean} valKey 判断是否是数字
 */
valData.onblur = function() {
  var valKey = removeSpace(valData.value).match(valReg);
  if (!valKey) {
    valData.style.border = "1px red solid";
    return;
  } else {
    valData.style.border = "";
  }
};
/**
*@param {boolean} cityKey 判断是否是英文或者汉字
*@param {boolean} valKey 判断是否是数字
*@description 根据获取的值判断是否合法，之后进行添加数据操作
 */
function addAqiData() {
  /** boolen，方便后面判断 */
  var valKey = removeSpace(valData.value).match(valReg);
  var cityKey = removeSpace(cityData.value).match(cityReg);
  /** aqidata赋值 */
  if (cityKey && valKey) {
    aqiData[removeSpace(cityData.value)] = removeSpace(valData.value);
  }
}

/**
 * 渲染aqi-table表格
 *@param {boolean} cityKey - 判断是否是英文或者汉字
 *@param {boolean} valKey  - 判断是否是数字
 *@param {boolean} key     - 两个输入框判定结果
 *@param {string}  html    - 生成的html
 */
function renderAqiList() {
  var valKey = removeSpace(valData.value).match(valReg);
  var cityKey = removeSpace(cityData.value).match(cityReg);
  var key = valKey && cityKey;
  var html = "<thead><tr><td>城市</td><td>空气质量</td><td>操作</td></tr></thead>";
  if (key) {
    for (var variable in aqiData) {
      if (aqiData.hasOwnProperty(variable)) {
        html += "<tr><td>" + variable + "</td><td>" + aqiData[variable] + "</td><td><button class='del-btn'>删除</button></td></tr>";
      }
    }
    aqiTable.innerHTML = html;
  } else {
    alert("请重新输入");
    return ;
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 *@param {string} city - 删除的variable
 */
function delBtnHandle(target) {
  // do sth.
  var city = target.parentElement.parentElement.children[0].innerHTML;
  delete aqiData[city]
  renderAqiList();
}
/**
 *@description addEventListener和attach兼容性函数
 *@argument {string} element    - 触发事件的元素
 *@argument {string} evenType   - 事件类型
 *@argument {string} fn         - 回调函数
 *@argument {string} useCapture - addEventListener的useCapture参数。
 */
function addEvent(element, eventType, fn, useCapture) {
  if (element.addEventListener) {
    element.addEventListener(eventType, fn, useCapture);
  } else if (element.attachEvent) {
    element.attachEvent("on" + eventType, fn);
  } else {
    return element['on' + eventType] = fn;
  }
}
/**
 *@param {object} addBtn - 添加按钮
 */
function init() {
  /** 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数 */
  var addBtn = document.getElementById('add-btn');
  addBtn.onclick = addBtnHandle;
  /** 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数 */
  addEvent(aqiTable, 'click', function(event) {
    if (event.target && event.target.nodeName === 'BUTTON') {
      delBtnHandle(event.target);
    }
  },false);

}

init();
