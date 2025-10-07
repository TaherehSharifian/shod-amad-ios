import { useState, useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const useFingerprint = (): string | null => {
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    const getFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();

        const result = await fp.get();

        setFingerprint(result.visitorId);

        localStorage.setItem("deviceFingerprint", result.visitorId);
      } catch (error) {
        console.error("Error getting fingerprint:", error);

        const stored = localStorage.getItem("deviceFingerprint");
        if (stored) {
          setFingerprint(stored);
        } else {
          const fallbackId = `device-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
          setFingerprint(fallbackId);
          localStorage.setItem("deviceFingerprint", fallbackId);
        }
      }
    };

    getFingerprint();
  }, []);

  return fingerprint;
};
