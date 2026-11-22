// Generates icon-192.png and icon-512.png using Node's built-in zlib and fs
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function createSolidPng(width, height, r, g, b, innerR, innerG, innerB) {
  // Simple PNG generator with gradient circle
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = width * 0.45;

  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= maxRadius) {
        // Gradient from center (emerald/gold) to edge (indigo/slate)
        const t = dist / maxRadius;
        const curR = Math.round(innerR * (1 - t) + r * t);
        const curG = Math.round(innerG * (1 - t) + g * t);
        const curB = Math.round(innerB * (1 - t) + b * t);
        rawData[offset++] = curR;
        rawData[offset++] = curG;
        rawData[offset++] = curB;
        rawData[offset++] = 255;
      } else {
        // Background dark slate
        rawData[offset++] = 15;
        rawData[offset++] = 23;
        rawData[offset++] = 42;
        rawData[offset++] = 255;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);

  // PNG Header
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT chunk
  const idatChunk = createChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0 ^ -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const header = Buffer.alloc(4 + 4);
  header.writeUInt32BE(len, 0);
  header.write(type, 4, 4, 'ascii');

  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crcVal = crc32(typeAndData);

  const footer = Buffer.alloc(4);
  footer.writeUInt32BE(crcVal, 0);

  return Buffer.concat([header, data, footer]);
}

// Generate 192x192 and 512x512 icons
const dir = __dirname;
fs.writeFileSync(path.join(dir, 'icon-192.png'), createSolidPng(192, 192, 79, 70, 229, 16, 185, 129));
fs.writeFileSync(path.join(dir, 'icon-512.png'), createSolidPng(512, 512, 79, 70, 229, 16, 185, 129));
console.log('Successfully generated icon-192.png and icon-512.png');
