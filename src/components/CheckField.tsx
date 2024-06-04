import React from "react";

type Props = {
  prefectures:
    | {
        prefCode: number;
        prefName: string;
      }[];
  onChange: (name: string, prefCode: number, check: boolean) => void;
};

const Styles: { [key: string]: React.CSSProperties } = {
  checkcardList: {
    display: "flex",
    flexWrap: "wrap",
    padding: "10px",
    justifyContent: "flex-start",
  },
  text: { marginLeft: "0.5em", cursor: "pointer" },
  checkcard: {
    display: "flex",
    alignItems: "center",
    borderRadius: "24px",
    border: "solid 2px",
    padding: "4px",
    margin: "0.5rem",
  },
};

// 都道府県一覧のチェックボックスを表示する
const CheckField: React.FC<Props> = ({ prefectures, onChange }) => {
  return (
    <div style={Styles.checkcardList}>
      {prefectures.map((prefecture) => (
        <div style={Styles.checkcard} key={prefecture.prefCode}>
          <input
            type="checkbox"
            id={"checkbox" + prefecture.prefCode}
            onChange={(event) =>
              onChange(prefecture.prefName, prefecture.prefCode, event.target.checked)
            }
          />
          <label style={Styles.text} htmlFor={"checkbox" + prefecture.prefCode}>
            {prefecture.prefName.length === 3
              ? "　" + prefecture.prefName
              : prefecture.prefName}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckField;