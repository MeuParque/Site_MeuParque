import './Footer.css';
import './Header.css';
import useTela from './tela';
import Image from "next/image";
import { useState, useEffect } from 'react';
import tree from '../img/tree.png';
import telefone from '../img/telephone.png';
import email from '../img/mail.png';
import insta from '../img/instagram.png';
import ttk from '../img/tik-tok.png';
import { useRouter } from 'next/navigation';

let cliques = 0;

export default function Footer({ onNavigate }){ 

  const router = useRouter();

  const handleLinkClick = (secao) => { 
    onNavigate(secao);
  };

    const largura = useTela();
    const isMobile = largura !== null && largura < 768;
  
  function handleClick_rifa(){
    cliques++;
    console.log(cliques)
    const temporizador = setTimeout(Zerar_cliques, 5000)
    if(cliques >= 7){
      clearTimeout(temporizador);
      router.push('/Rifa');
    }
  };

  function Zerar_cliques(){
    cliques = 0;
  }

    return(
        <footer className="footer_pag1">
        <div className="div_foot">
          <div className="div_icone_foot">
            <Image src={tree} alt="img arvore" className="img_icone_foot"></Image>
            <button onClick={handleClick_rifa} className='botao_rifa'>
              <div className='fot_meuP'>
                <h1 className='meu_fot'>Meu</h1>
                <h1 className="tit_foot_logo">Parque</h1>
              </div>
            </button>
          </div>
          <h2 className="txt_foot_conect">Conectando pessoas nas nossas casas públicas</h2>
        </div><div className="div_foot">
          <h1 className="tit_foot">Links Rápidos</h1>
          <button onClick={() => handleLinkClick('home')} className='txt_foot'>Home</button>
          <button onClick={() => handleLinkClick('sobre')} className='txt_foot'>Sobre Nós</button>
          <button onClick={() => handleLinkClick('proposito')} className='txt_foot'>Nossa Missão</button>
        </div><div className="div_foot">
          <h1 className="tit_foot">Contato</h1>
          <div className="div_icone_foot">
            <Image src={email} alt="img email" className="img_icone_foot_txt"></Image>
            <a href="mailto:meu.parque.ssa@gmail.com" target="_blank" className='txt_foot'>meu.parque.ssa@gmail.com</a>
          </div>

        </div><div className="div_foot">
          <h1 className="tit_foot">Nos siga</h1>
          <div className="redes_foot">
            <a href="https://www.instagram.com/meuparquessa/" target="_blank"><Image src={insta} alt="Imagem redireciona instagram" title="Nosso Insta!" className="icone_social_foot"/></a>
            <a href="https://www.tiktok.com/@meuparque" target="_blank"><Image src={ttk} alt="Imagem redireciona tiktok" title="Nosso TikTok!" className="icone_social_foot"/></a>
          </div>
        </div>

      </footer>
    )
}