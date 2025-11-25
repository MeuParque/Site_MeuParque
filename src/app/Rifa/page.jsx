'use client';

import React, { useState, useEffect } from 'react';
import "./Page.css" 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { comprarRifa, buscarNumerosComprados } from './actions.js';

export default function FormRifa() {
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [qtd_rifa, setQtd_rifa] = useState('');
    const [numero_rifa, setNumero_rifa] = useState('');
    const [numerosComprados, setNumerosComprados] = useState(new Set());
    const [loadingNumeros, setLoadingNumeros] = useState(true);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); 
    const totalNumeros = 1000;
    const numColunas = 10;
    const numLinhas = totalNumeros / numColunas;

    const router = useRouter();

    const formaNum = (value) =>{
        value = value.replace(/\D/g,'');
        return value;
    }

    const formaNumComEscolhidos = (value) => {
        let numeros = value.replace(/\D/g, ''); 
        const gruposDe4 = numeros.match(/.{1,4}/g) || []; 
        return gruposDe4.join(' ');
    }

    const formaTel = (value) =>{
        value = value.replace(/\D/g,'');
        if(value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{0})(\d)/, '$1 ($2');
        value = value.replace(/(\d{2})(\d)/, '$1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        return value;
    }

    const formaNome = (value) =>{
        value = value.replace(/\d/g,'');
        value = value.toLowerCase();
        value = value.replace(/\b\w/g, (char) => char.toUpperCase());
        return value;
    }

    const formatNumber = (num) => {
        return String(num).padStart(4, '0');
    }

    async function fetchNumeros() {
            setLoadingNumeros(true);
            const resultado = await buscarNumerosComprados();

            if (resultado.success) {
                setNumerosComprados(new Set(resultado.numeros));
            } else {
                console.error("Não foi possível carregar os números:", resultado.message);
            }
            setLoadingNumeros(false);
        }

    useEffect(() => {
        fetchNumeros();
    }, []);

    const linhas = Array.from({ length: numLinhas }, (_, rowIndex) => {
        const celulas = Array.from({ length: numColunas }, (_, colIndex) => {

            const numero = (rowIndex * numColunas) + colIndex;
            const numeroFormatado = formatNumber(numero);
            const isComprado = numerosComprados.has(numeroFormatado);
            const estiloCelula = {
                border: '1px solid #ccc', 
                padding: '5px', 
                textAlign: 'center',
                backgroundColor: isComprado ? '#ffdddd' : 'white', 
                color: isComprado ? '#cc0000' : '#333'
            };
            
            return (
                <td key={numero} style={estiloCelula}>
                    {numeroFormatado}
                </td>
            );
        });

        return <tr key={rowIndex}>{celulas}</tr>;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        setMessage('Verificando e enviando dados...');

        const sem_forma_tel = telefone.replace(/\D/g, ''); 
        if (!sem_forma_tel.match(/^\d{10,11}$/)) {
            setMessage("Telefone inválido");
            setLoading(false);
            return;
        }

        const numerosArray = numero_rifa.trim().split(/\s+/).filter(n => n.length > 0);
        const quantidadeEsperada = parseInt(qtd_rifa, 10);

        if (numerosArray.length !== quantidadeEsperada) {
            setMessage(`Você selecionou ${quantidadeEsperada} bilhetes. Por favor, insira exatamente ${quantidadeEsperada} números.`);
            setLoading(false);
            return;
        }

        const todosCom4Digitos = numerosArray.every(numero => numero.length === 4 && /^\d{4}$/.test(numero));
        
        if (!todosCom4Digitos) {
            setMessage("Todos os números das rifas devem ter 4 dígitos (Ex: 1234).");
            setLoading(false);
            return;
        }

        const dadosFormulario = {
            nome,
            email,
            telefone,
            qtd_rifa,
            numero_rifa_string: numero_rifa 
        };

        const resultado = await comprarRifa(dadosFormulario);

        setMessage(resultado.message);
        setLoading(false); 

        if (resultado.success) {
            setNome('');
            setEmail('');
            setTelefone('');
            setQtd_rifa('');
            setNumero_rifa('');
        }
        
        setTimeout(async () => {
                await fetchNumeros(); 
                setMessage(''); 
            }, 3000);
        };
    

    return (

        <div className="container_rifa">
            
            <h1 className="h1_rifa">Formulário Rifa</h1>
            
            <form id="rifaForm" onSubmit={handleSubmit}>
                

                <div className="form-group_rifa">
                    <label className="label_rifa" htmlFor="nome">Nome Completo</label>
                    <input 
                        className="input_rifa" type="text" id="nome" name="nome"
                        placeholder="Ex: José da Silva" required
                        value={nome} onChange={(e) => setNome(formaNome(e.target.value))} 
                    />
                </div>
                <div className="form-group_rifa">
                    <label className="label_rifa" htmlFor="email">Email</label>
                    <input 
                        className="input_rifa" type="email" id="email" name="email"
                        placeholder="Ex: seuemail@gmail.com"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group_rifa">
                    <label className="label_rifa" htmlFor="telefone">Telefone (WhatsApp)</label>
                    <input 
                        className="input_rifa" type="tel" id="telefone" name="telefone"
                        placeholder="Ex: (71) 99999-8888" required
                        value={telefone} onChange={(e) => setTelefone(formaTel(e.target.value))}
                    />
                </div>
                <div className="form-group_rifa">
                    <label className="label_rifa" htmlFor="qtd_rifa">Quantidade de números (rifa)</label>
                    <input 
                        className="input_rifa" type="number" id="qtd_rifa" name="qtd_rifa"
                        placeholder="Ex: 3" min="1" required
                        value={qtd_rifa} onChange={(e) => setQtd_rifa(formaNum(e.target.value))}
                    />
                </div>
                <div className="form-group_rifa">
                    <label className="label_rifa" htmlFor="numero_rifa">Números Escolhidos</label>
                    <input 
                        className="input_rifa" type="text" id="numero_rifa" name="numero_rifa"
                        placeholder="Ex: 1234 5678 9012" required
                        value={numero_rifa} onChange={(e) => setNumero_rifa(formaNumComEscolhidos(e.target.value))}
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="botao_enviar_rifa" 
                    disabled={loading}
                >
                    {loading ? 'Verificando...' : 'Comprar Bilhete'}
                </button>
            </form>
            
            {message && <p className="message_rifa">{message}</p>}
            
            <Link className="link_rifa" href="/">Voltar</Link>

            <div className='tabela_nums'>
                <h2 className='tit_tabela_nums'>Todos os Números (0000 a 9999)</h2>
                <table className='tbl'>
                    <tbody className='agrupamento'>
                        {linhas}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}