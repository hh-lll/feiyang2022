//格式化时间
function renderTime(date) {
    console.log(date);
    var dates = new Date(date).toJSON();
    return new Date(+new Date(dates) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
}
export {
    renderTime
}