import React from "react";
import { useResponsiveStyles} from "../styles";

type Props = {
  prefectures:
    | {
        prefCode: number;
        prefName: string;
      }[];
  onChange: (name: string, prefCode: number, check: boolean) => void;
};

const CheckField: React.FC<Props> = ({ prefectures, onChange }) => {
  const Styles = useResponsiveStyles(); // useResponsiveStyles を利用
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
            {prefecture.prefName.length === 3 ? "　" + prefecture.prefName : prefecture.prefName}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckField;
