// A label sits outside the shape or on its border with `near` prefixes.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'outside- and border- labels',
        code: `style.fill: "#222a25"
env: Your environment {
  # --- Outside label ---
  label.near: outside-bottom-center
  style.fill: "#222a25"
  style.stroke-dash: 2
  style.double-border: false
  style.stroke: "#1e402d"
  style.font-color: "#3ddb89"
  app: Your applicaton {
    # --- Border label ---
    label.near: border-top-center
    style.stroke: "#3d9069"
    style.fill: "#222a25"
    style.font-color: "#63c08c"

    *.style.stroke: "#adf1c6"
    *.style.fill: "#306a4a"
    *.style.font-color: "#eef9f3"
    Workflow
    SDK
    Workers
    Workflow -> SDK: hello {
      style.stroke: "#fbfdfd"
      style.font-color: "#adf1c6"
    }
  }
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
