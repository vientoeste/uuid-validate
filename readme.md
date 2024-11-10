# UUID Validate TS

A TypeScript library for validating UUIDs (versions 1-7). Re-written in TypeScript and extended microsoft/uuid-validate library which is archived.

## Installation

```bash
npm install @vientoeste/uuid-validate
```

## Usage

```typescript
import { validate, extractVersion } from '@vientoeste/uuid-validate';

// Validate a UUID (any version)
validate({ uuid: '2ed6657d-e927-4aa3-84ef-718934192910' }); // true

// Validate a specific UUID version
validate({ uuid: '2ed6657d-e927-4aa3-84ef-718934192910', version: 4 }); // true
validate({ uuid: '2ed6657d-e927-4aa3-84ef-718934192910', version: 1 }); // false

// Get UUID version
extractVersion('2ed6657d-e927-4aa3-84ef-718934192910'); // 4
extractVersion('invalid-uuid'); // 0
```

## Supported UUID Versions

- Version 1: Time-based
- Version 2: DCE Security
- Version 3: MD5 namespace
- Version 4: Random
- Version 5: SHA-1 namespace
- Version 6: Reordered time-based
- Version 7: Unix Timestamp-based

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.