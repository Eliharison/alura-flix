import { useEffect, useState } from "react";
import styles from "./Inicio.module.css";
import Banner from "components/Banner";
import SessaoPorCategoria from "components/SessaoPorCategoria";
import ModalEditar from "components/ModalEditar";
import categorias from "../../json/categorias.json";
import { conectaAPI } from "conectaAPI";
import axios from "axios";

function Inicio() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios.get(conectaAPI).then((resposta) => {
      setVideos(resposta.data);
    });
  }, []);

  function deletarVideo(videodeletado) {
    axios.delete(`${conectaAPI}/${videodeletado}`).then(() => {
      setVideos(videos.filter((video) => video.id !== videodeletado));
    })
  }

  const [videoSelecionado, setVideoSelecionado] = useState(null);
  const [, setVideoVer] = useState(null);

  const editarVideo = (video) => {
    setVideoSelecionado(video);
    window.scrollTo(0, 0);
  };

  const fecharModal = () => {
    setVideoSelecionado(null);
    setVideoVer(null);
  };

  const atualizarVideo = (videoAtualizado) => {
    console.log(videoAtualizado);

    axios
      .put(`${conectaAPI}/${videoAtualizado.id}`, {
        categoria: videoAtualizado.categoria,
        descricao: videoAtualizado.descricao,
        id: videoAtualizado.id,
        imagem: videoAtualizado.imagem,
        link: videoAtualizado.link,
        titulo: videoAtualizado.titulo
      })
      .then(() => {
        setVideos(
            videos.map((video) => {
              if (video.id === videoAtualizado.id) {
                return videoAtualizado;
              }
              return video;
            })
          );
      });
    
    setVideoSelecionado(null);
  };

  const verVideo = (video) => {
    setVideoVer(video);
  };

  return (
    <>
      <Banner categoria={categorias} aoVerVideo={verVideo} />
      <section className={styles.categorias}>
        {categorias.map((categoria, indice) => (
          <SessaoPorCategoria
            key={indice}
            categoria={categoria}
            videos={videos.filter(
              (video) => video.categoria === categoria.nome
            )}
            aoDeletar={deletarVideo}
            aoEditar={editarVideo}
            aoVerVideo={verVideo}
          />
        ))}
      </section>
      <ModalEditar
        video={videoSelecionado}
        aoSalvar={atualizarVideo}
        aoFecharModal={fecharModal}
        categorias={categorias.map((categoria) => categoria.nome)}
      />
    </>
  );
}

export default Inicio;
