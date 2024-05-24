const getValidProfileUrl = (url: string) =>
    url[0] === "/" ? import.meta.env.VITE_STORAGE_HOSTNAME + url : url;

export default getValidProfileUrl;
