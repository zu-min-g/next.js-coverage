import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'
import '@testing-library/jest-dom'

describe('index', () => {
  it('heading 表示のテスト', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /カバレッジ取得のテスト/i,
    })

    expect(heading).toBeInTheDocument()
  })

})
