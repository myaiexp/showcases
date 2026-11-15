// parseSyntax(): { options, errors, warnings }; the options are then drawn
import { Infographic, parseSyntax } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const STAGES = [
  'infographic list-row-simple-horizontal-arrow\ntheme dark\ndata\n  lists\n    - label Plan',
  'infographic list-row-simple-horizontal-arrow\ntheme dark\ndata\n  lists\n    - label Plan\n      desc Scope it\n    - label Build',
  'infographic list-row-simple-horizontal-arrow\ntheme dark\nmystery 1\ndata\n  lists\n    - label Plan\n      desc Scope it\n    - label Build\n      desc Make it\n    - label Ship',
  'list-row-simple-horizontal-arrow\ntheme dark\ndata\n  lists\n    - label Plan\n    - label Build\n    - label Ship\n    - label Learn',
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side('parseSyntax(text)');
  let current: Infographic | null = null;

  stage.cycle(
    STAGES.map((text) => ({
      run: () => {
        const result = parseSyntax(text);
        const items = (result.options.data?.lists ?? result.options.data?.items ?? []) as unknown[];
        stage.say(`${items.length} items, ${result.errors.length} errors, ${result.warnings.length} warnings`, result.errors.length ? 'warn' : 'ok');
        if (side) side.textContent = `${text}\n\n-> ${JSON.stringify({ options: result.options, errors: result.errors, warnings: result.warnings }, null, 1)}`;
        current?.destroy();
        // The parsed options are plain options: they only need a container to be drawn.
        current = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24, ...result.options }));
        current.render();
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
