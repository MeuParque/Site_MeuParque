"use client"

import "./Page.css";
import Image from 'next/image';
import Link from "next/link";
import logo_meuparque from './img/Icon.png';
import { useRef } from 'react';

export default function Home() {

   const sectionRefs = {
      parques: useRef<HTMLElement>(null),
      eventos: useRef<HTMLElement>(null)
  };

   const handleClick = (secao: keyof typeof sectionRefs) => { sectionRefs[secao].current?.scrollIntoView({ behavior: 'smooth' });};

  return (
    <div >
      <header className="header_pag">
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
       <h1>teste</h1>      
      </div>
      <section ref={sectionRefs.parques}></section>
      <section ref={sectionRefs.eventos}></section>
    </div>
  );
}
