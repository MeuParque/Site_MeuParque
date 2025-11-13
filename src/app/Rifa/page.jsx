'use client';

import React, { useState } from 'react';
/*import toast, { Toaster } from 'react-hot-toast'; */
import "./Page.css" // Importa o Page.css com os nomes _rifa
import Link from 'next/link';

export default function FormRifa() {
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telofone, setTelefone] = useState('');
    const [numero_rifa, setNumero_rifa] = useState('');

    

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Dados da Rifa:');
        console.log('Nome:', nome);
        console.log('Email:', email);
        console.log('Telefone:', telofone);
        console.log('Número:', numero_rifa);
{/* toast.promise(
            emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_USER_ID
            ),
            {
                loading: 'Enviando dados...',
                success: 'Dados cadastrados com sucessso!',
                error: 'Ocorreu um erro, tente novamente mais tarde.'
            }
        ).then(() => {
            setNome("");
            setTelefone("");
            setEmail("");
            setNumero_rifa("");
            setFormvalido(false);
        }).finally(() => {
            setEnviando(false);
        });
    }*/}
    };
    

    return (

        <div className="container_rifa">
            
            <h1 className="h1_rifa">Formulário Rifa</h1>
            
            <form id="rifaForm" onSubmit={handleSubmit}>
                
                <div className="form-group_rifa">
                    <label className="label_rifa" htmlFor="nome">Nome Completo</label>
                    <input 
                        className="input_rifa"
                        type="text" 
                        id="nome" 
                        name="nome"
                        placeholder="Ex: José da Silva"
                        required
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                    />
                </div>

                <div className="form-group_rifa">
                    <label className="label_rifa" htmlFor="email">Email</label>
                    <input 
                        className="input_rifa"
                        type="email" 
                        id="email" 
                        name="email"
                        placeholder="Ex: seuemail@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group_rifa">
                    <label className="label_rifa" htmlFor="telefone">Telefone (WhatsApp)</label>
                    <input 
                        className="input_rifa"
                        type="tel" 
                        id="telefone" 
                        name="telefone"
                        placeholder="Ex: (71) 99999-8888"
                        required
                        value={telofone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>
                
                <div className="form-group_rifa">
                    <label className="label_rifa" htmlFor="numero_rifa">Número Escolhido</label>
                    <input 
                        className="input_rifa"
                        type="number" 
                        id="numero_rifa" 
                        name="numero_rifa"
                        placeholder="Ex: 2504"
                        min="4"
                        max="4"
                        required
                        value={numero_rifa}
                        onChange={(e) => setNumero_rifa(e.target.value)}
                    />
                </div>
                
                <button type="submit" className="botao_enviar_rifa">
                    Comprar Bilhete
                </button>
            </form>
            
            <Link className="link_rifa" href="/">Voltar</Link>
            
        </div>
    );
}