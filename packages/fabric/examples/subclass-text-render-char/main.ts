// Subclassing: a Textbox whose _renderChar can draw a block instead of the glyph
import { Canvas, Textbox } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

class Redacted extends Textbox {
  declare censored: boolean;
  static override type = 'ShowcaseRedacted';
  static override cacheProperties = [...Textbox.cacheProperties, 'censored'];
  static override customProperties = ['censored'];

  constructor(text: string, options?: object) {
    super(text, { censored: true, ...options } as ConstructorParameters<typeof Textbox>[1]);
  }

  // Called for every character when drawing (like the guide's bitmap font does). Layout and
  // measuring still use the real glyph widths, so the text wraps and edits as before.
  override _renderChar(
    method: 'fillText' | 'strokeText',
    c: CanvasRenderingContext2D,
    lineIndex: number,
    charIndex: number,
    char: string,
    left: number,
    top: number,
  ): void {
    if (!this.censored || char.trim() === '') return super._renderChar(method, c, lineIndex, charIndex, char, left, top);
    if (method === 'fillText') {
      c.fillStyle = '#2b2a33';
      const w = c.measureText(char).width;
      c.fillRect(left, top - this.fontSize * 0.78, w + 0.5, this.fontSize * 0.95);
    }
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [220, 200],
    hint: 'Textbox draws one character at a time through _renderChar. The override paints a block for each letter while censored is on; spaces and the layout are untouched.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = briefStatus(stage);
  const text = new Redacted('The launch code is 4 8 15 16 23 42 and nobody may read it aloud.', {
    left: 110, top: 100, width: 180, fontSize: 18, fontFamily: 'sans-serif', fill: '#2b2a33', textAlign: 'left',
  });
  canvas.add(text);

  const set = (on: boolean): void => {
    text.set('censored', on);
    canvas.requestRenderAll();
    say(`censored: ${on}`);
  };
  set(true);
  if (stage.bar) checkbox(stage.bar, 'censored', true, set);
  else {
    let on = true;
    stage.every(1400, () => set((on = !on)));
  }

  return stage.dispose;
};

export default mount;
