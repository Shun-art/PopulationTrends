import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CheckField from '../CheckField'

const prefectures = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 13, prefName: '東京' }
]
// 都道府県のチェックボックスが表示されることを確認
test('renders checkboxes for prefectures', () => {
  render(<CheckField prefectures={prefectures} onChange={() => {}} onClear={() => {}} />)
  const checkboxHokkaido = screen.getByLabelText('北海道')
  const checkboxTokyo = screen.getByLabelText('東京')
  expect(checkboxHokkaido).toBeInTheDocument()
  expect(checkboxTokyo).toBeInTheDocument()
})
// チェックボックスをクリックしたときにonChangeが呼ばれるかを確認
test('calls onChange when a checkbox is clicked', () => {
  const handleChange = jest.fn()
  render(<CheckField prefectures={prefectures} onChange={handleChange} onClear={() => {}} />)
  const checkboxHokkaido = screen.getByLabelText('北海道')
  fireEvent.click(checkboxHokkaido)
  expect(handleChange).toHaveBeenCalledWith('北海道', 1, true)
})
// テストケース：すべてのチェックボックスをクリックしたときの動作を確認する
test('calls onChange for all checkboxes', () => {
  const handleChange = jest.fn()
  render(<CheckField prefectures={prefectures} onChange={handleChange} onClear={() => {}} />)
  prefectures.forEach((pref) => {
    const checkbox = screen.getByLabelText(pref.prefName)
    fireEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalledWith(pref.prefName,pref.prefCode,true)
  })
})