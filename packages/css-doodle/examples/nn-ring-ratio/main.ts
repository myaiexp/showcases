// Step ratio: @nN
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1 / 100% / #f5f5f0;
  background: radial-gradient(
    @m10(
      #000 @${v}(*100%),
      #0000 @§V(*100%)
    )
  );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`nN`));
  stage.variants(doodle, [
    { label: '@nN', code: code(`nN`) },
    { label: '@Nn', code: code(`Nn`) },
  ]);
  stage.say('@nN(*100%) runs from 10% to 100% in ten steps');
  return () => stage.dispose();
};

export default mount;
