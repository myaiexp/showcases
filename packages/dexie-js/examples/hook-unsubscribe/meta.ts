// dexie-js example: Taking a hook off again with unsubscribe()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Taking a hook off again with unsubscribe()",
  summary: "A creating hook tags each new row as 'new'. Calling unsubscribe with the same function stops it, and the next row arrives untagged until the hook is subscribed again. The hook function has to be kept in a variable to be removed.",
  section: "Hooks and middleware",
  tags: ["hook","unsubscribe"],
  docs: ["repo/docs/Table/Table.hook('creating').md","repo/docs/Table/Table.hook('updating').md"],
  provenance: 'pure',
  added: '2026-11-14',
});
