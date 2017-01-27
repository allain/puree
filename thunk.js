module.exports = Thunk

function Thunk(fn, props, children) {
  this.fn = fn
  this.props = props
  this.children = children
}

Thunk.prototype.type = 'Thunk';
Thunk.prototype.render = render;

function render(previous) {
  if (shouldUpdate(this, previous))
    return this.fn.apply(null, [Object.assign({children: this.children}, this.props)])

  return previous.vnode;
}

function shouldUpdate(current, previous) {
  if (!current || !previous || current.fn !== previous.fn)
    return true;

  return !same(current.props, previous.props) || !same(current.children, previous.children)
}

// TODO: Replace this monstrosity with something lazy
function same(a, b) {
  if (a === b) return true
  if (typeof a !== typeof b) return false

  return JSON.stringify(a) === JSON.stringify(b)
}


