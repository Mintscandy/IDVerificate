let GB2020 = require('./GB2020.js');
var IDAddZero = function (ID) {
    //该函数为自动补零
    let c = "00";
    let idString = String(ID)
    if (idString.length < 3) {
        return c.substr(0, 3 - idString.length) + idString;
    }
    return ID;
}
exports.IDisValid = function (ID) {
    //身份证有效性判断，有效返回true,无效返回false；
    let sum = 0;
    let Weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        Format = [];
    let ISOMOD11_2 = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    if (ID.length == 18) {
        for (let i = 0; i <= 16; i++) {
            Format[i] = Number(ID.charAt(i)); //格式化每位数字
            sum = sum + Format[i] * Weight[i]; //并乘以对应权重
        }
        sum = sum % 11; //取余
        sum = ISOMOD11_2[sum]; //匹配校验码
        if (ID.charAt(17) == String(sum)) {
            return true;
        }
        return false;
    }
    return undefined;
}
exports.IDCheckCode = function (ID) {
    let sum = 0;
    let Weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        Format = [];
    let ISOMOD11_2 = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    if (ID.length == 17) {
        for (let i = 0; i <= 16; i++) {
            Format[i] = Number(ID.charAt(i)); //格式化每位数字
            sum = sum + Format[i] * Weight[i]; //并乘以对应权重
        }
        sum = sum % 11; //取余
        sum = ISOMOD11_2[sum]; //匹配校验码
    if (sum == 10) {
        return "X"
    }
    return String(sum);
}
}
exports.IDisGender = function (ID, Gender) {
    //ID为传入18位完整身份证号码(String),Gender参数为number类型，0为女性，1为男性
    //该函数用于高效筛选身份证
    //undefined则说明传入ID参数错误，请检查
    //null代表Gender参数错误，请检查
    if (typeof (Gender) == "number") {
        if (ID.length == 18) {
            if (ID.charAt(16) % 2 == Gender) {
                return true;
            }
            return false;
        }
        return undefined;
    }
    return null;
}
exports.IDPlace = function(ID){
    if (ID.length == 18){
        let result = ID.substr(0,6);
        return GB2020.Place(result);
    }
    return undefined;
}
exports.IDBirth = function(ID){
    if (ID.length == 18){
        let year = ID.substr(6,4);
        let month = ID.substr(10,2);
        let day = ID.substr(12,2);
        return year + "-" + month + "-" + day
    }
    return undefined;
}
exports.IDGender = function (ID){
    if (ID.length == 18){
        if (ID.charAt(16) % 2 == 0){
            return "女"
        }
        return "男"
    }
    return undefined;
}
exports.IDInfo = function (ID){
    let result = "Address: " + exports.IDPlace(ID) + "\nBirthday: " + exports.IDBirth(ID) + "\nGender: " + exports.IDGender(ID)
    return result;
}
exports.IDFix = function(FixID,Gender){
    //传入一个仅有十四位的残缺身份证号（地区码+出生年月日），推算出有效身份证号
    //理论会生成10000种可能，你可以配合使用IDisValid来将范围缩小至1000个
    //而IDisGender函数则会是你的另一个强大助手,可将范围缩小至500个
    if (FixID.length == 14){
        for (let i = 0;i <= 999;i++){
            let is = i;
            let IDendant = FixID + String(IDAddZero(is));
            let result = IDendant + exports.IDCheckCode(IDendant)
            if (exports.IDisGender(result,Gender)){
                console.log(result);
            }
        }
        return true;
    }
    return undefined;
}