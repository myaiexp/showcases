// dexie-js example: Dexie.semVer and Dexie.version
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.semVer and Dexie.version",
  summary: "Two static properties say which Dexie is running: semVer is the usual three-part text, version is the same thing as one number you can compare with a plain less-than. Useful for an app that needs a minimum Dexie.",
  section: 'Dexie class',
  tags: ["Dexie.semVer","Dexie.version"],
  docs: ["repo/docs/Dexie/Dexie.semVer.md","repo/docs/Dexie/Dexie.version.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
