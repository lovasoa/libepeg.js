#include "epeg_main.h"

/**
 * Create a thumbnail in memory
 * @param jpegData A pointer to a jpeg image in memory
 * @param outData A pointer to a pointer that will point to the created jpeg thumbnail
 * @return the size of the created thumbnail in bytes
 * */
int create_thumbnail (unsigned char* jpegData, int jpegDataSize, unsigned char** outData, int thumb_width, int thumb_height, int max_dimension, int thumb_quality) {
  Epeg_Image *im;
  if (thumb_quality <= 0) thumb_quality = 85;
  im = epeg_memory_open(jpegData, jpegDataSize);
  if (!im) return NULL;
  int w,h;
  epeg_size_get(im, &w, &h);

   if (max_dimension > 0) {
     if (w > h) {
       thumb_width = max_dimension;
       thumb_height = max_dimension * h / w;
     } else {
       thumb_height = max_dimension;
       thumb_width = max_dimension * w / h;
     }
  } else {
    if (thumb_width < 0) {
     // This means we want %thumb_width of w
     thumb_width = w * (-thumb_width) / 100;
    }
    if (thumb_height < 0) {
     // This means we want %thumb_height of h
     thumb_height = h * (-thumb_height) / 100;
    }
  }

  int decoded_size;
  epeg_decode_size_set(im, thumb_width, thumb_height);
  epeg_quality_set               (im, thumb_quality);
  epeg_memory_output_set         (im, outData, &decoded_size);
  epeg_encode                    (im);
  epeg_close                     (im);
  return decoded_size;
}
