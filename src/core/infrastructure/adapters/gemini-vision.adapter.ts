import { IPillVisionService } from "../../domain/ports/vision.port";
import { PillAnalysisResult, analyzePillImage } from "@/lib/gemini";

export class GeminiVisionAdapter implements IPillVisionService {
  async analyzePill(base64Image: string, targetMedicationName: string): Promise<PillAnalysisResult> {
    return analyzePillImage(base64Image, targetMedicationName);
  }
}
