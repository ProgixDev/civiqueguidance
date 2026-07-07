"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onSave: (dataUrl: string) => Promise<void> | void;
  documentLabel?: string;
  /** Bloque le bouton « Valider » (ex. tant que les consentements ne sont pas cochés). */
  disabled?: boolean;
  disabledHint?: string;
};

/**
 * Click-to-sign : un canvas où le client dessine sa signature à la souris/au doigt.
 * Stockée en data:image/png;base64 (envoyée à Supabase via onSave).
 */
export default function SignaturePad({
  onSave,
  documentLabel,
  disabled = false,
  disabledHint,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Adapte la résolution interne au DPR pour un trait net
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = "#000091";
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  function getPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    lastPoint.current = getPos(e);
    setIsEmpty(false);
    setSaved(false);
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current || !lastPoint.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const p = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastPoint.current = p;
  }

  function end() {
    drawing.current = false;
    lastPoint.current = null;
  }

  function clear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const rect = canvas.getBoundingClientRect();
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform pour clear en pixels DPR
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    setIsEmpty(true);
    setSaved(false);
  }

  async function save() {
    const canvas = canvasRef.current;
    if (!canvas || isEmpty || disabled) return;
    setSaving(true);
    try {
      const dataUrl = canvas.toDataURL("image/png");
      await onSave(dataUrl);
      setSaved(true);
    } catch {
      // onSave a échoué (ex. erreur réseau/serveur) : on laisse réessayer.
      // Le parent affiche le message d'erreur.
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white border border-ink-black/8 rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <h3 className="text-[15px] font-bold text-ink-black">
            Signature électronique
          </h3>
          {documentLabel && (
            <p className="text-[12px] text-on-surface-variant mt-0.5">
              Pour : {documentLabel}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={clear}
          disabled={isEmpty || saving}
          className="text-[12px] font-bold text-marianne-red hover:underline disabled:opacity-30 disabled:no-underline"
        >
          Effacer
        </button>
      </div>

      <canvas
        ref={canvasRef}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        className="w-full h-44 sm:h-52 border border-dashed border-ink-black/20 rounded-xl cursor-crosshair touch-none bg-white"
        style={{ touchAction: "none" }}
      />

      <p className="text-[11px] text-on-surface-variant mt-2 text-center">
        Signez dans la zone ci-dessus avec votre souris ou votre doigt.
      </p>

      <button
        type="button"
        onClick={save}
        disabled={isEmpty || saving || saved || disabled}
        className="mt-4 w-full bg-french-blue hover:bg-[#000066] disabled:opacity-50 text-white py-3 rounded-xl text-[14px] font-bold tracking-wide shadow-md transition-all"
      >
        {saving ? "Enregistrement…" : saved ? "✓ Signature enregistrée" : "Valider la signature"}
      </button>

      {disabled && disabledHint && (
        <p className="text-[11px] text-marianne-red mt-2 text-center">
          {disabledHint}
        </p>
      )}
    </div>
  );
}
