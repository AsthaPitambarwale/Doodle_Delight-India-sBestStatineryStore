import { Users, Sparkles, Send } from "lucide-react";
import { useState } from "react";
import { PageLayout } from "../components/PageLayout";

export function Careers() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Careers at Doodle Delight</h1>

        <p className="text-gray-600 text-lg mb-10">
          Build your career with one of India’s fastest-growing stationery
          brands.
        </p>

        {/* WHY JOIN */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border-2">
            <Sparkles className="text-orange-500 mb-3" />
            <h3 className="font-bold text-xl">Growth Opportunities</h3>
            <p className="text-gray-600">
              Learn, grow, and build your future with us.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2">
            <Users className="text-orange-500 mb-3" />
            <h3 className="font-bold text-xl">Great Culture</h3>
            <p className="text-gray-600">
              Friendly, fast-paced, and collaborative environment.
            </p>
          </div>
        </div>

        {/* JOB LISTINGS */}
        <div className="bg-white p-8 rounded-2xl border-2">
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>

          <div className="space-y-4">
            <JobRow
              title="Frontend Developer"
              desc="React, Tailwind, UI Systems"
              onApply={() => setSelectedJob("Frontend Developer")}
            />

            <JobRow
              title="Logistics Manager"
              desc="Supply chain & delivery ops"
              onApply={() => setSelectedJob("Logistics Manager")}
            />

            <JobRow
              title="Customer Support Executive"
              desc="Handle queries & orders"
              onApply={() => setSelectedJob("Customer Support Executive")}
            />
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Apply for {selectedJob}</h2>

            <input
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Your Name"
            />
            <input
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Email Address"
            />
            <input
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Resume Link"
            />
            <textarea
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Why should we hire you?"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedJob(null)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  showToast("Application submitted!", "success");
                  setSelectedJob(null);
                }}
                className="flex-1 bg-orange-500 text-white py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
          {toast && (
            <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:w-auto">
              <div
                className={`px-6 py-3 rounded-xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top
      ${
        toast.type === "success"
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200"
      }`}
              >
                <span className="font-semibold">{toast.message}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
}

/* JOB COMPONENT */
function JobRow({
  title,
  desc,
  onApply,
}: {
  title: string;
  desc: string;
  onApply: () => void;
}) {
  return (
    <div className="border rounded-xl p-4 flex items-center justify-between">
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-gray-600 text-sm">{desc}</p>
      </div>

      <button
        onClick={onApply}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <Send className="w-4 h-4" />
        Apply
      </button>
    </div>
  );
}
