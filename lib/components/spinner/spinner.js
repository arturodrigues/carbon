'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Spinner widget.
 *
 * == How to use a Spinner in a component:
 *
 * In your file
 *
 *   import Spinner from 'carbon/lib/components/spinner';
 *
 * To render the Spinner:
 *
 *   <Spinner />
 *
 * You can pass a 'size' property to adjust the size of the spinner
 *    The default is medium
 *    options: extra-small, small, medium-small, medium, medium-large, large and extra-large
 *
 * For additional properties specific to this component, see propTypes.
 *
 * @class Spinner
 * @constructor
 */
var Spinner = function (_React$Component) {
  _inherits(Spinner, _React$Component);

  function Spinner() {
    _classCallCheck(this, Spinner);

    return _possibleConstructorReturn(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).apply(this, arguments));
  }

  _createClass(Spinner, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react2.default.createElement('div', _extends({ className: this.spinnerClasses }, (0, _tags2.default)('spinner', this.props)));
    }
  }, {
    key: 'spinnerClasses',


    /**
     * Returns classes for the spinner.
     *
     * @method spinnerClasses
     * @return {String} spinner className
     */
    get: function get() {
      return (0, _classnames2.default)('carbon-spinner', 'carbon-spinner--' + this.props.as, 'carbon-spinner--' + this.props.size, this.props.className);
    }
  }]);

  return Spinner;
}(_react2.default.Component);

Spinner.propTypes = {
  /**
   * Sets the theme for the component.
   * (see the 'utils/colors/$colorIconSets' for possible values)
   *
   * @property as
   * @type {String}
   * @default info
   */
  as: _propTypes2.default.string,

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * Size of the spinner
   * Options: extra-small, small, medium-small, medium, medium-large, large and extra-large
   *
   * @property size
   * @type {String}
   */
  size: _propTypes2.default.string
};
Spinner.defaultProps = {
  as: 'info',
  className: '',
  size: 'medium'
};
exports.default = Spinner;