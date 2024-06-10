import { render, screen , fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import CheckField from '../CheckField'

const prefectures = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 13, prefName: '東京' }
  ]
  // 都道府県のチェックボックスが表示されることを確認
  test('renders checkboxes for prefectures', () => {
    render(<CheckField prefectures={prefectures} onChange={() => {}} />)
    const checkboxHokkaido = screen.getByLabelText('北海道')
    const checkboxTokyo = screen.getByLabelText('東京')
    expect(checkboxHokkaido).toBeInTheDocument()
    expect(checkboxTokyo).toBeInTheDocument()
  })
  // チェックボックスをクリックしたときにonChangeが呼ばれるかを確認
  test('calls onChange when a checkbox is clicked', () => {
    const handleChange = jest.fn()
    render(<CheckField prefectures={prefectures} onChange={handleChange} />)
    const checkboxHokkaido = screen.getByLabelText('北海道')
    fireEvent.click(checkboxHokkaido)
    expect(handleChange).toHaveBeenCalledWith('北海道', 1, true)
  })