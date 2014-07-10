var epeg_open = Module.cwrap('epeg_open', 'number', ['string']);
var epeg_size_get = Module.cwrap('epeg_size_get', 'number', ['number', 'number', 'number']);

this['epeg'] = {
  /** Create the thumbnail of an image
   * @param [Array<Number>] The base jpeg image file, as an array of bytes
   * @param [Number] max(width, height) of the thumbnail
   **/
  "create_thumbnail" : function (jpegImageData, maxSize) {
      var originalFileName = (0xffffffff*Math.random()>>>0) + '.jpg';
      FS.createDataFile ('/', originalFileName, jpegImageData, true, true);

  }
};
