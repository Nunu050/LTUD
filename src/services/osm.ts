export async function searchNearbyRestaurants(
  latitude: number,
  longitude: number,
  keyword: string
) {
  try {
    const radius = 3000;

    const query = `
      [out:json];
      (
        node
          ["amenity"~"restaurant|fast_food|cafe"]
          (around:${radius},${latitude},${longitude});

        way
          ["amenity"~"restaurant|fast_food|cafe"]
          (around:${radius},${latitude},${longitude});
      );
      out center;
    `;

    const response =
      await fetch(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",

          body: query,
        }
      );

    const data =
      await response.json();

    return data.elements;
  } catch (error) {
    console.log(error);

    return [];
  }
}