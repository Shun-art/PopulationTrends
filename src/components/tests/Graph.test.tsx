import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Graph from '../Graph'

const populationdata = [
    {
      prefName: '東京',
      data: [
        { year: 1980, value: 1000 },
        { year: 1990, value: 1100 },
        { year: 2000, value: 1200 },
        { year: 2010, value: 1300 },
        { year: 2020, value: 1400 }
      ]
    }
  ]
  // グラフがデータを持ってレンダリングされることを確認
  test('renders the graph with data', () => {
    const { container } = render(<Graph populationdata={populationdata} />)
    const svgElement = container.querySelector('svg')
    expect(svgElement).toBeInTheDocument()
  })