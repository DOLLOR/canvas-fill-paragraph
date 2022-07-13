// @ts-check
(function () {
  /** @type {HTMLTextAreaElement} */
  const textareaEl = document.getElementById('textarea_1654572787_e93a6c');
  /** @type {HTMLCanvasElement} */
  const canvasEl = document.getElementById('canvas_1654572755_5373ff');

  /** @type {HTMLInputElement} */
  const fontEl = document.getElementById('font_1657680184_614dc7');
  fontEl.value = '32px "Times New Roman","新宋体"';
  fontEl.style.fontFamily = 'monospace';
  fontEl.style.width = '500px';
  fontEl.style.boxSizing = 'border-box';

  const ctx = canvasEl.getContext('2d');
  if (!ctx) return;

  ctx.canvas.height = 500;
  ctx.canvas.width = 500;
  ctx.textBaseline = 'top';

  const onInput = function () {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.font = fontEl.value;
    const text = this.value;

    const res = fillParagraph(
      ctx,
      text,
      0,
      0,
      ctx.canvas.width,
    );
    console.log(res);
  };
  textareaEl.addEventListener('input', onInput);
  fontEl.addEventListener('change', onInput);

  // -----------------------------------------------------------
  const splitToLineList = (
    /** @type {CanvasRenderingContext2D} */ ctx,
    /** @type {string} */ text,
    /** @type {number} */ maxWidth,
  ) => {
    /** @type {string[]} */
    const lineList = [];
    let currentLine = '';

    for (const char of text) {
      const newCurrentLine = currentLine + char;
      if (
        ctx.measureText(newCurrentLine).width <= maxWidth
        &&
        char !== '\n'
      ) {
        currentLine = newCurrentLine;
      } else {
        lineList.push(currentLine);
        currentLine = char === '\n' ? '' : char;
      }
    }

    return lineList.concat([currentLine]);
  };

  const getLineHeight = (
    /** @type {CanvasRenderingContext2D} */ ctx,
    /** @type {string} */ text,
  ) => {
    const textMetrics = ctx.measureText(text);
    return textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
  };

  const fillParagraph = (
    /** @type {CanvasRenderingContext2D} */ ctx,
    /** @type {string} */ text,
    /** @type {number} */ x,
    /** @type {number} */ y,
    /** @type {number} */ maxWidth,
    /** @type {number} */ lineHeight = getLineHeight(ctx, text),
  ) => {
    const lineList = splitToLineList(ctx, text, maxWidth);
    lineList.forEach((text, index) => {
      ctx.fillText(text, x, y + index * lineHeight, maxWidth);
    });
    return { lineHeight, lineList };
  };
})()
