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

/*
 * Converts a Rotation matrix into a Quaternion
 * R is a math.matrix
 * */
function rotToQuat(R) {
  let S, qw, qx, qy, qz;
  let tr = math.trace(R);
  let [[m00, m01, m02],
       [m10, m11, m12],
       [m20, m21, m22]] = R.toArray();

  if (tr > 0) {
    S = math.sqrt(tr+1.0) * 2; // S=4*qw
    qw = 0.25 * S;
    qx = (m21 - m12) / S;
    qy = (m02 - m20) / S;
    qz = (m10 - m01) / S;
  } else if ((m00 > m11)&(m00 > m22)) {
    S = math.sqrt(1.0 + m00 - m11 - m22) * 2; // S=4*qx
    qw = (m21 - m12) / S;
    qx = 0.25 * S;
    qy = (m01 + m10) / S;
    qz = (m02 + m20) / S;
  } else if (m11 > m22) {
    S = math.sqrt(1.0 + m11 - m00 - m22) * 2; // S=4*qy
    qw = (m02 - m20) / S;
    qx = (m01 + m10) / S;
    qy = 0.25 * S;
    qz = (m12 + m21) / S;
  } else {
    S = math.sqrt(1.0 + m22 - m00 - m11) * 2; // S=4*qz
    qw = (m10 - m01) / S;
    qx = (m02 + m20) / S;
    qy = (m12 + m21) / S;
    qz = 0.25 * S;
  }

  let q = math.matrix([[qw],[qx],[qy],[qz]]);
  return math.multiply(q,math.sign(qw));
}

export { eulerToZXYRotation, zxyRotationToEuler, rotToQuat }
