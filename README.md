# hash-map
Map which can handles objects as keys.

```HashMap``` let you decide how to search for key:
* ***selectKey: Function(obj): any*** 
  <br>function to select what to use as key

```HashMap``` implements all [Map interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map):
* ***clear()***
  <br>Removes all key/value pairs from the Map object.
* ***delete(key)***
  <br>Returns true if an element in the Map object existed and has been removed, or false if the element does not exist. has(key) will return false afterwards.
* ***entries()***
  <br>Returns a new Iterator object that contains an array of [key, value] for each element in the Map object in insertion order.
* ***forEach(callbackFn[, thisArg])***
  <br>Calls callbackFn once for each key-value pair present in the Map object, in insertion order. If a thisArg parameter is provided to forEach, it will be used as the this value for each callback.
* ***get(key)***
  <br>Returns the value associated to the key, or undefined if there is none.
* ***has(key)***
  <br>Returns a boolean asserting whether a value has been associated to the key in the Map object or not.
* ***keys()***
  <br>Returns a new Iterator object that contains the keys for each element in the Map object in insertion order.
* ***set(key, value)***
  <br>Sets the value for the key in the Map object. Returns the Map object.
* ***values()***
  <br>Returns a new Iterator object that contains the values for each element in the Map object in insertion order.
* ***\[@@iterator]()***
  <br>Returns a new Iterator object that contains an array of [key, value] for each element in the Map object in insertion order.

### install
``` $ npm install oz-hash-map ```

### require / import
typescript
``` typescript 
import HashMap from 'oz-hash-map'
```
typescript
``` javascript
var HashMap = require('oz-hash-map');
```
### Usage

``` typescript
let map = new HashMap()

map.set({ x:1 }, 'some value') // map.size = 1
let res1 = map.get({ x:1 }) // res1 will be 'some value'

map.set({ x:1 }, 'override value') // map.size = 1
let res2 = map.get({ x:1 }) // res1 will be 'override value'
```

```HashMap``` let's you iterate it's keys and/or values:
``` typescript
let map = new HashMap()
map.set({ x:1 }, 'some value') 
map.set({ x:2 }, 'other value')

for (let [k, v] of map){
  console.log(k, v)
}
// output:
// Object {x: 1}
// some value
// Object {x: 2}
// other value

for (let k of map.keys()){
  console.log(k)
}
// output:
// Object {x: 1}
// Object {x: 2}

for (let v of map.values()){
  console.log(v)
}
// output:
// some value
// other value
```

```HashMap``` let's you decide what to use as key:

``` typescript
let map = new HashMap()
let select = obj => { return { x: obj.x } }
map.selectKey = select
map.set({ x:1, y: 2 }, 'some value') 
map.set({ x:1, z: 3 }, 'override value')
// map will have only 1 item: { x:1, z: 3 }, 'override value'

```