// Shapes in ASCII: some are drawn, curved ones become boxes with a marker
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each group is rendered on its own so it fits a card.
const groups = [
  { label: 'Drawn in ASCII: rectangle, parallelogram, queue', code: 'rectangle -> parallelogram -> queue\nparallelogram.shape: parallelogram\nqueue.shape: queue' },
  { label: 'Drawn in ASCII: diamond, hexagon, callout', code: 'diamond -> hexagon -> callout\ndiamond.shape: diamond\nhexagon.shape: hexagon\ncallout.shape: callout' },
  { label: 'Curved shapes: a box with a marker in its corner', code: 'circle -> cloud -> oval\ncircle.shape: circle\ncloud.shape: cloud\noval.shape: oval' },
  { label: 'person, cylinder, page', code: 'person -> cylinder -> page\nperson.shape: person\ncylinder.shape: cylinder\npage.shape: page' },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const d2 = await stage.d2();

  const draw = async (i: number): Promise<void> => {
    const group = groups[i]!;
    try {
      const result = await d2.compile(`direction: right\n${group.code}`, { ascii: true });
      stage.showText(await d2.render(result.diagram, result.renderOptions));
      stage.say(group.label);
    } catch (err) {
      stage.fail(err);
    }
  };

  if (stage.preview) {
    let i = 0;
    await draw(i);
    stage.every(3200, () => void draw((i = (i + 1) % groups.length)));
  } else {
    stage.select(
      'Shapes',
      groups.map((g, i) => [String(i), g.label] as [string, string]),
      '0',
      (v) => void draw(Number(v)),
    );
    await draw(0);
  }
  return () => stage.dispose();
};

export default mount;
