// dexie-js example: mapToClass(): rows that come back as your class
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "mapToClass(): rows that come back as your class",
  summary: "The same friend is stored in two tables. Read from the plain table, you get a bare object with no methods. Read from the table mapped to a Friend class, the row is a real Friend, so friend.greet() works. The class constructor is not run; the row is just given its prototype.",
  section: 'Table',
  tags: ["mapToClass", "instanceof", "get"],
  docs: ["repo/docs/Table/Table.mapToClass().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
