let Backbone = require('backbone');
let _ = require('underscore');

let data = {one: 1, two: 2, three: 3}

// Overwrite Backbone.ajax to respond with some json.
Backbone.ajax = (args) =>
  args.success.call(this, data);

let _fetch = Backbone.Model.prototype.fetch;
let _parse = Backbone.Model.prototype.parse;
let opts = {};

_.extend(Backbone.Model.prototype, {
  fetch (options = {}) {
    opts = options;
    return _fetch.apply(this, arguments);
  },

  parse (res) {
    if (opts.scrubMissingAttributes) {
      for (let key in this.attributes) {
        if (res[key] === undefined) {
          delete res[key];
          delete this.attributes[key];
        }
      }
    }

    return _parse.call(this, res);
  }
});

// Model class.
class Model extends Backbone.Model {
  constructor() {
    super();
    this.url = 'fake';
  }
}

let model = new Model();

let fetch = (event) => {
  let scrub = false;

  if (event) {
    model.set({'key': 'value'});
    scrub = event.currentTarget.classList.contains('scrub');
  }

  model.fetch({scrubMissingAttributes: scrub});
}

let render = () => {
  let attrs = model.toJSON();
  let html = '';
  let el = document.querySelector('.results-list');

  // Render each item.
  for (let key in attrs) {
    let value = attrs[key];
    html += `${JSON.stringify(key)}: ${JSON.stringify(value)}<br>`;
  }

  el.innerHTML = html;
}

let clear = () => {
  model.clear();
  render();
}

document.querySelector('.scrub').addEventListener('click', fetch);
document.querySelector('.no-scrub').addEventListener('click', fetch);
document.querySelector('.clear').addEventListener('click', clear);
model.on('sync', render);

fetch();
