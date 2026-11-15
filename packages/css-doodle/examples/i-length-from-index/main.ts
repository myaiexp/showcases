// A length from the index
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1x10 / 100% auto / #f5f5f0;
  border: 1px solid #000;
  font-size: 80%;
  margin: auto;
  line-height: 1;
  
  width: @i(*10%);
  @content: @i;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@i(*10%)`), { frame: 'wide' });
  stage.variants(doodle, [
    { label: '*10%', code: code(`@i(*10%)`) },
    { label: '*5%, +50%', code: code(`@i(*5%, +50%)`) },
    { label: '2/ (2 ÷ @i)', code: code(`@i(2/, *100%)`) },
  ]);
  stage.say('@i(*10%) multiplies the index and carries the unit');
  return () => stage.dispose();
};

export default mount;
