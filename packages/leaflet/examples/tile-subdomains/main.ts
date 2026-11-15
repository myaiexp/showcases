// The subdomains option: a string or an array, handed out to tiles by x + y
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { onRequest } from '../../shared/tile-urls.ts';

type Choice = 'default' | 'one' | 'array';
const CHOICES: Record<Choice, { label: string; subdomains?: string | string[] }> = {
  default: { label: "default: 'abc'" },
  one: { label: "subdomains: 'a'", subdomains: 'a' },
  array: { label: "subdomains: ['east', 'west']", subdomains: ['east', 'west'] },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each tile takes the subdomain at index |x + y| % count. The tally counts requests per subdomain.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: 4 }));
  const pre = stage.side('Requests per subdomain');

  let layer: LocalTileLayer | undefined;
  let tally = new Map<string, number>();
  const show = (label: string): void => {
    const text = [...tally].map(([s, n]) => `${s}: ${n}`).join('   ');
    if (pre) pre.textContent = `${label}\n\n${[...tally].map(([s, n]) => `${s}.tiles.example  ${n}`).join('\n')}`;
    else stage.say(`${label}: ${text}`);
  };

  const use = (choice: Choice): void => {
    layer?.remove();
    tally = new Map();
    const { label, subdomains } = CHOICES[choice];
    // The default 'abc' applies when the option is left out.
    layer = new LocalTileLayer('https://{s}.tiles.example/light/{z}/{x}/{y}.png', {
      attribution: LAND_ATTRIBUTION,
      ...(subdomains ? { subdomains } : {}),
    });
    onRequest(layer, (url) => {
      const sub = new URL(url).hostname.split('.')[0] ?? '?';
      tally.set(sub, (tally.get(sub) ?? 0) + 1);
      show(label);
    });
    layer.addTo(map);
    show(label);
  };
  use('default');

  stage.select('subdomains', Object.entries(CHOICES).map(([value, c]) => ({ value: value as Choice, label: c.label })), 'default', use);

  if (stage.preview) {
    const order: Choice[] = ['default', 'one', 'array'];
    stage.cycle(
      order.flatMap((c, i) => [
        { run: () => (use(c), map.setView([50 - i * 12, 10 + i * 20], 4, { animate: false })) },
      ]),
      2800,
    );
  }
  return () => stage.dispose();
};

export default mount;
