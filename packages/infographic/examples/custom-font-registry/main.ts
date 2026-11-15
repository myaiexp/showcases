// getFont and getFonts read back what registerFont stored
import { Infographic, getFont, getFonts, registerFont } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { FACES, fontCssUrl } from '../../shared/fonts.ts';

/** Registers a family from bundled font files: the CSS url is a blob, nothing is fetched. */
function addFont(family: string, faces: typeof FACES.serif): Promise<unknown> {
  registerFont({ fontFamily: family, name: family, baseUrl: '', fontWeight: { regular: fontCssUrl(family, faces) } });
  // Text is measured at render time, so also load the face now instead of waiting for the <link>.
  return Promise.all(
    faces.map((f) => {
      const face = new FontFace(family, "url('" + new URL(f.url, document.baseURI).href + "')", { weight: f.weight });
      document.fonts.add(face);
      return face.load();
    }),
  );
}
const READY = Promise.all([
  addFont('showcase-serif', FACES.serif),
  addFont('showcase-hand', FACES.hand),
]);

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'font-family showcase-serif',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
  base
    text
      font-family showcase-serif
data
  title Typeset
  lists
    - label Serif
      desc Letters with feet
      icon feather
    - label Display
      desc For headings
      icon heading
    - label Mono
      desc Fixed widths
      icon code`,
    font: 'showcase-serif',
  },
  {
    say: 'font-family showcase-hand',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
  base
    text
      font-family showcase-hand
data
  title Typeset
  lists
    - label Serif
      desc Letters with feet
      icon feather
    - label Display
      desc For headings
      icon heading
    - label Mono
      desc Fixed widths
      icon code`,
    font: 'showcase-hand',
  },
  {
    say: 'getFont of a name nobody registered',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
  base
    text
      font-family not-registered
data
  title Typeset
  lists
    - label Serif
      desc Letters with feet
      icon feather
    - label Display
      desc For headings
      icon heading
    - label Mono
      desc Fixed widths
      icon code`,
    font: 'not-registered',
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  await READY;
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
    }),
  );
  const code = stage.side('Syntax');

  stage.cycle(
    STEPS.map((step) => ({
      say: step.say,
      run: () => {
        infographic.render(step.syntax);
        if (code) code.textContent = 'getFont(' + JSON.stringify(step.font) + ') →\n' + JSON.stringify(getFont(step.font), null, 2).replace(/blob:[^"]+/, 'blob:…') + '\n\ngetFonts().map(f => f.name) →\n' + JSON.stringify(getFonts().map((f) => f.name));
      },
    })),
  );

  return () => {
    stage.dispose();
  };
};

export default mount;
