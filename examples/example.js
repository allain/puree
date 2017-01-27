const Puree = require('..')
const h = Puree.h

let state = {
  items: [
    {label: 'a', url: 'http://a.com'},
    {label: 'b', url: 'http://b.com'},
    {label: 'c', url: 'http://c.com'}
  ],
  active: 'b',
  time: new Date()
}

// A Menu builder
function Menu({items, active, name}) {
  return <div>
    <h2>{name}</h2>
    <ul>
      {items.map(item => {
        let link = <a href={item.url}>
          {item.label}
        </a>
        return <li>
          {active === item.label ? <strong>{link}</strong> : link}
        </li>
      })}
    </ul>
    <p>Menu was rendered at {'' + new Date()}</p>
  </div>
}

function render({items, active, time}) {
  return <div>
    <p>The Menu Built below receives params that do not change</p>
    <Menu name="Static Menu" items={items} active={state.active}/>

    <p>The Menu Built below receives params that change (time)</p>
    <Menu name="Dynamic Menu" items={items} active={state.active} time={time} />
  </div>
}


let puree = Puree(render, document.getElementById('app'))

setInterval(() => {
  // New object with time replaced with the current time
  let newState = Object.assign({}, state, {time: new Date()})

  puree(newState)
}, 1000)

