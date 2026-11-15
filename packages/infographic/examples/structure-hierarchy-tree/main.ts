// HierarchyTree structure: cycles edgeType, edgeMarker, markerSize, edgeStyle, edgeCornerRadius, edgeColorMode, edgeWidth, colorMode, edgeOrigin and edgeOriginPadding
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Props = Record<string, string | number | boolean>;

// The documented props of `hierarchy-tree` that the example steps through, one set per step.
const steps: Props[] = [
  { edgeType: 'straight', edgeMarker: 'arrow', markerSize: 10 },
  { edgeType: 'curved', edgeMarker: 'none' },
  { edgeType: 'straight', edgeStyle: 'dashed', edgeMarker: 'dot', markerSize: 6, edgeCornerRadius: 10 },
  { edgeType: 'straight', edgeColorMode: 'solid', edgeWidth: 6, colorMode: 'level' },
  { edgeOrigin: 'distributed', edgeOriginPadding: 30, edgeMarker: 'arrow', colorMode: 'node-flat' },
];

// The data block: the data the structure takes.
const data = `
data
  title Product Team
  root
    label Product
    children
      - label Design
        children
          - label Research
          - label Visual
      - label Engineering
        children
          - label Web
          - label Data
      - label Growth
        children
          - label Content
          - label Sales
`;

const lines = (props: Props): string =>
  Object.entries(props)
    .map(([key, value]) => `    ${key} ${value}`)
    .join('\n');

// Each step writes its props under the `structure hierarchy-tree` line of a design block.
const syntax = (props: Props): string => `
design
  structure hierarchy-tree
${lines(props)}
  item rounded-rect-node
    width 140
theme dark
${data}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle changes the props under structure hierarchy-tree. Pause it to read the syntax on the right, double-click a label to edit it.',
  });
  const panel = stage.side('Syntax');
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      editable: !ctx.preview,
      padding: ctx.preview ? 8 : 24,
    }),
  );

  stage.cycle(
    steps.map((props) => ({
      say: `structure hierarchy-tree: ${Object.entries(props).map(([k, v]) => `${k} ${v}`).join(', ')}`,
      run: () => {
        const text = syntax(props);
        if (panel) panel.textContent = text.trim();
        infographic.render(text);
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
