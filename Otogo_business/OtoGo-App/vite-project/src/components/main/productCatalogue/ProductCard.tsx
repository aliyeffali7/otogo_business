// src/components/productCatalogue/ProductCard.tsx
import React from "react";
import { Card } from "antd";
import type { Product } from "./types";

type Props = {
  product: Product;
  onOpen?: (p: Product) => void;
};

export default function ProductCard({ product: p, onOpen }: Props) {
  return (
    // <Card
    //   bodyStyle={{ padding: 12 }}
    //   hoverable
    //   onClick={() => onOpen?.(p)}
    //   style={{
    //     cursor: "pointer",
    //     background: "#2c2f3a",       // tünd fon
    //     border: "2px solid #2b2f3a",
    //     borderRadius: 16,
    //     color: "#e6e8ef",
    //   }}
    // >
    <Card
  bodyStyle={{ padding: 12 }}
  hoverable
  onClick={() => onOpen?.(p)}
  style={{
    cursor: "pointer",
    background: p.isHidden ? "#2c2f3a80" : "#2c2f3a", // 80 = solğun
    border: "2px solid #2b2f3a",
    borderRadius: 16,
    color: "#e6e8ef",
    opacity: p.isHidden ? 0.5 : 1, // ümumi opacity
  }}
>

      <div
        style={{
          background: "#e6e8ef",
          border: "3px solid #2b2f3a",
          borderRadius: 12,
          height: 160,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={p.imageUrl}
          alt={p.name}
          style={{ maxHeight: "90%", maxWidth: "90%", objectFit: "contain" }}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <div style={{ color: "#ffffff", fontWeight: 700, lineHeight: 1.25 }}>
          {p.name}
        </div>
        <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>
          {p.brand}
          {p.brand && p.category ? " · " : ""}
          {p.category}
        </div>
        <div style={{ marginTop: 8, fontWeight: 800, color: "#dbe4ff" }}>
          {p.price_azn} AZN
        </div>
      </div>
    </Card>
  );
}
