"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traerTodos = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _usuariosTypes = require("../../types/usuariosTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var traerTodos = function traerTodos() {
  return function _callee(dispatch) {
    var respuesta;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch({
              type: _usuariosTypes.CARGANDO
            });
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get("https://jsonplaceholder.typicode.com/users"));

          case 4:
            respuesta = _context.sent;
            dispatch({
              type: _usuariosTypes.TRAER_TODOS,
              payload: respuesta.data
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            dispatch({
              type: _usuariosTypes.ERROR,
              payload: _context.t0.message
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 8]]);
  };
};

exports.traerTodos = traerTodos;