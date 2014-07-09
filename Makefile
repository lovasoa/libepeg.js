EXPORTS=-s EXPORTED_FUNCTIONS="[\
	'_epeg_file_open',\
	'_epeg_memory_open',\
	'_epeg_size_get',\
	'_epeg_colorspace_get',\
	'_epeg_decode_size_set',\
	'_epeg_decode_bounds_set',\
	'_epeg_quality_set',\
	'_epeg_file_output_set',\
	'_epeg_memory_output_set',\
	'_epeg_encode',\
	'_epeg_close'\
]"

epeg.js: libepeg/libepeg.o libjpeg/build-emscripten/.libs/libjpeg.so  
	emcc $(EXPORTS) $^ -o libepeg.js

