# Showcases

Galleries of interactive JavaScript package examples, one gallery per package, at
**https://myaiexp.github.io/showcases/**.

Every new example is written only from the package's own official documentation, which
is vendored into `packages/<pkg>/docs/`. Each example lists the docs pages it was built
from. Comparisons with notable community examples live apart, in
`packages/<pkg>/comparisons/`.

```sh
pnpm install
pnpm dev        # local gallery
pnpm check:pkg <pkg>  # one package: types and tests
pnpm check      # whole repo: types, tests, build
```

How a package and its examples are laid out: [docs/pattern.md](docs/pattern.md).
What's planned next: [docs/package-showcase-list.md](docs/package-showcase-list.md).

0BSD licensed. Vendored docs keep their own licences (see each `docs/SOURCE.json`).
