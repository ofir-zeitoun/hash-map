import HashMap from "./hash-map"

export default HashMap

;(function example(){

  let map = new HashMap<{x:number, y:number}, boolean>()
  map.selectKey = o => { return { x:o.x }}
  map.set({x:1, y:1}, true)
  map.set({x:1, y:2}, false)
  console.log(map.size)
  
})()