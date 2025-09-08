import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, PlusCircle, Save, Trash2, Printer, ArrowLeft, Shield, Hash, CalendarDays } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

type InvoiceItem = { id: string; title: string; description: string; amount?: number; quantity?: number; unitPrice?: number };
type Invoice = {
    id: string;
    invoiceNumber: string;
    issueDate: string;
    clientName: string;
    clientAddress?: string;
    fromAddress: string;
    toAddress: string;
    items: InvoiceItem[];
    notes: string;
    professional?: string;
    taxPercent: number;
    discount: number;
    createdAt: string;
    updatedAt: string;
};

const uid = () => Math.random().toString(36).slice(2);
const LOCAL_KEY = 'admin_invoices_storage_v1';
const readLocal = (): Invoice[] => { try { const r = localStorage.getItem(LOCAL_KEY); return r ? JSON.parse(r) : []; } catch { return []; } };
const writeLocal = (data: Invoice[]) => localStorage.setItem(LOCAL_KEY, JSON.stringify(data));

const AdminInvoiceBuilder: React.FC = () => {
    const { user, isAdmin, loading } = useAuth();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const editingId = params.get('id');

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [invoiceNumber, setInvoiceNumber] = useState<string>(() => `INV-${Date.now().toString().slice(-6)}`);
    const [issueDate, setIssueDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
    const [clientName, setClientName] = useState('');
    // Client address removed per requirements; keeping variable to maintain backward compatibility but not shown in UI
    const [clientAddress, setClientAddress] = useState('');
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [professional, setProfessional] = useState('');
    const [taxPercent, setTaxPercent] = useState<number>(5);
    const [discount, setDiscount] = useState<number>(0);
    const [items, setItems] = useState<InvoiceItem[]>([{ id: uid(), title: '', description: '', quantity: 1, unitPrice: 0 }]);

    useEffect(() => { if (loading) return; if (!user || !isAdmin) { navigate('/admin/login'); } }, [user, isAdmin, loading, navigate]);

    useEffect(() => {
        if (!editingId) return;
        const local = readLocal();
        const found = local.find(i => i.id === editingId);
        if (found) {
            setInvoiceNumber(found.invoiceNumber);
            setIssueDate(found.issueDate);
            setClientName(found.clientName);
            setClientAddress((found as any).clientAddress || '');
            // Backwards compatible for older saved invoices
            setFromAddress((found as any).fromAddress || '');
            setToAddress((found as any).toAddress || '');
            setItems(found.items);
            setNotes(found.notes);
            setProfessional((found as any).professional || '');
            setTaxPercent(found.taxPercent);
            setDiscount(found.discount);
        }
    }, [editingId]);

    const itemTotal = (i: InvoiceItem) => {
        const q = Number(i.quantity);
        const u = Number(i.unitPrice);
        if (!isNaN(q) && !isNaN(u)) return Math.max(0, (q || 0) * (u || 0));
        return Number(i.amount) || 0;
    };
    const subtotal = useMemo(() => items.reduce((s, i) => s + itemTotal(i), 0), [items]);
    const taxAmount = useMemo(() => (subtotal * (Number(taxPercent) || 0)) / 100, [subtotal, taxPercent]);
    const total = useMemo(() => Math.max(0, subtotal + taxAmount - (Number(discount) || 0)), [subtotal, taxAmount, discount]);

    const addItem = () => setItems(p => [...p, { id: uid(), title: '', description: '', quantity: 1, unitPrice: 0 }]);
    const removeItem = (id: string) => setItems(p => p.filter(i => i.id !== id));
    const updateItem = (id: string, patch: Partial<InvoiceItem>) => setItems(p => p.map(i => (i.id === id ? { ...i, ...patch } : i)));

    const saveInvoice = async () => {
        setSaving(true); setMessage(null);
        const now = new Date().toISOString();
        const inv: Invoice = { id: editingId || uid(), invoiceNumber, issueDate, clientName, clientAddress, fromAddress, toAddress, items, notes, professional, taxPercent, discount, createdAt: now, updatedAt: now };
        // Local-first for invoices
        const local = readLocal();
        const idx = local.findIndex(i => i.id === inv.id);
        if (idx >= 0) local[idx] = inv; else local.unshift(inv);
        writeLocal(local);
        setSaving(false);
        setMessage('Invoice saved');
        if (!editingId) navigate(`/admin/invoices/new?id=${inv.id}`, { replace: true });
    };

    const printPdf = () => {
        const win = window.open('', '_blank'); if (!win) return;
        const rows = items.map(i => {
            const qty = Number(i.quantity || 0);
            const unit = Number(i.unitPrice || 0);
            const totalVal = itemTotal(i);
            return `<tr>
                <td><strong>${i.title || ''}</strong><div style="color:#6b7280">${i.description || ''}</div></td>
                <td style="text-align:center">${qty || ''}</td>
                <td style="text-align:right">${unit.toFixed(2)}</td>
                <td style="text-align:right">${totalVal.toFixed(2)}</td>
            </tr>`;
        }).join('');
        win.document.write(`
      <html><head><title>Invoice ${invoiceNumber}</title>
      <style>
        body{font-family:Arial,Helvetica,sans-serif;color:#0f172a;margin:40px;line-height:1.5}
        .topbar{height:16px;background:#f45d2d;margin:-40px -40px 24px -40px}
        .header{display:grid;grid-template-columns:1.5fr 1fr;gap:24px;align-items:center}
        .brand{display:flex;gap:14px;align-items:center}
        .logo{width:56px;height:56px;border-radius:50%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;color:#6b7280;font-weight:700}
        .company h1{font-size:20px;margin:0}
        .muted{color:#64748b}
        .invoiceTitle{font-size:28px;font-weight:800;text-align:right}
        .pillLabel{font-size:12px;color:#1f2937;font-weight:700;margin-top:16px;border-top:1px solid #e5e7eb;padding-top:10px}
        .grid2{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:12px}
        table{width:100%;border-collapse:collapse;margin-top:16px}
        th,td{border:1px solid #e5e7eb;padding:10px;vertical-align:top}
        th{background:#f45d2d;color:#fff;text-align:left}
        th:nth-child(2), td:nth-child(2){text-align:center;width:80px}
        th:nth-child(3), td:nth-child(3), th:nth-child(4), td:nth-child(4){text-align:right;width:140px}
        .right{text-align:right}
        .totals{margin-top:10px;max-width:320px;margin-left:auto}
        .totals .row{display:flex;justify-content:space-between;padding:6px 0}
        .totals .em{font-weight:700;color:#111827}
        .footer{margin-top:16px}
        .printbar{position:sticky;top:0;background:#ffffff;border:1px solid #e5e7eb;padding:8px 12px;border-radius:8px;display:inline-flex;gap:8px;align-items:center}
        .printbtn{background:#111827;color:#fff;border:none;border-radius:6px;padding:8px 12px;cursor:pointer}
        @page { size: A4; margin: 8mm; }
        * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        @media print {
          body{ margin: 0 }
          .topbar{ margin: 0 0 12px 0 }
          .printbar{ display:none }
          th,td{ padding:8px }
        }
      </style>
      </head><body>
        <div class="topbar"></div>
        <div class="printbar">
          <span class="muted">Preview ready.</span>
          <button class="printbtn" onclick="window.print()">Print / Download PDF</button>
        </div>
        <div class="header">
          <div class="brand">
            <div class="logo">LOGO</div>
            <div class="company">
              <h1>Wing Movers</h1>
              <div class="muted">Your address</div>
              <div class="muted">Your contact details</div>
            </div>
          </div>
          <div>
            <div class="invoiceTitle">INVOICE</div>
            <div class="pillLabel">DATE</div>
            <div>${issueDate}</div>
            <div class="pillLabel">INVOICE NO.</div>
            <div>${invoiceNumber}</div>
          </div>
        </div>
        <div class="grid2">
          <div>
            <div class="pillLabel">BILL TO</div>
            <div><strong>${clientName || '—'}</strong></div>
            <div class="muted">${fromAddress || '—'}</div>
          </div>
          <div>
            <div class="pillLabel">SHIP TO</div>
            <div><strong>${clientName || '—'}</strong></div>
            <div class="muted">${toAddress || '—'}</div>
          </div>
        </div>
        <div style="margin-top:16px">
          <table>
            <thead><tr><th>DESCRIPTION</th><th>QTY</th><th>UNIT PRICE</th><th>TOTAL</th></tr></thead>
            <tbody>${rows || '<tr><td colspan="4" class="muted">No items</td></tr>'}</tbody>
          </table>
          <div class="totals">
            <div class="row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div class="row"><span>Tax (${taxPercent}%)</span><span>${taxAmount.toFixed(2)}</span></div>
            <div class="row"><span>Discount</span><span>-${Number(discount || 0).toFixed(2)}</span></div>
            <div class="row em"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
        <div class="footer">
          <div style="font-weight:700; margin-bottom:6px">Professional</div>
          <div class="muted" style="margin-bottom:10px">${professional || '—'}</div>
          <div style="font-weight:700">Notes / Payment Instructions</div>
          <div class="muted">${notes || '—'}</div>
        </div>
        <script>
          document.title = 'Invoice ' + ${JSON.stringify(invoiceNumber)};
          setTimeout(function(){ try{ window.print(); } catch(e){} }, 300);
        </script>
      </body></html>
    `);
        win.document.close(); win.focus();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => navigate('/admin/dashboard')} className="inline-flex items-center text-blue-600 hover:text-blue-800">
                        <ArrowLeft className="h-5 w-5 mr-1" /> Back to Dashboard
                    </button>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                        <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Create Invoice</h1>
                            <p className="text-sm text-gray-600">Generate a professional invoice and download as PDF</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={saveInvoice} disabled={saving} className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50">
                                <Save className="h-4 w-4 mr-2" /> {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button onClick={printPdf} className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-black text-white rounded-lg">
                                <Printer className="h-4 w-4 mr-2" /> Download PDF
                            </button>
                        </div>
                    </div>

                    {message && <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-800 border border-green-200">{message}</div>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                            <div className="flex items-center">
                                <Hash className="h-4 w-4 text-gray-400 mr-2" />
                                <input value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
                            <div className="flex items-center">
                                <CalendarDays className="h-4 w-4 text-gray-400 mr-2" />
                                <input type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                            <input value={clientName} onChange={e => setClientName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Client full name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">From Address</label>
                            <input value={fromAddress} onChange={e => setFromAddress(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Origin / Pickup" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">To Address</label>
                            <input value={toAddress} onChange={e => setToAddress(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Destination / Drop-off" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Professional (comments / description)</label>
                            <textarea value={professional} onChange={e => setProfessional(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Add any professional notes, descriptions, or terms" rows={4} />
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center"><FileText className="h-5 w-5 mr-2" />Invoice Items</h2>
                            <button onClick={addItem} className="inline-flex items-center px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg"><PlusCircle className="h-4 w-4 mr-1" />Add Item</button>
                        </div>
                        <div className="space-y-4">
                            {items.map((it) => (
                                <div key={it.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-white rounded-xl border border-gray-200 p-3">
                                    <div className="md:col-span-4">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                                        <input value={it.title} onChange={e => updateItem(it.id, { title: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., Packing & Moving" />
                                    </div>
                                    <div className="md:col-span-4">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                                        <input value={it.description} onChange={e => updateItem(it.id, { description: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Details" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Qty</label>
                                        <input type="number" min="0" step="1" value={it.quantity ?? 1} onChange={e => updateItem(it.id, { quantity: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Unit Price</label>
                                        <input type="number" min="0" step="0.01" value={it.unitPrice ?? 0} onChange={e => updateItem(it.id, { unitPrice: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div className="md:col-span-12 flex items-center justify-between">
                                        <div className="text-sm text-gray-600">Item Total: <span className="font-semibold">{itemTotal(it).toFixed(2)}</span></div>
                                        <button onClick={() => removeItem(it.id)} className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-white hover:bg-red-600 rounded-lg">
                                            <Trash2 className="h-4 w-4 mr-1" />Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tax %</label>
                            <input type="number" min="0" step="0.01" value={taxPercent} onChange={e => setTaxPercent(Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
                            <input type="number" min="0" step="0.01" value={discount} onChange={e => setDiscount(Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Subtotal</span><span className="font-semibold">{subtotal.toFixed(2)}</span></div>
                            <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Tax</span><span className="font-semibold">{taxAmount.toFixed(2)}</span></div>
                            <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Discount</span><span className="font-semibold">-{Number(discount || 0).toFixed(2)}</span></div>
                            <div className="mt-2 pt-2 border-t border-blue-200 flex items-center justify-between"><span className="text-sm text-gray-800">Total</span><span className="text-lg font-bold text-blue-700">{total.toFixed(2)}</span></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminInvoiceBuilder;


