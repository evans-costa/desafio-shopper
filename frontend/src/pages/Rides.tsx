import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RideApiResponse } from "@/types";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { drivers } from "@/data/drivers";

export default function Rides() {
  const { customerId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();

  const [rides, setRides] = useState<RideApiResponse | null>(null);
  const [driver, setDriver] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("driver_id")) {
      return url.searchParams.get("driver_id") ?? "";
    }

    return "";
  });
  const [customer, setCustomer] = useState<string>(customerId || "");
  const [filters, setFilters] = useState<{
    customerId: string;
    driver: string;
  }>({
    customerId: customer,
    driver,
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const url = new URL(`http://localhost:8080/ride/${filters?.customerId}`);

    if (filters?.driver) {
      url.searchParams.set("driver_id", filters.driver);
    }

    async function fetchRides() {
      try {
        const response = await fetch(url);

        if (response.status === 400) {
          throw new Error("Motorista inválido");
        }

        if (response.status === 404) {
          throw new Error("Nenhum registro encontrado");
        }

        const data = (await response.json()) as RideApiResponse;
        setRides(data);
      } catch (error) {
        setError((error as Error).message);
      }
    }

    void fetchRides();
  }, [filters]);

  function handleFilters() {
    setFilters({
      customerId: customer,
      driver,
    });

    setSearchParams((prevParams) => {
      if (driver) prevParams.set("driver_id", driver);
      return prevParams;
    });
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex gap-2 items-center justify-center mb-4 w-1/2">
        <Input
          onChange={(e) => setCustomer(e.target.value)}
          placeholder="Id do usuário"
        ></Input>
        <Select value={driver} onValueChange={setDriver}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um motorista" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Motoristas</SelectLabel>
              {drivers.map((driver) => (
                <SelectItem
                  key={driver.driver_id}
                  value={driver.driver_id.toString()}
                >
                  {driver.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={handleFilters}>Aplicar</Button>
      </div>
      <div>
        <Table className="w-full">
          <TableCaption>Histórico de corridas</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do motorista</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Data / Hora</TableHead>
              <TableHead className="text-right">Distância</TableHead>
              <TableHead className="text-right">Tempo</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rides &&
              rides.rides.map((ride) => {
                const rideDate = dayjs(ride.date).format("DD/MM/YYYY HH:mm");
                const rideDistanceInKm = ride.distance / 1000;
                return (
                  <TableRow key={ride.id}>
                    <TableCell className="font-medium w-[100px]">
                      {ride.driver.name}
                    </TableCell>
                    <TableCell className="w-[300px]">{ride.origin}</TableCell>
                    <TableCell className="w-[300px]">
                      {ride.destination}
                    </TableCell>
                    <TableCell className="w-[200px]">{rideDate}</TableCell>
                    <TableCell className="text-right w-[50px]">
                      {`${rideDistanceInKm.toFixed(1)} km`}
                    </TableCell>
                    <TableCell className="text-right">
                      {ride.duration}
                    </TableCell>
                    <TableCell className="text-right">
                      R$ {ride.value.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
