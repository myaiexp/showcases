// Scene for the *OfWorld methods: a rect in a rotated group, a world-origin dot
import { Group, Leafer, PointerEvent, Rect } from 'leafer-ui';
import type { MountContext } from '@/types.ts';
import { drive, caption } from './shapes.ts';
import { marker, placeMarker, pt } from './layout-kit.ts';
import { createStage, script, type Stage } from './stage.ts';

export interface WorldLab {
  hint: string;
  range: readonly [number, number, number];
  value: number;
  /** Calls the incremental method on a rect that has just been put back to its start. */
  apply(rect: Rect, origin: { x: number; y: number }, v: number): string;
}

export function worldLab(el: HTMLElement, ctx: MountContext, o: WorldLab): Stage {
  const stage = createStage(el, ctx, { hint: o.hint });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = stage.preview ? 70 : 110;
  const group = new Group({ x: stage.width / 2 - S / 2 - 10, y: stage.height / 2 - S / 2 - 20, rotation: 20 });
  const start = { x: 0, y: 0, width: S, height: S, scaleX: 1, scaleY: 1, rotation: 0, skewX: 0, skewY: 0 };
  const rect = new Rect({ ...start, fill: '#32cd79', cornerRadius: 6, opacity: 0.9, hittable: false });
  group.add(rect);
  // a ghost of the starting square, to compare
  leafer.add(new Rect({ x: group.x, y: group.y, width: S, height: S, rotation: 20, stroke: '#aaa', dashPattern: [5, 4], hittable: false }));
  leafer.add(group);
  const origin = { x: stage.width / 2 + S * 0.3, y: stage.height / 2 - 30 };
  const dot = marker(leafer, origin.x, origin.y);
  const note = caption(stage, leafer);
  let value = o.value;
  const redo = (): void => {
    rect.set(start);
    note.text = `${o.apply(rect, origin, value)}   origin ${pt(origin)}`;
  };
  const setOrigin = (p: { x: number; y: number }): void => {
    origin.x = p.x;
    origin.y = p.y;
    placeMarker(dot, p.x, p.y);
    redo();
  };
  leafer.on(PointerEvent.TAP, (e: PointerEvent) => setOrigin({ x: e.x, y: e.y }));
  drive(stage, 'amount', o.range, o.value, (v) => ((value = v), redo()), 4);
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const spots = [
      { x: stage.width / 2 + S * 0.3, y: stage.height / 2 - 30 },
      { x: 30, y: stage.height - 50 },
      { x: stage.width - 30, y: 30 },
    ];
    script(stage, async () => {
      for (const p of spots) {
        await ghost.tap(p.x, p.y, { glide: 500 });
        await stage.wait(2200);
      }
    });
  }
  return stage;
}
