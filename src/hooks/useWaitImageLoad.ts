import { useEffect, useState } from "react";

const useWaitImageLoad = (imgRef: React.RefObject<HTMLImageElement>) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        if (!imgRef.current) return;
        const updateStatus = (img: HTMLImageElement) => {
            const isLoaded = img.complete && img.naturalHeight !== 0;
            setIsImageLoaded(isLoaded);
        };

        imgRef.current.addEventListener(
            "load",
            () => updateStatus(imgRef.current as HTMLImageElement),
            { once: true }
        );
    }, [imgRef]);

    return isImageLoaded;
};

export default useWaitImageLoad;
