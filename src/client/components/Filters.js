import React, { useState } from 'react';
import { connect } from 'react-redux';
import { applyFilters, fetchFlights } from '../actions';

const Filters = props => {
    const years = [
        2006, 2007, 2008,
        2009, 2010, 2011,
        2012, 2013, 2014,
        2015, 2016, 2017,
        2018, 2019, 2020];
    let index = 0;

    const filterYear = (e, year) => {
        const successBtn = document.querySelectorAll('.launch-success .success button.active'),
            failureBtn = document.querySelectorAll('.launch-success .fail button.active');
        if (e.target.classList.contains('active')) {
            e.target.classList.remove("active");
            props.dispatch(fetchFlights({}));
        } else {
            for (var item of document.querySelectorAll('.year button')) {
                item.classList.remove('active');
            }
            e.target.classList.add("active");

            if (successBtn && successBtn.length) {
                props.dispatch(fetchFlights({
                    launch_year: year,
                    launch_success: true
                }));
            } else if (failureBtn && failureBtn.length) { 
                props.dispatch(fetchFlights({
                    launch_year: year,
                    launch_success: false
                }));
            } else {
                props.dispatch(fetchFlights({
                    launch_year: year
                }));
            }
        }
    };

    const filterLaunch = (e, isSuccess) => {
        const selectedYear = document.querySelector('.year button.active');

        if (e.target.classList.contains('active')) {
            e.target.classList.remove("active");

            if (selectedYear) {
                props.dispatch(fetchFlights({
                    launch_year: selectedYear.textContent
                }));
            } else {
                props.dispatch(fetchFlights({}));
            }
            
        } else {

            if (document.querySelector('.launch-success button.active')) {
                document.querySelector('.launch-success button.active').classList.remove('active');
            }
            e.target.classList.add("active");

            if (selectedYear) { 
                props.dispatch(fetchFlights({
                    launch_year: selectedYear.textContent,
                    launch_success: isSuccess
                }));
            } else {
                props.dispatch(fetchFlights({
                    launch_success: isSuccess
                }));
            }
        }
    };

    const renderYears = () => {
        return years.map(year => (
            <li key={index++} className="year">
                <button type="button" className="btn btn-primary" onClick={(e) =>filterYear(e, year)}>{year}</button>
            </li>
        ));
    };
    
    return (
        <section className="filters">
            <h3>Filter</h3>
            <div className="launch-years">
                <label className="launch-years__title">Launch Year</label>
                <ul className="launch-years__list">
                    {renderYears()}
                </ul>
            </div>
            <div className="launch-success">
                <label className="launch-success__title">Successful Launch</label>
                <ul className="launch-success__list">
                    <li key={1} className="success">
                        <button type="button" className="btn btn-primary" onClick={(e) =>filterLaunch(e, true)}>True</button>
                    </li>
                    <li key={2} className="fail">
                        <button type="button" className="btn btn-primary" onClick={(e) =>filterLaunch(e, false)}>False</button>
                    </li>
                </ul>
            </div>
        </section>
    );
};

const mapStateToProps = state => ({
    flights: state.flights
});

export default connect(mapStateToProps)(Filters);