import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types'; // ES6
import { fetchFlights } from '../actions';

/* Filters */
import Filters from '../components/Filters';

const HomePage = props => {

  const renderFlights = () => {
    return props.flights.map(flight => (
        <li key={flight.flight_number}>
          <div className="media">
            <article className="program">
              <div className="program__image">
                <img src={flight.links.mission_patch_small} alt={flight.mission_name}/>
              </div>
              <div className="program__info">
                <h4 className="program__info--mission">
                  {flight.mission_name}#{flight.flight_number}
                </h4>
                <div className="program__info--mission-ids">
                  <span>Mission Ids: </span>{flight.mission_id}
                </div>
                <div className="program__info--launch-year">
                  <span>Launch Year: </span>{flight.launch_year}
                </div>
                <div className="program__info--sucessful_launch">
                  <span>Successful Launch: </span>{flight.launch_success ? 'true' : 'false'}
                </div>
              </div>
            </article>
          </div>
        </li>
    ));
  };

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>SpaceX Launch Programs</title>
        <meta property="og:title" content="Spacex - Flights" />
        <meta
          name="description"
          content="SpaceX Launch Programs"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="#" />
      </Helmet>
    );
  };

  const { fetchFlights: loadFlights } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    loadFlights();
  }, [loadFlights]);

  return (
    <>
      {head()}
      <Container fluid className="p-0 m-0">
          <Row className="m-0">
            <Col md={2} xs={12}>
                <aside>
                  <Filters />
                </aside>
            </Col>
            <Col md={10} xs={12} className="p-0">
              <main>
              <div className="row">
                <ul className="row program-list p-0 m-0">
                  {renderFlights()}
                </ul>
              </div>
              </main>
            </Col>
          </Row>
      </Container>
    </>
  );
};

const mapStateToProps = state => {
  return {
    flights: state.flights
  };
};

const loadData = store => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(fetchFlights()); // Manually dispatch a network request
};

HomePage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.any),
  fetchFlights: PropTypes.func
};

HomePage.defaultProps = {
  flights: [],
  filters: {},
  fetchFlights: null
};

export default {
  component: connect(
    mapStateToProps,
    { fetchFlights }
  )(HomePage),
  loadData
};
