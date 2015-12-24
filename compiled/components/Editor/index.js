'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

var style = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var setEditorLine = _ref.actions.setEditorLine;
  return _react2.default.createElement('list', {
    'class': [style.panel, ed],
    selected: selected,
    left: left,
    width: width,
    top: top,
    height: height,
    scrollbar: true,
    mouse: true,
    keys: true,
    vi: true,
    inputOnFocused: true,
    focused: focused,
    items: items,
    onSelectItem: function onSelectItem(item) {
      return setEditorLine(item.parent.getItemIndex(item));
    }
  });
};

exports.default = Editor;
//# sourceMappingURL=index.js.map