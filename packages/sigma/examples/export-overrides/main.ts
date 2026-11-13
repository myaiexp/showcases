// Export with sigmaOverrides and custom dimensions, shown in an <img> instead of downloaded
import { toBlob } from '@sigma/export-image';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import { controlsRow, readout } from './ui.ts';
import './style.css';

type Options = Parameters<typeof toBlob>[1];

// Each preset is one documented way of making the export differ from the screen.
const PRESETS: { name: string; options: Options }[] = [
  { name: 'Same as the screen', options: { backgroundColor: '#ffffff' } },
  {
    name: 'Object override: stagePadding 0',
    options: { backgroundColor: '#ffffff', sigmaOverrides: { settings: { stagePadding: 0 } } },
  },
  {
    // A function receives the source declaration, so it can add to it instead of replacing it.
    name: 'Function override: force every label',
    options: {
      backgroundColor: '#ffffff',
      sigmaOverrides: {
        styles: (styles) => ({
          ...styles,
          nodes: [...(Array.isArray(styles.nodes) ? styles.nodes : [styles.nodes ?? {}]), { labelVisibility: 'visible' }],
        }),
      },
    },
  },
  { name: 'Custom dimensions: 1920 x 1080', options: { backgroundColor: '#ffffff', width: 1920, height: 1080 } },
];

const mount: Mount = (el, { preview }) => {
  const layout = document.createElement('div');
  layout.className = 'layout';
  const container = document.createElement('div');
  container.className = 'stage';
  const result = document.createElement('div');
  result.className = 'result';
  const img = document.createElement('img');
  img.alt = 'The exported graph';
  img.hidden = true; // no broken-image icon while the first export is still being encoded
  const caption = document.createElement('div');
  caption.className = 'caption';
  result.append(img, caption);
  layout.append(container, result);
  el.append(layout);

  const graph = buildGraph(preview ? 10 : 18);
  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes', stagePadding: 40 },
    styles: {
      nodes: {
        x: { attribute: 'x' },
        y: { attribute: 'y' },
        size: 2.6,
        color: '#277da1',
        label: { attribute: 'label' },
        labelVisibility: { whenData: 'important', then: 'visible', else: 'auto' },
      },
      edges: { color: '#ccc', size: 0.3 },
    },
  });

  let dead = false;
  let url: string | null = null;
  let run = 0;
  const show = async (index: number): Promise<void> => {
    const preset = PRESETS[index];
    if (!preset) return;
    const mine = ++run;
    const blob = await toBlob(renderer, preset.options);
    if (dead || mine !== run) return;
    if (url) URL.revokeObjectURL(url);
    url = URL.createObjectURL(blob);
    img.src = url;
    img.hidden = false;
    caption.textContent = preset.name;
  };

  let timer = 0;
  if (preview) {
    let i = 0;
    const next = (): void => {
      void show(i++ % PRESETS.length).catch(() => undefined);
    };
    next();
    timer = window.setInterval(next, 2200);
  } else {
    const row = controlsRow(el);
    const select = document.createElement('select');
    PRESETS.forEach((p, i) => select.append(new Option(p.name, String(i))));
    readout(row, 'The image is rendered by a temporary renderer: the stage is untouched.');
    select.addEventListener('change', () => void show(Number(select.value)).catch(() => undefined));
    row.prepend(select);
    void show(0).catch(() => undefined);
  }

  return () => {
    dead = true;
    window.clearInterval(timer);
    if (url) URL.revokeObjectURL(url);
    renderer.kill();
  };
};

export default mount;
