// A grid of static crates (alternating layers) for overlap and sweep examples
import { type Entity, Layer, PrimitiveMesh, StaticCollider } from '@galacean/engine';
import { boxShape } from './core-kit.ts';
import { add, blinn } from './gfx-kit.ts';
import { PALETTE, type World } from './phys-kit.ts';
import { tint } from './phys-tag.ts';

export interface Field {
  crates: Entity[];
  /** Back to the resting colour for every crate. */
  reset(): void;
  /** Lights up the crate that owns `entity` (anything not in the field is ignored). */
  light(entity: Entity): void;
}

/** `cols` x `rows` crates of 0.9 on the floor; odd ones are on Layer1, the rest on Layer0. */
export function field(w: World, cols = 6, rows = 3, spacing = 1.9): Field {
  const crates: Entity[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const { entity } = add(w.root, PrimitiveMesh.createCuboid(w.engine, 0.9, 0.9, 0.9), blinn(w.engine, [...(i % 2 ? PALETTE.violet : PALETTE.blue)]), [(c - (cols - 1) / 2) * spacing, 0.45, (r - (rows - 1) / 2) * spacing], `crate ${i + 1}`);
      const body = entity.addComponent(StaticCollider);
      body.addShape(boxShape(0.9, 0.9, 0.9));
      body.collisionLayer = i % 2 ? Layer.Layer1 : Layer.Layer0;
      crates.push(entity);
    }
  }
  const rest = (i: number): readonly [number, number, number] => (i % 2 ? PALETTE.violet : PALETTE.blue);
  return {
    crates,
    reset: () => crates.forEach((e, i) => tint(e, rest(i))),
    light(entity) {
      if (crates.includes(entity)) tint(entity, PALETTE.amber);
    },
  };
}
