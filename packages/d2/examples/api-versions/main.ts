// version() and jsVersion(): which D2 the WASM carries and which D2.js wraps it
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  try {
    const d2 = await stage.d2();
    const language = await d2.version();
    const wrapper = await d2.jsVersion();
    // Draw the answer as a diagram, with the versions as labels.
    const source = `direction: right
js: "@terrastruct/d2 ${wrapper}" {shape: package}
wasm: "D2 ${language} (WASM)" {shape: hexagon}
js -> wasm: "jsVersion() → version()"`;
    const result = await d2.compile(source, { themeID: 200, pad: 24 });
    stage.show(await d2.render(result.diagram, result.renderOptions));
    stage.say(`d2.version() = ${language}, d2.jsVersion() = ${wrapper}`, 'ok');
  } catch (err) {
    stage.fail(err);
  }
  return () => stage.dispose();
};

export default mount;
