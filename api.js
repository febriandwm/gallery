// API Service for handling image database operations
class ImageAPI {
  constructor() {
    this.db = null;
    this.loadDatabase();
  }

  async loadDatabase() {
    try {
      const response = await fetch('database.json');
      this.db = await response.json();
    } catch (error) {
      console.error('Error loading database:', error);
      this.db = { images: [] };
    }
  }

  // Get all gallery items
  async getAllGalleryItems() {
    await this.ensureDatabaseLoaded();
    return this.db.images.map(item => ({
      id: item.id,
      title: item.title,
      category: item.category,
      thumbnail: item.images[0]?.url || 'default.jpg'
    }));
  }

  // Get a specific gallery item with all its images
  async getGalleryItem(title) {
    await this.ensureDatabaseLoaded();
    return this.db.images.find(item => item.title.toLowerCase() === title.toLowerCase());
  }

  // Add a new gallery item
  async addGalleryItem(item) {
    await this.ensureDatabaseLoaded();
    const newItem = {
      id: this.db.images.length + 1,
      ...item
    };
    this.db.images.push(newItem);
    await this.saveDatabase();
    return newItem;
  }

  // Add images to an existing gallery item
  async addImagesToGalleryItem(title, images) {
    await this.ensureDatabaseLoaded();
    const item = this.db.images.find(item => item.title.toLowerCase() === title.toLowerCase());
    if (item) {
      item.images.push(...images);
      await this.saveDatabase();
      return item;
    }
    return null;
  }

  // Update a gallery item
  async updateGalleryItem(title, updates) {
    await this.ensureDatabaseLoaded();
    const index = this.db.images.findIndex(item => item.title.toLowerCase() === title.toLowerCase());
    if (index !== -1) {
      this.db.images[index] = { ...this.db.images[index], ...updates };
      await this.saveDatabase();
      return this.db.images[index];
    }
    return null;
  }

  // Delete a gallery item
  async deleteGalleryItem(title) {
    await this.ensureDatabaseLoaded();
    const index = this.db.images.findIndex(item => item.title.toLowerCase() === title.toLowerCase());
    if (index !== -1) {
      this.db.images.splice(index, 1);
      await this.saveDatabase();
      return true;
    }
    return false;
  }

  // Helper method to ensure database is loaded
  async ensureDatabaseLoaded() {
    if (!this.db) {
      await this.loadDatabase();
    }
  }

  // Save database changes (in a real app, this would be handled by a backend)
  async saveDatabase() {
    // In a real application, this would send the data to a backend server
    console.log('Database updated:', this.db);
  }
}

// Create and export a singleton instance
const imageAPI = new ImageAPI();
export default imageAPI; 