import axios from 'axios';

export const FETCH_FLIGHTS = 'fetch_flights';

export const fetchFlights = source => async dispatch => {
  let url = "https://api.spacexdata.com/v3/launches?limit=100";

  if (source && source.launch_year) {
    url += '&launch_year=' + source.launch_year
  }

  const res = await axios.get(url);

  dispatch({
    type: FETCH_FLIGHTS,
    payload: res.data
  });
};
