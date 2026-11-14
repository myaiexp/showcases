// basic-auth: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Log in with a username and password",
  summary:
    ".basicAuth(user, pass) writes the Authorization header for you. The header the server received is shown next to what it decodes to, and a wrong password gets a 401.",
  section: 'Addons',
  tags: ["basicAuth", "BasicAuthAddon", "Authorization"],
  docs: ["repo/README.md", "repo/src/addons/basicAuth.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
