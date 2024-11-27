import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { ConfirmRideFormData, EstimateRideApiResponse } from "@/types";
import { fetchStaticMapUrl } from "@/lib/utils";
import { confirmRide } from "@/services/confirmRide";
import { useNavigate } from "react-router";

type RideResultProps = {
  data: EstimateRideApiResponse | null;
  customerId: string;
};

export default function RideResult({ data, customerId }: RideResultProps) {
  const navigate = useNavigate();
  const [map, setMap] = useState<string | null>("");
  const [driverId, setDriverId] = useState<number | null>(null);

  const form = useForm<ConfirmRideFormData>({
    defaultValues: {
      customer_id: customerId,
      origin: data?.routeResponse.routes[0].legs[0].start_address,
      destination: data?.routeResponse.routes[0].legs[0].end_address,
      distance: data?.routeResponse.routes[0].legs[0].distance.value,
      duration: data?.routeResponse.routes[0].legs[0].duration.text,
      driver: {
        id: 0,
        name: "",
      },
      value: 0,
    },
  });

  useEffect(() => {
    const url = fetchStaticMapUrl(data);
    setMap(url);
  }, [data]);

  async function onSubmit(driver: { id: number; name: string; value: number }) {
    try {
      const formData = form.getValues();
      const response = await confirmRide({ formData, driver });

      if (response.success) navigate(`/rides/${customerId}`);
    } catch (error) {
      setDriverId(driver.id);
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Erro inesperado. Tente novamente",
      });
      form.reset(undefined, { keepErrors: true });
    }
  }

  return (
    <div className="mt-4 p-4 border rounded shadow flex flex-col items-center space-y-4">
      <h2 className="text-lg font-bold">Resultado da Estimativa:</h2>
      <div>
        {map && (
          <img
            src={map}
            style={{
              width: "100%",
              maxWidth: "800px",
              border: "1px solid #ccc",
            }}
          />
        )}
      </div>
      <div className="flex items-center gap-10">
        {data &&
          data.options.map((driver) => (
            <Card
              key={driver.id}
              className="w-[350px] h-fit max-h-[800px] text-left flex flex-col justify-between"
            >
              <CardHeader>
                {form.formState.errors.root && driverId === driver.id ? (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erro</AlertTitle>
                    <AlertDescription>
                      {form.formState.errors.root.message}
                    </AlertDescription>
                  </Alert>
                ) : (
                  ""
                )}
                <CardTitle>{driver.name}</CardTitle>
                <CardDescription>{driver.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-x-1 flex items-center">
                    <p className="text-base font-medium leading-none">
                      Avaliação:{" "}
                      <span className="text-sm font-normal">
                        {driver.review.rating}/5
                      </span>
                    </p>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <p className="text-base font-medium leading-none">
                      Comentários:{" "}
                      <span className="text-sm font-normal">
                        {driver.review.comment}
                      </span>
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-x-1 flex items-center">
                  <p className="text-lg font-medium leading-none">
                    Valor:{" "}
                    <span className="text-base font-normal">
                      R$ {driver.value.toFixed(2)}
                    </span>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  onClick={() =>
                    onSubmit({
                      id: driver.id,
                      name: driver.name,
                      value: driver.value,
                    })
                  }
                >
                  Confirmar Viagem
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
