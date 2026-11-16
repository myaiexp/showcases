// Text: fontSize, fontWeight and fontStyle on three lines
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { cycle, INK } from '../../shared/text.ts';

const WEIGHTS = ['100', '300', '400', '600', '800', '900'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'Inter is a variable font, so every weight exists; Lora ships regular, bold and italic.' });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const size = new FabricText('fontSize 40', { left: 180, top: 55, fontFamily: 'Lora', fontSize: 40, fill: INK });
  const weight = new FabricText('fontWeight 400', { left: 180, top: 125, fontFamily: 'Inter', fontSize: 34, fontWeight: 400, fill: INK });
  const style = new FabricText('fontStyle italic', { left: 180, top: 190, fontFamily: 'Lora', fontSize: 34, fontStyle: 'italic', fill: INK });
  canvas.add(size, weight, style);

  const say = status(stage);
  const setSize = (v: number): void => {
    size.set({ fontSize: v, text: `fontSize ${v}` });
    say(`size ${v} · weight ${weight.fontWeight} · ${style.fontStyle}`);
    canvas.requestRenderAll();
  };
  const setWeight = (v: string): void => {
    weight.set({ fontWeight: Number(v), text: `fontWeight ${v}` });
    say(`size ${size.fontSize} · weight ${v} · ${style.fontStyle}`);
    canvas.requestRenderAll();
  };
  const setStyle = (v: 'normal' | 'italic'): void => {
    style.set({ fontStyle: v, text: `fontStyle ${v}` });
    say(`size ${size.fontSize} · weight ${weight.fontWeight} · ${v}`);
    canvas.requestRenderAll();
  };

  if (stage.bar) {
    slider(stage.bar, 'fontSize', 16, 54, 1, 40, setSize);
    select(stage.bar, 'fontWeight', WEIGHTS, setWeight, '400');
    select(stage.bar, 'fontStyle', ['normal', 'italic'] as const, setStyle, 'italic');
  } else {
    cycle(stage, [0, 1, 2, 3, 4, 5], 700, (i) => {
      setSize([40, 28, 20, 34, 46, 40][i]!);
      setWeight(WEIGHTS[i]!);
      setStyle(i % 2 ? 'normal' : 'italic');
    });
  }
  return stage.dispose;
};

export default mount;
