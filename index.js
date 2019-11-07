import Block from './src/blockchain/block';

const { genesis } = Block;
console.log(genesis.print());

// const block = new Block(Date.now(), genesis.hash, '1823742384789357', {});
// console.log(block.print());

// const block2 = new Block(Date.now(), block.hash, '1823742384789357', {});
// console.log(block2.print());

const block1 = Block.mineBlock(genesis, 'd4t4-1');
console.log(block1.print());



