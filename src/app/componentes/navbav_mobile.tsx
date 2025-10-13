"use client";
import { useState } from "react";
import Image from "next/image";
import "./Navbar_mobile.css"; 
import menu_bar from '../img/menu.png';
import { useRef } from "react";

  type SectionKey = 'home' | 'proposito' | 'sobre' | 'parques' | 'eventos';

  type NavbarMobileProps = {
    onNavigate: (secao: SectionKey) => void;
  };

  export default function NavbarMobile({ onNavigate }: NavbarMobileProps) {

    const [menuAberto, setMenuAberto] = useState(false);

    const handleLinkClick = (secao: SectionKey) => {
    onNavigate(secao);
    setMenuAberto(false);
  };

  return (
    <div>
      <button className="botao_menu" onClick={() => setMenuAberto(!menuAberto)}>
        <Image src={menu_bar} alt="menu bar" className="menu_bar"  onClick={() => setMenuAberto(true)}/>
      </button>

      {menuAberto && (
        <>
        <nav className="menu_mobile">
            <button onClick={() => handleLinkClick('home')} className='botao_esp'>Home</button>
            <button onClick={() => handleLinkClick('sobre')} className='botao_esp'>Sobre Nós</button>
            <button onClick={() => handleLinkClick('proposito')} className='botao_esp'>Nossa Missão</button>
        </nav>
        </>
      )}
    </div>
  );
}