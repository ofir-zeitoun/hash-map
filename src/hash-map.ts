import { hashCode } from 'hashCode'

const getHashCode = hashCode().value
const NOT_FOUND: number = -1
const DEFAULT_EQUILITY = (a, b) => a === b

export default class HashMap<K, V> implements Map<K, V> {

  private readonly _map: Map<number, { key: K, value: V }[]>
  public areEqual: (obj1: K, obj2: K) => boolean
  public select: (obj: K) => any
  private _size: number

  public get size(): number {
    return this._size
  }

  constructor(entries?: [K, V][]) {
    this._map = new Map<number, { key: K, value: V }[]>()
    this.clear()
    if (!entries) {
      return
    }
    for (let i = 0; i < entries.length; i++) {
      this.set(entries[i][0], entries[i][1])
    }
  }

  [Symbol.toStringTag]: "Map"

  [Symbol.iterator](): IterableIterator<[K, V]> {

    let keyIter = this._map.keys()
    let i: number = 0
    let keyRes: IteratorResult<number>
    let list = []

    return {
      [Symbol.iterator]() {
        return this
      },

      next: () => {
        if (i === list.length) {
          keyRes = keyIter.next()

          if (keyRes.done) {
            return { done: true, value: undefined }
          }
          i = 0
          list = this._map.get(keyRes.value)
        }

        let iterRes: IteratorResult<[K, V]> = {
          done: false,
          value: [list[i].key, list[i].value]
        }
        i++
        return iterRes
      }
    }
  }

  clear(): void {
    this._map.clear()
    this._size = 0
  }

  delete(key: K): boolean {
    let deleted = false
    this.find(key, (l, i) => {
      l.splice(i, 1)
      this._size--
      deleted = true
    })
    return deleted
  }

  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    const $this = this
    for (let [k, v] of this.entries()) {
      callbackfn(v, k, thisArg || $this)
    }
  }

  private find(key: K,
    onFound?: (list: { key: K, value: V }[], i: number) => void,
    onNotFound?: (hash: number) => void) {
    const select = this.select || (x => x)
    const hash = getHashCode(select(key))
    let list = this._map.get(hash)
    if (!list) {
      onNotFound && onNotFound.bind(this)(hash)
      return
    }
    const checkEqual = this.areEqual || DEFAULT_EQUILITY
    for (let i = 0; i < list.length; i++) {
      if (checkEqual(list[i].key, key)) {
        onFound && onFound.bind(this)(list, i)
        return
      }
    }
    onNotFound && onNotFound.bind(this)(hash)
  }

  get(key: K): V {
    let value: V
    this.find(key, (l, i) => { value = l[i].value })
    return value
  }

  has(key: K): boolean {
    let found = true
    this.find(key, undefined, h => { found = false })
    return found
  }

  set(key: K, value: V): this {
    this.find(key,
      (l, i) => { l[i].value = value },
      h => { 
        let list = this._map.get(h)
        if (!list) {
          list = []
          this._map.set(h, list)
        }
        list.push({ key, value })
        this._size++
      })
    return this
  }

  entries(): IterableIterator<[K, V]> {
    return this[Symbol.iterator]()
  }

  private keysOrValues(keyOrValue: 0 | 1): IterableIterator<K | V> {
    let iter = this.entries()
    return {
      [Symbol.iterator]() {
        return this
      },
      next() {
        let iterRes = iter.next()
        if (iterRes.done) {
          return { done: true, value: undefined }
        }
        return { done: false, value: iterRes.value[keyOrValue] }
      }
    }
  }

  keys(): IterableIterator<K> {
    return this.keysOrValues(0) as IterableIterator<K>
  }

  values(): IterableIterator<V> {
    return this.keysOrValues(1) as IterableIterator<V>
  }

}