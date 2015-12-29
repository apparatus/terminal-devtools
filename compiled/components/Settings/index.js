'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

var style = _interopRequireWildcard(_style);

var _actions = require('../../actions');

var _layouts = require('../../config/layouts');

var _layouts2 = _interopRequireDefault(_layouts);

var _reactFunctional = require('react-functional');

var _reactFunctional2 = _interopRequireDefault(_reactFunctional);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bg = {
  style: {
    fg: 'white',
    bg: 'blue'
  }
};

var settings = _extends({
  border: {
    type: 'bg'
  },
  padding: { left: 1, right: 1 }
}, bg);

var help = '\n{underline}{bold}Keys{/bold}{/underline}\n\n    {bold}1{/bold} - Sources                          {bold}?{/bold} - Settings/Help\n    {bold}2{/bold} - Networking                       {bold}tab{/bold} - next panel\n    {bold}3{/bold} - Profiling                        {bold}shift+tab{/bold} - previous panel  \n    {bold}4{/bold} - Console                            \n                                         {bold}ctrl+n{/bold} - {bold}n{/bold}avigator\n    {bold}n{/bold} - step over ({bold}n{/bold}ext)                 {bold}ctrl+t{/bold} - {bold}t{/bold}ext editor\n    {bold}r{/bold} - {bold}r{/bold}esume                           {bold}ctrl+s{/bold} - call{bold}s{/bold}tack\n    {bold}p{/bold} - {bold}p{/bold}ause                            {bold}ctrl+p{/bold} - break{bold}p{/bold}oints\n    {bold}b{/bold} - toggle {bold}b{/bold}reakpoint                {bold}ctrl+o{/bold} - sc{bold}o{/bold}pe\n';

var hideWhen = function hideWhen(dispatch) {
  return function (ch, key) {
    if (ch === '?') {
      dispatch((0, _actions.focusPanel)('editor'));
    }
  };
};

var changeLayout = function changeLayout(to, dispatch) {
  return function () {
    //hack - react-blessed and/or blessed currently
    //doesn't do well with multiple rendering changes
    //in the same event loop
    setImmediate(function () {
      dispatch((0, _actions.focusPanel)('editor'));
      setImmediate(function () {
        dispatch((0, _actions.setDimensions)(_layouts2.default[to]));
        dispatch((0, _actions.focusPanel)('settings'));
      });
    });
  };
};

var Settings = function Settings(_ref, cmp) {
  var layout = _ref.layout;
  var focused = _ref.focused;
  var top = _ref.top;
  var left = _ref.left;
  var width = _ref.width;
  var height = _ref.height;
  var align = _ref.align;
  var padding = _ref.padding;
  var dispatch = _ref.dispatch;
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
        ref: 'form',
        focused: focused,
        inputOnFocused: true,
        mouse: true,
        keys: true,
        'class': _extends({}, bg),
        onKeypress: hideWhen(dispatch)
      },
      _react2.default.createElement(
        'box',
        { tags: true, top: 1, 'class': _extends({}, bg) },
        '{underline}{bold}Layout{/bold}{/underline}'
      ),
      _react2.default.createElement(
        'radioset',
        {
          mouse: true,
          keys: true,
          height: 9,
          top: 3,
          'class': _extends({}, bg, { padding: { left: 4 } })
        },
        _react2.default.createElement('radiobutton', {
          onKeypress: function onKeypress(ch, _ref2) {
            var name = _ref2.name;

            if (name === 'right') {
              cmp.refs.form.focusNext();
            }
            hideWhen(dispatch)(ch);
          },
          onCheck: changeLayout('normal', dispatch),
          height: 1,
          width: 22,
          checked: layout.name === 'normal',
          text: 'Normal',
          'class': _extends({}, bg)
        }),
        _react2.default.createElement('radiobutton', {
          onKeypress: function onKeypress(ch, _ref3) {
            var name = _ref3.name;

            if (name === 'left') {
              cmp.refs.form.focusPrevious();
            }
            if (name === 'right') {
              cmp.refs.form.focusNext();
            }
            hideWhen(dispatch)(ch);
          },
          onCheck: changeLayout('compact', dispatch),
          left: 22,
          height: 1,
          width: 22,
          checked: layout.name === 'compact',
          text: 'Compact',
          'class': _extends({}, bg)
        }),
        _react2.default.createElement('radiobutton', {
          onKeypress: function onKeypress(ch, _ref4) {
            var name = _ref4.name;

            if (name === 'left') {
              cmp.refs.form.focusPrevious();
            }
            hideWhen(dispatch)(ch);
          },
          onCheck: changeLayout('minimal', dispatch),
          left: 44,
          height: 1,
          width: 22,
          checked: layout.name === 'minimal',
          text: 'Minimal',
          'class': _extends({}, bg)
        })
      )
    ),
    _react2.default.createElement(
      'box',
      { top: 9, height: 10, tags: true, 'class': _extends({}, bg) },
      help
    )
  );
};

exports.default = (0, _reactFunctional2.default)(Settings, {
  componentDidMount: function componentDidMount(props, refs) {
    //workaround
    var selected = refs.form.children[1].children.find(function (c) {
      return c.checked;
    });
    setTimeout(function () {
      return selected.focus();
    });
  }
});
//# sourceMappingURL=index.js.map