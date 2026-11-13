<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/Complete/index.md -->

# Complete\
> \*\*Complete\*\*\<`T`\> = { \[P in keyof Required\\]: Pick\ extends Required\\> ? T\[P\] : T\[P\] | undefined }
Defined in: [util/util.ts:1100]()
Makes optional keys required and add the the undefined type.
```text
interface Test {
foo: number;
bar?: number;
baz: number | undefined;
}
Complete {
foo: number;
bar: number | undefined;
baz: number | undefined;
}
```
See https://medium.com/terria/typescript-transforming-optional-properties-to-required-properties-that-may-be-undefined-7482cb4e1585
## Type Parameters
| Type Parameter |
| --- |
| `T` |
