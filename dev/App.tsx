import { Component, For, createEffect, createSignal } from 'solid-js'
import { QueryClient, Query, QueryClientProvider, useQueryClient } from '../src'
import { createQuery } from '../src'
import { reconcile } from 'solid-js/store'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      // reconcile: 'userID',
    },
  },
})

// Create a function that returns an array of numbers from 0 - 10 in random order
const createRandomArray = () => {
  const array = Array.from({ length: 11 }, (_, i) => i)
  return array.sort(() => Math.random() - 0.5)
}

const App: Component = () => {
  return (
    <QueryClientProvider client={client}>
      <Page />
    </QueryClientProvider>
  )
}

const Page: Component = () => {
  const [count, setCount] = createSignal(1)

  const query = createQuery(() => ({
    queryKey: ['test', count()],
    queryFn: async ({ queryKey }) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const data = (await fetch(`https://jsonplaceholder.typicode.com/todos/${queryKey[1]}`).then(
        res => res.json(),
      )) as {
        userId: number
        id: number
        title: string
        completed: boolean
      }
      return [data]
    },
  }))

  const queryClient = useQueryClient()

  // createEffect(() => {
  //   console.log(query.data)
  // })

  let b = 0
  const mutate = () => {
    // const data = queryClient.getQueryData(['test', count()]) as NonNullable<typeof query.data>
    // console.log(data)
    // queryClient.setQueryData(
    //   ['test', count()],
    //   [
    //     {
    //       userId: count() + 1 + b,
    //       id: 2,
    //       title: 'Mooop',
    //       completed: false,
    //     },
    //     ...data,
    //   ],
    // )
    b++
  }

  return (
    <div>
      <input></input>
      <div>
        <button onClick={() => setCount(count() - 1)}>Decrement</button>
        <button onClick={() => setCount(count() + 1)}>Increment</button>
        <button onClick={mutate}>Mutate</button>
      </div>
      <For each={query.data}>{data => <div></div>}</For>
    </div>
  )
}

export default App
