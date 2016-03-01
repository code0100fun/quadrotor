import quadEOM from 'quad-eom';
import config from 'config';

QUnit.module('Quad EOM');

const t = function(m) {
  return math.transpose([m]);
};

// quadEOM_readonly(1, [1,2,3,0,0,0,0,0,0,-1,0,0,0]',1,[-1, 0, 1]', sys_params())
//
// 1.0e+03 *
//          0
//          0
//          0
//          0
//          0
//    -0.0021
//          0
//          0
//          0
//          0
//    -0.3310
//          0
//     2.6775
test("quadEOM()", function(assert) {
  let params = config();
  let sdot = quadEOM(1, t([1,2,3,0,0,0,0,0,0,-1,0,0,0]),1,t([-1,0,1]),params);
  assert.close(sdot[0],  0, 1e-15);
  assert.close(sdot[1],  0, 1e-15);
  assert.close(sdot[2],  0, 1e-15);
  assert.close(sdot[3],  0, 1e-15);
  assert.close(sdot[4],  0, 1e-15);
  assert.close(sdot[5],  -2.1, 1e-15);
  assert.close(sdot[6],  0, 1e-15);
  assert.close(sdot[7],  0, 1e-15);
  assert.close(sdot[8],  0, 1e-15);
  assert.close(sdot[9],  0, 1e-15);
  assert.close(sdot[10], -331, 1e-15);
  assert.close(sdot[11], 0, 1e-15);
  assert.close(sdot[12], 2677.5, 1e-15);
});
