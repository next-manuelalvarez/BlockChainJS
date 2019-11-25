import Block from "../block";

export default blockchain => {
  const [genesisBlock, ...blocks] = blockchain;

  if (JSON.stringify(genesisBlock) !== JSON.stringify(Block.genesis)) {
    return this.dispatchEvent("Error validating hash");
  }
  blocks.map(block => {
    const { timestamp, hash, previousHas, data } = block;
    const previousBlock = block;

    if (previousHas !== previousBlock.hash) {
      return this.dispatchEvent("Erorr validating previous hash");
    }
    if (hash !== Block.hash(timestamp, previousHas, data)) {
      return this.dispatchEvent("Erorr validating hash");
    }
  });
};
