import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Main from '../Main'

const mock = new MockAdapter(axios)

// APIレスポンスから都道府県データの取得と表示が正しく行われているかを確認
test('fetches and displays prefectures', async () => {
  mock.onGet('https://opendata.resas-portal.go.jp/api/v1/prefectures').reply(200, {
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