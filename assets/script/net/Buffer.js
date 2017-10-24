/** 关闭no-bitwise检测 */
/* eslint no-bitwise: "off" */
/* eslint object-shorthand: 0 */

class Buffer {
  // 构造函数
  constructor() {
    this.bytes = [];
    this.offset = 0;
    this.c_len = 0;
  }

  copy = (arrayBuffer) => {
    if (!arrayBuffer) {
      this.bytes = [];
    } else if (arrayBuffer instanceof ArrayBuffer) {
      const uintArray = new Uint8Array(arrayBuffer);
      const len = uintArray.byteLength;
      for (let i = 0; i < len; i++) {
        this.bytes[i + this.c_len] = uintArray[i];
      }
      this.c_len += len;
    } else if (arrayBuffer instanceof Array) {
      this.bytes = this.bytes.concat(arrayBuffer);
      this.c_len += this.bytes.length;
    }
  };

  arrayBuffer = () => {
    const uintArr = new Uint8Array(this.c_len);
    for (let i = 0; i < this.c_len; i++) {
      uintArr[i] = this.bytes[i];
    }
    return uintArr.buffer;
  };

  getSub = (length) => {
    const fullBytes = this.bytes.slice(6, length - 2);
    this.bytes = this.bytes.slice(length, this.c_len);
    this.c_len = this.bytes.length;
    this.offset = 0;
    const fullBuffer = new Buffer();
    fullBuffer.copy(fullBytes);
    return fullBuffer;
  };

  getShort = (index) => {
    let short = this.bytes[index - 2] << 8;
    short += this.bytes[index - 1];
    return short;
  };

  addShort = (short) => {
    this.bytes.unshift(short & 0xFF);
    this.bytes.unshift(short >> 8);
    this.c_len += 2;
  };

  addInt = (int) => {
    this.bytes.unshift((int & 0xFF));
    this.bytes.unshift((int & 0xFF00) >> 8);
    this.bytes.unshift((int & 0xFF0000) >> 16);
    this.bytes.unshift(int >> 24);
    this.c_len += 4;
  };

  writeByte = (byte) => {
    this.bytes.push(byte);
    this.c_len++;
  };

  writeBool = (bool) => {
    this.bytes.push(bool ? 1 : 0);
    this.c_len++;
  };

  writeShort = (short) => {
    this.bytes.push(short >> 8);
    this.bytes.push(short & 0xFF);
    this.c_len += 2;
  };

  writeInt = (int) => {
    this.bytes.push(int >> 24);
    this.bytes.push((int & 0xFF0000) >> 16);
    this.bytes.push((int & 0xFF00) >> 8);
    this.bytes.push((int & 0xFF));
    this.c_len += 4;
  };

  writeUTF = (str) => {
    const utu = this.UniCodeToUTF8(str);
    this.writeShort(utu.length);
    this.bytes = this.bytes.concat(utu.bytes);
    this.c_len = this.bytes.length;
  };

  writeBytes = (bytes) => {
    const len = bytes.length;
    this.writeInt(len);
    for (let i = 0; i < len; i++) {
      this.bytes.push(bytes[i]);
    }
    this.c_len += len;
  };

  readByte = () => this.bytes[this.offset++];

  readBytes = () => {
    const len = this.readInt();
    const bytes = [];
    for (let i = 0; i < len; i++) {
      bytes[i] = this.readByte();
    }
    return bytes;
  };

  readBool = () => {
    const bool = this.bytes[this.offset++] ? true : false;
    return bool;
  };

  readShort = () => {
    let short = this.bytes[this.offset++] << 8;
    short += this.bytes[this.offset++];
    return short;
  };

  readInt = () => {
    let int = this.bytes[this.offset++] << 24;
    int += this.bytes[this.offset++] << 16;
    int += this.bytes[this.offset++] << 8;
    int += this.bytes[this.offset++];
    return int;
  };

  readUTF = () => {
    const str = this.UTF8ToUnicode(this.bytes, this.readShort(), this.offset);
    this.offset = str.offset;
    return str.string;
  };

  clear = () => {
    this.offset = 0;
  };

  reset = () => {
    this.offset = 0;
    this.c_len = 0;
    this.bytes = [];
  };

  // ------------------ //
  UTF8ToUnicode(uintArr, len, offset) {
    const utf8 = [];
    let index = 0;
    let code = 0;
    let value = 0;
    while (index < len) {
      code = uintArr[offset++];
      if (code < 0x80) {
        utf8.push(code);
        index += 1;
      } else if (code < 0xE0) {
        value = ((code & 0x1F) << 6) + (uintArr[offset++] & 0x3F);
        utf8.push(parseInt(value, 2));
        index += 2;
      } else if (code < 0xF0) {
        value = ((code & 0x0F) << 12) + ((uintArr[offset++] & 0x3F) << 6) + (uintArr[offset++] & 0x3F);
        utf8.push(value);
        index += 3;
      }
      //  index++;
    }
    return {
      offset: offset,
      string: String.fromCharCode.apply(null, utf8),
    };
  }

  UniCodeToUTF8(str) {
    const unicode = [];
    let code = 0;
    let strLen = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (code < 0x80) {
        unicode.push(code);
        strLen++;
      } else if (code < 0x7FF) {
        unicode.push((code >> 6) + 0xC0);
        unicode.push((code & 0x3F) + 0x80);
        strLen += 2;
      } else if (code < 0xFFFF) {
        unicode.push((code >> 12) + 0xE0);
        unicode.push(((code >> 6) & 0x3F) + 0x80);
        unicode.push((code & 0x3f) + 0x80);
        strLen += 3;
      }
    }
    return {
      length: strLen,
      bytes: unicode,
    };
  }
}

export default Buffer;
