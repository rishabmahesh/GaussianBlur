
function GaussianBlur(input_image, radius) {

  var size = 2 * radius + 1;

  // Determine the kernel "sigma" based on radius.
  var sigma = 0.3 * ((radius - 1) * 0.5 - 1) + 0.8;

  // Create a Gaussian kernel with given radius and sigma.
  var kernel = new Array(size).fill().map(() => new Array(size).fill(0));

  // Fill the kernel with Gaussian values.
  for (var i = -radius; i <= radius; i++) {
    for (var j = -radius; j <= radius; j++) {
      kernel[i + radius][j + radius] = Math.exp(-(i * i + j * j) / (2 * sigma * sigma)) / (2 * Math.PI * sigma * sigma);
    }
  }

  // Normalize the kernel.
  var sum = 0;

  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++)
      sum += kernel[i][j];
  }

  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++)
      kernel[i][j] /= sum;
  }

  // Create a new image with the same size as the input image.
  var output_image = new Array(input_image.length).fill().map(() => new Array(input_image[0].length).fill(0));

  // Convolve the input image with the Gaussian kernel.
  for (var i = radius; i < input_image.length - radius; i++) {
    for (var j = radius; j < input_image[0].length - radius; j++) {

      var sum = 0;
      for (var k = -radius; k <= radius; k++) {
        for (var l = -radius; l <= radius; l++)
          sum += kernel[k + radius][l + radius] * input_image[i + k][j + l];
      }
      output_image[i][j] = sum;
    }
  }

  return output_image;
}
