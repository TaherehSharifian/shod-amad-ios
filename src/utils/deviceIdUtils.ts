import { v4 as uuidv4 } from "uuid";

export function getOrCreateUUID(key = "session_uuid") {
  try {
    let id = localStorage.getItem(key);
    if (!id) {
      id = uuidv4();
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    // fallback در صورت نبود دسترسی به localStorage
    return uuidv4();
  }
}
