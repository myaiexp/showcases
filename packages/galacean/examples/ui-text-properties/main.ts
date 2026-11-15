// UI Text: fontSize, fontStyle, lineSpacing, color and alignment
import { Color, FontStyle, TextHorizontalAlignment, TextVerticalAlignment } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, steps } from '../../shared/gfx-kit.ts';
import { select, slider } from '../../shared/controls.ts';
import { image, label, rect, uiScene } from '../../shared/ui-kit.ts';

const H = ['Left', 'Center', 'Right'] as const;
const V = ['Top', 'Center', 'Bottom'] as const;

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  const say = caption(stage, '');
  image(canvasEntity, 0, 0, 440, 240, { color: [0.25, 0.3, 0.42, 1] }, 'box');
  const { text, entity } = label(canvasEntity, 0, 0, 'UI Text\nsecond line', 36);
  rect(entity).size.set(440, 240);
  const preset = (i: number): void => {
    text.fontSize = [36, 28, 44, 32][i % 4]!;
    text.fontStyle = [FontStyle.None, FontStyle.Bold, FontStyle.Italic, FontStyle.Bold | FontStyle.Italic][i % 4]!;
    text.lineSpacing = [0, 12, 0, 24][i % 4]!;
    const c = [[1, 1, 1], [1, 0.7, 0.4], [0.5, 0.9, 1], [0.7, 1, 0.6]][i % 4]!;
    text.color = new Color(...lin(c as [number, number, number]), 1);
    text.horizontalAlignment = TextHorizontalAlignment[H[i % 3]!];
    text.verticalAlignment = TextVerticalAlignment[V[Math.floor(i / 2) % 3]!];
    say(`fontSize ${text.fontSize}, fontStyle ${text.fontStyle}, lineSpacing ${text.lineSpacing}, ${H[i % 3]} / ${V[Math.floor(i / 2) % 3]}`);
  };
  if (stage.preview) steps(canvasEntity, 1.8, 12, preset);
  else {
    preset(0);
    slider(stage.bar, 'fontSize', 14, 70, 1, 36, (v) => (text.fontSize = v));
    slider(stage.bar, 'lineSpacing', 0, 50, 1, 0, (v) => (text.lineSpacing = v));
    select(stage.bar, 'horizontal', H, (v) => (text.horizontalAlignment = TextHorizontalAlignment[v]), 'Left');
    select(stage.bar, 'vertical', V, (v) => (text.verticalAlignment = TextVerticalAlignment[v]), 'Top');
    select(stage.bar, 'fontStyle', ['None', 'Bold', 'Italic', 'Bold | Italic'] as const, (v) => (text.fontStyle = v === 'None' ? 0 : v === 'Bold' ? FontStyle.Bold : v === 'Italic' ? FontStyle.Italic : FontStyle.Bold | FontStyle.Italic));
  }
  return stage.dispose;
};

export default mount;
