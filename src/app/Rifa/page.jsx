'use client';

import React, { useState } from 'react';
import "./Page.css" 
import Link from 'next/link';

import { comprarBilhete } from './actions.js';

export default function FormRifa() {
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telofone, setTelefone] = useState('');
    const [qtd_rifa, setQtd_rifa] = useState('');
    const [numero_rifa, setNumero_rifa] = useState('');

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        setMessage('Verificando e enviando dados...');

        const dadosFormulario = {
            nome,
            email,
            telofone,
            qtd_rifa,
            numero_rifa_string: numero_rifa 
        };

        const resultado = await comprarBilhete(dadosFormulario);

        setMessage(resultado.message);
        setLoading(false); 

        if (resultado.success) {
            setNome('');
            setEmail('');
            setTelefone('');
            setQtd_rifa('');
            setNumero_rifa('');
        }
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
                        value={nome} onChange={(e) => setNome(e.target.value)} 
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
                        value={telofone} onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>
                <div className="form-group_rifa">
                    <label className="label_rifa" htmlFor="qtd_rifa">Quantidade de números (rifa)</label>
                    <input 
                        className="input_rifa" type="number" id="qtd_rifa" name="qtd_rifa"
                        placeholder="Ex: 3" min="1" required
                        value={qtd_rifa} onChange={(e) => setQtd_rifa(e.target.value)}
                    />
                </div>
                <div className="form-group_rifa">
                    <label className="label_rifa" htmlFor="numero_rifa">Números Escolhidos (separados por espaço)</label>
                    <input 
                        className="input_rifa" type="text" id="numero_rifa" name="numero_rifa"
                        placeholder="Ex: 1234 5678 9012" required
                        value={numero_rifa} onChange={(e) => setNumero_rifa(e.target.value)}
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
            
        </div>
    );
}