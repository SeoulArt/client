const convertUrlToFile = async (url: string) => {
    try {
        const response = await fetch(url, { mode: "no-cors" });
        const data = await response.blob();
        const filename = url.split("/").pop();
        const metadata = { type: `image/` };
        return new File([data], filename!, metadata);
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default convertUrlToFile;
