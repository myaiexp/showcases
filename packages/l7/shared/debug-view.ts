// Overlays for DebugService examples: a log timeline and a frame-time sparkline
export interface LogEntry {
  path: string;
  time: number;
}

/** Flattens a DebugService log (nested objects whose leaves carry `time`) into timed entries. */
export function flattenLog(log: unknown, prefix = ''): LogEntry[] {
  if (!log || typeof log !== 'object') return [];
  const out: LogEntry[] = [];
  for (const [key, value] of Object.entries(log as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object') {
      const t = (value as { time?: unknown }).time;
      if (typeof t === 'number') out.push({ path, time: t });
      out.push(...flattenLog(value, path));
    }
  }
  return out.sort((a, b) => a.time - b.time);
}

function overlay(container: HTMLElement, css: string): HTMLDivElement {
  const box = document.createElement('div');
  box.style.cssText =
    'position:absolute;z-index:4;padding:5px 8px;border-radius:4px;background:rgba(10,16,24,.88);color:#cfe3f7;' +
    `font:11px/1.4 ui-monospace,monospace;pointer-events:none;${css}`;
  container.append(box);
  return box;
}

/** A list of log steps, each with its offset from the first one and a bar. */
export function logTimeline(container: HTMLElement, title: string): (log: unknown) => void {
  const box = overlay(container, 'left:6px;top:6px;max-width:calc(100% - 12px);max-height:calc(100% - 12px);overflow:hidden');
  return (log) => {
    const entries = flattenLog(log);
    box.replaceChildren();
    const head = document.createElement('div');
    head.style.color = '#ffd166';
    head.textContent = entries.length ? title : `${title}: (no log)`;
    box.append(head);
    const t0 = entries[0]?.time ?? 0;
    const span = Math.max(1, (entries.at(-1)?.time ?? 0) - t0);
    for (const e of entries) {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:6px;align-items:center;white-space:nowrap';
      const bar = document.createElement('span');
      bar.style.cssText = `display:inline-block;height:6px;width:${2 + (60 * (e.time - t0)) / span}px;background:#7fdbff;border-radius:2px`;
      row.append(`+${String(e.time - t0).padStart(3)}ms`, bar, e.path);
      box.append(row);
    }
  };
}

/** A sparkline of recent values (e.g. renderDuration), newest on the right. */
export function sparkline(container: HTMLElement, label: string, keep = 60): (value: number) => void {
  const box = overlay(container, 'right:6px;bottom:6px');
  const text = document.createElement('div');
  const canvas = document.createElement('canvas');
  canvas.width = 160;
  canvas.height = 40;
  box.append(text, canvas);
  const g = canvas.getContext('2d');
  const values: number[] = [];
  return (value) => {
    values.push(value);
    if (values.length > keep) values.shift();
    const max = Math.max(1, ...values);
    text.textContent = `${label}: ${value} ms (max ${max})`;
    if (!g) return;
    g.clearRect(0, 0, canvas.width, canvas.height);
    g.strokeStyle = '#7fdbff';
    g.beginPath();
    values.forEach((v, i) => {
      const x = (i / (keep - 1)) * canvas.width;
      const y = canvas.height - (v / max) * (canvas.height - 2) - 1;
      if (i === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    });
    g.stroke();
  };
}
