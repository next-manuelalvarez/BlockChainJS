import Block from './src/blockchain/block';

const { genesis } = Block;
console.log(genesis.toString());

const block = new Block(Date.now(), genesis.hash, '1823742384789357', {});
console.log(block.toString());

const block2 = new Block(Date.now(), block.hash, '1823742384789357', {});
console.log(block2.toString());


