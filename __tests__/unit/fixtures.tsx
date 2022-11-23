import { NextRouter } from "next/router"
import { RouterContext } from 'next/dist/shared/lib/router-context'

export const wrapper: (router: NextRouter) => React.JSXElementConstructor<{ children: React.ReactElement }>
  = (router) => {
    return function Wrapper({ children }) {
      return <RouterContext.Provider value={router}>
        {children}
      </RouterContext.Provider>
    }
  }

export const routerMock = (): NextRouter => {
  return {
    query: {},
  } as any
}
