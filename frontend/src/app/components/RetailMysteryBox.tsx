import { useState } from "react";
import {
  DndContext,
  closestCenter,
  useDroppable,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

/* ---------------- PRODUCT CARD ---------------- */
function ProductCard({ product, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="bg-white border rounded-lg p-2 cursor-pointer hover:shadow-md transition"
    >
      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
        <img
          src={
            product.images?.[0] ||
            product.image ||
            "https://via.placeholder.com/200x200?text=No+Image"
          }
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-[11px] font-semibold mt-1 line-clamp-1">
        {product.name}
      </p>

      <p className="text-[12px] text-blue-600 font-bold">
        ₹{product.price}
      </p>
    </div>
  );
}

/* ---------------- KIT ITEM ---------------- */
function KitItem({ item, onQtyChange, onRemove }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item._id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
      className="flex items-center gap-3 p-3 bg-white border rounded-xl shadow-sm cursor-grab"
    >
      <img
        src={
          item.images?.[0] ||
          item.image ||
          "https://via.placeholder.com/200x200?text=No+Image"
        }
        className="w-10 h-10 object-cover rounded"
      />

      <div className="flex-1">
        <p className="text-xs font-semibold">{item.name}</p>
        <p className="text-blue-600 font-bold">
          ₹{item.price} × {item.quantity}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            onQtyChange(item._id, Math.max(1, item.quantity - 1))
          }
          className="w-6 h-6 bg-gray-100 rounded"
        >
          -
        </button>

        <span className="text-sm font-bold">{item.quantity}</span>

        <button
          onClick={() => onQtyChange(item._id, item.quantity + 1)}
          className="w-6 h-6 bg-gray-100 rounded"
        >
          +
        </button>
      </div>

      <button
        onClick={() => onRemove(item._id)}
        className="text-red-500 font-bold"
      >
        ✕
      </button>
    </div>
  );
}

/* ---------------- CANVAS ---------------- */
function Canvas({ children, isOver, setNodeRef }: any) {
  return (
    <div
      ref={setNodeRef}
      className={`
        flex-1 rounded-2xl border-2 border-dashed p-4 overflow-y-auto transition
        ${isOver ? "bg-orange-50 border-orange-500" : "bg-gray-50"}
      `}
    >
      {children}
    </div>
  );
}

/* ---------------- PRICE ---------------- */
const calc = (items: any[]) => {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const qty = items.reduce((s, i) => s + i.quantity, 0);

  let discount = 0.05;
  if (qty >= 5) discount = 0.1;
  if (qty >= 10) discount = 0.2;

  const final = total - total * discount;

  return { total, final, qty, saved: total - final, discount };
};

/* ---------------- MAIN COMPONENT ---------------- */
export function RetailMysteryBox({
  products,
  onClose,
  onAddToCart,
}: any) {
  const [selected, setSelected] = useState<any[]>([]);

  const KIT_IMAGE =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxBmUA7hSusdzF49fBYb6HITiY4J4JKu7JtQ&s";

  const { isOver, setNodeRef } = useDroppable({ id: "kit-zone" });

  /* ADD */
  const addProduct = (p: any) => {
    const exists = selected.find((x) => x._id === p._id);

    if (exists) {
      setSelected((prev) =>
        prev.map((i) =>
          i._id === p._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setSelected([...selected, { ...p, quantity: 1 }]);
    }
  };

  const remove = (id: string) =>
    setSelected((prev) => prev.filter((i) => i._id !== id));

  const updateQty = (id: string, qty: number) =>
    setSelected((prev) =>
      prev.map((i) =>
        i._id === id ? { ...i, quantity: Math.max(1, qty) } : i
      )
    );

  const autoFill = () => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);

    setSelected(
      shuffled.slice(0, 6).map((p) => ({
        ...p,
        quantity: Math.floor(Math.random() * 3) + 1,
      }))
    );
  };

  const clearAll = () => setSelected([]);

  const pricing = calc(selected);

  const add = () => {
    onAddToCart({
      _id: "kit-" + Date.now(),
      image: KIT_IMAGE,
      name: "Custom Kit",
      type: "mystery_box",
      price: pricing.final,
      quantity: 1,
      bundleItems: selected,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 sm:p-4">

      <div className="
      w-full max-w-6xl
      h-[100dvh] sm:h-[90vh]
      bg-white rounded-2xl shadow-2xl
      flex flex-col lg:flex-row
      overflow-hidden relative
    ">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-xl font-bold z-10"
        >
          ✕
        </button>

        {/* LEFT - PRODUCTS */}
        <div className="
        w-full lg:w-1/4
        border-b lg:border-b-0 lg:border-r
        p-2 sm:p-3
        overflow-y-auto
        max-h-[30vh] lg:max-h-none
      ">
          <h3 className="font-bold mb-2 text-sm sm:text-base">
            Products
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-2">
            {products.map((p: any) => (
              <ProductCard
                key={p._id}
                product={p}
                onClick={() => addProduct(p)}
              />
            ))}
          </div>
        </div>

        {/* CENTER - KIT */}
        <div className="
        flex-1
        p-2 sm:p-4
        flex flex-col
        min-h-0
        overflow-hidden
      ">

          {/* HEADER */}
          <div className="
          flex flex-col sm:flex-row
          sm:items-center sm:justify-between
          gap-2 mb-2 sm:mb-3
        ">
            <h2 className="font-bold text-base sm:text-lg">
              🧩 Build Kit
            </h2>

            <div className="flex gap-2">
              <button
                onClick={autoFill}
                className="px-2 sm:px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg font-semibold"
              >
                ⚡ Auto Fill
              </button>

              <button
                onClick={clearAll}
                className="px-2 sm:px-3 py-1 text-xs bg-red-100 text-red-700 rounded-lg font-semibold"
              >
                🗑 Clear
              </button>
            </div>
          </div>

          {/* DRAG AREA */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={(event) => {
                const { active, over } = event;
                if (!over) return;

                const oldIndex = selected.findIndex(i => i._id === active.id);
                const newIndex = selected.findIndex(i => i._id === over.id);

                setSelected(arrayMove(selected, oldIndex, newIndex));
              }}
            >
              <SortableContext
                items={selected.map(i => i._id)}
                strategy={verticalListSortingStrategy}
              >
                <div
                  ref={setNodeRef}
                  className={`
                  h-full
                  overflow-y-auto
                  rounded-2xl
                  border-2 border-dashed
                  p-2 sm:p-4
                  ${isOver ? "bg-orange-50 border-orange-500" : "bg-gray-50"}
                `}
                >
                  {selected.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                      Tap products to add
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selected.map((item) => (
                        <KitItem
                          key={item._id}
                          item={item}
                          onQtyChange={updateQty}
                          onRemove={remove}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* RIGHT - SUMMARY (FIXED OVERLAP ISSUE) */}
        <div className="
        w-full lg:w-80
        border-t lg:border-t-0 lg:border-l
        p-3 sm:p-4
        bg-white
        flex flex-col
        gap-3
        max-h-[35vh] lg:max-h-none
        overflow-y-auto
      ">

          <h3 className="font-bold text-base sm:text-lg">
            📊 Summary
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Items</span>
              <span className="font-semibold">{pricing.qty}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Base</span>
              <span className="font-semibold">
                ₹{pricing.total.toFixed(0)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Discount</span>
              <span className="text-blue-600 font-bold">
                {(pricing.discount * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-3">
            <p className="text-xs text-green-700">Savings</p>
            <p className="text-lg sm:text-xl font-bold text-green-700">
              ₹{pricing.saved.toFixed(0)}
            </p>
          </div>

          <button
            onClick={add}
            disabled={selected.length === 0}
            className={`
            mt-auto py-3 rounded-xl font-bold transition text-sm sm:text-base
            ${selected.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:scale-[1.02]"
              }
          `}
          >
            🚀 Create Kit
          </button>
        </div>

      </div>
    </div>
  );
}