class Block {
  constructor(timestamp, previousHash, hash, data) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
  }

  static get genesis() {
    const timestamp = new Date(2010, 0, 1).getTime();
    return new this(timestamp, undefined, 'g3n3sis-h4ash', 'default data');
  }

  toString() {
    const {
      timestamp, previousHash, hash, data
    } = this;

    return  `Block -
      timestamp: ${timestamp}
      previousHash: ${previousHash}
      hash: ${hash}
      data: ${data}
    `
  }
}

export default Block;