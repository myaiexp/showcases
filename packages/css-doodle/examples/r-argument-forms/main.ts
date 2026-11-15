// The forms of @r and @ri
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 4 / 100% _1px / #000;
  color: #fff;
  font-size: .6em;
  @content: ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@r`));
  stage.variants(doodle, [
    { label: '@r', code: code(`@r`) },
    { label: '@r(10)', code: code(`@r(10)`) },
    { label: '@r(5, 10)', code: code(`@r(5, 10)`) },
    { label: '@r(10px)', code: code(`@r(10px)`) },
    { label: '@ri', code: code(`@ri`) },
    { label: '@ri(10)', code: code(`@ri(10)`) },
    { label: '@ri(5, 10)', code: code(`@ri(5, 10)`) },
    { label: '@rand', code: code(`@rand(10)`) },
  ]);
  stage.reroll(doodle);
  stage.say('The bounds are optional; a unit is kept');
  return () => stage.dispose();
};

export default mount;
