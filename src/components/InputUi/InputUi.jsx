import React from "react";
import { useState } from "react";
import 'uikit/dist/css/uikit.min.css';
import { EinfacheProbleme } from "./EinfacheProbleme";
import { KomplexeProbleme } from "./KomplexeProbleme";
import { Beschreibung } from "./Beschreibung";
import "./styles/navbar.css";


export function InputUi() {


    const [activeComponent, setActiveComponent] = useState("einfache");

    const handleNavClick = (component) => {
        setActiveComponent(component);


    };


    return (
        <React.Fragment>
            <div>
                <nav className="uk-navbar-container" uk-navbar={"true"}>
                    <div className="uk-navbar-left">

                        <ul className="uk-navbar-nav">
                            <li className={`uk-active ${activeComponent === 'einfache' ? 'active' : ''}`}><a onClick={() => {handleNavClick("einfache")}}>Einfache Probleme</a></li>
                            <li className={`uk-active ${activeComponent === 'komplexe' ? 'active' : ''}`}><a onClick={() => {handleNavClick("komplexe")}}>Komplexe Probleme</a></li>
                            <li className={`uk-active ${activeComponent === 'beschreibung' ? 'active' : ''}`}><a onClick={() => {handleNavClick("beschreibung")}}>Beschreibung der Anwendung</a></li>
                        </ul>

                    </div>
                </nav>
                <div className="uk-container">
                    {activeComponent === 'einfache' && <EinfacheProbleme/>}
                    {activeComponent === 'komplexe' && <KomplexeProbleme/>}
                    {activeComponent === 'beschreibung' && <Beschreibung/>}
                </div>
            </div>

        </React.Fragment>
    );
}