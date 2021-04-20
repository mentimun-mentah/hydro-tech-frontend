"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @class Joystick
 *
 * @classdesc Provides graphical interface for directional temporary X & Y coordinate input.
 *
 * @property {number}  width               - Width of joystick body (full element width) [ Default: 200 ]
 * @property {number}  knobWidth           - Width of joystick knob [ Default: 50 ]
 * @property {string}  backgroundColor     - Background color of Joystick base
 * @property {string}  knobColor           - Background color of Joystick knob
 * @property {string}  borderColor         - Color of joystick base border
 * @property {string}  knobBorderColor     - Color of joystick knob border
 * @property {number}  borderWidth         - Width of joystick base border [ Default: 2 ]
 * @property {number}  knobBorderWidth     - Width of joystick knob border [ Default: 1 ]
 * @property {boolean}  noBorder           - Boolean property for enabling/disabling joystick and knob borders [ Default: false ]
 * @property {boolean}  persistOnExit      - Boolean property for whether joystick should release on mouse/touch exit from window [ Default: true ]
 * @property {boolean}  invertY            - Boolean property for whether joystick should have inverted Y Access [ Default: false ]
 * @property {function}  onActivity        - The function to be run when coordinates change; Function will receive object with coords & intensity props (each including x,y props)
 * @property {ref}     ref                 - React ref handle (React.createRef())
 *
 * @author Eric Nail
 */
var Joystick =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Joystick, _React$Component);

  function Joystick(props) {
    var _this;

    _classCallCheck(this, Joystick);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Joystick).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "dragStart", function (e) {
      e.stopPropagation();

      _this.setState({
        dragging: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "dragEnd", function (e) {
      e.stopPropagation();

      if (_this.onActivity) {
        _this.onActivity({
          position: {
            x: 0,
            y: 0
          },
          intensity: {
            x: 0,
            y: 0
          }
        });
      }

      _this.setState({
        dragging: false,
        pos: {
          x: 0,
          y: 0
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "extractCoords", function (evnt) {
      var touch = evnt.changedTouches || evnt.originalEvent && evnt.originalEvent.touches || evnt.originalEvent && evnt.originalEvent.changedTouches;
      return touch ? {
        x: touch.clientX,
        y: touch.clientY
      } : {
        x: evnt.clientX,
        y: evnt.clientY
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onMove", function (e) {
      var _this$properties = _this.properties,
          radius = _this$properties.radius,
          knobWidth = _this$properties.knobWidth;

      if (!_this.state.dragging) {
        return;
      }

      var coords = _this.extractCoords(e);

      var bounds = _this.joystick.current.getBoundingClientRect();

      var pos = {
        x: coords.x - bounds.left - radius / 2 * 2,
        y: coords.y - bounds.top - radius / 2 * 2
      };
      var vector = Math.sqrt(pos.x * pos.x + pos.y * pos.y);

      if (vector > radius - knobWidth / 2) {
        pos.x /= vector;
        pos.y /= vector;
        pos.x *= radius - knobWidth / 2;
        pos.y *= radius - knobWidth / 2;
      }

      coords = _this.props.invertY ? pos : {
        x: pos.x,
        y: pos.y - pos.y * 2
      };
      var diff = {
        x: coords.x >= 0 ? coords.x / _this.differential : coords.x / _this.differential,
        y: coords.y >= 0 ? coords.y / _this.differential : coords.y / _this.differential
      };

      if (_this.onActivity) {
        _this.onActivity({
          position: coords,
          intensity: diff
        });
      }

      _this.setState({
        pos: pos
      });
    });

    _this.joystick = _react.default.createRef();
    _this.state = {
      pos: {
        x: 0,
        y: 0
      },
      dragging: false
    };
    _this.properties = {
      backgroundColor: props.color || '#dfdfdf',
      knobColor: props.knobColor || '#bfbfbf',
      borderColor: props.borderColor || '#c5c5c5',
      knobBorderColor: props.knobBorderColor || 'rgba(255,255,255,0.85)',
      borderWidth: props.borderWidth || 2,
      knobBorderWidth: props.knobBorderWidth || 1,
      width: props.width || 200,
      height: props.width || 200,
      knobWidth: props.knobWidth || 50,
      radius: props.width / 2 || 100,
      knobRadius: props.knobWidth / 2 || 25
    };
    _this.onActivity = props.onActivity || null;
    _this.differential = _this.properties.radius - _this.properties.knobRadius;
    return _this;
  }

  _createClass(Joystick, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          pos = _this$state.pos,
          dragging = _this$state.dragging;
      var _this$props = this.props,
          noBorder = _this$props.noBorder,
          persistOnExit = _this$props.persistOnExit;
      var _this$properties2 = this.properties,
          width = _this$properties2.width,
          height = _this$properties2.height,
          knobWidth = _this$properties2.knobWidth,
          backgroundColor = _this$properties2.backgroundColor,
          knobColor = _this$properties2.knobColor,
          borderColor = _this$properties2.borderColor,
          knobBorderColor = _this$properties2.knobBorderColor,
          borderWidth = _this$properties2.borderWidth,
          knobBorderWidth = _this$properties2.knobBorderWidth;
      return _react.default.createElement("div", {
        ref: this.joystick,
        style: {
          border: noBorder ? 'none' : "".concat(borderWidth, "px solid ").concat(borderColor),
          background: backgroundColor,
          width: width,
          height: height
        },
        className: "joystick"
      }, _react.default.createElement("div", {
        className: "joystick-touchable".concat(dragging ? ' active' : ''),
        onTouchMove: this.onMove,
        onMouseMove: this.onMove,
        onMouseOut: !persistOnExit && this.dragEnd,
        onTouchEnd: this.dragEnd,
        onMouseUp: this.dragEnd
      }), _react.default.createElement("div", {
        className: "knob uk-box-shadow-small",
        style: {
          width: knobWidth,
          height: knobWidth,
          left: "calc(50% - ".concat(knobWidth / 2, "px)"),
          top: "calc(50% - ".concat(knobWidth / 2, "px)"),
          border: noBorder ? 'none' : "".concat(knobBorderWidth, "px solid ").concat(knobBorderColor),
          background: knobColor,
          cursor: dragging ? 'none' : 'default',
          transform: "translate3d(".concat(pos.x, "px,").concat(pos.y, "px,0)")
        },
        onTouchStart: this.dragStart,
        onMouseDown: this.dragStart
      }));
    }
  }]);

  return Joystick;
}(_react.default.Component);

var _default = Joystick;
exports.default = _default;

//# sourceMappingURL=index.js.map