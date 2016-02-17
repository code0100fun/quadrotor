import initState from 'state/state';

QUnit.module('state');

const t = function(m) {
  return math.transpose([m]);
};

test("state()", function(assert) {
  let pos = math.matrix(t([1,2,3]));
  let yaw = math.pi;
  let s = math.flatten(initState(pos, yaw).toArray());
  assert.close(s[0],  1, 1e-15);
  assert.close(s[1],  2, 1e-15);
  assert.close(s[2],  3, 1e-15);
  assert.close(s[3],  0, 1e-15);
  assert.close(s[4],  0, 1e-15);
  assert.close(s[5],  0, 1e-15);
  assert.close(s[6],  0, 1e-15);
  assert.close(s[7],  0, 1e-15);
  assert.close(s[8],  0, 1e-15);
  assert.close(s[9],  -1, 1e-15);
  assert.close(s[10], 0, 1e-15);
  assert.close(s[11], 0, 1e-15);
  assert.close(s[12], 0, 1e-15);
});
