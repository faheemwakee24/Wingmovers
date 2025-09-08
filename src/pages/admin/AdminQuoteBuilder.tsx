import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, PlusCircle, Save, Trash2, Printer, ArrowLeft, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

type QuoteItem = {
    id: string;
    title: string;
    description: string;
    amount: number;
};

type Quote = {
    id: string;
    clientName: string;
    originAddress: string;
    destinationAddress: string;
    notes: string;
    items: QuoteItem[];
    taxPercent: number;
    discount: number;
    createdAt: string;
    updatedAt: string;
};

const uid = () => Math.random().toString(36).slice(2);

const LOCAL_STORAGE_KEY = 'admin_quotes_storage_v1';

const loadLocalQuotes = (): Quote[] => {
    try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        return raw ? (JSON.parse(raw) as Quote[]) : [];
    } catch {
        return [];
    }
};

const saveLocalQuotes = (quotes: Quote[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quotes));
};

const AdminQuoteBuilder: React.FC = () => {
    const { user, isAdmin, loading } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editingId = searchParams.get('id');

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [clientName, setClientName] = useState('');
    const [originAddress, setOriginAddress] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [taxPercent, setTaxPercent] = useState<number>(5);
    const [discount, setDiscount] = useState<number>(0);
    const [items, setItems] = useState<QuoteItem[]>([
        { id: uid(), title: '', description: '', amount: 0 },
    ]);

    useEffect(() => {
        if (loading) return;
        if (!user || !isAdmin) {
            navigate('/admin/login');
            return;
        }
    }, [user, isAdmin, loading, navigate]);

    useEffect(() => {
        if (!editingId) return;
        const local = loadLocalQuotes();
        const found = local.find(q => q.id === editingId);
        if (found) {
            setClientName(found.clientName);
            setOriginAddress(found.originAddress);
            setDestinationAddress(found.destinationAddress);
            setNotes(found.notes);
            setTaxPercent(found.taxPercent);
            setDiscount(found.discount);
            setItems(found.items);
        }
    }, [editingId]);

    const subtotal = useMemo(() => items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0), [items]);
    const taxAmount = useMemo(() => (subtotal * (Number(taxPercent) || 0)) / 100, [subtotal, taxPercent]);
    const total = useMemo(() => Math.max(0, subtotal + taxAmount - (Number(discount) || 0)), [subtotal, taxAmount, discount]);

    const addItem = () => setItems(prev => [...prev, { id: uid(), title: '', description: '', amount: 0 }]);
    const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
    const updateItem = (id: string, patch: Partial<QuoteItem>) => setItems(prev => prev.map(i => (i.id === id ? { ...i, ...patch } : i)));

    const saveQuote = async () => {
        setSaving(true);
        setMessage(null);
        const now = new Date().toISOString();
        const newQuote: Quote = {
            id: editingId || uid(),
            clientName,
            originAddress,
            destinationAddress,
            notes,
            items,
            taxPercent,
            discount,
            createdAt: now,
            updatedAt: now,
        };

        // Try Supabase first
        let saved = false;
        try {
            if (!user) throw new Error('No user');
            const { error: qErr } = await supabase.from('admin_quotes').insert({
                id: newQuote.id,
                admin_id: user.id,
                client_name: newQuote.clientName,
                origin_address: newQuote.originAddress,
                destination_address: newQuote.destinationAddress,
                notes: newQuote.notes,
                tax_percent: newQuote.taxPercent,
                discount: newQuote.discount,
                created_at: newQuote.createdAt,
                updated_at: newQuote.updatedAt,
            }).select('*');
            if (qErr) throw qErr;

            // Replace items (upsert-like)
            const { error: delErr } = await supabase.from('admin_quote_items').delete().eq('quote_id', newQuote.id);
            if (delErr) throw delErr;
            if (newQuote.items.length) {
                const { error: insErr } = await supabase.from('admin_quote_items').insert(
                    newQuote.items.map(i => ({ id: i.id, quote_id: newQuote.id, title: i.title, description: i.description, amount: i.amount }))
                );
                if (insErr) throw insErr;
            }
            saved = true;
        } catch (e) {
            // Fallback to local storage
            const local = loadLocalQuotes();
            const existsIndex = local.findIndex(q => q.id === newQuote.id);
            if (existsIndex >= 0) local[existsIndex] = newQuote; else local.unshift(newQuote);
            saveLocalQuotes(local);
            saved = true;
        }

        setSaving(false);
        if (saved) {
            setMessage('Quote saved successfully');
            if (!editingId) navigate(`/admin/quotes/new?id=${newQuote.id}`, { replace: true });
        } else {
            setMessage('Failed to save quote');
        }
    };

    const printPdf = () => {
        const win = window.open('', '_blank');
        if (!win) return;
        const styles = `
      <style>
        body { font-family: Arial, sans-serif; color: #111827; }
        .header { display:flex; justify-content: space-between; align-items:center; }
        .brand { font-size: 20px; font-weight: 800; color: #1f2937; }
        .tag { color:#2563eb; font-weight:700; }
        .section { margin-top: 16px; }
        .muted { color:#6b7280; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th, td { border: 1px solid #e5e7eb; padding: 8px; text-align:left; vertical-align: top; }
        th { background: #f3f4f6; }
        .right { text-align: right; }
      </style>
    `;
        const rows = items.map(i => `<tr><td><strong>${i.title || ''}</strong><div class="muted">${i.description || ''}</div></td><td class="right">${Number(i.amount || 0).toFixed(2)}</td></tr>`).join('');
        win.document.write(`
      <html><head><title>Quote - ${clientName}</title>${styles}</head>
      <body>
        <div class="header">
          <div class="brand">Wing Movers <span class="tag">Quote</span></div>
          <div class="muted">${new Date().toLocaleDateString()}</div>
        </div>
        <div class="section">
          <div><strong>Client:</strong> ${clientName || '-'}</div>
          <div><strong>Origin:</strong> ${originAddress || '-'}</div>
          <div><strong>Destination:</strong> ${destinationAddress || '-'}</div>
        </div>
        <div class="section">
          <table>
            <thead><tr><th>Item</th><th class="right">Amount</th></tr></thead>
            <tbody>${rows || '<tr><td colspan="2" class="muted">No items</td></tr>'}</tbody>
            <tfoot>
              <tr><td class="right"><strong>Subtotal</strong></td><td class="right">${subtotal.toFixed(2)}</td></tr>
              <tr><td class="right"><strong>Tax (${taxPercent}%)</strong></td><td class="right">${taxAmount.toFixed(2)}</td></tr>
              <tr><td class="right"><strong>Discount</strong></td><td class="right">-${Number(discount || 0).toFixed(2)}</td></tr>
              <tr><td class="right"><strong>Total</strong></td><td class="right"><strong>${total.toFixed(2)}</strong></td></tr>
            </tfoot>
          </table>
        </div>
        <div class="section">
          <div><strong>Notes</strong></div>
          <div class="muted">${notes || '—'}</div>
        </div>
      </body></nhtml>
    `);
        win.document.close();
        win.focus();
        win.print();
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
                            <h1 className="text-2xl font-bold text-gray-900">Create Quote</h1>
                            <p className="text-sm text-gray-600">Generate a detailed quote and download as PDF</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={saveQuote} disabled={saving} className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50">
                                <Save className="h-4 w-4 mr-2" /> {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button onClick={printPdf} className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-black text-white rounded-lg">
                                <Printer className="h-4 w-4 mr-2" /> Download PDF
                            </button>
                        </div>
                    </div>

                    {message && (
                        <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-800 border border-green-200">{message}</div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                            <input value={clientName} onChange={e => setClientName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Client full name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Origin Address</label>
                            <input value={originAddress} onChange={e => setOriginAddress(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="From" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Destination Address</label>
                            <input value={destinationAddress} onChange={e => setDestinationAddress(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="To" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Notes / Terms</label>
                            <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" rows={3} placeholder="Special instructions, terms and conditions" />
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center"><FileText className="h-5 w-5 mr-2" />Quote Items</h2>
                            <button onClick={addItem} className="inline-flex items-center px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg"><PlusCircle className="h-4 w-4 mr-1" />Add Item</button>
                        </div>

                        <div className="space-y-4">
                            {items.map((it) => (
                                <div key={it.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-white rounded-xl border border-gray-200 p-3">
                                    <div className="md:col-span-3">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                                        <input value={it.title} onChange={e => updateItem(it.id, { title: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., Packing & Moving" />
                                    </div>
                                    <div className="md:col-span-7">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                                        <input value={it.description} onChange={e => updateItem(it.id, { description: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Details of service" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Amount</label>
                                        <input type="number" min="0" step="0.01" value={it.amount} onChange={e => updateItem(it.id, { amount: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div className="md:col-span-12 flex justify-end">
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

export default AdminQuoteBuilder;


