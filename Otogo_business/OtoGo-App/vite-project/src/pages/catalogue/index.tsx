import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Input, Button, Card, Empty, Skeleton, message, Modal } from "antd";
import { SearchOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { addPictures, listProducts, createProduct, updateProduct, deleteProduct, removeFromBranch, type ProductDTO, listByBranch } from "../../services/productsApi";
import { ProductCard, ProductModal, type Product } from "../../components/main/productCatalogue";
import ProductPopup from "../../components/main/productCatalogue/editProduct";

const BRANCH_ID = 1;

export default function CataloguePage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Product | null>(null);

  // Edit popup state
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    if (!active) return;
    setOpenEdit(true);
  };

  const fetchList = async () => {
    setLoading(true);
    try {
      // const data = await listProducts();
      const data = await listByBranch(BRANCH_ID);
      const mapped: Product[] = data.map((p: ProductDTO) => ({
        id: p.id,
        name: p.name,
        brand: p.manufacturer,
        category: p.category,
        price_azn: p.price,
        imageUrl: p.imageUrl || p.images?.[0],
        images: p.images,
        description: p.description,
        branchId: p.branchId,
      }));
      setList(mapped);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchList(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((p) =>
      [p.name, p.brand, p.category].filter(Boolean).join(" ").toLowerCase().includes(q)
    );
  }, [list, query]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a: any, b: any) => {
      if (a.isHidden && !b.isHidden) return 1;
      if (!a.isHidden && b.isHidden) return -1;
      return 0;
    });
  }, [filtered]);

  const openModal = (p: Product) => { setActive(p); setOpen(true); };

  const onEdit = async (p: Product) => {
    try {
      await updateProduct({
        id: p.id,
        name: p.name,
        manufacturer: p.brand,
        description: p.description,
        category: p.category,
        price: p.price_azn,
      });
      message.success("Yeniləndi");
      setOpen(false);
      setOpenEdit(false); // Edit popup bağlansın
      fetchList();
    } catch (e: any) {
      message.error(e?.response?.data?.message || "Yenilənmə xətası");
    }
  };

  const onHide = async (p: Product) => {
    try {
      await removeFromBranch(p.id, p.branchId ?? BRANCH_ID);
      message.success("Filialdan gizlədildi");
      setList((prev) =>
        prev.map((item: any) => item.id === p.id ? { ...item, isHidden: true } : item)
      );
      setOpen(false);
      setOpenEdit(false);
    } catch {
      message.error("Hide xətası");
    }
  };

  const handleSave = async (data: any) => {
    if (!active) return;
    try {
      const updated = await updateProduct({
        id: active.id,
        name: data.name ?? active.name,
        manufacturer: data.manufacturer ?? active.brand,
        description: data.description ?? active.description,
        category: data.category ?? active.category,
        price: Number(data.price ?? active.price_azn) || 0,
      });

      setList((prev) =>
        prev.map((it) => (it.id === active.id ? {
          ...it,
          name: (updated as any)?.name ?? data.name ?? it.name,
          brand: (updated as any)?.manufacturer ?? data.manufacturer ?? it.brand,
          description: (updated as any)?.description ?? data.description ?? it.description,
          category: (updated as any)?.category ?? data.category ?? it.category,
          price_azn: (updated as any)?.price ?? Number(data.price) ?? it.price_azn,
        } : it))
      );

      setOpenEdit(false);
      setOpen(false);
      message.success("Yeniləndi");
    } catch (e: any) {
      message.error(e?.response?.data?.message || "Yeniləmə alınmadı");
    }
  };

  const onAdd = async () => {
    const name = window.prompt("Product name?");
    if (!name) return;
    try {
      await createProduct({ name, price: 0, manufacturer: "", description: "", category: "", branchId: BRANCH_ID });
      message.success("Əlavə olundu");
      fetchList();
    } catch (e: any) {
      message.error(e?.response?.data?.message || "Əlavə etmə xətası");
    }
  };

  const onDelete = (p: Product) => {
    Modal.confirm({
      title: "Silinsin?",
      onOk: async () => {
        try {
          await deleteProduct(p.id);
          message.success("Silindi");
          setOpen(false);
          setOpenEdit(false);
          fetchList();
        } catch (e: any) {
          message.error(e?.response?.data?.message || "Silinmə xətası");
        }
      },
    });
  };

  const onUploadPictures = async (id: number | string, files: File[]) => {
    try {
      await addPictures(id, files);
      message.success("Şəkillər əlavə olundu");
      fetchList();
    } catch (e: any) {
      message.error(e?.response?.data?.message || "Şəkil yükləmə xətası");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <Input
          allowClear
          prefix={<SearchOutlined />}
          size="large"
          placeholder="Search Otogo"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ borderRadius: 12, background: "#eef0f5", borderColor: "transparent" }}
        />
        <Button size="large" icon={<FilterOutlined />} />
        <Button size="large" type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          ADD PRODUCT
        </Button>
      </div>

      {/* Grid */}
      {loading ? (
        <Row gutter={[16, 16]}>
          {Array.from({ length: 12 }).map((_, i) => (
            <Col key={i} xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
              <Card bodyStyle={{ padding: 12 }}>
                <Skeleton.Image style={{ width: "100%", height: 160, borderRadius: 12 }} active />
                <div style={{ marginTop: 12 }}>
                  <Skeleton active paragraph={{ rows: 2 }} title={false} />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : filtered.length === 0 ? (
        <div style={{ padding: 40 }}><Empty description="No products found" /></div>
      ) : (
        <Row gutter={[16, 16]}>
          {sorted.map((p) => (
            <Col key={p.id} xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
              <ProductCard product={p} onOpen={openModal} />
            </Col>
          ))}
        </Row>
      )}

      {/* Product modal (HIDE/EDIT) */}
      <ProductModal
        open={open}
        product={active}
        onClose={() => { setOpen(false); setOpenEdit(false); }}
        onEdit={handleOpenEdit}
        onHide={onHide}
      />

      {/* Edit popup (yalnız active varsa açıq olsun) */}
      <ProductPopup
        isOpen={openEdit && !!active}
        initialData={active || {}}
        onSave={handleSave}
        onCancel={() => setOpenEdit(false)}
        onRemove={() => active && onDelete(active)}
      />
    </div>
  );
}