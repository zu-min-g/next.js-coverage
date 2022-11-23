import { render, screen } from '@testing-library/react'
import Home, { getServerSideProps } from '../../pages/server-props'
import '@testing-library/jest-dom'
import { routerMock, wrapper } from './fixtures'

describe('server-props', () => {
  it('alt 0', () => {
    render(<Home type='ServerSide' />, { wrapper: wrapper(routerMock()) })

    const heading = screen.getByTestId('type')

    expect(heading).toHaveTextContent('ServerSide')
  })
  it('alt 1', () => {
    const router = routerMock()
    router.query.alt = '1'
    render(<Home type='ServerSide' />, { wrapper: wrapper(router) })

    const heading = screen.getByTestId('type')

    expect(heading).toHaveTextContent('ServerSide')
  })


  it('getServerSideProps', async () => {

    const props = await getServerSideProps({} as any)
    expect(props).toStrictEqual({
      props: {
        type: 'ServerSide',
      },
    })
  })

})
