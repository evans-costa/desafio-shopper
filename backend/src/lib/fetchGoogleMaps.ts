export async function fetchDirections(
  origin: string,
  destination: string,
): Promise<google.maps.DirectionsResult> {
  try {
    // const originUri = encodeURIComponent(origin);
    // const destinationUri = encodeURIComponent(destination);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?destination=${destination}&origin=${origin}&key=${process.env.GOOGLE_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Error while fetching data.");
    }

    const data = (await response.json()) as google.maps.DirectionsResult;

    return data;
  } catch (error) {
    console.error("Error fetching directions", error);
    throw error;
  }
}
