import { validate } from '../src/index';

describe('uuid validator', function () {
  it('accepts explicit valid uuidv1', function () {
    expect(validate({ uuid: '23d57c30-afe7-11e4-ab7d-12e3f512a338', version: 1 })).toBe(true);
  });
  it('accepts implicit valid uuidv1', function () {
    expect(validate({ uuid: '23d57c30-afe7-11e4-ab7d-12e3f512a338' })).toBe(true);
  });
  it('accepts explicit valid uuidv4', function () {
    expect(validate({ uuid: '09bb1d8c-4965-4788-94f7-31b151eaba4e', version: 4 })).toBe(true);
  });
  it('accepts implicit valid uuidv4', function () {
    expect(validate({ uuid: '09bb1d8c-4965-4788-94f7-31b151eaba4e' })).toBe(true);
  });
  it('accepts explicit valid uuidv7', function () {
    expect(validate({ uuid: '01931366-a3a1-7765-8268-13ce0ab267bc', version: 7 })).toBe(true);
  });
  it('accepts implicit valid uuidv7', function () {
    expect(validate({ uuid: '01931366-a3a1-7765-8268-13ce0ab267bc' })).toBe(true);
  });
  it('denies if wrong version', function () {
    expect(validate({ uuid: '23d57c30-afe7-11e4-ab7d-12e3f512a338', version: 4 })).toBe(false);
  });
  it('accepts valid buffers', function () {
    const buffer = Buffer.from([149, 236, 195, 128, 175, 233, 17, 228, 155, 108, 117, 27, 102, 221, 84, 30]);
    expect(validate({ uuid: buffer })).toBe(true);
  });
  it('denies if invalid', function () {
    expect(validate({ uuid: 'foo', version: 4 })).toBe(false);
  });
  it('fixes issue #1 (character casing correct at col 19)', function () {
    expect(validate({ uuid: '97a90793-4898-4abe-b255-e8dc6967ed40' })).toBe(true);
  });
});
