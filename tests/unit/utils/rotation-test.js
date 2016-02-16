import { eulerToZXYRotation } from 'utils/rotation';

QUnit.module('Util - rotation');

test("eulerToZXYRotation(0,0,0)", function(assert) {
  let R = eulerToZXYRotation(0, 0, 0);
  let I = math.eye(3);
  assert.matrixEqual(R, I);
});

test("eulerToZXYRotation(pi/4,-pi/8,pi)", function(assert) {
  let R = eulerToZXYRotation(math.pi/4, -math.pi/8, math.pi);
  let expected = math.matrix([[-0.923879532511287,  0.270598050073099,  0.270598050073099],
                              [ 0,                 -0.707106781186548,  0.707106781186547],
                              [ 0.382683432365090,  0.653281482438188,  0.653281482438188
                              ]]);
  assert.matrixEqual(R, expected);
});
