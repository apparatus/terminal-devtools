'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

var style = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var btn = {
  input: true,
  keyable: true,
  clickable: true,
  mouse: true,
  keys: true,
  vi: true
};

var enable = {
  class: {
    style: {
      fg: 'white'
    }
  }
};

var disable = {
  class: {
    style: {
      fg: 'blue'
    }
  }
};

var PauseResume = function PauseResume(_ref) {
  var paused = _ref.paused;
  var tooltips = _ref.tooltips;
  var onClick = _ref.onClick;
  return _react2.default.createElement(
    'button',
    {
      onClick: onClick,
      hoverText: tooltips && (paused ? 'resume (c) ' : 'pause (c)')
    },
    paused ? '⫸' : '‖'
  );
};

var StepOver = function StepOver(_ref2) {
  var enabled = _ref2.enabled;
  var tooltips = _ref2.tooltips;
  var onClick = _ref2.onClick;
  return _react2.default.createElement(
    'button',
    _extends({}, enabled ? enable : disable, {
      onClick: onClick,
      hoverText: tooltips && 'step over (n)'
    }),
    '⤼'
  );
};

var StepInto = function StepInto(_ref3) {
  var enabled = _ref3.enabled;
  var tooltips = _ref3.tooltips;
  var onClick = _ref3.onClick;
  return _react2.default.createElement(
    'button',
    _extends({}, enabled ? enable : disable, {
      onClick: onClick,
      hoverText: tooltips && 'step into (i)'
    }),
    '⤈'
  );
};

var StepOut = function StepOut(_ref4) {
  var enabled = _ref4.enabled;
  var tooltips = _ref4.tooltips;
  var onClick = _ref4.onClick;
  return _react2.default.createElement(
    'button',
    _extends({}, enabled ? enable : disable, {
      onClick: onClick,
      hoverText: tooltips && 'step out (o)'
    }),
    '⤉'
  );
};

var BreakPointsActive = function BreakPointsActive(_ref5) {
  var active = _ref5.active;
  var tooltips = _ref5.tooltips;
  var onClick = _ref5.onClick;
  return _react2.default.createElement(
    'button',
    {
      onClick: onClick,
      hoverText: tooltips && (active ? '' : 'de') + 'activate breakpoints (p)'
    },
    active ? '⤇' : '⤃'
  );
};

var UncaughtExceptions = function UncaughtExceptions(_ref6) {
  var tooltips = _ref6.tooltips;
  var onClick = _ref6.onClick;
  return _react2.default.createElement(
    'button',
    {
      onClick: onClick,
      hoverText: tooltips && 'break on exception (x)'
    },
    '⬣'
  );
};

var Controls = function Controls(_ref7) {
  var top = _ref7.top;
  var left = _ref7.left;
  var width = _ref7.width;
  var height = _ref7.height;
  var paused = _ref7.paused;
  var areBreakpointsActive = _ref7.areBreakpointsActive;
  var pauseResume = _ref7.pauseResume;
  var stepOver = _ref7.stepOver;
  var stepInto = _ref7.stepInto;
  var stepOut = _ref7.stepOut;
  var breakpointsActive = _ref7.breakpointsActive;
  var uncaughtExceptions = _ref7.uncaughtExceptions;
  var tooltips = _ref7.tooltips;
  return _react2.default.createElement(
    'layout',
    {
      renderer: renderer,
      left: left,
      width: width,
      top: top,
      height: height
    },
    _react2.default.createElement(PauseResume, { paused: paused, onClick: pauseResume, tooltips: tooltips }),
    _react2.default.createElement(StepOver, { enabled: paused, onClick: stepOver, tooltips: tooltips }),
    _react2.default.createElement(StepInto, { enabled: paused, onClick: stepInto, tooltips: tooltips }),
    _react2.default.createElement(StepOut, { enabled: paused, onClick: stepOut, tooltips: tooltips }),
    _react2.default.createElement(BreakPointsActive, { active: areBreakpointsActive, onClick: breakpointsActive, tooltips: tooltips }),
    _react2.default.createElement(UncaughtExceptions, { onClick: uncaughtExceptions, tooltips: tooltips })
  );
};

function renderer(_ref8) {
  var _this = this;

  var xl = _ref8.xl;
  var xi = _ref8.xi;
  var yl = _ref8.yl;
  var yi = _ref8.yi;

  var width = xl - xi;
  var height = yl - yi;
  return function (el, i) {
    el.shrink = true;
    var last = _this.getLastCoords(i);
    if (!last) {
      el.position.left = 0;
      el.position.top = 0;
      return;
    }
    el.position.left = last.xl - xi + 2;
  };
}

exports.default = Controls;
//# sourceMappingURL=index.js.map