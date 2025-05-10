using Azure.Identity;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Mayuukha.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Mayuukha.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlobStorageController : ControllerBase
    {
        private readonly BlobServiceClient blobServiceClient;
        private readonly ILogger logger;

        public BlobStorageController(IConfiguration configuration, ILogger<BlobStorageController> logger)
        {
            this.logger = logger;
            var connectionString = configuration.GetValue<string>("BlobStorageConnectionString");
            blobServiceClient = new BlobServiceClient(connectionString);


        }

        /// <summary>
        /// Get all images content in Base64 encoded string for a particular container and folder name
        /// </summary>
        /// <param name="containerName"></param>
        /// <param name="folderName"></param>
        /// <returns></returns>
        [HttpGet("containerName/folderName")]
        public async Task<List<ImageDetails>> GetAllImagesByContainerAndFolderName(string containerName, string folderName)
        {
            try
            {
                var files = new List<ImageDetails>();
                var containerClient = blobServiceClient.GetBlobContainerClient(containerName);

                // List all blobs in the container
                await foreach (BlobHierarchyItem blobHierarchyItem in containerClient.GetBlobsByHierarchyAsync(prefix: folderName, delimiter: "/"))
                {
                    if (blobHierarchyItem != null && blobHierarchyItem.IsPrefix)
                    {
                        // Call recursively with the prefix to traverse the virtual directory.
                        await GetAllImagesByContainerAndFolderName(containerName, blobHierarchyItem.Prefix);
                    }
                    else
                    {
                        BlobClient blobClient = containerClient.GetBlobClient(blobHierarchyItem?.Blob.Name);
                        files.Add(new ImageDetails
                        {
                            Name = blobClient.Name,
                            Uri = blobClient.Uri,
                            BlobData = await DownloadBlobImage(blobClient),
                            Metadata = ((BlobProperties)blobClient.GetProperties()).Metadata

                        });
                    }
                }
                return files;

            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw;
            }

        }

        /// <summary>
        /// Get method to sent image as a file to the react component to diplay it in a Base64 encoded string
        /// </summary>
        /// <param name="containerName"></param>
        /// <param name="blobName"></param>
        /// <returns></returns>
        [HttpGet("containerName/blobName")]
        public async Task<ImageDetails> GetImageByName(string containerName, string blobName)
        {
            try
            {
                var containerClient = blobServiceClient.GetBlobContainerClient(containerName);
                BlobClient blobClient = containerClient.GetBlobClient(blobName);
                BlobProperties properties = await blobClient.GetPropertiesAsync();
                //properties.Metadata.


                foreach (var metadataItem in properties.Metadata)
                {
                    Console.WriteLine($"\tKey: {metadataItem.Key}");
                    Console.WriteLine($"\tValue: {metadataItem.Value}");
                }
                return new ImageDetails
                {
                    Name = blobClient.Name,
                    Uri = blobClient.Uri,
                    BlobData = await DownloadBlobImage(blobClient),
                    //Metadata = properties.Value.Metadata // Add this line
                };


            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw;
            }

        }


        #region Private Methods

        private async Task<string> DownloadBlobImage(BlobClient blobClient)
        {
            var a = blobClient.Uri;

            // Download the image to a MemoryStream and then convert to Base64 encoded string
            using (var memoryStream = new MemoryStream())
            {
                if (blobClient != null)
                    await blobClient.DownloadToAsync(memoryStream);
                return Convert.ToBase64String(memoryStream.ToArray());
            }
        }

        #endregion

    }
}
