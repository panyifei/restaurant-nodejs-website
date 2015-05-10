var SUBMITTED = {
    value: 0,
    text: "已提交",
    key: "已提交订单"
};

var REVEIVED = {
    value: 1,
    text: "已接受",
    key: "已接受订单"
};

var FINISHED = {
    value: 2,
    text: "已完结",
    key: "已完结订单"
};

var CANCELLED = {
    value: 3,
    text: "已撤销",
    key: "已撤销订单"
};

var items = [
    SUBMITTED,
    REVEIVED,
    FINISHED,
    CANCELLED
];


module.exports = items;