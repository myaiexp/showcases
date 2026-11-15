// Changing md to a language name makes a syntax-highlighted code block.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Go',
        code: `explanation: |go
  awsSession := From(c.Request.Context())
  client := s3.New(awsSession)

  ctx, cancelFn := context.WithTimeout(c.Request.Context(), AWS_TIMEOUT)
  defer cancelFn()
|
`,
      },
      {
        label: 'py alias',
        code: `snippet: |py
  def greet(name):
      return f"hello {name}"
|
`,
      },
      {
        label: 'Unknown language',
        code: `snippet: |notalanguage
  just plain text
  no highlighting
|
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
