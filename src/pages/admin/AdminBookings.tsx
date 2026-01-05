import React, { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";


const apiClient = {
  getAllBookings: async () => fetch("/api/bookings/all").then(res => res.json()),
  createBooking: async (data: any) => fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(res => res.json()),
  updateBooking: async (id: string, data: any) => fetch(`/api/bookings/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(res => res.json()),
  cancelBooking: async (id: string) => fetch(`/api/bookings/${id}/cancel`, { method: "POST" }),
  checkoutBooking: async (id: string) => fetch(`/api/bookings/${id}/checkout`, { method: "POST" }),
  printBill: async (id: string) => window.open(`/api/bookings/${id}/bill`, "_blank"),
  addMenuItem: async (id: string, item: any) => fetch(`/api/bookings/${id}/menu`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) }).then(res => res.json()),
  getCottages: async () => fetch("/api/cottages").then(res => res.json()),
};

interface Booking {
  id: string;
  guestName: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  cottage: string;
  status: string;
  menuItems?: { name: string; qty: number; price: number }[];
  total?: number;
}


const emptyBooking: any = {
  guestName: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  cottage: "",
  status: "booked",
  extraBeds: 0,
  menuItems: [],
};

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [cottages, setCottages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<any>(emptyBooking);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [menuDialog, setMenuDialog] = useState(false);
  const [menuForm, setMenuForm] = useState({ name: "", qty: 1, price: 0 });
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [bookingsData, cottagesData] = await Promise.all([
          apiClient.getAllBookings(),
          apiClient.getCottages(),
        ]);
        setBookings(Array.isArray(bookingsData) ? bookingsData : []);
        setCottages(Array.isArray(cottagesData) ? cottagesData : []);
      } catch {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "number" ? Number(value) : value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiClient.updateBooking(editingId, form);
        toast.success("Booking updated");
      } else {
        await apiClient.createBooking(form);
        toast.success("Booking added");
      }
      setDialogOpen(false);
      setForm(emptyBooking);
      setEditingId(null);
      setLoading(true);
      const bookingsData = await apiClient.getAllBookings();
      setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      setLoading(false);
    } catch {
      toast.error("Failed to save booking");
    }
  };


  const handleEdit = (b: any) => {
    setForm(b);
    setEditingId(b.id);
    setDialogOpen(true);
  };


  const handleCancel = async (id: string) => {
    if (!window.confirm("Cancel this booking?")) return;
    await apiClient.cancelBooking(id);
    toast.success("Booking cancelled");
    setBookings(await apiClient.getAllBookings());
  };

  const handleCheckout = async (id: string) => {
    if (!window.confirm("Checkout this booking?")) return;
    await apiClient.checkoutBooking(id);
    toast.success("Checked out");
    setBookings(await apiClient.getAllBookings());
  };


  const handlePrintBill = (id: string) => apiClient.printBill(id);


  const handleMenuAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingId) return;
    await apiClient.addMenuItem(selectedBookingId, menuForm);
    toast.success("Menu item added");
    setMenuDialog(false);
    setMenuForm({ name: "", qty: 1, price: 0 });
    setBookings(await apiClient.getAllBookings());
  };

  // Get selected cottage details
  const selectedCottage = cottages.find(c => c.id === form.cottage);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
      <h2 className="text-2xl font-bold mb-6">Bookings Management</h2>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button
            style={{
              background: "#b08643",
              color: "#fff",
              border: 0,
              padding: "10px 28px",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 18,
              marginBottom: 24,
            }}
            onClick={() => {
              setForm(emptyBooking);
              setEditingId(null);
              setDialogOpen(true);
            }}
          >
            Add Offline Booking
          </button>
        </DialogTrigger>
        <DialogContent style={{ maxWidth: 500, width: "95vw", padding: 32, borderRadius: 16 }}>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Booking" : "Add Booking"}</DialogTitle>
            <DialogDescription>Fill in all booking details.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input name="guestName" placeholder="Guest Name" value={form.guestName || ""} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }} />
            <input name="phone" placeholder="Phone" value={form.phone || ""} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }} />
            <input name="checkIn" type="date" placeholder="Check-in" value={form.checkIn || ""} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }} />
            <input name="checkOut" type="date" placeholder="Check-out" value={form.checkOut || ""} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }} />
            <select name="cottage" value={form.cottage || ""} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}>
              <option value="">Select Cottage</option>
              {cottages.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.available === false ? "(Unavailable)" : ""}
                </option>
              ))}
            </select>
            {selectedCottage && selectedCottage.extraBedAllowed && (
              <input
                name="extraBeds"
                type="number"
                min={0}
                max={selectedCottage.extra_bedding || 0}
                value={form.extraBeds || 0}
                onChange={handleChange}
                placeholder={`Extra Beds (max ${selectedCottage.extra_bedding || 0})`}
                style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
              />
            )}
            <select name="status" value={form.status || "booked"} onChange={handleChange} style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}>
              <option value="booked">Booked</option>
              <option value="checked_in">Checked In</option>
              <option value="checked_out">Checked Out</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button type="submit" style={{ background: "#b08643", color: "#fff", border: 0, padding: "10px 28px", borderRadius: 6, fontWeight: 600 }}>Save</button>
              <DialogClose asChild>
                <button type="button" style={{ background: "#eee", color: "#333", border: 0, padding: "10px 28px", borderRadius: 6 }}>Cancel</button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Menu Item Dialog */}
      <Dialog open={menuDialog} onOpenChange={setMenuDialog}>
        <DialogContent style={{ maxWidth: 400, width: "95vw", padding: 24, borderRadius: 12 }}>
          <DialogHeader>
            <DialogTitle>Add Menu Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleMenuAdd} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input name="name" placeholder="Item Name" value={menuForm.name} onChange={e => setMenuForm(f => ({ ...f, name: e.target.value }))} required style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            <input name="qty" type="number" placeholder="Quantity" value={menuForm.qty} min={1} onChange={e => setMenuForm(f => ({ ...f, qty: Number(e.target.value) }))} required style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            <input name="price" type="number" placeholder="Price" value={menuForm.price} min={0} onChange={e => setMenuForm(f => ({ ...f, price: Number(e.target.value) }))} required style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button type="submit" style={{ background: "#b08643", color: "#fff", border: 0, padding: "8px 20px", borderRadius: 6, fontWeight: 600 }}>Add</button>
              <DialogClose asChild>
                <button type="button" style={{ background: "#eee", color: "#333", border: 0, padding: "8px 20px", borderRadius: 6 }}>Cancel</button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Bookings Table */}
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #0001", padding: 24 }}>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f0e6d6" }}>
                <th style={{ padding: 10, borderRadius: 6 }}>Guest</th>
                <th style={{ padding: 10 }}>Phone</th>
                <th style={{ padding: 10 }}>Check-In</th>
                <th style={{ padding: 10 }}>Check-Out</th>
                <th style={{ padding: 10 }}>Cottage</th>
                <th style={{ padding: 10 }}>Extra Beds</th>
                <th style={{ padding: 10 }}>Status</th>
                <th style={{ padding: 10 }}>Menu Items</th>
                <th style={{ padding: 10 }}>Total</th>
                <th style={{ padding: 10 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: 10 }}>{b.guestName}</td>
                  <td style={{ padding: 10 }}>{b.phone}</td>
                  <td style={{ padding: 10 }}>{b.checkIn}</td>
                  <td style={{ padding: 10 }}>{b.checkOut}</td>
                  <td style={{ padding: 10 }}>{cottages.find(c => c.id === b.cottage)?.name || b.cottage}</td>
                  <td style={{ padding: 10 }}>{b.extraBeds || "-"}</td>
                  <td style={{ padding: 10 }}>{b.status}</td>
                  <td style={{ padding: 10 }}>
                    {b.menuItems && b.menuItems.length > 0 ? (
                      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        {b.menuItems.map((m, i) => (
                          <li key={i}>{m.name} x{m.qty} - ₹{m.price}</li>
                        ))}
                      </ul>
                    ) : (
                      <span style={{ color: "#aaa" }}>-</span>
                    )}
                  </td>
                  <td style={{ padding: 10 }}>{b.total ? `₹${b.total}` : "-"}</td>
                  <td style={{ padding: 10, display: "flex", gap: 6 }}>
                    <button onClick={() => handleEdit(b)} style={{ background: "#f0e6d6", color: "#7a5c1c", border: 0, padding: "6px 10px", borderRadius: 4 }}>Edit</button>
                    <button onClick={() => { setSelectedBookingId(b.id); setMenuDialog(true); }} style={{ background: "#e6f0d6", color: "#1c7a5c", border: 0, padding: "6px 10px", borderRadius: 4 }}>Add Menu</button>
                    <button onClick={() => handleCancel(b.id)} style={{ background: "#fff0f0", color: "#b00", border: 0, padding: "6px 10px", borderRadius: 4 }}>Cancel</button>
                    <button onClick={() => handleCheckout(b.id)} style={{ background: "#d6e6f0", color: "#1c3c7a", border: 0, padding: "6px 10px", borderRadius: 4 }}>Checkout</button>
                    <button onClick={() => handlePrintBill(b.id)} style={{ background: "#f0e6d6", color: "#7a5c1c", border: 0, padding: "6px 10px", borderRadius: 4 }}>Print Bill</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;