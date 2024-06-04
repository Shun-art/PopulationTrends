import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Styles: { [key: string]: React.CSSProperties } = {
  graph: {
    padding: "12px",
  },
};

type Props = {
  populationdata: {
    prefName: string;
    data: { year: number; value: number }[];
  }[];
};

// 選んだ都道府県の人口推移グラフを表示するコンポーネント
const Graph: React.FC<Props> = ({ populationdata }) => {
  let series: Highcharts.SeriesOptionsType[] = [];
  let categories = ["1980", "1990", "2000", "2010", "2020"];

  for (let p of populationdata) {
    let data = categories.map(year => {
      const pd = p.data.find(d => d.year === parseInt(year));
      return pd ? pd.value : null; // データがない場合はnullを追加
    });

    series.push({
      type: "line",
      name: p.prefName,
      data: data,
    });
  }

  const options: Highcharts.Options = {
    title: {
      text: "総人口推移",
    },
    xAxis: {
      title: {
        text: "年度",
      },
      accessibility: {
        rangeDescription: 'Range: 1980 to 2020'
      },
      categories: categories,
    },
    yAxis: {
      title: {
        text: "人口数",
      },
      labels: {
        formatter: function () {
          return this.value.toLocaleString(); // 数値をカンマ区切りで表示
        }
      },
      tickInterval: 500000,
    },
    // 都道府県を一つも選んでいない場合との分岐条件
    series:
      series.length === 0
        ? [{ type: "line", name: "都道府県名", data: [] }]
        : series,
  };

  return (
    <div style={Styles.graph}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Graph;