import { useState, useEffect } from 'react';

function useImageLoader(imageUrl:string) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadImage = () => {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        setImage(img);
        setLoading(false);
      };

      img.onerror = (event) => {
        const errorEvent = event as ErrorEvent;
        setError(new Error(`Failed to load image: ${errorEvent.message}`));
        setLoading(false);
      };
    };

    if (imageUrl) {
      loadImage();
    }

    return () => {
      // Cleanup if the component unmounts
      if (image) {
        image.onload = null;
        image.onerror = null;
      }
    };
  }, [imageUrl, image]);

  return { image, loading, error };
}

export default useImageLoader;
