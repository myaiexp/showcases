// salt and noXMLTag: render options for several D2 SVGs in one HTML page
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const source = 'a -> b';

/** The diagram's ID prefix D2 puts on classes, clip paths and fonts ("d2-1234567890"). */
const prefix = (svg: string): string => /\bd2-\d+[\w-]*/.exec(svg)?.[0] ?? '(none)';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const panel = stage.side('What the options change in the output');
  const pre = document.createElement('pre');
  pre.className = 'dd-pre';
  panel?.append(pre);
  try {
    const d2 = await stage.d2();
    const result = await d2.compile(source, { themeID: 200, pad: 24 });
    const base = result.renderOptions;
    const plain = await d2.render(result.diagram, base);
    const again = await d2.render(result.diagram, base);
    const salted = await d2.render(result.diagram, { ...base, salt: 'second-copy' });
    const noTag = await d2.render(result.diagram, { ...base, noXMLTag: true });
    stage.show(salted);

    const lines = [
      `Same diagram twice: ${prefix(plain)} and ${prefix(again)} (identical IDs)`,
      `With salt "second-copy": ${prefix(salted)}`,
      `Output starts: ${plain.slice(0, 38)}…`,
      `With noXMLTag: true: ${noTag.slice(0, 38)}…`,
    ];
    pre.textContent = lines.join('\n\n');
    if (stage.preview) {
      let i = 0;
      stage.say(lines[0]!);
      stage.every(2500, () => stage.say(lines[(i = (i + 1) % lines.length)]!));
    } else {
      stage.say('The diagram shown was rendered with salt: "second-copy".');
    }
  } catch (err) {
    stage.fail(err);
  }
  return () => stage.dispose();
};

export default mount;
