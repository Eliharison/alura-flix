import Formulario from 'components/Formulario'
import styles from './NovoVideo.module.css'
import { useEffect, useState } from 'react'
import categorias from '../../json/categorias.json'
import { conectaAPI } from 'conectaAPI'
import axios from 'axios'

function NovoVideo() {

    const [, setVideos] = useState([])

    useEffect(() => {
        axios.get(conectaAPI).then((resposta) => {
            setVideos(resposta.data);
          });
    }, [])

    const adicionarNovoVideo = (novoVideo) => {
        setVideos((prevVideos) => [...prevVideos, novoVideo])
    }

    return (
        <Formulario
            className={styles.sessaoFormulario}
            aoCadastrar={adicionarNovoVideo}
            categorias={categorias.map((categoria) => categoria.nome)}
        />
    )
}

export default NovoVideo