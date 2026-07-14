export function generateVehicleJsonLd(vehicle: {
  slug: string;
  make: string;
  model: string;
  trim?: string | null;
  year: number;
  price: number;
  mileage: number;
  condition: string;
  fuelType: string;
  transmission: string;
  drivetrain: string;
  exteriorColor: string;
  images: string[];
  description?: string | null;
  vin?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.trim ? ` ${vehicle.trim}` : ""}`,
    brand: {
      "@type": "Brand",
      name: vehicle.make,
    },
    model: vehicle.model,
    vehicleModelDate: vehicle.year.toString(),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "SMI",
    },
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition:
        vehicle.condition === "NEW"
          ? "https://schema.org/NewCondition"
          : "https://schema.org/UsedCondition",
    },
    color: vehicle.exteriorColor,
    fuelType: vehicle.fuelType.toLowerCase(),
    vehicleTransmission: vehicle.transmission.toLowerCase(),
    driveWheelConfiguration: vehicle.drivetrain,
    image: vehicle.images,
    description: vehicle.description,
    vehicleIdentificationNumber: vehicle.vin,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/inventory/${vehicle.slug}`,
  };
}

export function generateDealershipJsonLd(settings: {
  name: string;
  phone: string;
  email: string;
  address: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: settings.name,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
    },
    url: process.env.NEXT_PUBLIC_BASE_URL || "",
  };
}
