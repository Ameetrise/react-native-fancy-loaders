const { rmSync } = require('node:fs');
const { resolve } = require('node:path');

// Remove stale outputs when source files are moved or renamed.
rmSync(resolve(__dirname, '../lib'), { recursive: true, force: true });
