// Customization: new defaults for every object, set on FabricObject.ownDefaults around the constructors only
import { Canvas, Circle, FabricObject, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { caption } from '../../shared/custom.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

// The guide changes fabric.Object.prototype.transparentCorners, cornerColor and cornerSize
// once for the whole page. In v7 an object copies FabricObject.ownDefaults in its constructor,
// so the same idea is a change to that object, made and undone around the constructors.
const PRESETS = {
  'blue circles': { transparentCorners: false, cornerColor: '#1f6feb', cornerStyle: 'circle', cornerSize: 14, borderColor: '#1f6feb' },
  'red dashed': { transparentCorners: false, cornerColor: '#e94b3c', cornerStrokeColor: '#7a1f17', cornerSize: 10, borderColor: '#e94b3c', borderDashArray: [5, 4] },
  'big green': { transparentCorners: true, cornerColor: '#2e9e5b', cornerSize: 24, borderColor: '#2e9e5b', borderScaleFactor: 3 },
} as const;
type Preset = keyof typeof PRESETS;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Left: made while the new defaults were in force. Right: made a moment later, after they were put back. Select each to compare; nothing else on the page changed.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const build = (preset: Preset): void => {
    canvas.remove(...canvas.getObjects());
    const defaults = FabricObject.ownDefaults as Record<string, unknown>;
    const tweak: Record<string, unknown> = PRESETS[preset];
    // Remember the old value of every key we touch (an absent key is deleted again afterwards).
    const saved = Object.keys(tweak).map((k) => [k, k in defaults, defaults[k]] as const);
    Object.assign(defaults, tweak);
    let styled: FabricObject[];
    try {
      styled = [new Rect({ left: 60, top: 100, width: 70, height: 70, fill: '#f2b134' }), new Circle({ left: 140, top: 100, radius: 34, fill: '#8e44ad' })];
    } finally {
      for (const [k, had, value] of saved) {
        if (had) defaults[k] = value;
        else delete defaults[k];
      }
    }
    // Same code, built after the restore: plain defaults.
    const plain = [new Rect({ left: 220, top: 100, width: 70, height: 70, fill: '#f2b134' }), new Circle({ left: 300, top: 100, radius: 34, fill: '#8e44ad' })];
    canvas.add(...styled, ...plain, caption('new defaults', 100, 160), caption('default defaults', 260, 160));
    canvas.setActiveObject(styled[0]!);
    if (stage.preview) say(`styled ${styled[0]!.cornerColor}\nplain ${plain[0]!.cornerColor}`);
    else say(`styled cornerColor ${styled[0]!.cornerColor} · plain cornerColor ${plain[0]!.cornerColor}\nFabricObject.ownDefaults.cornerColor now ${String(defaults.cornerColor)}`);
    canvas.requestRenderAll();
  };
  build('blue circles');

  if (stage.bar) {
    select(stage.bar, 'defaults', Object.keys(PRESETS) as Preset[], build);
  } else {
    const names = Object.keys(PRESETS) as Preset[];
    let n = 0;
    stage.every(1500, () => {
      n++;
      build(names[n % names.length]!);
      canvas.setActiveObject(canvas.getObjects()[n % 2 ? 0 : 2]!);
      canvas.requestRenderAll();
    });
  }

  return stage.dispose;
};

export default mount;
