'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-unknown-property */

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
      mouse: true,
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
    _extends({
      mouse: true
    }, enabled ? enable : disable, {
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
    _extends({
      mouse: true
    }, enabled ? enable : disable, {
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
    _extends({
      mouse: true
    }, enabled ? enable : disable, {
      onClick: onClick,
      hoverText: tooltips && 'step out (o)'
    }),
    '⤉'
  );
};

// const BreakPointsActive = ({active, tooltips, onClick}) => (
//   <button
//     mouse
//     onClick={onClick}
//     hoverText={tooltips && `${active ? '' : 'de'}activate breakpoints (p)`}
//   >
//     {active ? '⤇' : '⤃'}
//   </button>
// )

// const UncaughtExceptions = ({tooltips, onClick}) => (
//   <button
//     mouse
//     onClick={onClick}
//     hoverText={tooltips && 'break on exception (x)'}
//   >
//     ⬣
//   </button>
// )

var Controls = function Controls(_ref5) {
  var top = _ref5.top;
  var left = _ref5.left;
  var width = _ref5.width;
  var height = _ref5.height;
  var paused = _ref5.paused;
  var areBreakpointsActive = _ref5.areBreakpointsActive;
  var pauseResume = _ref5.pauseResume;
  var stepOver = _ref5.stepOver;
  var stepInto = _ref5.stepInto;
  var stepOut = _ref5.stepOut;
  var breakpointsActive = _ref5.breakpointsActive;
  var uncaughtExceptions = _ref5.uncaughtExceptions;
  var tooltips = _ref5.tooltips;
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
    _react2.default.createElement(StepOut, { enabled: paused, onClick: stepOut, tooltips: tooltips })
  );
};

function renderer(_ref6) {
  var _this = this;

  var xl = _ref6.xl;
  var xi = _ref6.xi;

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