import { getDistance } from "geolib";

export interface DistanceResult {
  distMeters: number;
  distanceStr: string;
  timeStr: string;
}

/**
 * Calculates a realistic city driving distance and travel time (ETA) between two coordinates.
 * Scales the straight-line (Haversine) distance to account for winding city street routing,
 * and uses average local motorcycle/car speeds to estimate travel time.
 */
export function calculateDistanceAndETA(
  userLat: number,
  userLng: number,
  destLat: number,
  destLng: number
): DistanceResult {
  const distMeters = getDistance(
    { latitude: userLat, longitude: userLng },
    { latitude: destLat, longitude: destLng }
  );

  // In a real city, actual driving route distance is around 1.3 to 1.5x the straight line (Haversine) distance.
  const realRouteMeters = distMeters * 1.4;

  let distanceStr = "";
  let timeStr = "";

  if (distMeters < 80) {
    distanceStr = "Rất gần (< 100m)";
    timeStr = "1 phút đi bộ";
  } else {
    // Format distance display nicely
    distanceStr =
      realRouteMeters > 1000
        ? `${(realRouteMeters / 1000).toFixed(1)}km`
        : `${Math.round(realRouteMeters)}m`;

    // Dynamic speed model:
    // Under 500m: slower travel speed (15 km/h, i.e. 250m/min) due to local turns, pedestrian navigation, parking.
    // 500m to 2km: standard city riding speed (24 km/h, i.e. 400m/min) accounting for traffic lights.
    // 2km to 8km: arterial boulevard speed (36 km/h, i.e. 600m/min).
    // Above 8km: suburban speed (48 km/h, i.e. 800m/min).
    let speedMetersPerMin = 400;
    if (realRouteMeters <= 500) {
      speedMetersPerMin = 250;
    } else if (realRouteMeters > 500 && realRouteMeters <= 2000) {
      speedMetersPerMin = 400;
    } else if (realRouteMeters > 2000 && realRouteMeters <= 8000) {
      speedMetersPerMin = 600;
    } else {
      speedMetersPerMin = 800;
    }

    const timeMins = Math.max(1, Math.ceil(realRouteMeters / speedMetersPerMin));
    timeStr = `${timeMins} phút`;
  }

  return {
    distMeters: realRouteMeters,
    distanceStr,
    timeStr,
  };
}
