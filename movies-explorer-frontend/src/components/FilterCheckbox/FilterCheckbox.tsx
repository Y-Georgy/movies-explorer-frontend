import './FilterCheckbox.css'
import React, { useState } from 'react';

interface Props {
  handleChangeIsShort: () => void
}

function FilterCheckbox( {handleChangeIsShort}: Props ) {

  return (
    <div className="switch">
      <input id="switch" className="switch__input" type="checkbox" onChange={handleChangeIsShort}/>
      <label htmlFor="switch" className="switch__label">Короткометражки</label>
    </div>
  )
};

export default FilterCheckbox;
