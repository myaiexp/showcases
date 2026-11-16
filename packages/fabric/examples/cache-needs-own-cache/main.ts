// needsItsOwnCache(): clipPath and shadowed stroke-first still cache
import { Canvas, Circle, Rect, Shadow, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { codePanel } from '../../shared/code-panel.ts';
import { createStage } from '../../shared/stage.ts';
import { caption } from '../../shared/custom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['objectCaching: false on all five', 'needsItsOwnCache() / ownCaching'],
    scene: [260, 200],
    hint: 'Some drawing needs an isolated canvas to come out right, so fabric caches the object anyway: a clipPath, or paintFirst: "stroke" together with fill, stroke and a shadow. objectCaching: false does not override needsItsOwnCache().',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const canvas = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true }), pa);
  const report = codePanel(pb, stage.preview);

  const base = { width: 38, height: 38, fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 8, objectCaching: false };
  const shadow = (): Shadow => new Shadow({ color: 'rgba(0,0,0,0.45)', blur: 5, offsetX: 5, offsetY: 5 });
  const cases: [string, FabricObject][] = [
    ['plain', new Rect({ ...base })],
    ['shadow', new Rect({ ...base, shadow: shadow() })],
    ['stroke first', new Rect({ ...base, paintFirst: 'stroke' })],
    ['stroke first + shadow', new Rect({ ...base, paintFirst: 'stroke', shadow: shadow() })],
    ['clipPath', new Rect({ ...base, clipPath: new Circle({ radius: 24, originX: 'center', originY: 'center' }) })],
  ];
  cases.forEach(([name, obj], i) => {
    const x = 28 + (i % 5) * 51;
    obj.set({ left: x, top: 90 });
    canvas.add(obj, caption(String(i + 1), x, 135, 12));
    void name;
  });
  canvas.renderAll();

  report(
    cases
      .map(([name, o], i) => `${i + 1} ${name.padEnd(22)} needsItsOwnCache ${String(o.needsItsOwnCache()).padEnd(6)} ownCaching ${o.ownCaching}`)
      .join('\n'),
  );

  stage.loop((_dt, t) => {
    cases.forEach(([, o]) => o.set('angle', Math.sin(t) * 25));
    canvas.requestRenderAll();
  });
  return stage.dispose;
};

export default mount;
