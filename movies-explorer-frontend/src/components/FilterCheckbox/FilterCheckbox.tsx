import './FilterCheckbox.css'

function FilterCheckbox() {
  return (
    <div className="switch">
      <input className="switch__input" type="checkbox" />
      <label className="switch__label">Короткометражки</label>
    </div>
  )
};

export default FilterCheckbox;
