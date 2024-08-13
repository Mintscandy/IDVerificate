const GB2020 = require('./GB2020.js');

const Weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
const ISOMOD11_2 = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

function calculateChecksum(idArray) {
    return idArray.reduce((sum, num, index) => sum + num * Weight[index], 0) % 11;
}

function formatIdNumber(ID) {
    return String(ID).padStart(3, '0');
}

exports.IDisValid = function (ID) {
    if (ID.length !== 18) return undefined;

    const idArray = ID.slice(0, 17).split('').map(Number);
    const checksum = ISOMOD11_2[calculateChecksum(idArray)];

    return ID.charAt(17) === checksum;
}

exports.IDCheckCode = function (ID) {
    if (ID.length !== 17) return undefined;

    const idArray = ID.split('').map(Number);
    const checksum = ISOMOD11_2[calculateChecksum(idArray)];

    return checksum === '10' ? 'X' : checksum;
}

exports.IDisGender = function (ID, Gender) {
    if (typeof Gender !== 'number' || ID.length !== 18) return undefined;

    const genderDigit = ID.charAt(16);
    return genderDigit % 2 === Gender;
}

exports.IDPlace = function (ID) {
    if (ID.length !== 18) return undefined;

    const regionCode = ID.substr(0, 6);
    return GB2020.Place(regionCode);
}

exports.IDBirth = function (ID) {
    if (ID.length !== 18) return undefined;

    const year = ID.substr(6, 4);
    const month = ID.substr(10, 2);
    const day = ID.substr(12, 2);

    return `${year}-${month}-${day}`;
}

exports.IDGender = function (ID) {
    if (ID.length !== 18) return undefined;

    return ID.charAt(16) % 2 === 0 ? "女" : "男";
}

exports.IDInfo = function (ID) {
    const address = exports.IDPlace(ID);
    const birthday = exports.IDBirth(ID);
    const gender = exports.IDGender(ID);

    return `Address: ${address}\nBirthday: ${birthday}\nGender: ${gender}`;
}

exports.IDFix = function (FixID, Gender) {
    if (FixID.length !== 14) return undefined;

    for (let i = 0; i <= 999; i++) {
        const IDendant = FixID + formatIdNumber(i);
        const completeID = IDendant + exports.IDCheckCode(IDendant);

        if (exports.IDisGender(completeID, Gender)) {
            console.log(completeID);
        }
    }
    return true;
}
