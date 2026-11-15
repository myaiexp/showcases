// vnoise: one hash value per cell of a floored position, next to the raw field
import * as THREE from 'three/webgpu';
import { floor, positionGeometry, time, vec3 } from 'three/tsl';
import { vnoise } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lineup } from '../../shared/lineup.ts';
import { params, range } from '../../shared/params.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { u } = params(stage, { cells: range(6, 2, 24), fine: range(40, 10, 200) });

  const basic = (colorNode: THREE.Node<'vec3'>): THREE.MeshBasicNodeMaterial => {
    const m = new THREE.MeshBasicNodeMaterial();
    m.colorNode = colorNode;
    return m;
  };
  // vnoise(vec3) is a hash of the point, in [-1, 1]: no smoothing, no gradient.
  const grey = (v: THREE.Node<'float'>): THREE.Node<'vec3'> => vec3(v.mul(0.5).add(0.5));
  const rgb = (v: THREE.Node<'vec3'>): THREE.Node<'vec3'> => v.mul(0.5).add(0.5);
  // Flooring the position gives every cell one point, so one value; the cells slide with time.
  const cell = floor(positionGeometry.mul(u.cells).add(vec3(0, time.mul(1.5), 0)));
  // Three decorrelated samples of the cell make a colour.
  const cellColor = vec3(vnoise(cell), vnoise(cell.add(17)), vnoise(cell.add(41)));

  lineup(
    stage,
    [
      { material: basic(grey(vnoise(cell))), label: 'vnoise(floor(p * cells))' },
      { material: basic(rgb(cellColor)), label: 'three offsets as rgb' },
      // On the raw position every tiny step is a new value: static.
      { material: basic(grey(vnoise(positionGeometry.mul(u.fine)))), label: 'vnoise(p * fine)' },
    ],
    { spin: 1 },
  );

  stage.start();
  return stage.dispose;
};

export default mount;
