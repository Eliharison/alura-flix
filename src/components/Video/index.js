import { Link } from "react-router-dom";
import styles from "./Video.module.css";
import { MdDeleteForever, MdOutlineEdit} from "react-icons/md";

function Video({ video, categoria, aoDeletar, aoEditar, aoVerVideo }) {
  return (
    <div className={styles.container} style={{ borderColor: categoria.cor }}>
      <div className={styles.imagem}>
        <Link to={`/${video.id}`}>
          <img
            className={styles.imagemItem}
            src={video.imagem}
            alt={video.titulo}
          />
          <div
            onClick={() => aoVerVideo(video)}
            className={styles.divImg}
            style={{ color: categoria.cor }}
          ></div>
        </Link>
      </div>
      <div className={styles.opcoes}>
        <div className={styles.item_opcao} onClick={() => aoDeletar(video.id)}>
          <MdDeleteForever />
          <p>Deletar</p>
        </div>
        <div
          className={styles.item_opcao}
          onClick={() => {
            aoEditar(video);
          }}
        >
          <MdOutlineEdit />
          <p>Editar</p>
        </div>
      </div>
    </div>
  );
}

export default Video;
