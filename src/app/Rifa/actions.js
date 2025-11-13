'use server'; 

import { supabaseAdmin } from '../lib/supabaseClient'; 
import { revalidatePath } from 'next/cache'; 

export async function comprarRifa(dadosFormulario) {

    const { nome, email, telofone, qtd_rifa, numero_rifa_string } = dadosFormulario;
    const numerosArray = numero_rifa_string.trim().split(/\s+/).filter(Boolean);

    try {
        const { data: conflitos, error: selectError } = await supabaseAdmin
            .from('Bilhetes')
            .select('numeros_escolhidos') 
            .overlaps('numeros_escolhidos', numerosArray); 

        if (selectError) {
            throw new Error(`Erro ao verificar números: ${selectError.message}`);
        }

        if (conflitos && conflitos.length > 0) {
            
            const numerosJaCadastradosArrays = conflitos.map(row => row.numeros_escolhidos);
            const numerosJaCadastrados = numerosJaCadastradosArrays.flat();
            const setNumerosJaCadastrados = new Set(numerosJaCadastrados);
            const numerosExatosEmConflito = numerosArray.filter(num => setNumerosJaCadastrados.has(num));
            const mensagemErro = `ERRO: Os seguintes números já foram cadastrados: ${numerosExatosEmConflito.join(', ')}. Por favor, escolha outros.`;

            return { 
                success: false, 
                message: mensagemErro
            };
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
            throw new Error(`Erro ao salvar bilhete: ${insertError.message}`);
        }

        revalidatePath('/Rifa'); 
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