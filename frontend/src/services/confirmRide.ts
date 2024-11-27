import { ConfirmRideApiResponse, ConfirmRideFormData } from "@/types";

type ConfirmRideParams = {
  formData: ConfirmRideFormData;
  driver: { id: number; name: string; value: number };
};

export async function confirmRide({
  formData,
  driver,
}: ConfirmRideParams): Promise<ConfirmRideApiResponse> {
  const response = await fetch("http://localhost:8080/ride/confirm", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
      driver: {
        id: driver.id,
        name: driver.name,
      },
      value: driver.value,
    }),
  });

  if (response.status === 400) {
    throw new Error("Os dados fornecidos são inválidos. Tente novamente");
  }

  if (response.status === 404) {
    throw new Error("Motorista não encontrado");
  }

  if (response.status === 406) {
    throw new Error("Quilometragem inválida para o motorista");
  }

  return await response.json();
}
