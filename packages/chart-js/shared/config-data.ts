// Sample data for the Configuration examples: one café's monthly drink sales
import type { Chart, ChartDataset, Plugin } from 'chart.js';
import { C, MONTHS, alpha } from './data.ts';

export const SALES_MONTHS = MONTHS.slice(0, 6);

/** Cups sold per month: [name, colour, figures]. */
export const DRINKS: readonly (readonly [string, string, readonly number[]])[] = [
  ['Espresso', C.amber, [420, 450, 510, 480, 560, 610]],
  ['Filter', C.blue, [300, 320, 290, 340, 330, 360]],
  ['Cold brew', C.cyan, [60, 90, 160, 240, 330, 420]],
];

/** Line datasets for the first `n` drinks. */
export function drinkLines(n = 3): ChartDataset<'line'>[] {
  return DRINKS.slice(0, n).map(([label, color, data]) => ({
    label,
    data: [...data],
    borderColor: color,
    backgroundColor: alpha(color, 0.35),
    tension: 0.3,
  }));
}

/** Bar datasets for the first `n` drinks. */
export function drinkBars(n = 3): ChartDataset<'bar'>[] {
  return DRINKS.slice(0, n).map(([label, color, data]) => ({
    label,
    data: [...data],
    backgroundColor: alpha(color, 0.7),
    borderColor: color,
    borderWidth: 1,
    borderRadius: 3,
  }));
}

/**
 * A card has no pointer, so the interaction examples fake one: the cursor is drawn by an
 * inline plugin and `move` dispatches real DOM mouse events on the canvas, which Chart.js
 * handles exactly as it would a visitor's (dispatchEvent ignores pointer-events: none).
 * The events must not bubble: a card is an <a>, and a click bubbling into it follows the link.
 */
export function ghostCursor(): {
  plugin: Plugin;
  move(chart: Chart, x: number, y: number, type?: 'mousemove' | 'click'): void;
} {
  const at = { x: 0, y: 0, shown: false };
  return {
    plugin: {
      id: 'showcaseGhostCursor',
      afterDraw(chart) {
        if (!at.shown) return;
        const { ctx } = chart;
        ctx.save();
        ctx.beginPath();
        ctx.arc(at.x, at.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(250, 250, 250, 0.2)';
        ctx.strokeStyle = 'rgba(250, 250, 250, 0.9)';
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      },
    },
    move(chart, x, y, type = 'mousemove') {
      at.x = x;
      at.y = y;
      at.shown = true;
      const box = chart.canvas.getBoundingClientRect();
      chart.canvas.dispatchEvent(new MouseEvent(type, { clientX: box.left + x, clientY: box.top + y, bubbles: false }));
      chart.render();
    },
  };
}
