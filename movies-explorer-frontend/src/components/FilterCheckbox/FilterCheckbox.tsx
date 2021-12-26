import './FilterCheckbox.css'
import { useEffect, useState } from 'react';

interface Props {
  handleChangeIsShort: () => void,
  isFormDisabled?: boolean,
  localSearchParams?: {
    isShort: boolean
  }
}

function FilterCheckbox( {handleChangeIsShort, localSearchParams, isFormDisabled}: Props ) {
  const [isShort, setIsShort] = useState(false)

  function handleClickCheckBox() {
    setIsShort(!isShort);
    handleChangeIsShort();
  }

  useEffect(() => {
    if (localSearchParams) setIsShort(localSearchParams.isShort)
  }, [localSearchParams])

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
