export interface EstimateRideApiResponse {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
      rating: number;
      comment: string;
    };
    value: number;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routeResponse: any;
}

export interface ConfirmRideApiResponse {
  success: boolean;
}

export interface RideApiResponse {
  customer_id: string;
  rides: Ride[];
}

interface Ride {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: Driver;
  value: number;
}

interface Driver {
  id: number;
  name: string;
}

export type ConfirmRideFormData = {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
};

export type EstimateRideFormData = {
  customer_id: string;
  origin: string;
  destination: string;
};
