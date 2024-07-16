import CampoFormulario from 'components/CampoFormulario'
import styles from './Formulario.module.css'
import { useState } from 'react'
import ListaSuspensa from 'components/ListaSuspensa'
import Textarea from 'components/Textarea'
import { BotaoFormulario } from 'components/Botao'
import fetch from 'cross-fetch'
import { conectaAPI } from "conectaAPI"

function Formulario({ aoCadastrar, categorias }) {

    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        imagem: '',
        link: '',
        categoria: '',
    })

    const limparFormulario = () => {
        setFormData({
            titulo: '',
            descricao: '',
            imagem: '',
            link: '',
            categoria: '',
        })
    }

    const aoSalvar = async (evento) => {
        evento.preventDefault()

        try {
            const response = await fetch(conectaAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                console.log('Vídeo cadastrado com sucesso!')
                alert('Vídeo cadastrado com sucesso!')
                limparFormulario()
                aoCadastrar(formData)
            }
        } catch (error) {
            console.error('Erro na requisição:', error)
            alert('Erro no cadastro!')
        }
    }

    return (
        <form onSubmit={aoSalvar} onReset={limparFormulario} className={styles.formulario} >
            <div className={styles.cabecalho}>
                <h1>Novo vídeo</h1>
                <p>Complete o formulário para criar um novo card de vídeo.</p>
            </div>

            <div className={styles.sessaoCampos}>
                <h2>Criar Card</h2>
                <div className={styles.campos}>
                    <CampoFormulario
                        obrigatorio={true}
                        label="Título"
                        placeholder="Insira o título"
                        valor={formData.titulo}
                        aoAlterado={(valor) => setFormData({ ...formData, titulo: valor })}
                        tipo="text"
                        minLength="3"
                        required
                    />

                    <ListaSuspensa
                        obrigatorio={true}
                        label="Categoría"
                        placeholder="Selecione uma categoía..."
                        required
                        itens={categorias}
                        valor={formData.categoria}
                        aoAlterado={(valor) => setFormData({ ...formData, categoria: valor })}

                    />

                    <CampoFormulario
                        obrigatorio={true}
                        label="Imagem"
                        placeholder="URL da imagem"
                        required
                        valor={formData.imagem}
                        aoAlterado={(valor) => setFormData({ ...formData, imagem: valor })}
                        tipo="url"
                    />

                    <CampoFormulario
                        obrigatorio={true}
                        label="Vídeo"
                        placeholder="URL do vídeo"
                        required
                        valor={formData.link}
                        aoAlterado={(valor) => setFormData({ ...formData, link: valor })}
                        tipo="url"
                    />

                    <Textarea
                        obrigatorio={true}
                        label="Descrição"
                        placeholder="Sobre o que é esse vídeo?"
                        required
                        valor={formData.descricao}
                        aoAlterado={(valor) => setFormData({ ...formData, descricao: valor })}
                        tipo="text"
                        minLength="10"
                        maxLength="250"
                    />

                </div>
                <div className={styles.botoes}>
                    <BotaoFormulario
                        children="Guardar"
                        type='submit'
                    />
                    <BotaoFormulario
                        children="Limpar"
                        type='reset'
                    />
                </div>
            </div>
        </form>
    )
}

export default Formulario