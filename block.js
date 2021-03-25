
const crypto = require("crypto");

class Block {
    constructor(index, data, pre_hash) {
        this.index = index;
        this.data = data;
        this.time_stamp = Date.now();
        this.hash = this.createHash();
        this.pre_hash = pre_hash;
    }
    
    createHash() {
        let target_string = this.index + this.data + this.time_stamp + this.pre_hash;
        let hash = crypto.createHash("sha512").update(target_string).digest("hex");

        return hash;
    }
}

module.exports = Block;