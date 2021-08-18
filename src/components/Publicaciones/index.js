import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../General/Loading";
import Fatal from "../General/Fatal";
import Comentarios from "./Comentarios";
import * as usuarioActions from "../actions/usuarioActions";
import * as publicacionesActions from "../actions/publicacionesActions";

const { traerTodos: usuariosTraerTodos } = usuarioActions;
const {
  traerPorUsuario: publicacionesTaerPorUsuario,
  abrirCerrar,
  traerComentarios,
} = publicacionesActions;

class Publicaciones extends Component {
  async componentDidMount() {
    const {
      usuariosTraerTodos,
      publicacionesTaerPorUsuario,
      match: {
        params: { key },
      },
    } = this.props;

    if (!this.props.usuarioReducer.usuarios.length) {
      await usuariosTraerTodos();
    }
    if (this.props.usuarioReducer.error) {
      return;
    }
    if (!("publicaciones_key" in this.props.usuarioReducer.usuarios[key])) {
      await publicacionesTaerPorUsuario(key);
    }
  }

  ponerUsuario = () => {
    const {
      usuarioReducer,
      match: {
        params: { key },
      },
    } = this.props;

    if (!usuarioReducer.usuarios.length || usuarioReducer.error) {
      return <Fatal mensaje={usuarioReducer.error} />;
    }

    if (usuarioReducer.cargando) {
      return <Loading />;
    }

    const nombre = usuarioReducer.usuarios[key].name;

    return (
      <React.Fragment>
        <div className="enLinea">
          <h1 className="tituloGeneral">Publicaciones de: {nombre} </h1>
          <div className="arrow-down icon"></div>
        </div>
      </React.Fragment>
    );
  };

  ponerPublicaciones = () => {
    const {
      usuarioReducer,
      usuarioReducer: { usuarios },
      publicacionesReducer,
      publicacionesReducer: { publicaciones },
      match: {
        params: { key },
      },
    } = this.props;

    if (!usuarios.length) return;
    if (usuarioReducer.error) return;

    if (publicacionesReducer.cargando) {
      return <Loading />;
    }
    if (publicacionesReducer.error) {
      return <Fatal mensaje={publicacionesReducer.error} />;
    }

    if (!publicaciones.length) return;

    if (!("publicaciones_key" in usuarios[key])) return;

    const { publicaciones_key } = usuarios[key];

    return this.mostrarInfo(
      publicaciones[publicaciones_key],
      publicaciones_key
    );
  };

  mostrarInfo = (publicaciones, pub_key) =>
    publicaciones.map((publicacion, com_key) => (
      <div
        className="divicionPublicaciones"
        key={publicacion.id}
        onClick={() =>
          this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)
        }
      >
        <h2 className="titulo">{publicacion.title}</h2>
        <h4 className="parrafo">{publicacion.body}</h4>
        {publicacion.abierto ? (
          <Comentarios comentarios={publicacion.comentarios} />
        ) : (
          ""
        )}
      </div>
    ));

  mostrarComentarios = (pub_key, com_key, comentarios) => {
    this.props.abrirCerrar(pub_key, com_key);
    if (!comentarios.length) {
      this.props.traerComentarios(pub_key, com_key);
    }
  };

  render() {
    return (
      <div>
        {this.ponerUsuario()}
        {this.ponerPublicaciones()}
      </div>
    );
  }
}

const mapStateToProps = ({ usuarioReducer, publicacionesReducer }) => {
  return {
    usuarioReducer,
    publicacionesReducer,
  };
};

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTaerPorUsuario,
  abrirCerrar,
  traerComentarios,
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
