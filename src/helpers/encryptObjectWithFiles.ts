import CryptoJS from "crypto-js";

function encryptObjectWithFiles(
  obj: Record<string, any>,
  key: string,
  files: string[] | string
): string[] {
  const encryptedObject: Record<string, any> = { files };

  if (Object.keys(obj).length > 0) {
    const jsonString = JSON.stringify(obj);
    const encryptedJsonString = CryptoJS.AES.encrypt(
      jsonString,
      key
    ).toString();
    encryptedObject.data = encryptedJsonString;
  }

  const encryptedObjectString = JSON.stringify(encryptedObject);
  return [encryptedObjectString];
}

export default encryptObjectWithFiles;
