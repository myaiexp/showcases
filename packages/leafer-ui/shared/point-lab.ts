// Scene for an element's coordinate conversions: a point shown in each system
import { Group, Leafer, Rect } from 'leafer-ui';
import type { IPointData } from 'leafer-ui';
import type { MountContext } from '@/types.ts';
import { pick } from './shapes.ts';
import { label } from './basics.ts';
import { marker, placeMarker, pt } from './layout-kit.ts';
import { createStage, type Stage } from './stage.ts';

export interface PointMethod {
  name: string;
  /** The conversion, called on the rect with the moving point. */
  call(rect: Rect, p: IPointData): IPointData;
}

export interface PointLab {
  hint: string;
  /** The coordinate system the moving point is in. */
  space: 'world' | 'page' | 'local' | 'inner' | 'box';
  methods: readonly PointMethod[];
  /** Zoom the Leafer so page and world coordinates differ. */
  zoom?: number;
}

export function pointLab(el: HTMLElement, ctx: MountContext, o: PointLab): Stage {
  const stage = createStage(el, ctx, { hint: o.hint });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  if (o.zoom) leafer.set({ scale: o.zoom, x: 20, y: 10 });
  const S = stage.preview ? 80 : 130;
  const group = new Group({ x: stage.width * 0.3 / (o.zoom ?? 1), y: 28, scale: 1.3, rotation: 15 });
  const rect = new Rect({ x: 20, y: 10, width: S * 1.3, height: S, fill: '#32cd79', cornerRadius: 6, opacity: 0.85, hittable: false });
  group.add(rect);
  leafer.add(group);
  const dot = marker(leafer, 0, 0);
  const show = label(stage, '', true);
  let method = o.methods[0]!;
  // the moving point: a loop round the rect, expressed in the source system
  const sourceAt = (t: number): IPointData => {
    const a = Math.cos(t * 0.9) * rect.width! * 0.55, b = Math.sin(t * 1.3) * rect.height! * 0.55;
    const box = { x: rect.width! / 2 + a, y: rect.height! / 2 + b };
    switch (o.space) {
      case 'box': return box;
      case 'inner': return box; // a Rect's inner space starts at its box
      case 'local': return rect.getLocalPointByInner(box);
      case 'page': return rect.getPagePoint(rect.getWorldPointByBox(box));
      default: return rect.getWorldPointByBox(box);
    }
  };
  stage.loop((_dt, t) => {
    const p = sourceAt(t);
    const q = method.call(rect, { ...p });
    const where = { world: () => p, page: () => rect.getWorldPointByPage(p), local: () => rect.getWorldPointByLocal(p), inner: () => rect.getWorldPoint(p), box: () => rect.getWorldPointByBox(p) }[o.space]();
    placeMarker(dot, where.x, where.y); // the red dot is always the source point, in world space
    show(`${o.space} ${pt(p)}\n${method.name}  ->  ${pt(q)}`);
  });
  pick(stage, 'method', o.methods.map((m) => m.name), (n) => (method = o.methods.find((m) => m.name === n)!), 2600);
  return stage;
}
