// Boxes for each server host that light up when a request reaches them
import type { Server } from '../../shared/server.ts';
import type { Stage } from '../../shared/stage.ts';

export interface HostBoxes {
  /** Lights the box for `host` (the one that answered). */
  light(host: string): void;
}

export function hostBoxes(stage: Stage, server: Server, hosts: readonly string[]): HostBoxes {
  const row = document.createElement('div');
  row.className = 'hosts';
  const boxes = new Map<string, HTMLElement>();
  const counts = new Map<string, number>();
  for (const h of hosts) {
    const box = document.createElement('div');
    box.className = 'host';
    box.textContent = `${h}\n0 requests`;
    boxes.set(h, box);
    row.append(box);
  }
  stage.root.append(row);
  // Count each request as it reaches the server, by the host in its address.
  const off = server.on((e) => {
    if (e.type !== 'request') return;
    const host = new URL(e.req.url).host;
    const box = boxes.get(host);
    if (!box) return;
    const n = (counts.get(host) ?? 0) + 1;
    counts.set(host, n);
    box.textContent = `${host}\n${n} request${n === 1 ? '' : 's'}`;
    box.animate([{ borderColor: 'var(--accent)', background: 'var(--accent-bg)' }, { borderColor: 'var(--border)', background: 'transparent' }], { duration: 1500 });
  });
  stage.onDispose(off);
  return {
    light(host) {
      boxes.get(host)?.animate([{ transform: 'scale(1.05)' }, { transform: 'none' }], { duration: 400 });
    },
  };
}
