var native_func = Module.cwrap('create_thumbnail', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number']);
var tmpPointer = Runtime.stackAlloc(4);

function create_thumbnail(jpg, w, h, maxwh, q) {
  if (!jpg) throw "No input image";
  if (!(maxwh || (w && h))) throw "No dimensions";
  if (!q) q = 80; // quality
  if (typeof w === 'string' && w[w.length-1] === '%') {
    // width given as a percentage
    w = -Math.round(parseFloat(w));
  }
  if (typeof h === 'string' && h[h.length-1] === '%') {
    // height given as a percentage
    h = -Math.round(parseFloat(h));
  }
  inputPointer = allocate(jpg, 'i8', ALLOC_NORMAL);
  size = native_func(inputPointer, jpg.length, tmpPointer, w, h, maxwh, q);
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

if (typeof importScripts !== 'undefined') {
  // web worker
  self.onmessage = function (event) {
    var data = event['data'];
    var jpg = data['jpegData'],
        w   = data['width'],
        h   = data['height'],
        maxwh = data['maxWidthHeight'],
        q   = data['quality'],
        id  = data['id'];
    var thumb = create_thumbnail(jpg, w, h, maxwh, q);
    postMessage({
      'id'       : id,
      'thumbnail': thumb
    }, [thumb.buffer]);
  }
}
