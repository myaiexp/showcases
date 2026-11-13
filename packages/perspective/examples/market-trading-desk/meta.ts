// Perspective example: A trading desk over one feed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A trading desk over one feed",
  summary:
    "An indexed orders table as a blotter, an order book (X Bar of open quantity by price and side) and one-second candlesticks from first/last/high/low aliases of price. New orders and partial fill/cancel updates stream into all three.",
  section: "Use Cases",
  tags: ["blotter", "index", "partial update", "order book", "Candlestick", "bucket", "aggregates", "restoreWorkspace"],
  docs: ["repo/docs/md/use_cases/market_data.md", "repo/docs/md/how_to/javascript/layout.md", "repo/docs/md/explanation/view/config/expressions.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
