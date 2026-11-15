// shape: class turns keys into fields, and keys with ( into methods.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Field and method',
        code: `MyClass: {
  shape: class

  field: "[]string"
  method(a uint64): (x, y int)
}
`,
      },
      {
        label: 'Void method',
        code: `Counter: {
  shape: class

  count: int
  increment()
  value(): int
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
