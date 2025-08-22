import React, { useEffect } from "react";

export default function GoogleAd({ slot }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("AdSense failed", e);
    }
  }, []);

  // Show placeholder ad for now
  return (
    <div style={{
      width: "100%",
      height: "250px",
      backgroundColor: "#f3f4f6",
      border: "2px dashed #d1d5db",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "1rem 0",
      borderRadius: "8px"
    }}>
      <div style={{ textAlign: "center", color: "#6b7280" }}>
        <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
          Advertisement Space
        </div>
        <div style={{ fontSize: "0.9rem" }}>
          Slot: {slot}
        </div>
        <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
          (Replace with real AdSense code)
        </div>
      </div>
    </div>
  );
}
