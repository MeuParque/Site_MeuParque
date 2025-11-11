import './Header.css';
import NavbarMobile from './navbav_mobile';
import useTela from './tela';
import Image from "next/image";
import { useState, useEffect } from 'react';
import logo_meuparque from '../img/Icon.png';

type SectionKey = 'home' | 'proposito' | 'sobre' | 'parques' | 'eventos';

  type NavbarMobileProps = {
    onNavigate: (secao: SectionKey) => void;
  };

export default function Header({ onNavigate }: NavbarMobileProps){

  const handleLinkClick = (secao: SectionKey) => {
    onNavigate(secao);
  };

    const largura = useTela();
      const isMobile = largura !== null && largura < 768;
      
      const [isScrolled, setIsScrolled] = useState(false)

      useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return(
        <header id="main-header" className={`header_pag ${isScrolled ? 'scrolled' : ''}`}>
        <div className="div_icone">
          <Image src={logo_meuparque} alt="logo MeuParque" className="img_icone"></Image>
          <div className='nome_meuparque'>
            <h1 className='meu'>Meu</h1>
            <h1 className='parque'>Parque</h1>
          </div>
          
        </div>
        {!isMobile ? (
        <div className="links_header">
          <button onClick={() => handleLinkClick('home')} className='botao_esp'>Home</button>
          <button onClick={() => handleLinkClick('sobre')} className='botao_esp'>Sobre Nós</button>
          <button onClick={() => handleLinkClick('proposito')} className='botao_esp'>Nossa Missão</button>
          {/*<button onClick={() => handleClick('parques')} className='botao_esp'>Parques</button> 
          <button onClick={() => handleClick('eventos')} className='botao_esp'>Eventos</button> */}
        </div>
      ) : (
        <NavbarMobile onNavigate={onNavigate} />
      )}
      </header>
    )
}