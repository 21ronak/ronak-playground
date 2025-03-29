export const getDogs = async (length = 10) => {
  try {
    const response = await fetch(
      "https://img.cdn4dd.com/s/managed/interview/tps-dogs/api.json"
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    const dogs = [];
    data.data.children.forEach((c) => {
      const title = c.data.title;
      const url = c.data.preview?.images[0]?.resolutions[2]?.url;
      if (url) {
        dogs.push({ title, url: url.replaceAll("&amp;", "&") });
      }
    });

    return dogs.slice(0, length);
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
    return []; // return empty array on error
  }
};
