var native_func = Module.cwrap('create_thumbnail', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number']);
var tmpPointer = Runtime.stackAlloc(4);

function create_thumbnail(jpegData, maxWidthHeight) {
  inputPointer = allocate(jpegData, 'i8', ALLOC_NORMAL);
  size = native_func(inputPointer, jpegData.length, tmpPointer, 0,0, 100, 70);
  Module._free(inputPointer);
  if (size === 0) {
    throw "Native function error";
  }
  var thumb = new Uint8Array(size);
  var begin = getValue(tmpPointer, 'i32');
  for (var i=0; i<size; i++) {
    thumb[i] = Module.HEAPU8[begin + i];
  }
  return thumb;
}
