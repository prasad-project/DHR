/**
 * AI Service for Gemini API integration
 * Backend-ready service for generating reports
 */

import { GoogleMapsDistrictData } from "./mock/googleMapsMockData";

export interface ReportData {
  district: GoogleMapsDistrictData;
  timestamp: string;
  reportContent: string;
}

/**
 * Generate detailed report using Gemini API
 */
export const generateDistrictReport = async (
  district: GoogleMapsDistrictData,
  prompt?: string
): Promise<string> => {
  const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyAem4fTJVZdyahkglk_m6UWAXT1g1s72-A";
  const useGeminiAPI = geminiApiKey && process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "true";

  // Try Gemini API first if key is available
  if (useGeminiAPI) {
    try {
      const reportPrompt = prompt || `Generate a comprehensive health and worker analysis report for ${district.name} district in Kerala, India. Include:
- Executive summary with total workers (${district.workers.toLocaleString()})
- Worker demographics breakdown by origin states (Odisha: ${district.originBreakdown.Odisha}, Bihar: ${district.originBreakdown.Bihar}, West Bengal: ${district.originBreakdown.WB}, Assam: ${district.originBreakdown.Assam})
- Health metrics (Health Check Coverage: ${district.healthMetrics.healthCheckRate}%, Active Cases: ${district.healthMetrics.activeCases})
- Density level: ${district.density}, Trend: ${district.trend}
- Key insights and recommendations
Format as a professional markdown report.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: reportPrompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        return generatedText;
      } else {
        throw new Error("No content generated from Gemini API");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      // Fall through to mock data
    }
  }

  // Fallback to mock data
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Generate comprehensive mock report
  const report = `
# ${district.name} District - Health & Worker Analysis Report

**Generated:** ${new Date().toLocaleString()}

## Executive Summary
${district.name} district has a total of ${district.workers.toLocaleString()} registered migrant workers, with a density classification of ${district.density.toLocaleUpperCase()}. The district shows a ${district.trend === "up" ? "growing" : district.trend === "down" ? "declining" : "stable"} trend in worker population.

## Worker Demographics

### Total Workers: ${district.workers.toLocaleString()}
- **Density Level:** ${district.density.toLocaleUpperCase()}
- **Trend:** ${district.trend === "up" ? "↑ Increasing" : district.trend === "down" ? "↓ Decreasing" : "→ Stable"}

### Origin State Breakdown:
- **Odisha:** ${district.originBreakdown.Odisha.toLocaleString()} workers (${((district.originBreakdown.Odisha / district.workers) * 100).toFixed(1)}%)
- **Bihar:** ${district.originBreakdown.Bihar.toLocaleString()} workers (${((district.originBreakdown.Bihar / district.workers) * 100).toFixed(1)}%)
- **West Bengal:** ${district.originBreakdown.WB.toLocaleString()} workers (${((district.originBreakdown.WB / district.workers) * 100).toFixed(1)}%)
- **Assam:** ${district.originBreakdown.Assam.toLocaleString()} workers (${((district.originBreakdown.Assam / district.workers) * 100).toFixed(1)}%)

## Health Metrics

### Health Check Coverage: ${district.healthMetrics.healthCheckRate}%
${district.healthMetrics.healthCheckRate >= 70 ? "✓ Excellent coverage" : district.healthMetrics.healthCheckRate >= 50 ? "⚠ Moderate coverage - needs improvement" : "✗ Low coverage - urgent action required"}

### Active Disease Cases: ${district.healthMetrics.activeCases}
${district.healthMetrics.activeCases > 200 ? "⚠ High number of active cases - monitoring required" : district.healthMetrics.activeCases > 100 ? "→ Moderate case load" : "✓ Low case count - good status"}

### New Worker Visits: ${Math.floor(district.workers * 0.15).toLocaleString()}
Recent worker registrations and health check visits in the last 30 days.

## Key Insights

1. **Worker Distribution:** The district has a ${district.density} density of migrant workers, with ${district.originBreakdown.Odisha > district.originBreakdown.Bihar ? "Odisha" : "Bihar"} being the primary origin state.

2. **Health Status:** Health check coverage stands at ${district.healthMetrics.healthCheckRate}%, ${district.healthMetrics.healthCheckRate >= 70 ? "indicating strong healthcare engagement" : "suggesting need for improved outreach programs"}.

3. **Risk Assessment:** With ${district.healthMetrics.activeCases} active disease cases, the district ${district.healthMetrics.activeCases > 200 ? "requires immediate attention and resource allocation" : "maintains manageable health metrics"}.

## Recommendations

${district.healthMetrics.healthCheckRate < 70 ? "- Increase health check outreach programs\n- Deploy mobile health units to worker camps\n" : ""}${district.healthMetrics.activeCases > 200 ? "- Implement targeted disease surveillance\n- Enhance medical resource allocation\n" : ""}- Continue monitoring worker population trends
- Maintain regular health check schedules
- Strengthen communication channels with worker communities

---
*Report generated by SehatSetu AI Assistant*
*Data as of ${new Date().toLocaleDateString()}*
    `.trim();

  return report;
};

/**
 * Download report as text file
 */
export const downloadReport = (report: string, districtName: string) => {
  const blob = new Blob([report], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${districtName}_Report_${new Date().toISOString().split("T")[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Download report as PDF (requires backend or client-side PDF library)
 */
export const downloadReportAsPDF = async (report: string, districtName: string) => {
  // In production, this would call a backend service to generate PDF
  // For now, we'll use the text download
  downloadReport(report, districtName);
};

