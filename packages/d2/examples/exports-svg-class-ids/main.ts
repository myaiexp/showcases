// SVG output: each shape's element carries its ID base64-encoded as a CSS class
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const source = `direction: right
my-shape -> api -> db
db.shape: cylinder
api: {
  cache
}`;

/** The class D2 gives a shape: its ID in base64. This build keeps the "=" padding. */
const classOf = (id: string): string => btoa(id);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  try {
    const d2 = await stage.d2();
    const result = await d2.compile(source, { themeID: 200, pad: 24 });
    const svg = stage.show(await d2.render(result.diagram, result.renderOptions));
    const ids = result.diagram.shapes.map((s) => s.id);

    // Picks one shape's element by its class, the way post-processing CSS or JS would.
    const highlight = (id: string): void => {
      for (const g of Array.from(svg.querySelectorAll<SVGGElement>('.dd-picked'))) g.classList.remove('dd-picked');
      const cls = classOf(id);
      const node = svg.querySelector<SVGGElement>(`.${CSS.escape(cls)}`);
      node?.classList.add('dd-picked');
      stage.say(node ? `${id} → class="${cls}"` : `${id}: no element with class ${cls}`, node ? 'ok' : 'warn');
    };

    if (stage.preview) {
      let i = 0;
      highlight(ids[0]!);
      stage.every(1600, () => highlight(ids[(i = (i + 1) % ids.length)]!));
    } else {
      stage.select('Shape ID', ids, ids[0]!, highlight);
      highlight(ids[0]!);
    }
  } catch (err) {
    stage.fail(err);
  }
  return () => stage.dispose();
};

export default mount;
