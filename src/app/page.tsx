"use client"

import "./Page.css";
import icone_pesquisa from './img/icone_pesquisa.png';
import Image from 'next/image';
import Link from "next/link";
import logo_meuparque from './img/Icon.png';
import parque_cidade from './img/parque_da_cidade.jpg';
import { useRef } from 'react';
import { useState, useEffect } from 'react';


export default function Home() {

  const [isScrolled, setIsScrolled] = useState(false)
  let qtd_usuários = 0
  let qtd_parques = 0
  let eventos_menais = 0


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


   const sectionRefs = {
      parques: useRef<HTMLElement>(null),
      eventos: useRef<HTMLElement>(null)
  };

   const handleClick = (secao: keyof typeof sectionRefs) => { sectionRefs[secao].current?.scrollIntoView({ behavior: 'smooth' });};

  return (
    <div >
     
      <header id="main-header" className={`header_pag ${isScrolled ? 'scrolled' : ''}`}>
        <div className="div_icone">
          <Image src={logo_meuparque} alt="logo MeuParque" className="img_icone"></Image>
          <h1>MeuParque</h1>
        </div>
        <div className="links_header">
          <Link href={"./Zeladoria"} >Zeladoria</Link>
          <button onClick={() => handleClick('parques')} className='botao_esp'>Parques</button>
          <button onClick={() => handleClick('eventos')} className='botao_esp'>Eventos</button>
          <Link href={"./Perfil"} >Perfil</Link>
        </div>
      </header>
      <div className="pag_home">
        <div className="texto_home">
          <h1 className="tit_home">Descubra Novos Espaços!</h1>
          <h2 className="desc_home">Explores parques na sua região! descubra e veja informações de eventos e atividades para toda família! </h2>
          <div className="div_pesquisa_home">
            <div className="pesquisa_home">
              <Image src={icone_pesquisa} alt="icone pesquisa" className="icone_pesquisa_home"></Image>
              <input type="text" placeholder="Pesquise Parques pelo nome ou localização..." className="inp_pesq"></input>
            </div>
            <input type="submit" placeholder="Buscar" className="subm_pesq_home"></input>
          </div>
          <div className="dados">
            <div>
              <p className="tit_dados">{qtd_parques}+</p>
              <p className="text_dados">Parques listados</p>
            </div><div>
              <p className="tit_dados">{eventos_menais}+</p>
              <p className="text_dados">Eventos mensais</p>
            </div><div>
              <p className="tit_dados">{qtd_usuários}+</p>
              <p className="text_dados">Usuários ativos</p>
            </div>
          </div>
       </div>
       <Image src={parque_cidade} alt="imagem do parque da cidade SSA" title="VUMBORA MEU POVO!" className="img1_home"></Image>
      </div>
      <section ref={sectionRefs.parques}>
        <div className="txt_parques">
          <h2 className="tit_parques">Conheça nossos parques:</h2>
          <h3 className="desc_parque">Descubra o parque do seu próximo rolê, corrida ou passeio em família. Desde dança, academias e até grupos religiosos, os parques estão aqui para todos!</h3>
        </div>
      </section>
      <section ref={sectionRefs.eventos}></section>
    </div>
  );
}
