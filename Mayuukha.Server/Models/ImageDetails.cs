using Microsoft.AspNetCore.Mvc;

namespace Mayuukha.Server.Models
{
    public class ImageDetails
    {
        public string? Name { get; set; }
        public Uri? Uri { get; set; }
        public string? BlobData { get; set; }
        public IDictionary<string, string>? Metadata { get; set; }
    }
}
