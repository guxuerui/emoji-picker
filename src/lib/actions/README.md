# Svelte Directives

## 1. clipboard

> file path: `./clipboard.ts`

### Use Cases

<Details style="margin: 1rem 0">
<summary>1. Copy element innerHTML</summary>

* Setting attributes for HTML tags: `data-clipboard="exampleElement"`
* The second parameter accepts an optional function

</Details>

```js
const textareaValue = "<p>Hello World</p>";
```

```html
<div border="1 dashed pink" pa-4 text-orange data-clipboard="exampleElement">
  {@html textareaValue}
  {textareaValue}
</div>

<button
  my-4
  use:clipboard={{
    element: "exampleElement",
    fn: () => console.log("html copied!"),
  }}>Copy innerHTML</button
>
```

<Details style="margin: 1rem 0">
<summary>2. Copy input value</summary>

* Setting attributes for `input` tag: `data-clipboard="exampleInput"`
* The second parameter accepts an optional function

</Details>

```js
const value = "Hello World";
```

```html
<input type="text" bind:value data-clipboard="exampleInput" />

<button
  use:clipboard={{
    input: "exampleInput",
    fn: () => console.log("input value copied!"),
  }}>Copy Input Value</button
>
```

<Details style="margin: 1rem 0">
<summary>3. Copy normal value</summary>

* Bind value for `input` tag
* The second parameter accepts an optional function

</Details>

```js
const value = "Hello Svelte";
```

```html
<input type="text" bind:value />

<button my-4 use:clipboard={{ value, fn: () => console.log("value copied!") }}>
  Copy normal value
</button>

<button my-4 use:clipboard={ value }>
  No callback function
</button>
```
