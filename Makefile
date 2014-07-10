
libepeg/libepeg.o:
	cd libepeg && make

libepeg.js: libepeg/libepeg.o libjpeg/build-emscripten/.libs/libjpeg.so  
	emcc $(EXPORTS) $^ --post-js js/api.js -o libepeg.js

epeg.js:  js/post.js libepeg/libepeg.o epeg/epeg.o libjpeg/build-emscripten/.libs/libjpeg.so  
	emcc -O3 -s TOTAL_MEMORY=60000000 -s EXPORTED_FUNCTIONS="['_create_thumbnail']" libepeg/libepeg.o epeg/epeg.o libjpeg/build-emscripten/.libs/libjpeg.so --post-js js/post.js -o epeg.js

all: epeg.js
