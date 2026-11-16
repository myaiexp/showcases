// Scene for origin and around: the docs' red Frame with a rect inside
import { DragEvent, Frame, Leafer, Rect } from 'leafer-ui';
import type { MountContext } from '@/types.ts';
import { marker, placeMarker, RED } from './layout-kit.ts';
import { createStage, type Stage } from './stage.ts';

export interface AnchorScene {
  stage: Stage;
  /** The green rect, with no origin or around set yet: the example sets the property it is about. */
  rect: Rect;
  /** Docs pixels to pane pixels (the frame is 100 docs px). */
  k: number;
  /** Puts the white dot where the point sits: `at` is a fraction of the rect (origin); around always marks the rect's (x, y). */
  pivot(at?: { x: number; y: number }): void;
}

export function anchorScene(el: HTMLElement, ctx: MountContext, prop: 'origin' | 'around', hint: string): AnchorScene {
  const stage = createStage(el, ctx, { hint, paper: 'transparent' });
  const leafer = stage.own(new Leafer({ view: stage.view, fill: '#f7f5f0' }));
  const F = stage.preview ? 120 : 220;
  const k = F / 100;
  const fx = Math.round((stage.width - F) / 2), fy = Math.round((stage.height - F) / 2);
  const x = prop === 'origin' ? 25 * k : 50 * k;
  const W = 50 * k;
  const rect = new Rect({ x, y: x, width: W, height: W, fill: '#4DCB71', draggable: true });
  leafer.add(new Frame({ x: fx, y: fy, width: F, height: F, fill: '#FF4A2C', children: [rect] }));
  const dot = marker(leafer, 0, 0, RED, 4);
  dot.fill = '#fff';
  let at = { x: 0.5, y: 0.5 };
  const place = (): void => {
    const a = prop === 'origin' ? at : { x: 0, y: 0 };
    placeMarker(dot, fx + rect.x! + a.x * W, fy + rect.y! + a.y * W);
  };
  rect.on(DragEvent.DRAG, place); // the dot follows a drag
  place();
  return {
    stage,
    rect,
    k,
    pivot(p) {
      if (p) at = p;
      place();
    },
  };
}
