import './FilterCheckbox.css'

function FilterCheckbox() {
  return (
    <div className="switch">
      <input id="switch" className="switch__input" type="checkbox" />
      <label htmlFor="switch" className="switch__label">Короткометражки</label>
    </div>
  )
};

export default FilterCheckbox;
