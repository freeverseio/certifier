const Utils = require('web3-utils');

function splitStrByTrait(str, traitName, traitValue) {
  if (typeof traitValue === 'string') traitValue = `"${traitValue}"`;
  const toFind = `"trait_type":"${traitName}","value":${traitValue}`;
  const idx = str.indexOf(toFind);
  if (idx < 0) return new Error('not present');
  return {
    target: toFind,
    preStr: str.substr(0, idx),
    postStr: str.substr(idx + toFind.length),
  };
}

function splitStrByKeyVal(str, key, value) {
  const toFind = `"${key}":"${value}"`;
  const idx = str.indexOf(toFind);
  if (idx < 0) return new Error('not present');
  return {
    target: toFind,
    preStr: str.substr(0, idx),
    postStr: str.substr(idx + toFind.length),
  };
}

function remove0x(x) {
  return (x.substring(0, 2) === '0x') ? x.substring(2) : x;
}

function encodeLength(x, from) {
  const lenAsBytesArray = Buffer.from(remove0x(x), from).length;
  let hex = remove0x(Utils.toHex(lenAsBytesArray));
  while (hex.length < 8) {
    hex = `0${hex}`;
  }
  return hex;
}

function encode(pre, post, cid, proofProps) {
  const lengths = encodeLength(pre, 'utf8')
        + encodeLength(post, 'utf8')
        + encodeLength(cid, 'utf8')
        + encodeLength(proofProps, 'hex');
  return `0x${lengths}${remove0x(Utils.encodePacked(
    pre,
    post,
    cid,
    proofProps,
  ))}`;
}

function universeIdFromAssetId(assetId) {
  const assetIdBN = new Utils.BN(assetId, 10);
  return assetIdBN.ishrn(224).toNumber();
}

module.exports = {
  splitStrByTrait,
  splitStrByKeyVal,
  encode,
  universeIdFromAssetId,
};
