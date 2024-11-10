// Regular expression used for basic parsing of the uuid.
const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Unparses a UUID buffer to a string. From node-uuid:
 * https://github.com/defunctzombie/node-uuid/blob/master/uuid.js
 *
 * Copyright (c) 2010-2012 Robert Kieffer
 * MIT License - http://opensource.org/licenses/mit-license.php
 *
 * replaced substr(deprecated) to slice
 * 
 * @param  {Buffer} buf
 * @param  {Number=0} offset
 * @return {String}
 */
const _byteToHex: string[] = [];
for (let i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).slice(1);
}

const unparse = (buf: Buffer, offset?: number) => {
  let i = offset || 0;
  const bth = _byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]];
}

/**
 * Determines whether the uuid is valid, converting it from a buffer if necessary.
 *
 * @param params - Parameters for UUID validation
 * @param params.uuid - The UUID to validate. Can be either a string in UUID format or a Buffer
 * @param params.version - Optional UUID version number. If not specified, will be extracted from the UUID itself
 * @returns {Boolean}
 * @throws {Error} If provided version is invalid
 * @example
 * ```ts
 *   validate({ uuid: '01931366-a3a1-7765-8268-13ce0ab267bc', version: 7}) // true
 *   validate({ uuid: '01931366-a3a1-7765-8268-13ce0ab267bc' }) // true
 * ```
 */
export const validate = ({ uuid, version }: { uuid: string | Buffer, version?: number }): boolean => {
  let parsedUuid: string;
  // If the uuid is a buffer, parse it...
  if (Buffer.isBuffer(uuid)) {
    parsedUuid = unparse(uuid);
  }
  // If it's a string, it's already good.
  else if (Object.prototype.toString.call(uuid) === '[object String]') {
    parsedUuid = uuid;
  }
  // Otherwise, it's not valid.
  else {
    return false;
  }

  parsedUuid = parsedUuid.toLowerCase();

  // All UUIDs fit a basic schema. Match that.
  if (!pattern.test(parsedUuid)) {
    return false;
  }

  // Now extract the version...
  if (version === undefined) {
    version = extractVersion(parsedUuid);
  }
  if (extractVersion(parsedUuid) !== version) {
    return false;
  }

  switch (version) {
    // For certain versions, the checks we did up to this point are fine.
    case 1:
    case 2:
      return true;

    // For versions 3 or further, they must specify a variant.
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      return ['8', '9', 'a', 'b'].indexOf(parsedUuid.charAt(19)) !== -1;

    default:
      // We should only be able to reach this if the consumer explicitly
      // provided an invalid version. Prior to extractVersion we check
      // that it's 1-7 in the regex.
      throw new Error('Invalid version provided.');
  }
};

/**
 * Extracts the version from the UUID, which is (by definition) the M in
 * xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
 * If invalid, will return 0.
 *
 * @param  {String} uuid
 * @returns {Number}
 */
export const extractVersion = (uuid: string): number => parseInt(uuid.charAt(14)) | 0;
