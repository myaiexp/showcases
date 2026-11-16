// Typed element lookups inside a stage's scene (querySelector returns a bare Element)
import type { Stage } from './frame.ts';
import type { Entity } from './types.ts';

/** The first entity in the scene matching `selector`; throws when there is none. */
export function q(stage: Stage, selector: string): Entity {
  const el = stage.scene.querySelector(selector);
  if (!el) throw new Error(`No entity matches ${selector}`);
  return el as Entity;
}

/** Every entity in the scene matching `selector`. */
export function qa(stage: Stage, selector: string): Entity[] {
  return Array.from(stage.scene.querySelectorAll(selector)) as Entity[];
}
