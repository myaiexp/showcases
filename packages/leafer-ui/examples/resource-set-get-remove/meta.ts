// leafer-ui example: Resource: set, get and remove
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Resource: set, get and remove",
  summary: "Resource is a keyed store: set(key, value) puts a value in, get(key) reads it and remove(key) takes it out (calling destroy() on it when it has one). The squares are values stored under keys and fetched back by name.",
  section: "Utilities",
  tags: ["Resource", "set", "get", "remove", "map"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/resource/Resource.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
