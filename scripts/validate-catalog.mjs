import { readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile(new URL('../manifest.json', import.meta.url), 'utf8'));
const idPattern = /^[a-z0-9][a-z0-9._-]*$/i;
const sha256Pattern = /^[a-f0-9]{64}$/i;

if (manifest.schemaVersion !== 1 || !idPattern.test(manifest.id)) {
  throw new Error('Catalog requires schemaVersion 1 and a valid id');
}
if (!Array.isArray(manifest.plugins)) {
  throw new Error('Catalog plugins must be an array');
}

const pluginIds = new Set();
for (const plugin of manifest.plugins) {
  if (!idPattern.test(plugin.id) || pluginIds.has(plugin.id)) {
    throw new Error(`Invalid or duplicate plugin id: ${plugin.id}`);
  }
  pluginIds.add(plugin.id);

  if (
    typeof plugin.name !== 'string' ||
    typeof plugin.version !== 'string' ||
    plugin.velvetApiVersion !== '1' ||
    !Array.isArray(plugin.modules) ||
    plugin.modules.length === 0 ||
    typeof plugin.package !== 'string' ||
    plugin.source?.type !== 'release-asset' ||
    !sha256Pattern.test(plugin.source.sha256)
  ) {
    throw new Error(`Plugin ${plugin.id} has an invalid catalog contract`);
  }

  const sourceUrl = new URL(plugin.source.url);
  if (!['http:', 'https:'].includes(sourceUrl.protocol) || sourceUrl.username || sourceUrl.password) {
    throw new Error(`Plugin ${plugin.id} has an invalid release asset URL`);
  }
}

console.log(`Validated ${manifest.plugins.length} Velvet plugin(s)`);
