function countInstances(arr, val) {
  return arr.filter(item => item === val).length;
}

const isOdd = num => num % 2 !== 0;

/**
 * This is the entry point to the program.
 *
 * @param {number} noOfWashes The number of times the laundry machine can clean a dirty sock
 * @param {number[]} cleanPile The array of clean socks
 * @param {number[]} dirtyPile The array of dirty socks to wash
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  cleanPile = cleanPile.sort();
  dirtyPile = dirtyPile.sort();

  // Get all unique colors in the clean pile.
  const cleanColors = new Set(cleanPile);

  cleanColors.forEach(color => {
    const pileIsOdd = isOdd(countInstances(cleanPile, color));

    if (noOfWashes > 0 && pileIsOdd && dirtyPile.includes(color)) {
      const pileA = dirtyPile.slice(0, dirtyPile.indexOf(color));
      const pileB = dirtyPile.slice(dirtyPile.indexOf(color) + 1, dirtyPile.length);
      dirtyPile = [...pileA, ...pileB];
      cleanPile.push(color);
      --noOfWashes;
    }
  });

  // Get a pair in clean pile.
  let pairs = 0;
  cleanColors.forEach(color => {
    pairs += Math.floor(countInstances(cleanPile, color) / 2);
  });

  // Check for pairs in remaining dirty pile.
  if (noOfWashes >= 2) {
    const uniqueDirtyColor = new Set(dirtyPile);

    uniqueDirtyColor.forEach(color => {
      if (noOfWashes < 2) return;

      // Get number of pairs for current color.
      const noOfDirtypiles = countInstances(dirtyPile, color);
      const allowedCapacity = (noOfWashes < noOfDirtypiles ? noOfWashes : noOfDirtypiles) / 2;
      let colorPairs = Math.floor(allowedCapacity);
      pairs += colorPairs;

      noOfWashes -= colorPairs * 2;
    });
  }

  return pairs;
}

module.exports = getMaxPairs;
