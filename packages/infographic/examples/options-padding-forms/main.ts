// padding: a single number, or [top, right, bottom, left]
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-grid-compact-card
theme dark
data
  lists
    - label Fast
      icon bolt
    - label Small
      icon compress
    - label Clear
      icon eye
    - label Open
      icon lock-open`;

const FORMS: (number | number[])[] = [0, 24, [0, 0, 0, 70], [60, 0, 0, 0], [0, 70, 0, 0], [0, 0, 60, 0]];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', theme: 'dark' }));
  infographic.render(SYNTAX);

  const names = ['top', 'right', 'bottom', 'left'];
  stage.cycle(
    FORMS.map((padding) => ({
      say: Array.isArray(padding)
        ? `padding: [${padding.join(', ')}], extra ${names[padding.findIndex((n) => n > 0)]}`
        : `padding: ${padding}`,
      run: () => infographic.update({ padding }),
      hold: 1300,
    })),
  );
  return () => stage.dispose();
};

export default mount;
