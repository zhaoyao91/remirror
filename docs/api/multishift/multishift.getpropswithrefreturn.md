<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [multishift](./multishift.md) &gt; [GetPropsWithRefReturn](./multishift.getpropswithrefreturn.md)

## GetPropsWithRefReturn type

<b>Signature:</b>

```typescript
export declare type GetPropsWithRefReturn<GElement extends HTMLElement = any, GRefKey extends string = 'ref'> = {
    [P in Exclude<GRefKey, 'key'>]: Ref<any>;
} & DetailedHTMLProps<HTMLAttributes<GElement>, GElement>;
```
