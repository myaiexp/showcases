// Paths: makePathSimpler() rewrites parsed path data as absolute M, L, C, Q and Z commands only
import { Canvas, Path, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const SAMPLES = {
  'relative + h/s/a': 'M 20 150 l 40 -80 h 60 q 30 -40 60 0 s 40 60 80 0 a 20 20 0 0 1 20 40 z',
  'arcs': 'M 40 120 a 40 40 0 0 1 80 0 a 40 40 0 0 1 80 0 l -40 50 z',
  'smooth curves': 'M 20 150 c 40 -120 80 -120 100 0 s 100 60 120 -40 t 40 0',
} as const;
type Name = keyof typeof SAMPLES;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 200], hint: 'Fabric turns every path into the simple form first (Path.path holds it). The panel shows the commands before and after.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  let panel: HTMLPreElement | undefined;
  if (!stage.preview) {
    panel = document.createElement('pre');
    panel.style.cssText = 'font:12px/1.5 ui-monospace,monospace;color:var(--fg-2);max-width:740px;white-space:pre-wrap;margin:0';
    stage.box.insertBefore(panel, stage.bar);
  }

  let path: Path | undefined;
  const show = (name: Name): void => {
    const parsed = util.parsePath(SAMPLES[name]); // the commands exactly as written
    const simple = util.makePathSimpler(parsed); // all absolute, S/T/A turned into C/Q
    if (path) canvas.remove(path);
    path = new Path(simple, { fill: 'rgba(142,91,214,0.2)', stroke: '#4e2a8c', strokeWidth: 3, selectable: false, evented: false });
    canvas.add(path);
    const letters = (list: typeof parsed): string => [...new Set(list.map((c) => c[0]))].join(' ');
    say(`${letters(parsed)}  →  ${letters(simple)}`);
    if (panel) panel.textContent = `parsePath:        ${parsed.map((c) => c.join(' ')).join('  ')}\nmakePathSimpler:  ${simple.map((c) => c.map((v) => (typeof v === 'number' ? Math.round(v * 10) / 10 : v)).join(' ')).join('  ')}`;
    canvas.requestRenderAll();
  };
  const names = Object.keys(SAMPLES) as Name[];
  show(names[0]!);
  if (stage.bar) select(stage.bar, 'path data', names, show);
  else {
    let i = 0;
    stage.every(1500, () => show(names[++i % names.length]!));
  }

  return stage.dispose;
};

export default mount;
