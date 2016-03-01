/* globals math */

function config() {
  let I = math.matrix([[ 0.00025,   0,          2.55e-6   ],
                       [ 0,         0.000232,   0         ],
                       [ 2.55e-6,   0,          0.0003738 ]]);
  let mass    = 0.18; // kg
  let gravity = 9.81; // m/s/s
  return {
    mass,
    gravity,
    arm_length: 0.086,      // m
    minF: 0.0,              // Newtons ??
    maxF: 2.0*mass*gravity, // Newtons ??
    I,
    invI: math.inv(I)
  };
}

export default config;
