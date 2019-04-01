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

App.init();