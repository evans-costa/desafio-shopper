export function metersToKm(distance: string): string {
  const getDistance = distance.split(" ");

  if (getDistance.includes("m")) {
    return (+getDistance[0] / 1000).toFixed(1);
  }

  return getDistance[0];
}
