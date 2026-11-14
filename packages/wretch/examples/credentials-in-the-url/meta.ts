// credentials-in-the-url: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Credentials written into the address",
  summary:
    "An address like https://user:pass@host is refused by fetch before anything is sent. With BasicAuthAddon the login moves into the Authorization header and the request goes through.",
  section: 'Addons',
  tags: ["basicAuth", "BasicAuthAddon"],
  docs: ["repo/README.md", "repo/src/addons/basicAuth.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
