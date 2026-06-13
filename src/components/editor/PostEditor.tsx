"use client";

import dynamic from "next/dynamic";
import { forwardRef, useEffect, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import "react-quill-new/dist/quill.snow.css";
import "quill-resize-module/dist/resize.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");

  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "Upload failed");

  return json.data.url as string;
}

const ReactQuillBase = dynamic(() => import("react-quill-new"), { ssr: false });

function imageHandler(quillRef: React.RefObject<any>) {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;

    const quill = quillRef.current?.getEditor?.();
    if (!quill) return;

    const range = quill.getSelection(true);
    const placeholder = "Uploading image…";
    quill.insertText(range.index, placeholder, { italic: true }, "user");

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
      });

      const url = await uploadToCloudinary(compressedFile);
      quill.deleteText(range.index, placeholder.length, "user");
      quill.insertEmbed(range.index, "image", url, "user");
      quill.setSelection(range.index + 1, 0, "user");
    } catch (err) {
      quill.deleteText(range.index, placeholder.length, "user");
      console.error("Cloudinary upload error:", err);
    }
  };
}

const FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "list",
  "blockquote",
  "code-block",
  "link",
  "image",
];

export default function PostEditor({ value, onChange }: Props) {
  const quillRef = useRef<any>(null);
  const [modules, setModules] = useState<any>(null);
  const ReactQuillBase = dynamic(() => import("react-quill-new"), {
    ssr: false,
  }) as any;
  useEffect(() => {
    let cancelled = false;

    async function init() {
      const { Quill } = await import("react-quill-new");
      const QuillResizeModule = (await import("quill-resize-module")).default;

      if (!(Quill as any).__resizeRegistered) {
        Quill.register("modules/resize", QuillResizeModule, true);
        (Quill as any).__resizeRegistered = true;
      }

      if (cancelled) return;

      setModules({
        toolbar: {
          container: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            ["link", "image"],
            ["clean"],
          ],
          handlers: {
            image: () => imageHandler(quillRef),
          },
        },
        resize: {
          modules: ["Resize", "DisplaySize"],
          tools: ["left", "center", "right", "full"],
          parchment: {
            image: {
              attribute: ["width"],
              limit: { minWidth: 50 },
            },
          },
        },
      });
    }

    init().catch(console.error);
    return () => {
      cancelled = true;
    };
  }, []);

  if (!modules) {
    return (
      <div className="h-[500px] animate-pulse rounded-xl border bg-muted" />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <ReactQuillBase
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={FORMATS}
        className="[&_.ql-editor]:min-h-[500px]"
      />
    </div>
  );
}
