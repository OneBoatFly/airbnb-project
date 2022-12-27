import React, { useState, useEffect }  from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';
import { Spots, SpotDetails, OwnerSpots } from './components/Spots';
import UserReviews from './components/Reviews/UserReviews';
import PageNotFound from './components/PageNotFound';
import Trips from './components/Trips/Trips';
// import useSearchFetch from './components/Navigation/useSearchFetch';
import MapContainer from './components/Maps/MapContainer';
import { getKey } from './store/maps';

function App() {
  const prevLoaded = window.localStorage.getItem('isLoaded');
  const [isLoaded, setIsLoaded] = useState(prevLoaded);
  const [query, setQuery] = useState({});
  const [center, setCenter] = useState({
    lat: 47.6040349,
    lng: -122.3007308,
  })
  const [userCenter, setUserCenter] = useState({});
  const key = useSelector((state) => state.maps.key);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(sessionActions.userLocation())
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });

  }, [dispatch]);

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  const successGeo = (position) => {
    // console.log('success')
    // console.log({ lat: position.coords.latitude, lng: position.coords.longitude })
    setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
    setUserCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
  }

  const errorGeo = (error) => {
    console.log(error);
  };

  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successGeo, errorGeo, options)
  }, [])

  // console.log('center', center, userCenter)

  return (
    <div className='root-wrapper'>
      <div className='root-sub-wrapper-navigation'>
        <Navigation setQuery={setQuery} query={query} isLoaded={isLoaded} setIsLoaded={setIsLoaded} setCenter={setCenter} center={center} userCenter={userCenter} />
      </div>
      <Switch>
        <Route exact path='/'>
          <div className='root-sub-wrapper'>
            <div className='map-allSpots-wrapper'>
              <Spots setQuery={setQuery} query={query} ></Spots>
              <MapContainer setQuery={setQuery} setCenter={setCenter} center={center} />
            </div>
          </div>
        </Route>
        {isLoaded &&
          <Route exact path='/spots/current'>
            <div className='root-sub-wrapper'>
              <OwnerSpots isLoaded={isLoaded} />
            </div>
          </Route>
        }
        {isLoaded &&
          <Route exact path='/reviews/current'>
            <div className='root-sub-wrapper'>
              <UserReviews isLoaded={isLoaded} />
              {/* <UserReviews isLoaded={isLoaded} setPage={setPage}/> */}
            </div>
          </Route>
        }
        {isLoaded &&
          <Route exact path='/trips'>
            <div className='root-sub-wrapper'>
              <Trips />
            </div>
          </Route>
        }
        {!isLoaded &&
          <Route exact path='/spots/current'>
            <Redirect to='/' />
          </Route>
        }
        {!isLoaded &&
          <Route exact path='/reviews/current'>
            <Redirect to='/' />
          </Route>
        }
        {!isLoaded &&
          <Route exact path='/trips'>
            <Redirect to='/' />
          </Route>
        }         
        <Route exact path='/spots/:spotId'>
          <div className='root-sub-wrapper'>
            <SpotDetails isLoaded={isLoaded} />
            {/* <SpotDetails isLoaded={isLoaded} setPage={setPage}></SpotDetails> */}
          </div>
        </Route>
        <Route>
          <div className='root-sub-wrapper'>
            <PageNotFound />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
