/* globals math */

function eulerToZXYRotation(phi, theta, psi) {
  let sinPhi   = math.sin(phi);
  let sinTheta = math.sin(theta);
  let sinPsi   = math.sin(psi);
  let cosPhi   = math.cos(phi);
  let cosTheta = math.cos(theta);
  let cosPsi   = math.cos(psi);

  let R = [ [
              cosPsi*cosTheta - sinPhi*sinPsi*sinTheta,
              cosTheta*sinPsi + cosPsi*sinPhi*sinTheta,
              -cosPhi*sinTheta
            ],
            [
              -cosPhi*sinPsi, cosPhi*cosPsi, sinPhi
            ],
            [
              cosPsi*sinTheta + cosTheta*sinPhi*sinPsi,
              sinPsi*sinTheta - cosPsi*cosTheta*sinPhi,
              cosPhi*cosTheta
            ]
  ];
  return math.matrix(R);
}

export { eulerToZXYRotation }
