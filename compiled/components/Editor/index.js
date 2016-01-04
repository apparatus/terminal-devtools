'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFunctional = require('react-functional');

var _reactFunctional2 = _interopRequireDefault(_reactFunctional);

var _style = require('../../style');

var style = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-unknown-property */

var ed = {
  style: {
    selected: {
      bold: true,
      bg: 'blue'
    },
    item: {
      bold: false
    },
    scrollbar: {
      bg: 'white'
    }
  }
};

var Editor = function Editor(_ref) {
  var items = _ref.items;
  var selected = _ref.selected;
  var top = _ref.top;
  var left = _ref.left;
  var width = _ref.width;
  var height = _ref.height;
  var focused = _ref.focused;
  var tooltips = _ref.tooltips;
  var _ref$actions = _ref.actions;
  var setEditorLine = _ref$actions.setEditorLine;
  var focusPanel = _ref$actions.focusPanel;
  var toggleBreakpoint = _ref$actions.toggleBreakpoint;
  return _react2.default.createElement('list', {
    vi: true,
    keys: true,
    mouse: true,
    scrollbar: true,
    inputOnFocused: true,
    'class': [style.panel, ed, focused && style.selected],
    selected: selected,
    left: left,
    width: width,
    top: top,
    height: height,
    focused: focused,
    items: items,
    onSelectItem: function onSelectItem(item) {
      focusPanel('editor');
      setEditorLine(item.parent.getItemIndex(item));
    },
    onKeyB: function onKeyB() {
      return toggleBreakpoint();
    },
    hoverText: tooltips && 'Source Text (ctrl+t)'
  });
};

exports.default = Editor;
exports.default = (0, _reactFunctional2.default)(Editor, {
  shouldComponentUpdate: function shouldComponentUpdate(props, nextProps) {
    if (!nextProps.focused && props.selected !== nextProps.selected) return true;
    return props.focused !== nextProps.focused || props.items !== nextProps.items;
  }
});
//# sourceMappingURL=index.js.map