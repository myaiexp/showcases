// util.stylesFromArray and stylesToArray convert text style forms
import { Canvas, FabricText, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { codePanel, pretty } from '../../shared/code-panel.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const TEXT = 'Style by range';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['text with styles', 'array ⇄ styles'],
    scene: [260, 200],
    hint: 'A text object keeps styles as { line: { char: style } }. stylesFromArray builds that from a list of { start, end, style } ranges over the whole string, and stylesToArray merges equal neighbours back into ranges.',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const canvas = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true }), pa);
  const dump = codePanel(pb, stage.preview);

  const o = { start: 0, end: 5, color: '#e94b3c' };
  let last = '';
  const text = new FabricText(TEXT, { left: 130, top: 100, fontSize: 30, fontFamily: 'sans-serif', fill: '#2b2a33' });
  canvas.add(text);

  const apply = (): void => {
    const key = `${o.start}-${o.end}-${o.color}`;
    if (key === last) return;
    last = key;
    const ranges = [
      { start: o.start, end: Math.min(9, Math.max(o.start, o.end)), style: { fill: o.color, fontWeight: 'bold' } },
      { start: 9, end: 14, style: { fill: '#3b7dd8', underline: true } },
    ].sort((a, b) => a.start - b.start);
    text.set('styles', util.stylesFromArray(ranges, TEXT));
    text.initDimensions();
    text.setCoords();
    canvas.requestRenderAll();
    const back = util.stylesToArray(text.styles, TEXT);
    dump(`stylesFromArray([\n${ranges.map((r) => `  ${JSON.stringify(r)}`).join(',\n')}\n])\n→ styles\n${pretty(text.styles, stage.preview).slice(0, stage.preview ? 220 : 600)}\n\nstylesToArray(styles, text)\n${JSON.stringify(back)}`);
  };
  apply();

  if (stage.bar) {
    slider(stage.bar, 'start', 0, 9, 1, o.start, (v) => ((o.start = v), apply()));
    slider(stage.bar, 'end', 0, 9, 1, o.end, (v) => ((o.end = v), apply()));
    select(stage.bar, 'colour', ['#e94b3c', '#2e9e5b', '#d99a1c'] as const, (v) => ((o.color = v), apply()));
  } else {
    stage.loop((_dt, t) => {
      o.start = Math.floor(2 + 2 * Math.sin(t * 0.9));
      o.end = o.start + 5;
      apply();
    });
  }
  return stage.dispose;
};

export default mount;
