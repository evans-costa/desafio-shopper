import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { EstimateRideApiResponse, EstimateRideFormData } from "@/types";
import RideResult from "./RideResult";
import { submitRide } from "@/services/submitRide";

export default function RideForm() {
  const [result, setResult] = useState<EstimateRideApiResponse | null>(null);
  const [customer, setCustomer] = useState<string>("");

  const form = useForm<EstimateRideFormData>({
    defaultValues: {
      customer_id: "",
      origin: "",
      destination: "",
    },
  });

  async function onSubmit(data: EstimateRideFormData) {
    try {
      const responseData = await submitRide(data);
      setCustomer(data.customer_id);
      setResult(responseData);
    } catch (error) {
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
    <div className="flex flex-col items-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-1/2"
        >
          <FormField
            control={form.control}
            name="customer_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Id do usuário</FormLabel>
                <FormControl>
                  <Input placeholder="Seu ID" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="origin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço de origem</FormLabel>
                <FormControl>
                  <Input placeholder="Origem" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço de destino</FormLabel>
                <FormControl>
                  <Input placeholder="Destino" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <FormMessage>{form.formState.errors.root.message}</FormMessage>
          )}
          <Button type="submit">Enviar</Button>
        </form>
      </Form>
      {form.formState.isSubmitSuccessful && (
        <RideResult data={result} customerId={customer} />
      )}
    </div>
  );
}
