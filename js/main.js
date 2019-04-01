const App = {
  dom: {
    content: document.querySelector('#js-content'),
    select: document.querySelector('#js-select'),
    type: document.querySelector('#js-type'),
    count: document.querySelector('#js-count'),
    btn: document.querySelector('#js-submit'),
  },

  data: {
    timer: null
  },

  init() {
    this.bindEvent();
  },

  valideParams() {
    const type = this.dom.type.value;
    const count = this.dom.count.value;

    if (!type) {
      toast('要好好选择吃什么类型哦~');
      return;
    } else if (!/^\d{1}$/.test(count)) {
      toast('不准不输入吃几个菜~');
      return;
    } else if (count < 1) {
      toast('一个菜不吃你来干嘛～');
      return;
    } else if (count > 5) {
      toast('吃这么多不累吗，不准辛苦了媳妇~');
      return;
    }

    this.render(type, count);
  },

  render(type, count) {
    const dishes = window.DISHES[type];
    const result = [];

    if (count > dishes.length) {
      toast('库存里面没有这么多菜呀~');
      return;
    }
    
    for (let i = 0; i < count; i ++) {
      const index = this.random(0, dishes.length - 1)
      result.push(dishes[index]);
      dishes.splice(index, 1);
    }

    const dom = `
      <div class="dishes">
        ${result.map(item => `<div class="item">${item}</div>`).join('')}
      </div>
    `;

    this.dom.content.innerHTML = dom;
  },

  random(min, max) {
    return Math.random() * (max - min + 1) + min | 0;
  },

  bindEvent() {
    this.dom.btn.addEventListener('click', () => {
      this.valideParams();
    });

    this.dom.select.addEventListener('click', function(e) {
      const options = this.querySelector('.select-list');
      const optionsStyle = window.getComputedStyle(options);
      if (optionsStyle.display === 'none') {
        options.style.display = 'block';
      } else {
        options.style.display = 'none';
      }

      const targetDom = e.target;
      const type = targetDom.getAttribute('data-type');
      const text = targetDom.innerText;

      if (type) {
        this.querySelector('.placeholder').innerText = text;
        this.querySelector('input').value = type;
      } else {
        this.querySelector('.placeholder').innerText = '选个类型呗~';
        this.querySelector('input').value = '';
      }
    });
  }
};

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

App.init();