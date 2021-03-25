
const Block = require("./block.js");
 
class Chain {
    constructor() {
        this.block_chain = new Array();
        this.block_chain.push(this.createGenerateBlock());
    }

    createGenerateBlock() {
        // hard coring
        let block = new Block(0, "Hello BlockChain!", null);
        block.hash = "c39be22ed3a2d6bd97b3b75ab896959882c5592a4c9cf5f7b59a4f6acbc64066a21396be47c10465b1eb712d376afa47650f42f0e25293a258962d6d99a8fe5b";
    
        return block;
    }

    getLastBlock() {
        return this.block_chain[this.block_chain.length - 1];
    }

    checkIsCorrectStructure(block) {
        return typeof block.index == "number"
        && typeof block.data == "string"
        && typeof block.time_stamp == "number"
        && typeof block.hash == "string"
        && typeof block.pre_hash == "string";
    }

    checkNewBlock(block, pre_block) {
        // check is structure is correct
        if(!this.checkIsCorrectStructure(block)) {
            return false;
        }

        // check if index is correct
        if(block.index != pre_block.index + 1) {
            return false;
        }

        // check if hash is correct
        if(block.pre_hash != pre_block.hash) {
            return false;
        }

        return true;
    }

    addBlock(data) {
        let block = new Block(
            this.block_chain.length,
            data,
            this.getLastBlock().hash
        );

        if(this.checkNewBlock(block, this.getLastBlock())) {
            this.block_chain.push(block);
        
            return block;
        }
    }

    checkNewChain(block_chain) {
        for(let i=1; i<block_chain.length; i++) {
            if(!this.checkNewBlock(block_chain[i], block_chain[i - 1])) {
                return false; 
            }
        }

        return true;
    }

    replaceChain(block_chain) {
        if(this.checkNewChain(block_chain)) {
            if(block_chain.length > this.block_chain.length) {
                this.block_chain = block_chain;

                return this.block_chain;
            }
        } 
    }
}

module.exports = Chain;