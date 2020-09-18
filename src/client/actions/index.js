import axios from 'axios';

export const FETCH_FLIGHTS = 'fetch_flights';

export const fetchFlights = source => async dispatch => {
  let url = "https://api.spacexdata.com/v3/launches?limit=100";

  if (source && source.launch_year) {
    url += '&launch_year=' + source.launch_year
  }

  if (source && source.launch_success) {
    url += '&launch_success=' + source.launch_success
  }
  
  const res = await axios.get(url);

  dispatch({
    type: FETCH_FLIGHTS,
    payload: res.data
  });
};
