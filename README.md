# Gallery Application

A simple web-based gallery application built with Nginx, Docker, and a JSON database.

## Features

- Responsive image gallery
- Category-based organization
- Image details view
- Easy to add new images
- Docker containerization

## Project Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── main.html
├── detail.html
├── api.js
├── database.json
└── images/
    ├── beach/
    ├── mountain/
    ├── forest/
    ├── desert/
    ├── city/
    └── ...other categories
```

## Prerequisites

- Docker
- Docker Compose

## Installation

1. Clone the repository
2. Place your images in the appropriate subdirectories under the `images` folder
3. Update `database.json` with your image information (see "Adding New Images" section)
4. Build and start the containers:

```bash
docker-compose up -d --build
```

## Accessing the Application

The application will be available at:
- `http://localhost` or
- `http://localhost:80`

## Adding New Categories

To add a new category to the gallery:

1. Create a new directory under the `images` folder for your category:
```bash
mkdir images/your-new-category
```

2. Add your images to the new category directory

3. Update `database.json` by adding a new entry in the "images" array with your new category:
```json
{
  "id": <next_available_id>,
  "title": "Your Category Title",
  "category": "Your New Category",
  "images": [
    {
      "id": "image1",
      "url": "images/your-new-category/image1.jpg"
    },
    {
      "id": "image2",
      "url": "images/your-new-category/image2.jpg"
    }
  ]
}
```

4. Rebuild the container to include the new category:
```bash
docker-compose down
docker-compose up -d --build
```

Note: The category name will automatically appear in the gallery's category filter once images are added to it.

## Adding New Images

1. Place your images in the appropriate subdirectory under the `images` folder
2. Update `database.json` by adding a new entry in the "images" array:

```json
{
  "id": <next_available_id>,
  "title": "Your Title",
  "category": "Category Name",
  "images": [
    {
      "id": "uniqueid1",
      "url": "images/your-folder/your-image1.jpg"
    },
    {
      "id": "uniqueid2",
      "url": "images/your-folder/your-image2.jpg"
    }
  ]
}
```

3. Rebuild the container to include new images:

```bash
docker-compose down
docker-compose up -d --build
```

## Configuration

### Nginx Configuration

The application uses a custom Nginx configuration (`nginx.conf`) that:
- Serves static files
- Handles image directory listing
- Configures proper MIME types
- Sets up error pages

### Docker Configuration

The application is containerized using:
- Nginx Alpine as the base image
- Volume mounting for images
- Port mapping (80:80)
- Automatic restart policy

## Maintenance

### Updating Images

1. Replace or add new images in the `images` directory
2. Update `database.json` if needed
3. Rebuild the container

### Logs

View container logs:
```bash
docker logs test-gallery-app-1
```

### Stopping the Application

```bash
docker-compose down
```

## Troubleshooting

1. If images don't appear:
   - Check image paths in `database.json`
   - Verify file permissions
   - Check Nginx logs

2. If the application doesn't start:
   - Check Docker logs
   - Verify port 80 is available
   - Ensure all required files are present

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The MIT License is a permissive free software license originating at the Massachusetts Institute of Technology. It is a simple license that permits reuse within proprietary software provided all copies of the licensed software include a copy of the MIT License terms and the copyright notice.

## Author

febriandwm 