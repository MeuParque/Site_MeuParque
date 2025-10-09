import './Missao.css'
import Image from 'next/image'; 

export default function Componentes_Missao(props){
    return(
        <div className='div_componente_missao'>
            <Image className="img_componente_parque" src={props.img_src} alt={props.img_alt} title={props.nome_valor}/>
            <h1 className='Nome_valor'>{props.nome_valor}</h1>
            <p className='descricao_missao'>{props.descricao} </p>
        </div>
    )
}