import { METACON_PRIVATE } from "../const";

//Problem in this functio
export function getPrivateKey() {
  let key = localStorage.getItem(METACON_PRIVATE);
  return key || "";
}

export function setPrivateKey(key: string) {
  return localStorage.setItem(METACON_PRIVATE, key);
}
