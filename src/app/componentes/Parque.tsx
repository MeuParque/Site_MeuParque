import './Parque.css'

export default function Componentes_Parque(props){
    return(
        <div className='div_componente_parque'>
            <img className='img_componente_parque' src={props.img_src} alt={props.img_alt}  title={props.img_title} />
            <div className='div_info_parque'>
                <h1 className='Nome_parque'>{props.nome_parque}</h1>
                <address></address>
                <p className='bairro_parque'>{props.descricao} </p>
            </div>
        </div>
    )
}