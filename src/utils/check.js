// 函数用于检查手机号是否合格
function isValidPhoneNumber(phoneNumber) {
    // 中国大陆手机号正则表达式
    const regex = /^1[3-9]\d{9}$/;
    return regex.test(phoneNumber);
}

//判断用户名是否合法
function isValidUsername(username) {
    return username.trim() !== '' && username.length < 10;
}

//判断密码是否合法
function isValidPassword(password) {
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}$/;
    return regex.test(password);
}

//判断头像文件大小是否合格
function checkFileSize(fileSize) {
    const maxSizeInBytes = 1024 * 1024; // 1MB = 1024 KB = 1024 * 1024 Bytes
    return fileSize < maxSizeInBytes;
}

//判断Email是否合法
function isValidEmail(email) {
    const regex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return regex.test(email);
}

// 导出检查函数
export { isValidPhoneNumber, isValidUsername, isValidPassword, checkFileSize, isValidEmail };