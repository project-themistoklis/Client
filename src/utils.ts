import NanoidAsync from "nanoid/async";

export const xor = (str: string, key: string): string => {
  if (!str || str?.length <= 0) {
    return "";
  }

  let c: any = "";
  for (let i = 0; i < str.length; i++) {
    c += String.fromCharCode(
      (str[i].charCodeAt(0).toString(10) as any) ^
        (key.charCodeAt(0).toString(10) as any)
    );
  }
  return c;
};

export const generateUuid = (length: number = 10): any => {
  const chars =
    "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const randomArray = Array.from(
    { length },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
};
