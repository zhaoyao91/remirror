<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [test-keyboard](./test-keyboard.md) &gt; [Keyboard](./test-keyboard.keyboard.md) &gt; [mod](./test-keyboard.keyboard.mod.md)

## Keyboard.mod() method

Enables typing modifier commands

```ts
const editor = document.getElementById('editor');
const keyboard = new Keyboard({ target: editor });
keyboard
  .mod({text: 'Shift-Meta-A'})
  .end();

```

<b>Signature:</b>

```typescript
mod({ text, options }: TextInputParams): this;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  { text, options } | <code>TextInputParams</code> |  |

<b>Returns:</b>

`this`

