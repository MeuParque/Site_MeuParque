import './Parque.css'


interface ParqueProps {
  img_src: string;
  img_alt: string;
  img_title: string;
}

export default function Componentes_Parque({ img_src, img_alt, img_title }: ParqueProps) {
    return (
        <div className='div_componente_parque'>
            <img className='img_componente_parque' src={img_src} alt={img_alt} title={img_title} />
        </div>
    );
}