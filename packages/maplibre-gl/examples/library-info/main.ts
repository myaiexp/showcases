// A panel of library-level getters (version, workers, image limit, RTL plugin)
import {
  Map,
  getMaxParallelImageRequests,
  getRTLTextPluginStatus,
  getVersion,
  getWorkerCount,
  getWorkerUrl,
  isTimeFrozen,
  setMaxParallelImageRequests,
} from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer } from '../../shared/setup.ts';
import { worldStyle } from '../../shared/basemap.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [20, 30],
    zoom: preview ? 0.5 : 1.2,
    interactive: !preview,
  });

  // Each row is a function the library exports; the value is read when the panel is drawn.
  const rows: [string, () => string][] = [
    ['version', () => getVersion()],
    ['workers', () => String(getWorkerCount())],
    ['image requests', () => String(getMaxParallelImageRequests())],
    ['RTL plugin', () => getRTLTextPluginStatus()],
    ['time frozen', () => String(isTimeFrozen())],
    ['worker url', () => getWorkerUrl().replace(/^.*\//, '.../')],
  ];

  const panel = document.createElement('div');
  panel.style.position = preview ? 'absolute' : 'static';
  if (preview) {
    Object.assign(panel.style, { left: '8px', top: '8px', maxWidth: 'calc(100% - 16px)', boxSizing: 'border-box', background: '#0a1320cc', padding: '6px 8px', borderRadius: '6px' });
  } else {
    panel.style.marginTop = '12px';
  }
  panel.style.fontFamily = 'var(--font-mono, monospace)';
  panel.style.fontSize = preview ? '11px' : '13px';
  panel.style.color = preview ? '#fafafa' : 'var(--fg-2)';
  panel.style.display = 'grid';
  panel.style.gridTemplateColumns = 'auto minmax(0, 1fr)';
  panel.style.columnGap = preview ? '8px' : '16px';
  panel.style.maxWidth = '100%';
  panel.style.boxSizing = 'border-box';
  panel.style.justifyContent = 'center';
  panel.style.pointerEvents = 'none';

  const values: HTMLElement[] = [];
  const FULL = ['getVersion()', 'getWorkerCount()', 'getMaxParallelImageRequests()', 'getRTLTextPluginStatus()', 'isTimeFrozen()', 'getWorkerUrl()'];
  for (const [i, [short]] of rows.slice(0, preview ? 4 : rows.length).entries()) {
    const label = preview ? short : (FULL[i] ?? short);
    const name = document.createElement('span');
    name.textContent = label;
    const value = document.createElement('span');
    value.style.textAlign = 'right';
    Object.assign(value.style, { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: '0' });
    values.push(value);
    panel.append(name, value);
  }
  const refresh = (): void => {
    values.forEach((v, i) => (v.textContent = rows[i]?.[1]() ?? ''));
  };
  refresh();
  if (preview) (map.getContainer() as HTMLElement).append(panel);
  else el.append(panel);

  if (!preview) {
    const bar = controlBar(el);
    // setMaxParallelImageRequests is the setter that pairs with the getter above.
    button(bar, 'Max image requests: 16', () => {
      setMaxParallelImageRequests(16);
      refresh();
    });
    button(bar, 'Max image requests: 4', () => {
      setMaxParallelImageRequests(4);
      refresh();
    });
  }

  // The RTL plugin status can change as the library loads, so keep the panel current.
  const timer = window.setInterval(refresh, 1000);

  return () => {
    clearInterval(timer);
    // Put the shared limit back so this example leaves no global state behind.
    if (!preview) setMaxParallelImageRequests(16);
    map.remove();
  };
};

export default mount;
