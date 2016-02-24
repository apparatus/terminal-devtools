'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

var style = _interopRequireWildcard(_style);

var _reactFunctional = require('react-functional');

var _reactFunctional2 = _interopRequireDefault(_reactFunctional);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-unknown-property */

var bg = {
  style: {
    fg: 'white',
    bg: 'blue'
  }
};

var settings = _extends({
  border: null,
  padding: { left: 1, right: 1 }
}, bg);

/* eslint-disable no-trailing-spaces */
var help = '\n{underline}{bold}Keys{/bold}{/underline}\n\n    {bold}?{/bold} - Settings/help                    {bold}1{/bold} - Sources\n    {bold}tab{/bold} - next panel                     {bold}2{/bold} - Networking\n    {bold}shift+tab{/bold} - previous panel           {bold}3{/bold} - Profiling\n                                         {bold}4{/bold} - Console\n\n    {bold}n{/bold} - step over ({bold}n{/bold}ext)                 {bold}ctrl+n{/bold} - {bold}n{/bold}avigator\n    {bold}i{/bold} - step {bold}i{/bold}nto                        {bold}ctrl+t{/bold} - source {bold}t{/bold}ext\n    {bold}o{/bold} - step {bold}o{/bold}ut                         {bold}ctrl+s{/bold} - call{bold}s{/bold}tack\n    {bold}c{/bold} - pause/resume ([dis]{bold}c{/bold}ontinue)     {bold}ctrl+p{/bold} - break{bold}p{/bold}oints\n    {bold}p{/bold} - [de]activiate break{bold}p{/bold}oints        {bold}ctrl+o{/bold} - sc{bold}o{/bold}pe\n    {bold}x{/bold} - break on e{bold}x{/bold}ception               {bold}ctrl+k{/bold} - console ({bold}k{/bold}onsole)\n\n    {underline}Source Panel{/underline}\n    {bold}b{/bold} - toggle {bold}b{/bold}reakpoint\n';
/* eslint-enable no-trailing-spaces */

var nav = function nav(cmp) {
  return function (ch, _ref) {
    var name = _ref.name;

    if (name === 'left') {
      cmp.refs.form.focusPrevious();
    }
    if (name === 'right') {
      cmp.refs.form.focusNext();
    }
  };
};

var Settings = function Settings(_ref2, cmp) {
  var layout = _ref2.layout;
  var focused = _ref2.focused;
  var top = _ref2.top;
  var left = _ref2.left;
  var width = _ref2.width;
  var height = _ref2.height;
  var align = _ref2.align;
  var tooltips = _ref2.tooltips;
  var padding = _ref2.padding;
  var toggleTooltips = _ref2.toggleTooltips;
  var changeLayout = _ref2.changeLayout;

  return _react2.default.createElement(
    'box',
    {
      keys: true,
      mouse: true,
      clickable: true,
      draggable: true,
      index: 20,
      'class': [style.panel, settings],
      left: left,
      width: width,
      top: top,
      height: height,
      align: align,
      padding: padding
    },
    _react2.default.createElement(
      'form',
      {
        mouse: true,
        keys: true,
        inputOnFocused: true,
        ref: 'form',
        focused: focused,
        'class': _extends({}, bg)
      },
      _react2.default.createElement(
        'box',
        { tags: true, top: 1, 'class': _extends({}, bg) },
        '{underline}{bold}Layout{/bold}{/underline}'
      ),
      _react2.default.createElement(
        'radioset',
        {
          keys: true,
          mouse: true,
          height: 9,
          top: 3,
          'class': _extends({}, bg, { padding: { left: 4 } })
        },
        _react2.default.createElement('radiobutton', {
          onKeypress: nav(cmp),
          onCheck: changeLayout('normal'),
          height: 1,
          width: 22,
          checked: layout.name === 'normal',
          text: 'Normal',
          'class': _extends({}, bg)
        }),
        _react2.default.createElement('radiobutton', {
          onKeypress: nav(cmp),
          onCheck: changeLayout('minimal'),
          left: 22,
          height: 1,
          width: 22,
          checked: layout.name === 'minimal',
          text: 'Minimal',
          'class': _extends({}, bg)
        })
      ),
      _react2.default.createElement(
        'box',
        { tags: true, top: 5, height: 1, 'class': _extends({}, bg) },
        '{underline}{bold}General{/bold}{/underline}'
      ),
      _react2.default.createElement('checkbox', {
        mouse: true,
        onKeypress: nav(cmp),
        onCheck: toggleTooltips,
        onUncheck: toggleTooltips,
        top: 7,
        height: 1,
        width: 22,
        left: 4,
        checked: tooltips,
        text: 'Tooltips',
        'class': _extends({}, bg)
      })
    ),
    _react2.default.createElement(
      'box',
      { tags: true, top: 8, height: 18, 'class': _extends({}, bg) },
      help
    )
  );
};

exports.default = (0, _reactFunctional2.default)(Settings, {
  componentDidMount: function componentDidMount(_ref3, refs) {
    var _ref3$focusedInput = _ref3.focusedInput;
    var focusedInput = _ref3$focusedInput === undefined ? 'normal' : _ref3$focusedInput;
    var layout = refs.form.children[1].children;

    var tooltips = refs.form.children[3];

    var selected = layout.find(function (c) {
      return c.text.toLowerCase() === focusedInput;
    }) || tooltips.options.text.toLowerCase() === focusedInput && tooltips;

    if (!selected) {
      return;
    }
    setTimeout(function () {
      return selected.focus();
    });
  }
});
//# sourceMappingURL=index.js.map