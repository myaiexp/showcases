// Light and shadow pieces: a shadow-casting prop set and a PBR grid
import { type Engine, type Entity, type Material, type Mesh, type MeshRenderer, PrimitiveMesh } from '@galacean/engine';
import { add, blinn, pbr, spin, tick } from './gfx-kit.ts';

export interface Props {
  floor: MeshRenderer;
  items: MeshRenderer[];
  entities: Entity[];
}

/** A floor at y = 0 and four shapes that turn and bob above it: the standard thing to cast shadows. */
export function shadowProps(root: Entity, engine: Engine, { size = 16 }: { size?: number } = {}): Props {
  const floor = add(root, PrimitiveMesh.createPlane(engine, size, size), blinn(engine, [0.62, 0.64, 0.7], 6), [0, 0, 0], 'floor');
  floor.renderer.castShadows = false;
  const shapes: [Mesh, [number, number, number], [number, number, number], number][] = [
    [PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), [-2.4, 0.9, 0], [0.9, 0.45, 0.3], 0],
    [PrimitiveMesh.createSphere(engine, 0.8), [0, 1.2, -1], [0.35, 0.7, 0.9], 1.3],
    [PrimitiveMesh.createTorus(engine, 0.7, 0.28, 20, 40), [2.4, 1.1, 0.3], [0.5, 0.85, 0.45], 2.6],
    [PrimitiveMesh.createCone(engine, 0.7, 1.6), [0.2, 0.9, 2], [0.95, 0.8, 0.35], 3.9],
  ];
  const items: MeshRenderer[] = [];
  const entities: Entity[] = [];
  for (const [mesh, pos, color, phase] of shapes) {
    const { entity, renderer } = add(root, mesh, blinn(engine, color, 40), pos);
    spin(entity, [0, 30, 0]);
    const y = pos[1];
    tick(entity, (_dt, t) => entity.transform.setPosition(pos[0], y + 0.25 * Math.sin(t * 1.2 + phase), pos[2]));
    items.push(renderer);
    entities.push(entity);
  }
  return { floor: floor.renderer, items, entities };
}

/** A grid of spheres: metallic grows along x, roughness along y; `make` can restyle each material. */
export function pbrGrid(root: Entity, engine: Engine, cols = 5, rows = 3, make?: (m: Material) => void): Entity[] {
  const mesh = PrimitiveMesh.createSphere(engine, 0.5, 32);
  const out: Entity[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const m = pbr(engine, [0.9, 0.78, 0.5], c / (cols - 1), 0.08 + (0.9 * r) / Math.max(1, rows - 1));
      make?.(m);
      out.push(add(root, mesh, m, [(c - (cols - 1) / 2) * 1.15, ((rows - 1) / 2 - r) * 1.15, 0], 'sample').entity);
    }
  }
  return out;
}
