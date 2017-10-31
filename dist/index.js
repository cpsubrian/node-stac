"use strict";
const stac_1 = require("./stac");
module.exports = function createStac(options, items) {
    return new stac_1.default(options, items);
};
