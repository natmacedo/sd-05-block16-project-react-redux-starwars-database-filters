import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchStarWars from '../actions/index';
import './Table.css';

class Table extends React.Component {
  componentDidMount() {
    const { startFetching } = this.props;
    startFetching();
  }

  manyFilter() {
    const { data, filterParameter, filterNumeric } = this.props;
    let array = data;
    if (filterParameter !== '') {
      array = data.filter((item) => item.name.includes(filterParameter));
    }
    if (filterNumeric.length > 0 && array.length > 1) {
      filterNumeric.forEach(({ column, comparison, value }) => {
        switch (comparison) {
          case ('maior que'):
            //  array.forEach((arrayItem) => console.log(typeof(arrayItem[column])));
            array = array.filter((arrayItem) => parseInt(arrayItem[column], 10) > value);
            break;
          case ('menor que'):
            array = array.filter((arrayItem) => parseInt(arrayItem[column], 10) < value);
            break;
          case ('igual a'):
            array = array.filter((arrayItem) => arrayItem[column] === value);
            break;
          default:
            break;
        }
      });
    }
    return array;
  }
  renderTableData() {
    const array = this.manyFilter();

    return (array.map((item) => (
      <tr key={item.name}>
        <td>{item.name}</td>
        <td>{item.rotation_period}</td>
        <td>{item.orbital_period}</td>
        <td>{item.diameter}</td>
        <td>{item.climate}</td>
        <td>{item.gravity}</td>
        <td>{item.terrain}</td>
        <td>{item.surface_water}</td>
        <td>{item.population}</td>
        <td>{item.residents}</td>
        <td>{item.films}</td>
        <td>{item.created}</td>
        <td>{item.edited}</td>
      </tr>))
    );
  }

  render() {
    const { data, isFetching } = this.props;
    if (!isFetching && data.length > 1) {
      const header = Object.keys(data[0]);
      header.pop();
      return (
        <table className="tabela">
          <thead>
            <tr>{header.map((item) => <th key={item}>{item}</th>)}</tr>
          </thead>
          <tbody>
            { this.renderTableData() }
          </tbody>
        </table>
      );
    }
    return <div>loading...</div>;
  }
}

const mapStateToProps = (state) => ({
  data: state.reducer.data,
  isFetching: state.reducer.isFetching,
  filterParameter: state.filters.filterByName.name,
  filterNumeric: state.filters.filterByNumericValues,
});

const mapDispatchToProps = (dispatch) => ({ startFetching: () => dispatch(fetchStarWars()) });

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired, //  ref1: An array of an object type
  isFetching: PropTypes.bool.isRequired,
  startFetching: PropTypes.func.isRequired,
  filterParameter: PropTypes.string.isRequired,
  filterNumeric: PropTypes.arrayOf(PropTypes.object).isRequired,
};

//  ref1: https://app.slack.com/client/TMDDFEPFU/C013105FU2C/thread/C013105FU2C-1597370726.050700
//  thead em: https://www.w3schools.com/tags/tag_thead.asp
//  https://medium.com/@ricardoreis_22930/operadores-de-compara%C3%A7%C3%A3o-comparison-operators-d2bc3ed734a3
