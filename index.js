/**
 *
 * @param {string|number} tag
 * @param {string|number} height
 * @param {string|number} width
 * @returns {string}
 */

const imagePlaceholderPixabay = async (
  tag = "nature",
  height = 100,
  width = 100
) => {
  try {
    const pixabayApiKey = Pix_Api_Key ;
    const response = await fetch(
      `https://pixabay.com/api/?key=${pixabayApiKey}&q=${tag}&image_type=photo&orientation=horizontal`
    );

    if (!response.ok) {
      console.error(`Error: ${response.statusText}`);
      return "https://images.unsplash.com/photo-1709040567086-ee176caa99f9?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }

    const data = await response.json();

    if (data.totalHits === 0) {
      console.error("No images found for the query:", tag);
      return "https://images.unsplash.com/photo-1709040567086-ee176caa99f9?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }

    const randomIndex = Math.floor(Math.random() * data.hits.length);
    const imageUrl = data.hits[randomIndex].largeImageURL;
    console.log(imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image from Pixabay:", error);
    return "https://images.unsplash.com/photo-1709040567086-ee176caa99f9?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }
};

export const imagePlaceholder = async (
  tag = "nature",
  height = "100",
  width = "100"
) => {
  if (
    typeof tag === "number" &&
    typeof height === "number" &&
    typeof width === "string" &&
    width === "100"
  ) {
    width = height.toString();
    height = tag.toString();
    tag = "nature";
  }
  const unsplashApiKey = Unsplash_Api_Key ;
  try {
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/photos/random?query=${tag}&client_id=${unsplashApiKey}&w=${width}&h=${height}`
    );

    if (!unsplashResponse.ok) {
      if (unsplashResponse.status === 403) {
        console.log("Rate limit exceeded, trying Pixabay...");
        return imagePlaceholderPixabay(tag, height, width);
      } else {
        console.error(`Error: ${unsplashResponse.statusText}`);
        return "https://images.unsplash.com/photo-1709040567086-ee176caa99f9?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      }
    }

    const data = await unsplashResponse.json();
    const imageUrl = data.urls.raw;
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return "https://images.unsplash.com/photo-1709040567086-ee176caa99f9?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }
};
