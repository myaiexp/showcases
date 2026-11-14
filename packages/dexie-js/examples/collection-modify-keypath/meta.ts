// dexie-js example: collection.modify({'a.b': ...}): change a nested field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.modify({'a.b': ...}): change a nested field",
  summary:
    "A key with a dot in it reaches inside a nested object: 'props.bigfoot' changes only that one inner field and leaves props.shoeSize alone. The nested fields can be indexed too, so the query uses props.shoeSize and the result is checked through props.bigfoot.",
  section: 'Collection',
  tags: ['modify', 'where', 'aboveOrEqual', 'nested key'],
  docs: ['repo/docs/Collection/Collection.modify().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
