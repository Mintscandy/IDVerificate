# IDVerificate

中国大陆身份证验证

Verification of Chinese Mainland ID Card

仅支持CommonJS

### API

`IDisValid()  `  验证身份证号码是否有效，有效返回true，无效返回false

`IDCheckCode()` 通过17位身份证号码得出最后一位校验码

`IDisGender()`  筛选函数，用于性别筛选

`IDPlace`  获取身份证号码上的所在地

`IDBirth()`  获取身份证号码上的出生年月日

`IDGender`  获取身份证号码上的性别

`IDInfo`  将所在地、出生年月日、性别获取

`IDFix`  传入14位身份证号码推算可能的身份证号码

### Getting Start

下载 并放到 你需要使用的项目目录。

#### 使用方法

导入`IDFilter.js`

```javascript
let sfz = require('./IDFilter.js');
```

`GB2020`将自动添加地址信息无需导入

##### 校验身份证是否有效

```javascript
let sfz = require('./IDFilter.js');

console.log(sfz.IDisValid("123456789012345678"));
//身份证号码有效即返回true，无效返回false
//位数不足将返回undefined
```

##### 得出校验码

```js
let sfz = require('./IDFilter.js');

console.log(sfz.IDCheckCode("12345678901234567"));
//返回校验码
//位数不足返回undefined
```

##### 身份证性别校验

```js
let sfz = require('./IDFilter.js');

console.log(sfz.IDisGender("ID",Gender));
//传入完整身份证号码
//ID为传入18位完整身份证号码(String),Gender参数为number类型，0为女性，1为男性
//该函数用于高效筛选身份证
//undefined则说明传入ID参数错误，请检查
//null代表Gender参数错误，请检查
```

##### 修复身份证号码

```js
let sfz = require('./IDFilter.js');

console.log(sfz.IDFix("11223344556677",0));
//传入一个仅有十四位的残缺身份证号（地区码+出生年月日），推算出有效身份证号
//理论会生成10000种可能，配合使用IDisValid来将范围缩小至1000个
//而IDisGender函数则会是另一个强大助手,可将范围缩小至500个
```

##### 身份证信息获取

```js
let sfz = require('./IDFilter.js');

console.log(
    sfz.IDBirth("653024201506278809"),
    sfz.IDPlace("653024201506278809"),
    sfz.IDGender("653024201506278809"),
);
//结果如下
//2015-06-27 乌恰县 女
```

#### 参考资料

2020年10月 中华人民共和国县以上行政区划代码

身份证生成规范 —— 知乎





