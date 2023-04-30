import MainLayout from "../../components/layout/MainLayout";
import "./index.css";

export default function Home() {
  return (
    <div className="container">
      <div className="container-home">
        <ul className="ul-home">
          <li className="li-home">
            <input type="checkbox" className="input-home" />
            <div className="char">C</div>
          </li>
          <li className="li-home">
            <input type="checkbox" className="input-home" />
            <div className="char">V</div>
          </li>
          <li className="li-home">
            <input type="checkbox" className="input-home" />
            <div className="char">M</div>
          </li>
          <li className="li-home">
            <input type="checkbox" className="input-home" />
            <div className="char">A</div>
          </li>
          <li className="li-home">
            <input type="checkbox" className="input-home" />
            <div className="char">K</div>
          </li>
          <li className="li-home">
            <input type="checkbox" className="input-home" />
            <div className="char">E</div>
          </li>
          <li className="li-home">
            <input type="checkbox" className="input-home" />
            <div className="char">R</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
