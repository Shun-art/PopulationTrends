import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Main from '../Main'

const mock = new MockAdapter(axios)

// Test1：APIレスポンスから都道府県データの取得と表示が正しく行われているかを確認
test('fetches and displays prefectures', async () => {
  mock
    .onGet('https://opendata.resas-portal.go.jp/api/v1/prefectures')
    .reply(200, {
      message: null,
      result: [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 13, prefName: '東京' }
      ]
    })

  render(<Main />)

  await waitFor(() => {
    const hokkaidoCheckbox = screen.getByLabelText('北海道')
    const tokyoCheckbox = screen.getByLabelText('東京')
    expect(hokkaidoCheckbox).toBeInTheDocument()
    expect(tokyoCheckbox).toBeInTheDocument()
  })
})

// Test2：API 呼び出しが失敗したときのエラーハンドリングを確認

// test('handles API error', async () => {
//   mock.onGet('https://opendata.resas-portal.go.jp/api/v1/prefectures').reply(500)

//   render(<Main />)

//   await waitFor(() => {
//     const errorMessage = screen.getByText(/Error fetching prefectures/i)
//     expect(errorMessage).toBeInTheDocument()
//   })
// })

// Test3：人口タイプを変更したときの動作を確認する
test('updates population type and fetches new data', async () => {
  mock
    .onGet('https://opendata.resas-portal.go.jp/api/v1/prefectures')
    .reply(200, {
      message: null,
      result: [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 13, prefName: '東京' }
      ]
    })

  mock
    .onGet(
      'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=1'
    )
    .reply(200, {
      message: null,
      result: {
        data: [
          {
            label: '総人口',
            data: [
              { year: 1980, value: 1000 },
              { year: 1990, value: 1100 },
              { year: 2000, value: 1200 }
            ]
          },
          {
            label: '年少人口',
            data: [
              { year: 1980, value: 200 },
              { year: 1990, value: 220 },
              { year: 2000, value: 240 }
            ]
          }
        ]
      }
    })

  render(<Main />)

  await waitFor(() => {
    const hokkaidoCheckbox = screen.getByLabelText('北海道')
    fireEvent.click(hokkaidoCheckbox)
  })

  await waitFor(() => {
    const populationDropdown = screen.getByLabelText('人口推移グラフ')
    fireEvent.change(populationDropdown, { target: { value: '年少人口' } })
    const updatedData = screen.getByText(/年少人口/i)
    expect(updatedData).toBeInTheDocument()
  })
})

// Test4：チェックボックスが正しく動作し、グラフが更新されるかを確認する
test('updates the graph when checkbox is clicked', async () => {
  mock.onGet('https://opendata.resas-portal.go.jp/api/v1/prefectures').reply(200, {
    message: null,
    result: [
      { prefCode: 1, prefName: '北海道' },
      { prefCode: 13, prefName: '東京' }
    ]
  });

  mock.onGet('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=1').reply(200, {
    message: null,
    result: {
      data: [
        {
          label: '総人口',
          data: [
            { year: 1980, value: 1000 },
            { year: 1990, value: 1100 },
            { year: 2000, value: 1200 }
          ]
        }
      ]
    }
  });

  render(<Main />);

  await waitFor(() => {
    const hokkaidoCheckbox = screen.getByLabelText('北海道');
    expect(hokkaidoCheckbox).toBeInTheDocument();
  });

  fireEvent.click(screen.getByLabelText('北海道'));

  await waitFor(() => {
    const updatedData = screen.getByTestId('graph-container');
    expect(updatedData).toBeInTheDocument();
  });
});
