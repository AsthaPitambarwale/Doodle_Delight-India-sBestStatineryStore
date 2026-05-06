import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

export default function InvoicePreview({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(true);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${BASE_URL}/orders/invoice/${orderId}`,
        );

        if (!res.ok) throw new Error("Failed to load invoice");

        const blob = await res.blob();

        if (blob.size === 0) {
          throw new Error("Empty invoice received");
        }

        const url = URL.createObjectURL(blob);
        setInvoiceUrl(url);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error loading invoice");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchInvoice();

    return () => {
      if (invoiceUrl) URL.revokeObjectURL(invoiceUrl);
    };
  }, [orderId]);

  if (loading) {
    return <div className="p-10 text-center">Loading invoice...</div>;
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-white shadow">
        <h2 className="font-bold text-lg">Invoice #{orderId}</h2>

        <a
          href={invoiceUrl || ""}
          download={`invoice-${orderId}.pdf`}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Download
        </a>
      </div>

      {invoiceUrl && (
        <iframe
          src={invoiceUrl}
          title="Invoice Preview"
          className="w-full h-[90vh]"
        />
      )}
    </div>
  );
}