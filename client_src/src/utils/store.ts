import { writable } from 'svelte/store'
import type { Tune } from './index'

const queueStore = writable<Tune[]>([])
export const queue = {
  store: queueStore,
  add: (tune: Tune) =>
    queueStore.update(prev => [...prev, tune]),
  remove: (tune: Tune) =>
    queueStore.update(prev => prev.filter(d => d.fileName !== tune.fileName)),
  moveToTop: (tune: Tune) =>
    queueStore.update(prev => [tune, ...prev.filter(d => d.fileName !== tune.fileName)]),
  removeFirst: () =>
    queueStore.update(([_, ...rest]) => rest),
  setMeta: (tune: Tune) =>
    queueStore.update(prev => prev.map(d => d.fileName === tune.fileName ? tune : d)),
}
