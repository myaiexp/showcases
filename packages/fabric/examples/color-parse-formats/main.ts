// Colors: new Color() reads hex, rgb, hsl and names and tells you when it cannot
import { Canvas, Color, FabricText, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { swatch } from '../../shared/colors.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Each row parses its text with new Color(text). The last row is yours: type any CSS colour into the box.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = status(stage, '');

  const inputs = ['#f55', '356735', 'rgb(100,0,100)', 'rgba(10, 20, 30, 0.5)', 'hsl(200, 80%, 50%)', 'coral', 'transparent'];
  const rows: { box: Rect; text: FabricText }[] = [];
  const cycle = ['olive', '#8e6bd8', 'hsla(40,90%,55%,0.6)', 'banana'];

  // one row: a swatch filled with the parsed colour, and what the Color class made of the text
  const fill = (i: number, source: string): void => {
    const color = new Color(source); // never throws: unknown text becomes black and sets isUnrecognised
    const { box, text } = rows[i]!;
    box.set('fill', color.toRgba());
    text.set('text', `${source}  ->  ${color.toRgba()}${color.isUnrecognised ? '  (unrecognised)' : ''}`);
    if (i === inputs.length && !stage.preview) say(color.isUnrecognised ? `"${source}" is not a colour: black, isUnrecognised = true` : `"${source}" -> #${color.toHex()}`);
    canvas.requestRenderAll();
  };

  for (let i = 0; i <= inputs.length; i++) {
    const [box] = swatch('#000', 14, 10 + i * 28, 26, 22);
    const text = new FabricText('', { left: 50, top: 21 + i * 28, originX: 'left', fontSize: 11, fontFamily: 'monospace', fill: '#333', selectable: false });
    canvas.add(box!, text);
    rows.push({ box: box as Rect, text });
    if (i < inputs.length) fill(i, inputs[i]!);
  }
  fill(inputs.length, cycle[0]!);

  if (stage.preview) {
    let k = 0;
    stage.every(1100, () => fill(inputs.length, cycle[++k % cycle.length]!));
  } else {
    const box = document.createElement('input');
    Object.assign(box, { type: 'text', value: cycle[0], spellcheck: false });
    box.style.cssText = 'font:13px ui-monospace,monospace;width:210px';
    box.addEventListener('input', () => fill(inputs.length, box.value));
    stage.bar!.append('your colour', box);
  }

  return stage.dispose;
};

export default mount;
