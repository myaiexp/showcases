// Render options: one compiled diagram re-rendered with other theme and pad
import type { RenderOptions } from '@terrastruct/d2';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const source = `direction: right
client: {shape: person}
client -> web -> api -> db: query
db: {shape: cylinder}`;

// Theme IDs this build of D2 knows (others throw "theme N not found").
const THEMES = ['0', '1', '3', '4', '5', '6', '7', '8', '100', '101', '102', '103', '104', '105', '200', '201', '300', '301', '302', '303'];

const PRESETS: RenderOptions[] = [
  { themeID: 200 },
  { themeID: 200, sketch: true },
  { themeID: 4, pad: 0 },
  { themeID: 101, sketch: true, pad: 60 },
  { themeID: 300 },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const d2 = await stage.d2();
  // Compiled once: render alone applies every change below, no new layout.
  const result = await d2.compile(source);
  const options: RenderOptions = { ...result.renderOptions, themeID: 200, pad: 24 };

  const draw = async (): Promise<void> => {
    try {
      stage.show(await d2.render(result.diagram, options));
      const { themeID, sketch, pad } = options;
      stage.say(`render(diagram, ${JSON.stringify({ themeID, sketch, pad })})`);
    } catch (err) {
      stage.fail(err);
    }
  };

  if (stage.preview) {
    let i = 0;
    const next = (): void => {
      Object.assign(options, { sketch: false, pad: 24 }, PRESETS[i++ % PRESETS.length]);
      void draw();
    };
    next();
    stage.every(2600, next);
  } else {
    stage.select('themeID', THEMES, '200', (v) => {
      options.themeID = Number(v);
      void draw();
    });
    stage.toggle('sketch', false, (v) => {
      options.sketch = v;
      void draw();
    });
    stage.select('pad', ['0', '24', '100'], '24', (v) => {
      options.pad = Number(v);
      void draw();
    });
    await draw();
  }
  return () => stage.dispose();
};

export default mount;
