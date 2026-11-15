import { PillAnalysisResult } from "@/lib/gemini";

/**
 * Outbound Pill Vision Analyzer Port
 * Decouples use cases from Google Gemini API or local inference models.
 */
export interface IPillVisionService {
  analyzePill(base64Image: string, targetMedicationName: string): Promise<PillAnalysisResult>;
}
