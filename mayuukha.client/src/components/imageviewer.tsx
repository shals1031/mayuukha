import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { format } from 'react-string-format'

interface ImageData {
    name: string;
    uri: string;
}

interface Props {
    containername: string;
    foldername: string;
}

function ImageViewer({ containername, foldername }: Props) {
    const [images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const apiurl = format("https://localhost:32769/api/BlobStorage/containerName/folderName?containerName={0}&folderName={1}/", containername, foldername);
                const response = await axios.get(apiurl, { responseType: "json", });

                // Assuming the response is containing Base64 or Blob data
                const blobImages = response.data as Array<{ name: string; uri: string; blobData: string }>;
                console.log(blobImages[0].blobData);

                const imageList = blobImages.map((image) => ({
                    name: image.name,
                    uri: URL.createObjectURL(new Blob([Uint8Array.from(atob(image.blobData), (c) => c.charCodeAt(0))]))
                }));

                setImages(imageList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching images: ", error);
                setLoading(false);
            }
        };

        fetchImages();
    }, [containername, foldername]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {images.map((image, index) => (
                <motion.div
                    key={image.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    style={{
                        width: "400px",
                        height: "500px",
                        overflow: "hidden",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <img
                        src={image.uri}
                        alt={`Image ${index + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default ImageViewer;
