/* globals math */

function t(m) {
  return math.transpose([m]);
}

function clamp(value, min, max) {
  return math.max(math.min(value, max), min);
}

function row(m, i) {
  return m.subset(math.index(math.range(0,math.size(m)[0]-1)));
}

function quadEOM(t, s, F, M, params) {
  let L = params.arm_length;
  let A = math.matrix([[ 0.25,      0, -0.5/L ],
                       [ 0.25,  0.5/L,      0 ],
                       [ 0.25,      0,  0.5/L ],
                       [ 0.25, -0.5/L,      0 ]]);

  let propThrusts = math.multiply(A, math.matrix([F, M.get([0,0]), M.get([1,0])]));
  let { maxF, minF } = params;
  let propThrustsClamped = math.map(propThrusts, (t) => clamp(t, minF, maxF));

  let B = math.matrix([[  1,  1,  1,  1 ],
                       [  0,  L,  0, -L ],
                       [ -L,  0,  L,  0 ]]);
  F = row(B, 0);
}

export default quadEOM;
