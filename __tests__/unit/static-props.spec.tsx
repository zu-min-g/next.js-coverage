import { render, screen } from '@testing-library/react'
import Home, { getStaticProps } from '../../pages/static-props'
import '@testing-library/jest-dom'
import { routerMock, wrapper } from './fixtures'

describe('static-props', () => {
  it('alt 0', () => {
    render(<Home type='Static' />, { wrapper: wrapper(routerMock()) })

    const heading = screen.getByTestId('type')

    expect(heading).toHaveTextContent('Static')
  })
  it('alt 1', () => {
    const router = routerMock()
    router.query.alt = '1'
    render(<Home type='Static' />, { wrapper: wrapper(router) })

    const heading = screen.getByTestId('type')

    expect(heading).toHaveTextContent('Static')
  })


  it('getStaticProps', async () => {

    const props = await getStaticProps({} as any)
    expect(props).toStrictEqual({
      props: {
        type: 'Static',
      },
    })
  })

})
