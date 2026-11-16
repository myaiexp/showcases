// Text: input fields give strings, fabric wants numbers: a string left makes left + 10 concatenate
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { cycle, INK, textField } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 160],
    hint: 'A text input returns "120", not 120, and fabric neither checks nor converts it: set("left", "120") keeps the string, so left + 40 becomes "12040" and the text leaves the canvas. parseFloat first, as the gotchas guide says.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText('Where am I?', { left: 120, top: 80, fontFamily: 'Kalam', fontSize: 40, fontWeight: 700, fill: INK, backgroundColor: 'rgba(59,125,216,0.14)' });
  canvas.add(text);

  const say = status(stage);
  const report = (what: string): void => {
    text.setCoords();
    say(`${what}\nleft = ${JSON.stringify(text.left)} (${typeof text.left})`);
    canvas.requestRenderAll();
  };
  report('start');
  const setString = (v: string): void => {
    text.set('left', v as unknown as number); // what a bare input value does
    report(`set('left', ${JSON.stringify(v)})`);
  };
  const setParsed = (v: string): void => {
    const n = parseFloat(v);
    if (!Number.isNaN(n)) text.set('left', n);
    report(`set('left', parseFloat(${JSON.stringify(v)}))`);
  };
  // Plain JavaScript on top of the property: the + decides what happens.
  const nudge = (): void => {
    text.set('left', (text.left as number) + 40);
    report('set(left + 40)');
  };

  if (stage.bar) {
    const field = textField(stage.bar, 'left', '120', () => undefined, 60);
    button(stage.bar, 'set the string', () => setString(field.value));
    button(stage.bar, 'set parseFloat(string)', () => setParsed(field.value));
    button(stage.bar, 'left + 40', nudge);
  } else {
    const steps = [() => setString('120'), nudge, () => setParsed('120'), nudge, nudge];
    cycle(stage, steps, 1300, (fn) => fn());
  }
  return stage.dispose;
};

export default mount;
