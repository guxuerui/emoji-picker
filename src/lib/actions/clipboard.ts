async function copyToClipboard(data: string | number, options?: any): Promise<void> {
  try {
    navigator?.canShare
      ? await navigator.share({ title: `${data}` })
      : await navigator.clipboard.writeText(`${data}`);

    if (options && typeof options === 'function') {
      options();
    }
  } catch (error) {
    console.error(error.toString());
  }
}

export function clipboard(node: HTMLElement, args: any) {
  const onClick = () => {
    if (typeof args === 'object') {
      if (Object.prototype.hasOwnProperty.call(args, 'element')) {
        const element: HTMLElement | null = document.querySelector(`[data-clipboard="${args.element}"]`);
        copyToClipboard(element?.innerHTML, args?.fn);
        return;
      }

      if (Object.prototype.hasOwnProperty.call(args, 'input')) {
        const input: HTMLInputElement | null = document.querySelector(`[data-clipboard="${args.input}"]`);
        copyToClipboard(input?.value, args?.fn);
        return;
      }

      if ("value" in args && !!args["value"]) {
        copyToClipboard(args["value"], args?.fn);
        return;
      }
    }
    copyToClipboard(args);
  }

  node.addEventListener('click', onClick);

  return {
    update(neweArgs: any) {
      args = neweArgs
    },
    destroy() {
      node.removeEventListener('click', onClick);
    }
  }
}
