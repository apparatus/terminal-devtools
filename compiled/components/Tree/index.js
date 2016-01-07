'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFunctional = require('react-functional');

var _reactFunctional2 = _interopRequireDefault(_reactFunctional);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

var noop = function noop() {};

var Tree = function Tree(props, cmp) {
  var selected = 0;
  var tree = props.items;
  var _props$onExpand = props.onExpand;
  var onExpand = _props$onExpand === undefined ? noop : _props$onExpand;
  var _props$onContract = props.onContract;
  var onContract = _props$onContract === undefined ? noop : _props$onContract;
  var _props$onSelect = props.onSelect;
  var onSelect = _props$onSelect === undefined ? noop : _props$onSelect;
  var _props$onSelectItem = props.onSelectItem;
  var onSelectItem = _props$onSelectItem === undefined ? noop : _props$onSelectItem;
  var item = props.item;
  var indentation = props.indentation;
  var labelling = props.labelling;
  var selectOverride = props.selectOverride;

  var _traverse = traverse(tree, { indentation: indentation, labelling: labelling });

  var items = _traverse.items;
  var map = _traverse.map;

  if (item && !cmp.$$forcingUpdate$$) {
    var index = map.indexOf(item);
    if (index < 0) {
      (function () {
        var parent = map.find(function locate(o) {
          var found = o === item && o;
          if (!found) {
            found = o.value && Object.values(o.value).find(locate);
          }
          if (found) {
            found.options = found.options || {};
            if (!found.options.expanded) {
              found.options.expanded = true;
              found.options.autoexpanded = true;
            }
          }
          return found;
        });
        if (parent) {
          parent.options = parent.options || {};
          if (!parent.options.expanded) {
            parent.options.expanded = true;
            parent.options.autoexpanded = true;
          }
        }

        map.filter(function (p) {
          return p !== parent;
        }).forEach(function reset(o) {
          if (o.options && o.options.expanded && o.options.autoexpanded) {
            delete o.options.autoexpanded;
            o.options.expanded = false;
            if (o.value) Object.values(o.value).forEach(reset);
          }
        });

        var retrav = traverse(tree, { indentation: indentation, labelling: labelling });
        map = retrav.map;
        items = retrav.items;
        if (item.data && item.data.path) {
          index = map.findIndex(function (o) {
            if (!o.data) return;
            return o.data.path === item.data.path;
          });
        }
      })();
    }

    if (index > -1) {
      selected = index;
    }
  }

  if (cmp.$$forcingUpdate$$) {
    selected = cmp.$$index$$;
  }

  return _react2.default.createElement('list', _extends({}, props, {
    keys: true,
    mouse: true,
    scrollbar: true,
    inputOnFocused: true,
    items: items,
    selected: selected,
    onSelectItem: selectOverride ? onSelectItem : noop,
    onSelect: selectOverride ? onSelect : function (c, index) {
      var _map$index = map[index];
      var _map$index$options = _map$index.options;
      var options = _map$index$options === undefined ? {} : _map$index$options;
      var value = _map$index.value;

      if (!map[index].options) map[index].options = options;

      if (Object(value) !== value || options.terminate) {
        onSelect(map[index], items[index], index);
        onSelectItem(map[index], items[index], index, c);
        cmp.$$index$$ = index;
        cmp.$$forcingUpdate$$ = true;
        cmp.forceUpdate();
        cmp.$$forcingUpdate$$ = false;
        return;
      }

      options.expanded = !options.expanded;
      if (options.expanded) onExpand(map[index], items[index], index, c);
      if (!options.expanded) onContract(map[index], items[index], index, c);

      cmp.$$index$$ = index;
      cmp.$$forcingUpdate$$ = true;
      cmp.forceUpdate();
      cmp.$$forcingUpdate$$ = false;
    }
  }));
};

exports.default = (0, _reactFunctional2.default)(Tree);

function pad() {
  var depth = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var indentation = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

  return Array.apply(0, Array((depth + 1) * indentation)).join(' ');
}

function traverse(obj, cfg) {
  var depth = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

  if (Array.isArray(obj)) return { items: obj, map: obj };
  var map = [];
  var _cfg$indentation = cfg.indentation;
  var indentation = _cfg$indentation === undefined ? 2 : _cfg$indentation;
  var _cfg$labelling = cfg.labelling;
  var labelling = _cfg$labelling === undefined ? false : _cfg$labelling;

  var items = Object.keys(obj).reduce(function (items, key) {
    var _obj$key = obj[key];
    var label = _obj$key.label;
    var value = _obj$key.value;
    var _obj$key$options = _obj$key.options;
    var options = _obj$key$options === undefined ? {} : _obj$key$options;
    var expanded = options.expanded;
    var terminate = options.terminate;
    var _options$prefix = options.prefix;
    var itemPrefix = _options$prefix === undefined ? '' : _options$prefix;

    if ('labelling' in options) {
      labelling = options.labelling;
    }

    var valueIsObject = Object(value) === value;
    var prefix = valueIsObject && !terminate ? expanded ? '▾ ' : '▸ ' : depth ? '' : '  ';

    var item = pad(depth, indentation) + itemPrefix + (terminate ? ' ' : '') + prefix + key + (labelling ? ': ' + (label || value) : '');

    items.push(item);
    map.push(obj[key]);

    if (expanded && valueIsObject) {
      var _traverse2 = traverse(value, cfg, depth + 1);

      var subItems = _traverse2.items;
      var subMap = _traverse2.map;

      items.push.apply(items, _toConsumableArray(subItems));
      map.push.apply(map, _toConsumableArray(subMap));
    }

    return items;
  }, []);

  return { items: items, map: map };
}
//# sourceMappingURL=index.js.map