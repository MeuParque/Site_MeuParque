"use client"

import "./Page.css";
import icone_pesquisa from './img/icone_pesquisa.png';
import Image from 'next/image';
import parque_cidade from './img/parque_da_cidade.jpg';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import icone_missao from './img/icone_missao.png';
import icone_visao from './img/icone_visao.png';
import icone_compromisso from './img/icone_compromisso.png';
import icone_reparo from "./img/repair.png";
import Componentes_Missao from './componentes/Missao';
import useTela from './componentes/tela';
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import coracao from "./img/heart.png";
import arvore_sobre from "./img/pine-tree.png";
import comunidade from "./img/people.png"; 

export default function Home() {

  const largura = useTela();
  const isMobile = largura !== null && largura < 768;

  const [isScrolled, setIsScrolled] = useState(false)
  let qtd_usuários = 0
  let qtd_parques = 0
  let eventos_menais = 0

   const sectionRefs = {
      home: useRef<HTMLElement>(null),
      proposito: useRef<HTMLElement>(null),
      sobre: useRef<HTMLElement>(null),
      parques: useRef<HTMLElement>(null),
      eventos: useRef<HTMLElement>(null)
  };

   const handleClick = (secao: keyof typeof sectionRefs) => { sectionRefs[secao].current?.scrollIntoView({ behavior: 'smooth' });};

  return (
    <div >
     
      
      <Header onNavigate={handleClick}></Header>
      <section ref={sectionRefs.home}>
        <div className="pag_home">
          <div className="texto_home">
            <h1 className="tit_home">Descubra Novos Espaços!</h1>
            <h2 className="desc_home">Explores parques na sua região! descubra e veja informações de eventos e atividades para toda família! </h2>
            {/*<div className="div_pesquisa_home">
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
            </div>*/}
        </div>
        <Image src={parque_cidade} alt="imagem do parque da cidade SSA" title="VUMBORA MEU POVO!" className="img1_home"></Image>
        </div> 
      </section>
      <section ref={sectionRefs.sobre}>
        <div className="txt_parques">
          
          <div className="esquerdasobrenos">
            <h2 className="tit_parques">Sobre Nós</h2>
            <p className="desc_parque">
              O MeuParque nasceu da inquietude de um grupo de estudantes aqui de Salvador – o nosso time, carinhosamente chamado de "Coda Fofo".
            </p>
            <p className="desc_parque">
              A gente percebia que os parques da nossa cidade, com tanto potencial, estavam meio esquecidos, separados da comunidade. Vimos que essa falta de vida não era só um problema de mato alto; era um problema social que gerava isolamento e insegurança. Decidimos que não dava para ficar parado.
            </p>
            <p className="desc_parque">
              O MeuParque é a nossa resposta: uma ponte digital criada para religar você ao seu parque, transformando o "espaço público" em "nosso quintal".
            </p>
          </div>
          
          <div className="p">
            <div className="caixa">
              <div className="icone_container icone-verde1">
                <Image src={arvore_sobre} alt="icone de uma arvore" className="icone_sobre"></Image>
              </div>
              <h4>Conexão com a Natureza</h4>
              <p className="desc_caixa">Revitalizar: Gerar oportunidades de renda para artistas e empreendedores, enchendo os parques de atividades, segurança e vida.</p>
            </div>
            
            <div className="caixa">
              <div className="icone_container icone-verde2">
                <Image src={comunidade} alt="icone da comunidade" className="icone_sobre"></Image>
              </div>
              <h4>Comunidade Ativa</h4>
              <p className="desc_caixa">Conectar: Ser o hub central que liga moradores, eventos, empreendedores e o poder público.</p>
            </div>
            
            <div className="caixa">
              <div className="icone_container icone-laranja">
                <Image src={coracao} alt="icone de um coração" className="icone_sobre"></Image>
              </div>
              <h4>Bem-estar Social</h4>
              <p className="desc_caixa">Empoderar: Dar voz e ferramentas à comunidade para a gestão colaborativa e a zeladoria dos espaços.</p>
            </div>
          </div>

        </div>
      </section>

      <section ref={sectionRefs.proposito}>
            <div className="proposito_div">
              <h1 className="tit_missão">Nossa Missão</h1>
              <h2>Construindo Pontes entre pessoas e a natureza urbana</h2>
              <h3 className="txt_miss">Nossos valores fundamentais guiam cada decisão que tomamos e moldam a experiência que oferecemos para nossa comunidade de usuários.</h3>
              <div className="componentes_miss">
                 <Componentes_Missao 
                    img_src={icone_missao}
                    img_alt="Ícone representando a missão da startup"
                    nome_valor="Nossa Missão"
                    descricao="Queremos fazer geral poder ir pros parques curtir! O espaço é nosso e pretendemos usar nossa plataforma para incentivar a reocupação desses espaços!"
                  />
                  <Componentes_Missao 
                    img_src={icone_visao}
                    img_alt="Ícone representando a visão da startup"
                    nome_valor="Nossa Visão"
                    descricao="Ser uma plataforma que consiga conectar as pessoas aos parques! Queremos criar comunidades, ajudar eventos e ajudar a manter nossos espaços públicos!"
                  />
                  <Componentes_Missao 
                    img_src={icone_reparo}
                    img_alt="Ícone representando a missão de cuidado do espaço da startup"
                    nome_valor="Compromisso com o espaço"
                    descricao="Queremos ajudar a manter os espaços públicos! Ajudar a cuidar do que é nosso! Vamos criar uma ferramenta que dê voz às reclamações e desejos das pessoas"
                  />
                  <Componentes_Missao 
                    img_src={icone_compromisso}
                    img_alt="Ícone representando a missão de cuidado das pessoas"
                    nome_valor="Compromisso com as pessoas"
                    descricao="Vamos incentivar as pessoas a irem para os parques, facilitar o comércio local, incentivar a cultura e a socialização, queremos ajudar as pessoas a aproveitarem os espaços."
                  />
              </div>
            </div>
      </section>
      {/*<section ref={sectionRefs.parques}>
        <div className="txt_parques">
          <h2 className="tit_parques">Conheça nossos parques:</h2>
          <h3 className="desc_parque">Descubra o parque do seu próximo rolê, corrida ou passeio em família. Desde dança, academias e até grupos religiosos, os parques estão aqui para todos!</h3>
        </div>
      </section>
      <section ref={sectionRefs.eventos}></section> */}
      <Footer onNavigate={handleClick}></Footer>
    </div>
  );
}
