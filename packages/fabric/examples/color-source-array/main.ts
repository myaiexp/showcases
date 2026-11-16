// Colors: build a Color from [r, g, b, a], read getSource() and use fromHex()
import { Canvas, Color, FabricText, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'new Color([r, g, b, a]) takes the channels directly; getSource() gives them back as [r, g, b, a].',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));

  const chip = new Rect({ left: 180, top: 55, width: 320, height: 80, fill: '#000', stroke: '#00000022', selectable: false });
  const text = new FabricText('', { left: 20, top: 115, originX: 'left', originY: 'top', fontSize: 13, lineHeight: 1.5, fontFamily: 'monospace', fill: '#333', selectable: false });
  canvas.add(chip, text);

  const channels: [number, number, number, number] = [233, 75, 60, 1];
  const show = (): void => {
    const c = new Color(channels);
    const viaHex = Color.fromHex(`#${c.toHex()}`); // static parsers exist for hex, rgb(a), hsl(a)
    chip.set('fill', c.toRgba());
    text.set(
      'text',
      [
        `new Color([${channels.map((n) => +n.toFixed(2)).join(', ')}])`,
        `getSource()      [${c.getSource().join(', ')}]`,
        `toHex()          ${c.toHex()}`,
        `Color.fromHex()  [${viaHex.getSource().join(', ')}]`,
        `isUnrecognised   ${c.isUnrecognised}`,
      ].join('\n'),
    );
    canvas.requestRenderAll();
  };

  show();
  if (stage.preview) {
    stage.loop((_dt, t) => {
      channels[0] = 128 + 127 * Math.sin(t);
      channels[1] = 128 + 127 * Math.sin(t * 1.3 + 2);
      channels[2] = 128 + 127 * Math.sin(t * 0.7 + 4);
      channels[0] = Math.round(channels[0]!);
      channels[1] = Math.round(channels[1]!);
      channels[2] = Math.round(channels[2]!);
      show();
    });
  } else {
    (['r', 'g', 'b'] as const).forEach((name, i) => slider(stage.bar!, name, 0, 255, 1, channels[i]!, (v) => ((channels[i] = v), show())));
    slider(stage.bar!, 'a', 0, 1, 0.05, 1, (v) => ((channels[3] = v), show()), (v) => v.toFixed(2));
  }

  return stage.dispose;
};

export default mount;
