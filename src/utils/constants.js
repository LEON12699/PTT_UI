export const DEFAULT_ROLE = 'User';
export const ROLES = [ 'Admin', DEFAULT_ROLE];
export const CANTON_OPTIONS = [
  {
    label: 'Zapotillo',
    center: {
      lat:-4.385030,
      lng:-80.243336
    },
    zoom: 15,
    restriction: {
      latLngBounds: {
        west: -80.50941113427736,
        north: -4.317044754159363,
        south: -4.491622226642181,
        east: -80.19492749169923
      },
      strictBounds: true
    }
  },
  {
    label: 'Celica',
    center: {
      lat:-4.103351,
      lng:-79.955608
    },
    zoom: 5,
    restriction: {
      latLngBounds: {
        west: -79.968173,
        north: -4.093726,
        south:  -4.125728,
        east: -79.926802
      },
      strictBounds: true
    }
  },
  {
    label: 'Paltas',
    center: {
      lat: -4.042087, 
      lng: -79.723544
    },
    zoom: 13
  },
  {
    label: 'Puyango',
    center: {
      lat: -4.0138,
      lng: -80.0164
    },
    zoom: 15
  },
  {
    label: 'Macará',
    center: {
      lat: -4.3818,
      lng: -79.9437
    },
    zoom: 15

  },
  {
    label: 'Pindal',
    center: {
      lat: -4.1164,
      lng: -80.108
    },
    zoom: 15
  }
]

export const CANTON_LABELS = CANTON_OPTIONS.map((c) => c.label);
