const toast = function(text = '', time = 3000, mask = false) {
  const domCss = 'position: fixed;left: 50%;top: 50%;width: auto;height: auto;-webkit-transform: translate(-50%,-50%);z-index: 10000;';
  const domCssMask = 'left: 0;top: 0;width: 100%;height:100%;-webkit-transform: translate(0,0)';
  const textCss = 'padding: 0.24rem 0.4rem;text-align: center;color: #fff;font-size: 0.37333rem;line-height: 1.5;word-break: break-all;background-color: rgba(58, 58, 58, 0.9);border-radius: 0.08rem;';
  const id = 'toast';
  const textId = 'toast-text';
  let dom = null;
  let timer = null;

  dom = document.getElementById(id);
  if (!dom) {
    dom = document.createElement('div');
    dom.id = id;
    dom.setAttribute('style', domCss);
    document.body.appendChild(dom);
    dom.innerHTML = `<div id="${textId}" style="${textCss}">${text}</div>`;
  } else {
    clearTimeout(timer);
    const textDom = document.getElementById(textId);
    textDom.innerHTML = text;
  }
  if (mask) {
    dom.setAttribute('style', domCss + domCssMask);
  } else {
    dom.setAttribute('style', domCss);
  }

  timer = setTimeout(() => {
    dom.remove();
    clearTimeout(timer);
  }, time);
}

window.toast = toast;