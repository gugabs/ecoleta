import React from "react";

import { Link } from "react-router-dom";

import "./style.css";

import { FiLogIn } from "react-icons/fi";

import ecoletaLogo from "../../assets/img/logo.svg";
import ecoletaBackground from "../../assets/img/home-background.svg";

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={ecoletaLogo} alt="Logotipo Ecoleta" />
        </header>

        <main>
          <div id="infs">
            <h1>Sua plataforma de coleta de resíduos</h1>
            <p>
              Ajudamos as pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </p>

            <Link to="/create-point">
              <span>
                <FiLogIn />
              </span>
              <div>Cadastrar ponto de coleta</div>
            </Link>
          </div>

          <div id="background">
            <img src={ecoletaBackground} alt="Duas pessoas reciclando." />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
