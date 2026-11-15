// scale and center: how D2 sizes its SVG, with its own size attributes kept
import type { RenderOptions } from '@terrastruct/d2';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const source = `direction: right
a -> b -> c`;

const CASES: { label: string; options: RenderOptions }[] = [
  { label: 'Default: no scale, so the SVG fits its container', options: {} },
  { label: 'scale: 1: real size, fitting turned off', options: { scale: 1 } },
  { label: 'scale: 0.5: half size', options: { scale: 0.5 } },
  { label: 'center: true: centred in its viewBox', options: { center: true } },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const d2 = await stage.d2();
  const result = await d2.compile(source, { themeID: 200, pad: 24 });
  const attrs = stage.side('The outer <svg> tag D2 wrote');
  const pre = document.createElement('pre');
  pre.className = 'dd-pre';
  attrs?.append(pre);

  const draw = async (i: number): Promise<void> => {
    const c = CASES[i]!;
    try {
      const text = await d2.render(result.diagram, { ...result.renderOptions, ...c.options });
      // raw: keep D2's width, height and preserveAspectRatio instead of fitting the box.
      stage.show(text, { raw: true });
      pre.textContent = (/<svg[^>]*>/.exec(text.replace(/^<\?xml[^>]*>/, ''))?.[0] ?? '').replace(/ (?=\w+=)/g, '\n  ');
      stage.say(c.label);
    } catch (err) {
      stage.fail(err);
    }
  };

  if (stage.preview) {
    let i = 0;
    await draw(0);
    stage.every(2800, () => void draw((i = (i + 1) % CASES.length)));
  } else {
    stage.select('Options', CASES.map((c, i) => [String(i), c.label] as [string, string]), '0', (v) => void draw(Number(v)));
    await draw(0);
  }
  return () => stage.dispose();
};

export default mount;
