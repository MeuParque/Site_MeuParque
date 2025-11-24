'use server'; 

import { supabaseAdmin } from '../lib/admin'; 
import { revalidateTag } from 'next/cache';

export async function comprarRifa(dadosFormulario) {

    const { nome, email, telofone, qtd_rifa, numero_rifa_string } = dadosFormulario;
    const numerosArray = numero_rifa_string.trim().split(/\s+/).filter(Boolean);

    try {
        const { data: conflitos, error: selectError } = await supabaseAdmin
            .from('Bilhetes')
            .select('numeros_escolhidos') 
            .overlaps('numeros_escolhidos', numerosArray); 

        if (selectError) {
            console.error('Erro no Supabase ao verificar números:', selectError.message);
            throw new Error('Erro interno ao verificar a disponibilidade dos números.');
        }

        if (conflitos && conflitos.length > 0) {
            const numerosJaCadastrados = conflitos
                .map(row => row.numeros_escolhidos)
                .flat();
            
            const setNumerosJaCadastrados = new Set(numerosJaCadastrados);
            
            const numerosExatosEmConflito = numerosArray.filter(num => 
                setNumerosJaCadastrados.has(num)
            );
            
            if (numerosExatosEmConflito.length > 0) {
                 const mensagemErro = `ERRO: Os seguintes números já foram cadastrados: ${numerosExatosEmConflito.join(', ')}. Por favor, escolha outros.`;

                return { 
                    success: false, 
                    message: mensagemErro
                };
            }
        }

        const dadosDoBilhete = {
            nome: nome,
            email: email,
            telefone: telofone,
            qtd_rifa: parseInt(qtd_rifa),
            numeros_escolhidos: numerosArray 
        };

        const { error: insertError } = await supabaseAdmin
            .from('Bilhetes')
            .insert([dadosDoBilhete]);

        if (insertError) {
            console.error('Erro no Supabase ao salvar bilhete:', insertError.message);
            throw new Error('Erro ao finalizar a compra do bilhete.');
        }

        revalidateTag('rifa-numeros');
        
        return { 
            success: true, 
            message: 'Bilhete comprado com sucesso!' 
        };

    } catch (error) {
        return { 
            success: false, 
            message: error.message 
        };
    }
}

export async function buscarNumerosComprados() {
    try {
        const { data: bilhetes, error } = await supabaseAdmin
            .from('Bilhetes')
            .select('numeros_escolhidos'); 

        if (error) {
            console.error('Erro ao buscar bilhetes:', error);
            return { success: false, message: 'Erro ao carregar os bilhetes comprados.' };
        }

        const numerosComprados = bilhetes
            .map(item => item.numeros_escolhidos || [])
            .flat();

        return {
            success: true,
            numeros: numerosComprados 
        };

    } catch (error) {
        return { 
            success: false, 
            message: error.message 
        };
    }
}