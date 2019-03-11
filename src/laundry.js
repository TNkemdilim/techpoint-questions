/**
 * This is the entry point to the program.
 *
 * @param {number} noOfWashes The number of times the laundry machine can clean a dirty sock
 * @param {number[]} cleanPile The array of clean socks
 * @param {number[]} dirtyPile The array of dirty socks to wash
 */

const countInstances = (arr, val) => arr.filter(item => item === val).length;
const isOdd = num => num % 2 !== 0;

function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  cleanPile = cleanPile.sort();
  dirtyPile = dirtyPile.sort();

  // get all unique colors in the clean pile
  const cleanColors = new Set(cleanPile);

  cleanColors.forEach(color => {
    if (noOfWashes > 0 && isOdd(countInstances(cleanPile, color)) && dirtyPile.includes(color)) {
      cleanPile.push(color);

      dirtyPile = [...dirtyPile.slice(0, dirtyPile.indexOf(color)), ...dirtyPile.slice(dirtyPile.indexOf(color) + 1, dirtyPile.length)];
      noOfWashes -= 1;
    }
  });

  // Get a pairs in clean pile.
  let pairs = 0;
  cleanColors.forEach(color => {
    let instances = countInstances(cleanPile, color);
    pairs += Math.floor(instances / 2);
  });

  // Check for pairs in remaining dirty pile.
  if (noOfWashes >= 2) {
    // Get all unique colors in dirty pile
    const remainingDirtyColors = new Set(dirtyPile);

    remainingDirtyColors.forEach(color => {
      let colorPairs = 0;

      // Check if enough washes are remaining.
      if (noOfWashes >= 2) {
        // Get number of pairs for current color.
        colorPairs += Math.floor(
          // make sure you wash only what the machine can
          noOfWashes < countInstances(dirtyPile, color) ? noOfWashes / 2 : countInstances(dirtyPile, color) / 2
        );

        pairs += colorPairs;
      }

      // if no more sufficient washes end process
      else return;

      noOfWashes -= colorPairs * 2;
    });
  }

  return pairs;
}

module.exports = getMaxPairs;
