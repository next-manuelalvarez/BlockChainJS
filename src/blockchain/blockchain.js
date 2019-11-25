import Block  from './block';
import validate  from './modules/validator';

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

  replace(newBlocks = []) {
    if(newBlocks.length < this.blocks.length) {
      this.dispatchEvent('Erorr creating new bloks serie');
    }
    try {
      validate(newBlocks)
    } catch {
      this.dispatchEvent('Erorr validating new bloks serie');
    }
    this.blocks = newBlocks;

    return this.blocks;
  }

}

export default BlockChain;