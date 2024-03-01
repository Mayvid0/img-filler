# img-filler

img-filler is a lightweight npm package that simplifies the process of obtaining image URLs based on a provided prompt or tag. Instead of manually searching and scraping images from different sources, img-filler provides a convenient way to fetch related image URLs that can be used in your components or applications.

## Installation

You can install img-filler via npm or yarn:

```bash
npm install img-filler
```

OR

```bash
yarn add img-filler
```

### Usage

To use img-filler, import the imgPlaceholder function from the package and call it with the desired prompt or tag. The function will return a URL for a related image.

```javascript
import { imgPlaceholder } from 'img-filler';

const imageUrl = imgPlaceholder('nature');
console.log(imageUrl); // Output: URL for a nature-related image
```

OR 

```js
<ImageComponent tag={"whatever tag or prompt"} />
```

## Example

```js
import React,{useState} from 'react';
import { useEffect } from 'react';
import  {imagePlaceholder}  from 'img-filler';

const ImageComponent = ({ tag }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        // Fetch the image URL asynchronously
        const fetchImageUrl = async () => {
            try {
                // Call imagePlaceholder(tag) 
                const url = await imagePlaceholder(tag);
                // Set the obtained image URL in state
                setImageUrl(url);
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };

        fetchImageUrl(); // Call fetchImageUrl when the component mounts
    }, []);

     return (
        <div>
            {/* Conditional rendering based on imageUrl */}
            {imageUrl ? (
                <img src={imageUrl} alt={tag} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ImageComponent;
```


