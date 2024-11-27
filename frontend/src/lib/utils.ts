import { EstimateRideApiResponse } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fetchStaticMapUrl(
  data: EstimateRideApiResponse | null,
): string | null {
  const apiKey = process.env.GOOGLE_API_KEY as string;

  if (!data) return null;

  const polyline = data.routeResponse.routes[0].overview_polyline.points;
  const mapBaseURL = "https://maps.googleapis.com/maps/api/staticmap";

  const params: Record<string, string> = {
    size: "600x400",
    path: `enc:${polyline}`,
    markers: `color:red|${data.origin.latitude},${data.origin.longitude}|${data.destination.latitude},${data.destination.longitude}`,
    key: apiKey,
  };

  return `${mapBaseURL}?${new URLSearchParams(params).toString()}`;
}
