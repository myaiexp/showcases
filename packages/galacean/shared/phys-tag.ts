// Physics chapter labels: text pinned above entities, and a recolour helper
import { type BlinnPhongMaterial, type Entity, MeshRenderer } from '@galacean/engine';
import type { Rgb3 } from './core-kit.ts';
import { type Label, labels } from './core-ui.ts';
import { lin, tick } from './gfx-kit.ts';
import type { World } from './phys-kit.ts';

/** Text labels pinned above entities, kept in place every frame; `clear()` drops them all (call it in a round). */
export function tagger(w: World): { add(entity: Entity, text: string): Label; clear(): void } {
  const maker = labels(w.stage, w.camera);
  let items: { entity: Entity; label: Label }[] = [];
  tick(w.root, () => {
    for (const { entity, label } of items) label.at(entity.transform.worldPosition);
  });
  return {
    add(entity, text) {
      const label = maker.add(text);
      items.push({ entity, label });
      return label;
    },
    clear() {
      for (const { label } of items) label.el.remove();
      items = [];
    },
  };
}

/** Repaints the Blinn-Phong material of the mesh on `entity` (sRGB colour). */
export function tint(entity: Entity, color: Rgb3): void {
  const material = entity.getComponent(MeshRenderer)?.getMaterial() as BlinnPhongMaterial | undefined;
  material?.baseColor.set(...lin([...color]), 1);
}
