// locationmode 'country names': type names, aliases or accented spellings and the map shades what resolves
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const lists = [
  'United States, Canada, United Kingdom',
  'France, Germany, Italy, Spain, Portugal',
  "Türkiye, Cote d'Ivoire, Viet Nam",
  'Brazil, argentina, CHILE, peru',
  'Japan, South Korea, Australia, New Zealand',
];

const mount: Mount = async (el, ctx) => {
  await loadGeoAssets();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });
  const names = (text: string): string[] => text.split(',').map((s) => s.trim()).filter(Boolean);

  await Plotly.newPlot(
    stage.div,
    [{ type: 'choropleth', locations: names(lists[0]!), locationmode: 'country names', z: names(lists[0]!).map(() => 1), colorscale: [[0, '#636efa'], [1, '#636efa']], showscale: false }],
    { template: stage.template, title: { text: stage.preview ? '' : 'Choropleth with country names' } },
    stage.config,
  );

  const show = (text: string): Promise<void> => {
    const n = names(text);
    return restyle(stage.div, { locations: [n], z: [n.map(() => 1)] });
  };
  if (stage.bar) {
    // matching ignores case, accents and punctuation; a name that doesn't resolve is skipped
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'text';
    input.size = 56;
    input.value = lists[0]!;
    input.addEventListener('input', () => void show(input.value));
    label.append('locations (comma separated)', input);
    stage.bar.append(label);
  }
  if (stage.preview) stage.every(1500, (i) => void show(lists[i % lists.length]!));

  return () => stage.dispose();
};

export default mount;
