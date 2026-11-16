// Scene for export options: the element left, the exported image beside it
import { Leafer, Rect, type IUI } from 'leafer-ui';
import '@leafer-in/export'; // the export element plugin
import type { MountContext } from '@/types.ts';
import { exportPanel, type ExportPanel } from './export-view.ts';
import { createStage, type Stage } from './stage.ts';
import { GREEN, sizer } from './basics.ts';

export interface ExportScene {
  stage: Stage;
  leafer: Leafer;
  ui: IUI;
  panel: ExportPanel;
  /** Docs pixels to pane pixels. */
  u: (n: number) => number;
  /** Width of the canvas half. */
  half: number;
}

/** The element is centred in a dark `half`-wide Leafer; `make` builds it from the docs' 100 px size (default a green Rect). */
export function exportScene(el: HTMLElement, ctx: MountContext, hint: string, make?: (u: (n: number) => number) => IUI): ExportScene {
  const stage = createStage(el, ctx, { hint });
  const u = sizer(stage);
  const half = stage.preview ? 120 : 300;
  const leafer = stage.own(new Leafer({ view: stage.view, width: half, height: stage.height, fill: '#333' }));
  const panel = exportPanel(stage, half + 4);
  const ui = make ? make(u) : new Rect({ width: u(100), height: u(100), fill: GREEN });
  ui.set({ x: Math.round((half - u(100)) / 2), y: u(60) });
  leafer.add(ui);
  return { stage, leafer, ui, panel, u, half };
}
