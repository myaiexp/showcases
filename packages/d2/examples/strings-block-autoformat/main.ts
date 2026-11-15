// A block string (`|go ...
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Pasted at column one',
        code: `parent: {
example_code: |go
  package fs
  type File interface {
    Stat() (FileInfo, error)
    Close() error
  }
|
}
`,
      },
      {
        label: 'After autoformat',
        code: `parent: {
  example_code: |go
    package fs
    type File interface {
      Stat() (FileInfo, error)
      Close() error
    }
  |
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
