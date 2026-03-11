"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  name: string;
  onContentChange?: (html: string) => void;
  initialValue?: string;
}

const FOLDER_CONTENT_IMAGES = "kali-blog/content";

export const IMAGE_SIZES = [
  { id: "small", label: "Pequeño (400px)", value: "400" },
  { id: "medium", label: "Mediano (600px)", value: "600" },
  { id: "large", label: "Grande (800px)", value: "800" },
  { id: "full", label: "Completo (100%)", value: "100%" },
] as const;

function escapeHtmlAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Quill attaches the editor to the .ql-container node; we resolve it from our wrapper (works with dynamic import). */
async function getQuillFromDom(wrapper: HTMLElement | null): Promise<{
  pasteHTML: (index: number, html: string) => void;
  getLeaf: (index: number) => [unknown, number] | null;
  getSelection: (focus?: boolean) => { index: number; length: number } | null;
  getLength: () => number;
  root: { innerHTML: string };
} | null> {
  if (!wrapper) return null;
  const qlContainer = wrapper.querySelector(".ql-container");
  if (!qlContainer) return null;
  const Quill = (await import("quill")).default;
  const quill = Quill.find(qlContainer as HTMLElement);
  return quill ?? null;
}

export default function RichTextEditor({ name, onContentChange, initialValue }: RichTextEditorProps) {
  const [value, setValue] = useState(initialValue ?? "");
  const [pendingImage, setPendingImage] = useState<{ url: string; index: number } | null>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedRangeRef = useRef<{ index: number; length: number } | null>(null);

  const handleChange = useCallback(
    (html: string) => {
      setValue(html);
      onContentChange?.(html);
    },
    [onContentChange]
  );

  const handleImageButtonClick = useCallback(async () => {
    const quill = await getQuillFromDom(editorContainerRef.current);
    if (quill) {
      const range = quill.getSelection(true);
      if (range) savedRangeRef.current = { index: range.index, length: range.length };
    }
    fileInputRef.current?.click();
  }, []);

  const insertImageWithSize = useCallback(
    async (url: string, index: number, widthValue: string) => {
      const quill = await getQuillFromDom(editorContainerRef.current);
      if (!quill) return;
      const html = `<img src="${escapeHtmlAttr(url)}">`;
      quill.pasteHTML(index, html);
      // Quill no guarda width al convertir HTML→Delta; lo fijamos en el blot para que quede en el HTML
      if (widthValue && widthValue !== "100%") {
        const [leaf] = quill.getLeaf(index) ?? [];
        const blot = leaf as { domNode?: HTMLElement; statics?: { blotName?: string } } | null;
        if (blot?.domNode?.setAttribute && blot?.statics?.blotName === "image") {
          blot.domNode.setAttribute("width", widthValue);
        }
      }
      handleChange(quill.root.innerHTML);
    },
    [handleChange]
  );

  const uploadImageAndInsert = useCallback(
    async (file: File, index: number) => {
      const quill = await getQuillFromDom(editorContainerRef.current);
      if (!quill) return;
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", FOLDER_CONTENT_IMAGES);
        const res = await fetch("/api/admin/upload-image", {
          method: "POST",
          body: formData,
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Error subiendo imagen");
        setPendingImage({ url: json.url, index });
      } catch (err) {
        console.error("Error uploading image to Cloudinary:", err);
      }
    },
    []
  );

  const handleChooseSize = useCallback(
    (widthValue: string) => {
      if (!pendingImage) return;
      insertImageWithSize(pendingImage.url, pendingImage.index, widthValue);
      setPendingImage(null);
    },
    [pendingImage, insertImageWithSize]
  );

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file || !file.type.startsWith("image/")) return;
      const quill = await getQuillFromDom(editorContainerRef.current);
      if (!quill) return;
      const range = savedRangeRef.current ?? { index: Math.max(0, quill.getLength() - 1), length: 0 };
      savedRangeRef.current = null;
      await uploadImageAndInsert(file, range.index);
    },
    [uploadImageAndInsert]
  );

  const handlePaste = useCallback(
    async (e: React.ClipboardEvent) => {
      const item = Array.from(e.clipboardData?.items ?? []).find((i) => i.type.startsWith("image/"));
      if (!item) return;
      const file = item.getAsFile();
      if (!file) return;
      e.preventDefault();
      const quill = await getQuillFromDom(editorContainerRef.current);
      if (!quill) return;
      const range = quill.getSelection(true);
      const index = range ? range.index : Math.max(0, quill.getLength() - 1);
      await uploadImageAndInsert(file, index);
    },
    [uploadImageAndInsert]
  );

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: handleImageButtonClick,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [handleImageButtonClick]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={value} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        aria-hidden
        onChange={handleFileChange}
      />
      {pendingImage && (
        <div className="flex flex-wrap items-center gap-2 rounded-[12px] border border-grey/20 bg-grey/5 px-4 py-3">
          <span className="text-sm font-medium text-grey">Tamaño de la imagen:</span>
          <div className="flex flex-wrap gap-2">
            {IMAGE_SIZES.map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => handleChooseSize(size.value)}
                className="rounded-full border border-grey/25 bg-white px-3 py-1.5 text-sm font-medium text-grey shadow-sm transition hover:border-brown/50 hover:bg-brown/5 hover:text-brown"
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div
        ref={editorContainerRef}
        className="admin-quill-editor border border-grey/20 rounded-[12px] bg-white min-h-[400px] overflow-hidden font-sans [&_.ql-editor]:min-h-[400px] [&_.ql-editor]:text-[18px] [&_.ql-editor]:leading-[1.1] [&_.ql-editor]:tracking-[-0.02em] [&_.ql-editor]:font-sans [&_.ql-toolbar]:font-sans [&_.ql-container]:min-h-[400px] [&_.ql-editor_h2]:font-bold [&_.ql-editor_h2]:text-[24px] [&_.ql-editor_h3]:font-semibold [&_.ql-editor_h3]:text-[18px]"
        onPaste={handlePaste}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
        />
      </div>
    </div>
  );
}
