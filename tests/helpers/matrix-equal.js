QUnit.assert.matrixEqual = function matrixEqual(actual, expected, maxDifference, message) {
  let results = math.equal(actual, expected);
  let result = math.filter(math.flatten(results), x => x === false).toArray().length === 0;

  actual = math.string(actual);
  expected = math.string(expected);

  message = message || `Actual: ${actual}\n Expected: ${expected}`;

  this.push(result, math.string(actual), math.string(expected), message);
}
