// deck-gl example: _dataDiff partial updates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "_dataDiff partial updates",
  summary:
    "3000 points where one row changes: _dataDiff returns {startRow, endRow} so only that row is recalculated, with a getPosition call counter beside it.",
  section: "Using layers",
  tags: ["_dataDiff", "data", "experimental"],
  docs: ["repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
