import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import accessibility from 'highcharts/modules/accessibility';
import Styles from '../styles'

type Props = {
  populationdata: {
    prefName: string
    data: { year: number; value: number }[]
  }[]
}

accessibility(Highcharts);

const Graph = ({ populationdata }: Props): React.ReactElement => {
  const series: Highcharts.SeriesOptionsType[] = []
  const categories = ['1980', '1990', '2000', '2010', '2020']

  for (const p of populationdata) {
    const data = categories.map((year) => {
      const pd = p.data.find((d) => d.year === parseInt(year))
      return pd ? pd.value : null
    })

    series.push({
      type: 'line',
      name: p.prefName,
      data: data
    })
  }

  const options: Highcharts.Options = {
    title: {
      text: '総人口推移'
    },
    xAxis: {
      title: {
        text: '年度'
      },
      accessibility: {
        rangeDescription: 'Range: 1980 to 2020'
      },
      categories: categories
    },
    yAxis: {
      title: {
        text: '人口数'
      },
      labels: {
        formatter: function () {
          return this.value.toLocaleString()
        }
      },
      tickInterval: 500000
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    series:
      series.length === 0 ?
        [{ type: 'line', name: '都道府県名', data: [] }]
      : series
  }

  return (
    <div style={Styles.graph} data-testid="graph-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default Graph
