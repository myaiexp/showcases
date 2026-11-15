// Per-element font-family: title, item label and item desc
import { Infographic, registerFont } from '@antv/infographic';
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
  addFont('showcase-brush', FACES.brush),
  addFont('showcase-sans', FACES.sans),
]);

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'title serif, label brush, desc sans',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
  title
    font-family showcase-serif
  item
    label
      font-family showcase-brush
    desc
      font-family showcase-sans
data
  title Fonts per element
  desc One family for each part
  lists
    - label First
      desc The label and this line differ
      icon 1
    - label Second
      desc Same again
      icon 2
    - label Third
      desc Last one
      icon 3`,
  },
  {
    say: 'title brush, label sans, desc serif',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
  title
    font-family showcase-brush
  item
    label
      font-family showcase-sans
    desc
      font-family showcase-serif
data
  title Fonts per element
  desc One family for each part
  lists
    - label First
      desc The label and this line differ
      icon 1
    - label Second
      desc Same again
      icon 2
    - label Third
      desc Last one
      icon 3`,
  },
  {
    say: 'title sans, label serif, desc brush',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
  title
    font-family showcase-sans
  item
    label
      font-family showcase-serif
    desc
      font-family showcase-brush
data
  title Fonts per element
  desc One family for each part
  lists
    - label First
      desc The label and this line differ
      icon 1
    - label Second
      desc Same again
      icon 2
    - label Third
      desc Last one
      icon 3`,
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
        if (code) code.textContent = step.syntax;
      },
    })),
  );

  return () => {
    stage.dispose();
  };
};

export default mount;
