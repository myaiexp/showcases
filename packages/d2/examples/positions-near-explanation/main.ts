// A markdown block with `near: center-left` sits beside the diagram.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Explanation near center-left',
        code: `explanation: |md
  # LLMs
  A Large Language Model learns from
  vast amounts of text and predicts
  the next words of a response.
| {
  near: center-left
}

ML Platform -> Pre-trained models
ML Platform -> Model registry
ML Platform -> Compiler
ML Platform -> Validation
ML Platform -> Auditing

Model registry -> Server.Batch Predictor
Server.Online Model Server
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
