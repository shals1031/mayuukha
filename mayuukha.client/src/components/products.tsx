import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { format } from 'react-string-format'
import configData from '../config.json'

interface ImageData {
    name: string;
    uri: string;
}

interface ProductsProps {
    containername: string;
    foldername: string;
}

function Products({ containername, foldername }: ProductsProps) {
    const [images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                const apiurl = format("{0}/api/BlobStorage/containerName/folderName?containerName={1}&folderName={2}/", configData.API_BASE_URL, containername, foldername);
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
        return <div className="loading-container">
            <img src="./assets/images/loading-new.gif" className="img-fluid" />
        </div>;
    }

    return <>
        {
            foldername === "" ? (<div></div >) : (
                <div className="heading-area">
                    <h1 className="heading-title">{foldername?.replace(/-/g, " ")}</h1>
                </div >
            )

        }

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
    </>

};

export default Products;
