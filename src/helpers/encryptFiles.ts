import CryptoJS from "crypto-js";

async function encryptFiles(files: File[], key: string): Promise<string[]> {
  const encryptedFiles: string[] = [];

  for (const file of files) {
    const fileData = await readFileAsBase64(file);
    const encryptedFileBase64 = CryptoJS.AES.encrypt(fileData, key).toString();
    encryptedFiles.push(encryptedFileBase64);
  }

  return encryptedFiles;
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      const fileArray = new Uint8Array(this.result as ArrayBuffer);
      const encodedFileBase64 = bufferToBase64(fileArray);
      resolve(encodedFileBase64);
    };
    fileReader.onerror = function () {
      reject(fileReader.error);
    };
    fileReader.readAsArrayBuffer(file);
  });
}

function bufferToBase64(buffer: Uint8Array): string {
  let binary = "";
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return btoa(binary);
}

export default encryptFiles;
