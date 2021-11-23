import './Main.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';

function Main() {
  return (
    <>
      <div className="head-container">
        <Header />
        <Promo />
        <NavTab />
      </div>
    </>
  )
}

export default Main
