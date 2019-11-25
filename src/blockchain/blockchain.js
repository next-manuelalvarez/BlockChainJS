import Block  from './block';

class BlockChain {

  constructor(){
    this.blocks = [Block.genesis];
  }

  addBlock(data) {
    const previousBlock = this.blocks[this.blocks.length - 1];
    const block = Block.mineBlock(previousBlock, data);

    this.blocks.push(block);

    return block;
  }

}

export default BlockChain;