// additionalFields: extra columns or SQL expressions carried on each DataPoint
import { EmbeddingViewMosaic, type DataPoint } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rng } from '../../shared/data.ts';
import { pointsTable } from '../../shared/table.ts';

interface Props {
  tooltip: DataPoint;
}

// Reads tooltip.fields, filled from additionalFields.
class FieldsTooltip {
  private el = document.createElement('div');
  constructor(target: HTMLDivElement, props: Props) {
    this.el.style.cssText = 'padding:8px 10px;border-radius:6px;background:#0f172a;border:1px solid #475569;color:#e2e8f0;font:12px/1.5 ui-monospace,monospace;white-space:pre';
    target.append(this.el);
    this.update(props);
  }
  update({ tooltip }: Props): void {
    const f = tooltip.fields ?? {};
    this.el.textContent = Object.entries(f).map(([k, v]) => `${k.padEnd(9)} ${String(v)}`).join('\n');
  }
  destroy(): void {
    this.el.remove();
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a point.' });
  const mosaic = await stage.mosaic();
  const count = stage.preview ? 6000 : 40000;
  const { table } = await pointsTable(mosaic, { count });
  if (stage.disposed) return stage.dispose;

  const view = new EmbeddingViewMosaic(stage.view, {
    coordinator: mosaic.coordinator,
    table,
    x: 'x',
    y: 'y',
    category: 'topic_id',
    identifier: 'id',
    // A field is a column name or { sql }: any expression DuckDB can compute per row.
    additionalFields: {
      topic: 'topic',
      score: 'score',
      grade: { sql: `CASE WHEN score >= 70 THEN 'high' WHEN score >= 40 THEN 'mid' ELSE 'low' END` },
      letters: { sql: 'length(text)' },
      firstword: { sql: `split_part(text, ' ', 1)` },
    },
    customTooltip: FieldsTooltip,
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  const r = rng(8);
  if (stage.preview) stage.every(1500, () => view.update({ tooltip: Math.floor(r() * count) }));
  return stage.dispose;
};

export default mount;
