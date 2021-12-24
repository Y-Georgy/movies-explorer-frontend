import './FilterCheckbox.css'
import React, { useEffect, useState } from 'react';

interface Props {
  handleChangeIsShort: () => void,
  localSearchParams?: {
    isShort: boolean
  }
}

function FilterCheckbox( {handleChangeIsShort, localSearchParams}: Props ) {
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
      <input id="switch" className="switch__input" type="checkbox" onChange={handleClickCheckBox} checked={isShort}/>
      <label htmlFor="switch" className="switch__label">Короткометражки</label>
    </div>
  )
};

export default FilterCheckbox;
