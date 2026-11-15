// setDefaultFont switching the default family between steps
import { Infographic, registerFont, setDefaultFont } from '@antv/infographic';
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
  addFont('showcase-brush', FACES.brush),
]);

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'setDefaultFont(\'showcase-serif\')',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Default family
  lists
    - label Set
      desc By setDefaultFont
      icon sliders
    - label Not
      desc In the theme
      icon xmark
    - label Used
      desc For all the text
      icon check`,
    font: 'showcase-serif',
  },
  {
    say: 'setDefaultFont(\'showcase-hand\')',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Default family
  lists
    - label Set
      desc By setDefaultFont
      icon sliders
    - label Not
      desc In the theme
      icon xmark
    - label Used
      desc For all the text
      icon check`,
    font: 'showcase-hand',
  },
  {
    say: 'setDefaultFont(\'showcase-brush\')',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Default family
  lists
    - label Set
      desc By setDefaultFont
      icon sliders
    - label Not
      desc In the theme
      icon xmark
    - label Used
      desc For all the text
      icon check`,
    font: 'showcase-brush',
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
        // Page-wide: the cleanup below restores the library default.
        setDefaultFont(step.font);
        infographic.render(step.syntax);
        if (code) code.textContent = 'setDefaultFont(' + JSON.stringify(step.font) + ')\n\n' + step.syntax;
      },
    })),
  );

  return () => {
    setDefaultFont('Alibaba PuHuiTi');
    stage.dispose();
  };
};

export default mount;
