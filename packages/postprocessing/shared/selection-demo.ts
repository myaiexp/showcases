// Selection examples: which meshes to select, a tint material, a mask listing
import { Mesh, MeshBasicMaterial, type Group } from 'three';
import type { Selection } from 'postprocessing';

export interface Pick {
  name: string;
  mesh: Mesh;
}

/** The showroom's six solid objects (knot, three balls, two crates), named for the listing. */
export function pickObjects(group: Group): Pick[] {
  const solids = group.children.filter((o): o is Mesh => o instanceof Mesh && o.geometry.type !== 'PlaneGeometry' && o.userData.phase === undefined);
  const names = ['knot', 'ball A', 'ball B', 'ball C', 'crate A', 'crate B'];
  return solids.slice(0, 6).map((mesh, i) => ({ name: names[i]!, mesh }));
}

/** A flat, see-through cyan used as the override material of the pass that draws a selection. */
export const tintMaterial = (): MeshBasicMaterial =>
  new MeshBasicMaterial({ color: 0x36e0ff, transparent: true, opacity: 0.55, depthTest: false });

/** One line per object: its layers mask in binary and whether the selection holds it. */
export function maskListing(picks: Pick[], selection: Selection): string {
  return picks
    .map(({ name, mesh }) => {
      const bits = (mesh.layers.mask >>> 0).toString(2).padStart(8, '0');
      return `${name.padEnd(8)} layers.mask ${bits}  ${selection.has(mesh) ? 'in selection' : '-'}`;
    })
    .join('\n');
}

