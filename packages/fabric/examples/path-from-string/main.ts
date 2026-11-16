// Paths: new Path(d) draws any SVG path data string; edit the string and the Path is rebuilt
import { Canvas, Path } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const PRESETS = {
  'the guide triangle': 'M 0 0 L 200 100 L 170 200 z',
  'a curve': 'M 0 80 C 30 0, 90 0, 120 80 S 210 160, 240 80',
  'a house': 'M 0 60 L 60 0 L 120 60 L 120 130 L 0 130 Z',
} as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 220], hint: 'Type SVG path commands (M, L, C, S, Q, A, Z and their lowercase forms). The string is parsed by Path itself.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  let path: Path | undefined;
  const show = (d: string): boolean => {
    try {
      const next = new Path(d, { left: 160, top: 110, fill: 'rgba(59,125,216,0.35)', stroke: '#1d4a8c', strokeWidth: 3, strokeLineJoin: 'round' });
      if (path) canvas.remove(path);
      path = next;
      canvas.add(path);
      say(`${path.path.length} commands · ${path.width.toFixed(0)} × ${path.height.toFixed(0)}`);
      canvas.requestRenderAll();
      return true;
    } catch {
      say('that is not a path string');
      return false;
    }
  };
  const keys = Object.keys(PRESETS) as (keyof typeof PRESETS)[];
  show(PRESETS[keys[0]!]);

  if (stage.bar) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = PRESETS[keys[0]!];
    input.style.cssText = 'width:330px;font:13px ui-monospace,monospace';
    input.addEventListener('input', () => show(input.value));
    const picker = select(stage.bar, 'preset', keys, (k) => {
      input.value = PRESETS[k];
      show(input.value);
    });
    stage.bar.append(input);
    void picker;
  } else {
    let i = 0;
    stage.every(1400, () => show(PRESETS[keys[++i % keys.length]!]));
  }

  return stage.dispose;
};

export default mount;
