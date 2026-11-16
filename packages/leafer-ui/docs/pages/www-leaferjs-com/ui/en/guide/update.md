<!-- source: https://www.leaferjs.com/ui/en/guide/update.html -->

# Quick Update 

Platform packages, cross-platform core packages, and official plugin packages share synchronized versioning for easier memorization and consistency.

If version conflicts occur due to old cache, please delete the **lock file** and **node\_modules**, then reinstall dependencies.

## One-Click Update 

Run the following command in your project root to update all dependencies to the latest allowed versions.

npmpnpmyarnbun

sh

```
npm update
```

sh

```
pnpm update
```

sh

```
yarn update
```

sh

```
bun update
```

Or update only Leafer-related packages (recommended to wrap this in a `package.json` script):

npmpnpmyarnbun

sh

```
npm update leafer-ui @leafer-in/editor ... # plugin packages must come after the main package
```

sh

```
pnpm update leafer-ui @leafer-in/editor ... # plugin packages must come after the main package
```

sh

```
yarn update leafer-ui @leafer-in/editor ... # plugin packages must come after the main package
```

sh

```
bun update leafer-ui @leafer-in/editor ... # plugin packages must come after the main package
```

For packages imported via `<script>` tags, simply update the version number to the latest one.

When installing for the first time, use the cross-platform core package to avoid manual version mismatches between plugin packages.

npmpnpmyarnbun

sh

```
# When using plugins, it is recommended to install core packages together to avoid version mismatch issues
npm install leafer-ui @leafer-ui/core @leafer-ui/draw
```

sh

```
pnpm add leafer-ui @leafer-ui/core @leafer-ui/draw
```

sh

```
yarn add leafer-ui @leafer-ui/core @leafer-ui/draw
```

sh

```
bun add leafer-ui @leafer-ui/core @leafer-ui/draw
```

You can also install the full leafer package and use sub-package imports to reduce bundle size.

## Version 

Latest version: v2.3.4

ts

```
import { version } from 'leafer-ui'

console.log(version)
```
