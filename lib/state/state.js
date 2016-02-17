/* globals math */
import { eulerToZXYRotation, rotToQuat } from 'utils/rotation';

const t = function(m) {
  return math.transpose([m]);
};

function initState(pos, yaw) {
  let [ phi0, theta0, psi0 ] = [0,0,yaw];
  let R0 = eulerToZXYRotation(phi0, theta0, psi0);
  let q0 = rotToQuat(R0);
  let state = math.matrix(t([
    pos.get([0,0]),
    pos.get([1,0]),
    pos.get([2,0]),
    0, 0, 0,
    q0.get([0,0]),
    q0.get([1,0]),
    q0.get([2,0]),
    q0.get([3,0]),
    0, 0, 0
  ]));
  return state;
}

export default initState;
