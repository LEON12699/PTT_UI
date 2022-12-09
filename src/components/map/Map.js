/* eslint-disable consistent-return */
import { useState, useEffect, useRef, Children, isValidElement, cloneElement }from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { createCustomEqual } from 'fast-equals';
import PropTypes from 'prop-types';
import EnvManager from '../../config/envManager';
import { Marker } from '.';

Map.propTypes = {
  onClick: PropTypes.func,
  onIdle: PropTypes.func,
  children: PropTypes.any,
  style: PropTypes.object,
  center: PropTypes.object,
  zoom: PropTypes.number
};

export function Map({ onClick, onIdle, children, style, ...options }) {
  // [START maps_react_map_component_add_map_hooks]
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref?.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, map]);

  // [END maps_react_map_component_add_map_hooks]
  // [START maps_react_map_component_options_hook]
  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      console.log(options)
      map.setOptions(options);
    }
  }, [map, options]);
  // [END maps_react_map_component_options_hook]
  // [START maps_react_map_component_event_hooks]
  useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) => window.google.maps.event.clearListeners(map, eventName)
      );
      if (onClick) {
        map.addListener('click', onClick);
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);
  // [END maps_react_map_component_event_hooks]
  // [START maps_react_map_component_return]
  return (
    <>
      <div ref={ref} style={style} id='map'/>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return cloneElement(child, { map });
        }
      })}
    </>
  );
  // [END maps_react_map_component_return]
}




const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (a instanceof window.google.maps.LatLng || b instanceof window.google.maps.LatLng) {
    return new window.google.maps.LatLng(a).equals(new window.google.maps.LatLng(b));
  }
  // use fast-equals for other objects
  return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export function WrapperMap() {
  const [clicks, setClicks] = useState([]);
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const onClick = (e) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng]);
    console.log(e.latLng.lat())
  };

  const onIdle = (m) => {
    console.log('onIdle');
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  const render = (status) => <h1>{status}</h1>;

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Wrapper apiKey={EnvManager.GOOGLE_MAP_KEY} render={render}>
        <Map center={center} onClick={onClick} onIdle={onIdle} zoom={zoom} style={{ flexGrow: '1', height: '1000px' }}>
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}
    </div>
  );
}



