/* globals math */

/*
* Converts roll, pitch, yaw to a body-to-world Rotation matrix
* phi   = roll
* theta = pitch
* psi   = yaw
*/
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

/*
* Extract Roll, Pitch, Yaw from a world-to-body Rotation Matrix
* R is a math.matrix
* */
function zxyRotationToEuler(R) {
  let phi = math.asin(R.get([1,2]));
  let psi = math.atan2(-R.get([1,0])/math.cos(phi), R.get([1,1])/math.cos(phi));
  let theta = math.atan2(-R.get([0,2])/math.cos(phi), R.get([2,2])/math.cos(phi));
  return [phi, theta, psi];
}

export { eulerToZXYRotation, zxyRotationToEuler }
