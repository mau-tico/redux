import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../General/Loading";
import Fatal from "../General/Fatal";
import * as tareasActions from "../actions/tareasActions";

export class Tareas extends Component {
  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.traerTodas();
    }
  }

  mostrarContenido = () => {
    const { tareas, cargando, error } = this.props;

    if (cargando) {
      return <Loading />;
    }

    if (error) {
      return <Fatal mensage={error} />;
    }

    return Object.keys(tareas).map((usu_id) => (
      <div className="contenedor_tareas" key={usu_id}>
        <h2>Usuario {usu_id}</h2>
        <div className="contenedor_tareas">{this.ponerTareas(usu_id)}</div>
      </div>
    ));
  };

  ponerTareas = (usu_id) => {
    const { tareas } = this.props;
    const por_usuario = {
      ...tareas[usu_id],
    };

    return Object.keys(por_usuario).map((tar_id) => (
      <div key={tar_id}>
        <input
          className="tasks"
          type="checkbox"
          defaultChecked={por_usuario[tar_id].completed}
        />
        {por_usuario[tar_id].title}
      </div>
    ));
  };

  render() {
    return (
      <div>
        <button>
          <Link to="/tareas/guardar">Agregar</Link>
        </button>
        <div>{this.mostrarContenido()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
