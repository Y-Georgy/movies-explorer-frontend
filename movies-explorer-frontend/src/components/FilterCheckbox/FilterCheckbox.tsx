import './FilterCheckbox.css'
import { useEffect, useState } from 'react';

interface Props {
  handleChangeIsShort: () => void,
  isFormDisabled?: boolean,
  isShortLocal: boolean
}

function FilterCheckbox( {handleChangeIsShort, isShortLocal, isFormDisabled}: Props ) {
  const [isShort, setIsShort] = useState(false)

  function handleClickCheckBox() {
    setIsShort(!isShort);
    handleChangeIsShort();
  }

  useEffect(() => {
    if (isShortLocal) setIsShort(isShortLocal)
  }, [isShortLocal])

 return (
    <div className="switch">
      <input
        id="switch"
        className="switch__input"
        type="checkbox"
        onChange={handleClickCheckBox}
        checked={isShort}
        disabled={isFormDisabled}
      />
      <label htmlFor="switch" className="switch__label">Короткометражки</label>
    </div>
  )
};

export default FilterCheckbox;
