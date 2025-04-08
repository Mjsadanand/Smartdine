import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

const VendorPanel = () => {
    // const { vendorid } = useParams();
  const [vendor, setVendor] = useState({
    vendorid: 123, // dummy
    name: 'Taj Palace',
    contact: '9876543210',
    email: 'taj@example.com',
    address: 'Mumbai, India',
    registrationdate: new Date().toISOString(),
    qrcodeid: null,
  });

  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '', rating: '' });
  const [editingId, setEditingId] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState('');

  useEffect(() => {
    const generateQr = () => {
      const value = `https://yourdomain.com/menu?vendorid=${vendor.vendorid}`;
      setQrCodeValue(value);
      setVendor(prev => ({ ...prev, qrcodeid: vendor.vendorid })); // dummy: setting qrcodeid to vendorid
    };
    generateQr();
  }, [vendor.vendorid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingId !== null) {
      setMenu(menu.map(item => item.id === editingId ? { ...newItem, id: editingId } : item));
      setEditingId(null);
    } else {
      setMenu([...menu, { ...newItem, id: Date.now() }]);
    }
    setNewItem({ name: '', price: '', quantity: '', rating: '' });
  };

  const handleEdit = (item) => {
    setNewItem(item);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    setMenu(menu.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 'bold' }}>Vendor Dashboard</h1>

      {/* Profile */}
      <section style={{ background: '#f0f0f0', padding: 20, margin: '20px 0', borderRadius: 10 }}>
        <h2>Vendor Info</h2>
        <p><strong>ID:</strong> {vendor.vendorid}</p>
        <p><strong>Name:</strong> {vendor.name}</p>
        <p><strong>Contact:</strong> {vendor.contact}</p>
        <p><strong>Email:</strong> {vendor.email}</p>
        <p><strong>Address:</strong> {vendor.address}</p>
        <p><strong>Registered On:</strong> {new Date(vendor.registrationdate).toLocaleDateString()}</p>
      </section>

      {/* QR Code */}
      <section style={{ background: '#e1f5fe', padding: 20, margin: '20px 0', borderRadius: 10 }}>
        <h2>Restaurant QR Code</h2>
        {qrCodeValue && (
          <div>
            <QRCode value={qrCodeValue} size={128} />
            <p>Scans to: <code>{qrCodeValue}</code></p>
          </div>
        )}
      </section>

      {/* Menu CRUD */}
      <section style={{ background: '#fff', border: '1px solid #ddd', padding: 20, borderRadius: 10 }}>
        <h2>Menu Management</h2>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <input name="name" placeholder="Item" value={newItem.name} onChange={handleInputChange} />
          <input name="price" placeholder="Price" type="number" value={newItem.price} onChange={handleInputChange} />
          <input name="quantity" placeholder="Qty" type="number" value={newItem.quantity} onChange={handleInputChange} />
          <input name="rating" placeholder="Rating" type="number" step="0.1" value={newItem.rating} onChange={handleInputChange} />
          <button onClick={handleSave}>{editingId ? 'Update' : 'Add'}</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              <th>Name</th><th>Price</th><th>Quantity</th><th>Rating</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menu.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.rating}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)} style={{ marginLeft: 5 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default VendorPanel;
