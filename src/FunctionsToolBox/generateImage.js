const fs = require('fs');
const path = require('path');

// Function to convert base64 to image file
 const base64ToImage = (base64String, outputPath, fileName) => {
  // Remove the Base64 header (if present)
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

  // Define the image buffer from Base64
  const buffer = Buffer.from(base64Data, 'base64');

  // Define the file path to save the image
  const filePath = path.join(outputPath, fileName);

  // Write the buffer to a file
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error('Error writing image:', err);
    } else {
      console.log('Image saved successfully to:', filePath);
    }
  });
};

// Example usage:
const base64String = '...'; // Your base64 image string here
const outputPath = path.join(__dirname, 'images'); // Directory to store image
const fileName = 'myImage.png'; // Image file name

// Create 'images' directory if it doesn't exist
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}


export default base64ToImage