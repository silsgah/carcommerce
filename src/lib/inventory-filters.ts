// Inventory filter utilities — parses URL search params into Prisma where clauses
// and generates filter options from the database

export interface InventoryFilters {
  make?: string;
  model?: string;
  bodyType?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMax?: number;
  fuelType?: string;
  transmission?: string;
  drivetrain?: string;
  condition?: string;
  color?: string;
  sort?: string;
  page?: number;
  view?: "grid" | "list";
  q?: string;
}

export function parseFilters(
  searchParams: Record<string, string | string[] | undefined>
): InventoryFilters {
  const get = (key: string): string | undefined => {
    const val = searchParams[key];
    return Array.isArray(val) ? val[0] : val;
  };

  return {
    make: get("make"),
    model: get("model"),
    bodyType: get("bodyType"),
    yearMin: get("yearMin") ? parseInt(get("yearMin")!) : undefined,
    yearMax: get("yearMax") ? parseInt(get("yearMax")!) : undefined,
    priceMin: get("priceMin") ? parseInt(get("priceMin")!) : undefined,
    priceMax: get("priceMax") ? parseInt(get("priceMax")!) : undefined,
    mileageMax: get("mileageMax") ? parseInt(get("mileageMax")!) : undefined,
    fuelType: get("fuelType"),
    transmission: get("transmission"),
    drivetrain: get("drivetrain"),
    condition: get("condition"),
    color: get("color"),
    sort: get("sort") || "newest",
    page: get("page") ? parseInt(get("page")!) : 1,
    view: (get("view") as "grid" | "list") || "grid",
    q: get("q"),
  };
}

export function buildWhereClause(filters: InventoryFilters) {
  const where: Record<string, unknown> = {
    status: "AVAILABLE",
  };

  if (filters.make) where.make = { equals: filters.make, mode: "insensitive" };
  if (filters.model) where.model = { equals: filters.model, mode: "insensitive" };
  if (filters.bodyType) where.bodyType = filters.bodyType;
  if (filters.fuelType) where.fuelType = filters.fuelType;
  if (filters.transmission) where.transmission = filters.transmission;
  if (filters.drivetrain) where.drivetrain = filters.drivetrain;
  if (filters.condition) where.condition = filters.condition;
  if (filters.color) where.exteriorColor = { contains: filters.color, mode: "insensitive" };

  if (filters.yearMin || filters.yearMax) {
    where.year = {
      ...(filters.yearMin ? { gte: filters.yearMin } : {}),
      ...(filters.yearMax ? { lte: filters.yearMax } : {}),
    };
  }

  if (filters.priceMin || filters.priceMax) {
    where.price = {
      ...(filters.priceMin ? { gte: filters.priceMin } : {}),
      ...(filters.priceMax ? { lte: filters.priceMax } : {}),
    };
  }

  if (filters.mileageMax) {
    where.mileage = { lte: filters.mileageMax };
  }

  if (filters.q) {
    where.OR = [
      { make: { contains: filters.q, mode: "insensitive" } },
      { model: { contains: filters.q, mode: "insensitive" } },
      { trim: { contains: filters.q, mode: "insensitive" } },
      { description: { contains: filters.q, mode: "insensitive" } },
    ];
  }

  return where;
}

export function buildOrderBy(sort: string) {
  switch (sort) {
    case "price_asc":
      return { price: "asc" as const };
    case "price_desc":
      return { price: "desc" as const };
    case "mileage":
      return { mileage: "asc" as const };
    case "year_desc":
      return { year: "desc" as const };
    case "year_asc":
      return { year: "asc" as const };
    case "newest":
    default:
      return { createdAt: "desc" as const };
  }
}

export const ITEMS_PER_PAGE = 12;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest Listed" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "mileage", label: "Lowest Mileage" },
  { value: "year_desc", label: "Newest Year" },
  { value: "year_asc", label: "Oldest Year" },
];

export const BODY_TYPES = [
  "SEDAN", "SUV", "TRUCK", "COUPE", "CONVERTIBLE", "WAGON", "VAN", "HATCHBACK",
];

export const FUEL_TYPES = [
  "GASOLINE", "DIESEL", "ELECTRIC", "HYBRID", "PLUGIN_HYBRID",
];

export const TRANSMISSIONS = ["AUTOMATIC", "MANUAL", "CVT"];

export const DRIVETRAINS = ["FWD", "RWD", "AWD", "FOUR_WD"];

export const CONDITIONS = ["NEW", "USED", "CERTIFIED"];
