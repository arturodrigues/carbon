import React from 'react';
import classNames from 'classnames';
import TableCell from './../table-cell';
import TableHeader from './../table-header';
import Checkbox from './../../checkbox';
import guid from './../../../utils/helpers/guid';

/**
 * A TableRow widget.
 *
 * == How to use a TableRow in a component:
 *
 * See documentation for Table component.
 *
 * If you add an onClick event to a Table Row, will display the cursor as a pointer
 * when hovering over the row.
 *
 * @class TableRow
 * @constructor
 */
class TableRow extends React.Component {

  static propTypes = {
    /**
     * Enables multi-selectable table rows.
     *
     * @property selectable
     * @type {Boolean}
     */
    selectable: (props) => {
      if (props.selectable && !props.uniqueID) {
        throw new Error("A selectable TableRow must provide a uniqueID prop to track itself within the Table.");
      }
    },

    /**
     * Enables highlightable table rows.
     *
     * @property highlightable
     * @type {Boolean}
     */
    highlightable: (props) => {
      if (props.highlightable && !props.uniqueID) {
        throw new Error("A highlightable TableRow must provide a uniqueID prop to track itself within the Table.");
      }
    },

    /**
     * Allows developers to manually control selected state for the row.
     *
     * @property selected
     * @type {Boolean}
     */
    selected: React.PropTypes.bool,

    /**
     * Allows developers to manually control highlighted state for the row.
     *
     * @property highlighted
     * @type {Boolean}
     */
    highlighted: React.PropTypes.bool,

    /**
     * Define a unique ID so the table can track the row (useful for highlightable or selectable rows).
     *
     * @property uniqueID
     * @type {String}
     */
    uniqueID: React.PropTypes.string
  }

  /**
   * Sort handler passed from table context
   *
   * @property onSort
   * @type {Function}
   */
  static contextTypes = {
    attachToTable: React.PropTypes.func, // attach the row to the table
    detachFromTable: React.PropTypes.func, // detach the row from the table
    checkSelection: React.PropTypes.func, // a function to check if the row is currently selected
    highlightRow: React.PropTypes.func, // highlights the row
    selectAll: React.PropTypes.func, // a callback function for when all visible rows are selected
    highlightable: React.PropTypes.bool, // table can enable all rows to be highlightable
    selectable: React.PropTypes.bool, // table can enable all rows to be multi-selectable
    selectRow: React.PropTypes.func // a callback function for when a row is selected
  }

  state = {
    /**
     * Internal state to track if the row is currently highlighted.
     *
     * @property highlighted
     * @type {Boolean}
     * @default false
     */
    highlighted: false,

    /**
     * Internal state to track if the row is currently selected.
     *
     * @property selected
     * @type {Boolean}
     * @default false
     */
    selected: false
  }

  /**
   * @method componentWillMount
   * @return {Void}
   */
  componentWillMount() {
    if ((this.context.highlightable || this.context.selectable) && !this.props.uniqueID) {
      // if table sets all rows to be selectable, we need a unique id to be set
      throw new Error("A selectable TableRow must provide a uniqueID prop to track itself within the Table.");
    }

    if (this.context.attachToTable && this.props.uniqueID) {
      // generate row id
      this.rowID = guid();
      // only attach to the table if we have a unique id
      this.context.attachToTable(this.rowID, this);
      // also check if row is already selected/highlighted
      this.context.checkSelection(this.props.uniqueID, this);
    }

    if (this.props.selected) {
      // if developer is controlling selected state - set it
      this.setState({ selected: true });
    }

    if (this.props.highlighted) {
      // if developer is controlling highlighted state - set it
      this.setState({ highlighted: true });
    }
  }

  /**
   * @method componentWillUnmount
   * @return {Void}
   */
  componentWillUnmount() {
    if (this.context.detachFromTable) {
      this.context.detachFromTable(this.rowID);
    }
  }

  /**
   * @method componentWillReceiveProps
   * @return {Void}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.uniqueID != nextProps.uniqueID) {
      // if unique id has changed, check if the table has the new id as selected or not
      this.context.checkSelection(nextProps.uniqueID, this);
    }

    if (this.props.selected != nextProps.selected) {
      // if developer is controlling selected state - set it
      this.setState({ selected: nextProps.selected });
    }

    if (this.props.highlighted != nextProps.highlighted) {
      // if developer is controlling highlighted state - set it
      this.setState({ highlighted: nextProps.highlighted });
    }
  }

  /**
   * Call the selectAll callback.
   *
   * @method onSelectAll
   * @return {Void}
   */
  onSelectAll = () => {
    this.context.selectAll(this);
  }

  /**
   * Call the selectRow callback and call any custom event the developer may have set.
   *
   * @method onRowClick
   * @return {Void}
   */
  onRowClick = (...args) => {
    // trigger onHighlight callback if defined
    if (this.props.onHighlight) { this.props.onHighlight(this, !this.state.highlighted); }
    // trigger highlightRow method on the table
    this.context.highlightRow(this.props.uniqueID, this);
    // trigger any custom onClick event the developer may have set
    if (this.props.onClick) { this.props.onClick(...args); }
  }

  /**
   * Call the selectRow callback.
   *
   * @method onMultiSelect
   * @return {Void}
   */
  onMultiSelect = () => {
    // trigger onSelect callback if defined
    if (this.props.onSelect) { this.props.onSelect(this, !this.state.selected); }
    // trigger selectRow method on the table
    this.context.selectRow(this.props.uniqueID, this, !this.state.selected);
  }

  /**
   * Classes to be applied to the table row component
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return classNames(
      'ui-table-row',
      this.props.className, {
        'ui-table-row--clickable': this.props.onClick || this.props.highlightable || this.context.highlightable,
        'ui-table-row--selected': this.state.selected || this.state.highlighted
      }
    );
  }

  /**
   * Sets additional props to the row.
   *
   * @method rowProps
   * @return {Object}
   */
  get rowProps() {
    let { ...props } = this.props;

    props.className = this.mainClasses;

    if (this.context.highlightable || this.props.highlightable) {
      props.onClick = this.onRowClick;
    }

    return props;
  }

  /**
   * Determines if the developer has flagged this row as a header.
   *
   * @method isHeader
   * @return {Boolean}
   */
  get isHeader() {
    return this.props.as === "header";
  }

  /**
   * Determines what kind of cell to render for the checkbox.
   *
   * @method multiSelectCell
   * @return {Object} JSX
   */
  get multiSelectCell() {
    // renders a TableHeader if row is flagged as a header.
    let cell = this.isHeader ? TableHeader : TableCell;

    return React.createElement(cell, {
      key: "select", className: "ui-table-cell--select"
    }, this.multiSelect);
  }

  /**
   * Returns the checkbox for the select action.
   *
   * @method multiSelect
   * @return {Object} JSX
   */
  get multiSelect() {
    if (this.props.hideMultiSelect) { return null; }

    // determines which action to use (multi-select or select-all)
    let action = this.props.selectAll ? this.onSelectAll : this.onMultiSelect;

    return <Checkbox onChange={ action } checked={ this.state.selected } />;
  }

  /**
   * Renders the component
   *
   * @method render
   */
  render() {
    let content = [this.props.children];

    if (this.props.selectAll || this.context.selectable || this.props.selectable) {
      // if multi-seletable, add the checkbox cell
      content.unshift(this.multiSelectCell);
    }

    return (
      <tr { ...this.rowProps }>
        { content }
      </tr>
    );
  }

}

export default TableRow;
