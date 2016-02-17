import {
  eulerToZXYRotation,
  zxyRotationToEuler,
  rotToQuat,
  quatToRot
} from 'utils/rotation';

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

test("zxyRotationToEuler(eye(3))", function(assert) {
  let [phi, theta, psi] = zxyRotationToEuler(math.eye(3));
  let expected = [0, 0, 0];
  assert.equal(phi, 0);
  assert.equal(theta, 0);
  assert.equal(psi, 0);
});

test("zxyRotationToEuler(/* arbitarty R */)", function(assert) {
  // [phi, theta, psi] = 30,45,90
  let R = math.matrix([
                        [ 0.516217586476753,  0.846340372739808, -0.131253102373843],
                        [-0.137900281555049, -0.069116004944297, -0.988031624092862],
                        [-0.845282743086096,  0.528139140124250,  0.081031678432964
                      ]]);
  let [phi, theta, psi] = zxyRotationToEuler(R);
  assert.close(phi, -1.415926535897933, 1e-14);
  assert.close(theta, 1.017702849742895, 1e-14);
  assert.close(psi, 2.035405699485789, 1e-14);
});

test("rotToQuat(eye(3))", function(assert) {
  let R = math.eye(3);
  let quat = rotToQuat(R);
  assert.equal(quat.get([0,0]), 1);
  assert.equal(quat.get([1,0]), 0);
  assert.equal(quat.get([2,0]), 0);
  assert.equal(quat.get([3,0]), 0);
});

test("rotToQuat(/* arbitarty R */)", function(assert) {
  // [phi, theta, psi] = 30,45,90
  let R = math.matrix([
                        [ 0.516217586476753,  0.846340372739808, -0.131253102373843],
                        [-0.137900281555049, -0.069116004944297, -0.988031624092862],
                        [-0.845282743086096,  0.528139140124250,  0.081031678432964
                      ]]);
  let quat = rotToQuat(R);
  assert.close(quat.get([0,0]),  0.618088436221998, 1e-14);
  assert.close(quat.get([1,0]),  0.613249931306169, 1e-14);
  assert.close(quat.get([2,0]),  0.288805613755163, 1e-14);
  assert.close(quat.get([3,0]), -0.398098636301516, 1e-14);
});

test("quatToRot(math.matrix([1,0,0,0]))", function(assert) {
  let quat = math.matrix([[1],[0],[0],[0]]);
  let R = quatToRot(quat);
  let expected = math.eye(3);
  assert.matrixEqual(R, expected);
});

test("quatToRot(/* arbitarty quaternion */)", function(assert) {
  let quat = math.matrix([[1],[2],[3],[4]]);
  let R = quatToRot(quat);
  let expected = math.matrix([[-0.666666666666666,  0.133333333333333,  0.733333333333333],
                              [ 0.666666666666666, -0.333333333333333,  0.666666666666667],
                              [ 0.333333333333333,  0.933333333333333,  0.133333333333333
                              ]]);
  assert.matrixEqual(R, expected);
});
