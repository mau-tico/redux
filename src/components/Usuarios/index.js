import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../General/Loading";
import Fatal from "../General/Fatal";
import Tabla from "./Tabla";
import * as usuarioActions from "../actions/usuarioActions";
import * as publicacionesActions from "../actions/publicacionesActions";

const { traerTodos: usuariosTraerTodos } = usuarioActions;
const { traerTodos: publicacionesTraerTodos } = publicacionesActions;

class Usuarios extends Component {
  componentDidMount() {
    if (!this.props.usuarios.lenght) {
      this.props.usuariosTraerTodos();
    }
  }

  ponerContenido = () => {
    if (this.props.cargando) {
      return <Loading />;
    }

    if (this.props.error) {
      return <Fatal mensaje={this.props.error} />;
    }

    return <Tabla />;
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Usuarios</h1>
          {this.ponerContenido()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuarioReducer;
};

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios);
