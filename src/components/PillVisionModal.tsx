"use client";

import React, { useState } from "react";
import { DoseRecord } from "@/types";
import { PillAnalysisResult } from "@/lib/gemini";
import { Camera, X, CheckCircle, AlertTriangle, Sparkles, RefreshCw } from "lucide-react";

interface PillVisionModalProps {
  dose: DoseRecord;
  onClose: () => void;
  onVerifiedTaken: (doseId: string, verifiedVia: "VISION_AI") => void;
}

export const PillVisionModal: React.FC<PillVisionModalProps> = ({
  dose,
  onClose,
  onVerifiedTaken,
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PillAnalysisResult | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Sample mock image base64 for quick demonstration
  const handleSimulateScan = async () => {
    setAnalyzing(true);
    setPreviewImage(
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60"
    );

    try {
      const res = await fetch("/api/vision/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base64Image: "data:image/jpeg;base64,sample_simulated_pill_bottle_data",
          targetMedicationName: dose.medicationName,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data.analysis);
      }
    } catch (err) {
      console.error("Vision check failed:", err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setPreviewImage(base64);
      setAnalyzing(true);

      try {
        const res = await fetch("/api/vision/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            base64Image: base64,
            targetMedicationName: dose.medicationName,
          }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setResult(data.analysis);
        }
      } catch (err) {
        console.error("Upload check failed:", err);
      } finally {
        setAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-sky-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">
                Pill Safety Lens
              </h2>
              <p className="text-xs font-semibold text-sky-700">
                Gemini Vision AI Verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Scheduled Dose to Verify
            </span>
            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-slate-900">
                {dose.medicationName}
              </span>
              <span className="text-sm font-bold px-3 py-1 bg-sky-100 text-sky-800 rounded-full">
                {dose.dosage}
              </span>
            </div>
          </div>

          {/* Camera / Upload Section */}
          {!result && (
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center flex flex-col items-center justify-center hover:border-sky-500 transition bg-slate-50/50">
              {analyzing ? (
                <div className="flex flex-col items-center py-6">
                  <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="text-base font-bold text-slate-800">
                    Inspecting pill imprint & bottle label...
                  </p>
                  <p className="text-xs text-slate-500">
                    Checking clinical interactions with active prescriptions
                  </p>
                </div>
              ) : (
                <>
                  <Camera className="w-12 h-12 text-sky-600 mb-3" />
                  <p className="text-base font-bold text-slate-900 mb-1">
                    Point camera at pill or medicine bottle
                  </p>
                  <p className="text-xs text-slate-500 mb-5 max-w-xs">
                    Multimodal AI will confirm the drug name and verify safety before intake
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <label className="flex-1 cursor-pointer py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm text-center shadow-md shadow-sky-600/20 transition">
                      Upload / Take Photo
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={handleSimulateScan}
                      type="button"
                      className="flex-1 py-3.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm text-center transition flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Simulate Pill Scan</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* AI Result View */}
          {result && (
            <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900">
                <CheckCircle className="w-7 h-7 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="text-base font-extrabold">
                    {result.identifiedDrug} ({result.dosageDetected})
                  </h4>
                  <p className="text-xs font-semibold text-emerald-700">
                    {Math.round(result.confidenceScore * 100)}% match confidence • Verified Safe to Ingest
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Senior Instructions
                </span>
                <p className="text-base font-bold text-slate-900">
                  {result.directionsForSenior}
                </p>
              </div>

              {result.warnings.length > 0 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Dietary & Safety Note
                    </span>
                  </div>
                  <ul className="text-xs font-medium space-y-1 list-disc pl-5">
                    {result.warnings.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => {
                  onVerifiedTaken(dose.id, "VISION_AI");
                  onClose();
                }}
                type="button"
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-6 h-6" />
                <span>Confirm & Mark as Taken</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
