import React, { useEffect } from "react";
import { Modal, Typography, Button, Divider, Avatar, Carousel } from "antd";
import { StarFilled } from "@ant-design/icons";
import type { Product } from "./types";

type Props = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onEdit?: (p: Product) => void;
  onHide?: (p: Product) => void;
};



// Dizayna uyğun rənglər.
const C = {
  panel: "#2c2f3a",
  border: "#2b2f3a",
  text: "#e6e8ef",
  muted: "#cbd5e1",
  subtle: "#94a3b8",
  title: "#f1f5ff",
  price: "#dbe4ff",
  chipDark: "#333742",
  chipLight: "#e9e9ee",
  imgBg: "#e6e8ef",
  divider: "#3a3f4b",
};

export default function ProductModal({ open, product, onClose, onEdit, onHide }: Props) {
  useEffect(() => {
    if (open) console.log("ProductModal v4 (updated for design)");
  }, [open]);

  if (!product) return null;

  const imgs = product.images?.length ? product.images : [product.imageUrl];
  const rating = (product as any).rating ?? 4.8;
  const ratingCount = (product as any).ratingCount ?? 100;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1040} // Şəkildəki dizayna uyğun genişlik
      centered
      title={null}
      styles={{
        content: {
          background: "#14151a",
          borderRadius: 28,
          padding: 0,
          color: C.text,
          boxShadow: "0 24px 80px rgba(0,0,0,.55)",
        },
        body: { padding: 0 },
      }}
    >
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          {/* LEFT: image box */}
          <div
            style={{
              width: 250,
              background: C.imgBg,
              border: `2px solid ${C.border}`,
              borderRadius: 16,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Carousel dots style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {imgs.map((src, i) => (
                <div key={i} style={{ height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={src} alt={product.name} style={{ maxHeight: "90%", maxWidth: "90%", objectFit: "contain" }} />
                </div>
              ))}
            </Carousel>
          </div>

          {/* RIGHT: content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Ad */}
            <Typography.Title
              level={1}
              style={{
                margin: "0 0 4px",
                color: C.title,
                fontSize: 32,
                lineHeight: 1.15,
                fontWeight: 700,
              }}
            >
              {product.name}
            </Typography.Title>

            {/* Brend */}
            <div style={{ color: C.muted, fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
              {product.brand || "—"}
            </div>

            {/* Kateqoriya */}
            <div style={{ color: C.subtle, marginBottom: 8, fontSize: 13 }}>
              Aftermarket Accessories &gt; {product.category || "Car Care Products"}
            </div>

            {/* Reyler */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.muted, marginBottom: 12 }}>
              <StarFilled style={{ fontSize: 14, color: "#e2e8f0" }} />
              <span style={{ fontWeight: 600, fontSize: 14 }}>{Number(rating).toFixed(1)}</span>
              <span style={{ color: C.subtle, fontSize: 14 }}>({ratingCount}+ Review)</span>
            </div>

            {/* Qiymət */}
            <div style={{ fontSize: 24, fontWeight: 900, color: C.price }}>
              {product.price_azn} AZN
            </div>
            
            {/* Buttonlar */}
            <div style={{ display: "flex", gap: 12, margin: "14px 0 12px" }}>
              <Button
                size="large"
                style={{
                  background: C.chipDark,
                  borderColor: C.chipDark,
                  color: C.text,
                  borderRadius: 12,
                  height: 40,
                  paddingInline: 24,
                  fontWeight: 600,
                  width: "50%"
                }}
                onClick={() => onHide?.(product)}
              >
                HIDE
              </Button>
              <Button
                size="large"
                style={{
                  background: C.chipLight,
                  borderColor: C.chipLight,
                  color: "#1f2126",
                  borderRadius: 12,
                  height: 40,
                  paddingInline: 24,
                  fontWeight: 600,
                  width: "50%"
                }}
                onClick={() => onEdit?.(product)}
              >
                EDIT
              </Button>
            </div>
          </div>
        </div>

        {/* Description və Rəylər */}
        <div style={{ marginTop: 12 }}>
          {product.description && (
            <div style={{ color: C.muted, marginBottom: 16 }}>{product.description}</div>
          )}

          <Divider style={{ borderColor: C.divider, margin: "0 0 12px" }} />

          {((product as any).reviews || [
            { id: 1, user: "Amil A.", rating: 5, text: "zordu davamı gəlsin" },
            { id: 2, user: "Amil A.", rating: 5, text: "zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin." },
            { id: 3, user: "Amil A.", rating: 4.5, text: "comment text" },
          ])
            .slice(0, 3)
            .map((r: any) => (
              <div
                key={r.id}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: `1px solid ${C.divider}`,
                }}
              >
                <Avatar style={{ background: C.chipDark, color: C.text }}>{r.user?.[0] || "U"}</Avatar>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <strong style={{ color: C.text }}>{r.user}</strong>
                    <div style={{ display: "flex", gap: 2, color: "#cbd5e1", fontSize: 12 }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarFilled
                          key={i}
                          style={{
                            fontSize: 12,
                            color: i + 1 <= Math.round(r.rating) ? "#e2e8f0" : "#64748b",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div style={{ color: C.muted, marginTop: 2, wordBreak: "break-word" }}>{r.text}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
}
