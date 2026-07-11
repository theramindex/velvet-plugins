# Ramindex Velvet Plugin Catalog

This repository is the public install catalog for curated Ramindex plugins that implement Velvet's
plugin contract.

Velvet can read the catalog directly from GitHub:

```text
https://raw.githubusercontent.com/theramindex/velvet-plugins/main/manifest.json
```

Each entry declares:

- Plugin identity, display metadata, and version.
- Required Velvet plugin API version.
- Contributed modules.
- npm package identity.
- Public release-asset URL.
- Pinned SHA-256 digest.

Adding this catalog makes its plugins available; Velvet installs only plugin IDs explicitly selected
by the deployment.

Validate changes before publishing:

```bash
npm test
```

## Included Plugins

- `ramindex-user-data`: encrypted account persistence, playback progress, playlists, and
  cross-device user-owned data.
