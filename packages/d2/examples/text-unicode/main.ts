// Labels in Chinese, Japanese, Korean and emoji lay out like any other text.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'CJK',
        code: `direction: right
你好 -> こんにちは: 世界
こんにちは -> 안녕하세요
`,
      },
      {
        label: 'Emoji',
        code: `direction: right
🐱 -> 🐶: chase
🐶 -> 🦴: fetch
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
