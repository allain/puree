module.exports = Puree

const vdom = require('virtual-dom')
const {diff, patch, create} = vdom

const Thunk = require('./thunk.js')
const toHtml = require('vdom-to-html')

function h(tag, options) {
  let children = Array.from(arguments).slice(2)
  if (typeof tag !== 'function')
    return vdom.h(tag, options, children)

  return new Thunk(tag, options, children)
}

function Puree(builder, el) {
  let lastTree = null
  let rootNode = null
  return function(state) {
    let newTree = builder(state)
    if (el) {
      if (rootNode !== null)
        return patch(rootNode, diff(lastTree, newTree))

      rootNode = create(newTree)
      lastTree = newTree
      el.appendChild(rootNode)
    }

    return toHtml(newTree)

  }
}

Puree.h = h
