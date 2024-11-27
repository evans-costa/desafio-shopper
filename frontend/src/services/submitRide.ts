import { EstimateRideApiResponse, EstimateRideFormData } from "@/types";

export async function submitRide(
  data: EstimateRideFormData,
): Promise<EstimateRideApiResponse> {
  const response = await fetch("http://localhost:8080/ride/estimate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Os dados fornecidos são inválidos. Tente novamente");
  }

  return await response.json();
}
