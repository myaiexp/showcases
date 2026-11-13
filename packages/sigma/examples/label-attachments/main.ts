// Label attachments: an SVG card anchored to a node label through labelAttachments
import Sigma from 'sigma';
import { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildPeople } from './data.ts';
import { addSelect, controlRow } from './ui.ts';
import './style.css';

const PLACEMENTS = ['below', 'above', 'left', 'right'];

const escapeXml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildPeople();

  const renderer = new Sigma(graph, container, {
    // Wide padding keeps long right-hand labels and the cards inside the stage; a 200px
    // preview card can't spare 90px a side.
    settings: { autoRescaleContent: 'nodes', stagePadding: preview ? 24 : 90 },
    primitives: {
      nodes: {
        // 1. Declare a named renderer; it returns SVG content for a node.
        labelAttachments: {
          info: ({ attributes }) => {
            const role = escapeXml(String(attributes['role'] ?? ''));
            const score = Number(attributes['score'] ?? 0);
            const svg =
              '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="54">' +
              '<rect width="150" height="54" rx="8" fill="#222"/>' +
              `<text x="10" y="22" font-family="sans-serif" font-size="13" fill="#fff">${role}</text>` +
              '<rect x="10" y="32" width="130" height="8" rx="4" fill="#555"/>' +
              `<rect x="10" y="32" width="${(score / 100) * 130}" height="8" rx="4" fill="#ffe066"/>` +
              '</svg>';
            return { type: 'svg', svg };
          },
        },
      },
    },
    styles: {
      nodes: [
        DEFAULT_STYLES.nodes,
        {
          label: { attribute: 'label' },
          labelVisibility: 'visible',
          // 2. Assign it to nodes: an attribute drives the card previews, hover shows them in the full view.
          labelAttachment: { attribute: 'attachment' },
          // 3. Position it relative to the label.
          labelAttachmentPlacement: { attribute: 'placement', defaultValue: 'below' },
          // Sigma 4.0.6 only draws attachments on nodes whose backdrop is visible (DEFAULT_STYLES
          // does that on hover), so the card previews switch a soft backdrop on with the card.
          backdropVisibility: { attribute: 'backdrop', defaultValue: 'hidden' },
          backdropColor: 'rgba(255, 224, 102, 0.35)',
          backdropShadowBlur: 0,
        },
        { whenState: 'isHovered', then: { labelAttachment: 'info', backdropVisibility: 'visible' } },
      ],
    },
  });

  let timer = 0;
  if (preview) {
    // No pointer in a card: move the card from node to node on a timer.
    const names = graph.nodes();
    let i = 0;
    const show = (): void => {
      names.forEach((n, k) => {
        const on = k === i % names.length;
        graph.mergeNodeAttributes(n, { attachment: on ? 'info' : null, backdrop: on ? 'visible' : 'hidden' });
      });
      i++;
    };
    show();
    timer = window.setInterval(show, 1400);
  } else {
    const row = controlRow(el);
    addSelect(row, 'labelAttachmentPlacement', PLACEMENTS, 'below', (placement) => {
      graph.updateEachNodeAttributes((_node, attrs) => ({ ...attrs, placement }));
    });
    const hint = document.createElement('span');
    hint.textContent = 'Hover a node to show its attachment.';
    row.append(hint);
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
