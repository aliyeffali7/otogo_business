import React, { useState } from 'react';

interface AppProductProps {
  onCancel: () => void;
  onAdd: (productData: any) => void;
}

const AppProduct: React.FC<AppProductProps> = ({ onCancel, onAdd }) => {
  const [name, setName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Category');
  const [branch, setBranch] = useState('NARIMANOV');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      manufacturer,
      description,
      category,
      branch,
      price: parseFloat(price),
    };
    onAdd(productData);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <div style={styles.modalImagePlaceholder}>
            <span style={styles.plusIcon}>+</span>
          </div>
        </div>
        <div style={styles.modalBody}>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="name">Name:</label>
              <input
                style={styles.input}
                type="text"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="manufacturer">Manufacturer:</label>
              <input
                style={styles.input}
                type="text"
                id="manufacturer"
                placeholder="Manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="description">Description:</label>
              <textarea
                style={{ ...styles.input, ...styles.textarea }}
                id="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div style={styles.formGroupTriple}>
              <div style={styles.formGroupSplit}>
                <label style={styles.labelSmall} htmlFor="category">Category</label>
                <select
                  style={styles.select}
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Category</option>
                  {/* Digər kateqoriya opsiyalarını bura əlavə edə bilərsən */}
                </select>
              </div>
              <div style={styles.formGroupSplit}>
                <label style={styles.labelSmall} htmlFor="branch">Branch</label>
                <select
                  style={styles.select}
                  id="branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option>NARIMANOV</option>
                  {/* Digər filial opsiyalarını bura əlavə edə bilərsən */}
                </select>
              </div>
              <div style={styles.formGroupSplit}>
                <label style={styles.labelSmall} htmlFor="price">Price</label>
                <input
                  style={styles.input}
                  type="text"
                  id="price"
                  placeholder="xxx"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button type="button" style={{ ...styles.btn, ...styles.btnCancel }} onClick={onCancel}>
                CANCEL
              </button>
              <button type="submit" style={{ ...styles.btn, ...styles.btnAdd }}>
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// CSS-in-JS style object
const styles: { [key: string]: React.CSSProperties } = {
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#14151a',
    border: '1px solid #333',
    borderRadius: 12,
    width: 450,
    color: '#fff',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    padding: 25,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalImagePlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: '#2a2c31',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 30,
    color: '#fff',
  },
  modalBody: {},
  formGroup: {
    marginBottom: 15,
  },
  label: {
    display: 'block',
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#2a2c31',
    border: '1px solid #3e4045',
    borderRadius: 8,
    color: '#fff',
    fontSize: 14,
    boxSizing: 'border-box',
    outline: 'none',
  },
  textarea: {
    resize: 'none',
    height: 80,
  },
  formGroupTriple: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
    marginBottom: 25,
  },
  formGroupSplit: {
    flex: 1,
  },
  labelSmall: {
    fontSize: 12,
    color: '#ccc',
    display: 'block',
    marginBottom: 5,
  },
  select: {
    width: '100%',
    padding: 10,
    backgroundColor: '#2a2c31',
    border: '1px solid #3e4045',
    borderRadius: 8,
    color: '#fff',
    fontSize: 14,
    boxSizing: 'border-box',
    outline: 'none',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'center',
    gap: 15,
    marginTop: 30,
  },
  btn: {
    padding: '12px 30px',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  btnCancel: {
    backgroundColor: '#2a2c31',
    color: '#ccc',
    border: '1px solid #3e4045',
  },
  btnAdd: {
    backgroundColor: '#fff',
    color: '#14151a',
  },
};

export default AppProduct;