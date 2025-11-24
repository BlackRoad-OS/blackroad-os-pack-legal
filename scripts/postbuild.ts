import fs from 'fs';
import path from 'path';

const beaconPath = path.join(__dirname, '..', 'public', 'sig.beacon.json');
const payload = {
  ts: new Date().toISOString(),
  agent: 'LegalPack-Gen-0',
};

fs.writeFileSync(beaconPath, JSON.stringify(payload, null, 2));

// TODO(legal-pack-next): add e-signature webhook registration once endpoints exist.
