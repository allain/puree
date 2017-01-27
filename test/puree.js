const test = require('tape')

const puree = require('..')
const h = puree.h

test('puree exports a function', t => {
  t.equal(typeof puree, 'function', 'puree should export a function')
	t.end()
})

test('puree function returns a function when invoked', t => {
  let updater = puree((state) => h('testing', {}, JSON.stringify(state)))
  t.equal(typeof updater, 'function')
  t.end()
})

test('puree result returns a string of html when invoked without a target', t => {
  let updater = puree((state) => h('code', {}, JSON.stringify(state)))

  let result = updater({})
  t.equal(typeof result, 'string', 'expected an html string')
  t.equal(result, '<code>{}</code>')

  result = updater({a: 10})
  t.equal(typeof result, 'string', 'expected an html string')
  t.equal(result, '<code>{&quot;a&quot;:10}</code>')
  t.end()
})

test.skip('puree result returns same HTML for components with the same params', t => {
  let renderCount = 0

  let T = ({props}) => h('span', {}, ''+(++renderCount))

  let updater = puree((state) => h(T, {}))
  let result1 = updater({})
  let result2 = updater({})
  t.equal(result2, result1)
  t.end()
})


