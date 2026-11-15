// ASCII output: render returns text art, in Unicode box drawing or plain ASCII
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const source = `Hello -> World
World -> Again: twice`;

type Mode = 'extended' | 'standard';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const d2 = await stage.d2();

  const draw = async (asciiMode: Mode): Promise<void> => {
    try {
      // ascii: true makes render return text instead of SVG; asciiMode picks the characters.
      const result = await d2.compile(source, { ascii: true, asciiMode });
      const text = await d2.render(result.diagram, result.renderOptions);
      stage.showText(text);
      stage.say(asciiMode === 'extended' ? "asciiMode: 'extended' (the default): Unicode box drawing" : "asciiMode: 'standard': + - | > only");
    } catch (err) {
      stage.fail(err);
    }
  };

  if (stage.preview) {
    let mode: Mode = 'extended';
    await draw(mode);
    stage.every(3000, () => {
      mode = mode === 'extended' ? 'standard' : 'extended';
      void draw(mode);
    });
  } else {
    stage.select('asciiMode', ['extended', 'standard'], 'extended', (v) => void draw(v as Mode));
    await draw('extended');
  }
  return () => stage.dispose();
};

export default mount;
