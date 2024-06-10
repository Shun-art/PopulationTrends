import React, { useState } from 'react'
import { useResponsiveStyles } from '../styles'

type Props = {
  prefectures: {
    prefCode: number
    prefName: string
  }[]
  onChange: (name: string, prefCode: number, check: boolean) => void
  onClear: () => void
}

const CheckField = ({
  prefectures,
  onChange,
  onClear
}: Props): React.ReactElement => {
  const Styles = useResponsiveStyles()

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  )

  // チェックボックスが変更されたときの処理
  const handleChange = (prefecture: { prefCode: number; prefName: string }) => {
    const isChecked = checkedItems[prefecture.prefCode] || false
    const newCheckedItems = {
      ...checkedItems,
      [prefecture.prefCode]: !isChecked
    }
    setCheckedItems(newCheckedItems)
    onChange(prefecture.prefName, prefecture.prefCode, !isChecked)
  }

  // Clearボタンが押されたときの処理
  const handleClear = () => {
    setCheckedItems({}) // チェックされたアイテムの状態を空にする
    onClear()
  }
  return (
    <div style={Styles.checkcardList}>
      {prefectures.map((prefecture) => (
        <div style={{ ...Styles.checkcard }} key={prefecture.prefCode}>
          <input
            type='checkbox'
            id={`checkbox${prefecture.prefCode}`}
            onChange={() => handleChange(prefecture)}
            checked={checkedItems[prefecture.prefCode] || false} // デフォルト値を設定
          />
          <label style={Styles.text} htmlFor={`checkbox${prefecture.prefCode}`}>
            {prefecture.prefName.length === 3 ?
              ` ${prefecture.prefName}`
            : prefecture.prefName}
          </label>
        </div>
      ))}
      <button style={Styles.clearButton} onClick={handleClear}>
        Clear
      </button>
    </div>
  )
}

export default CheckField
