// Shared Pakistan-specific formulas.

// FBR 2024-25 salaried income tax slabs (yearly)
export function fbrSalariedTax(annual: number): number {
  if (annual <= 600_000) return 0;
  if (annual <= 1_200_000) return (annual - 600_000) * 0.05;
  if (annual <= 2_200_000) return 30_000 + (annual - 1_200_000) * 0.15;
  if (annual <= 3_200_000) return 180_000 + (annual - 2_200_000) * 0.25;
  if (annual <= 4_100_000) return 430_000 + (annual - 3_200_000) * 0.3;
  return 700_000 + (annual - 4_100_000) * 0.35;
}

// WAPDA approximate domestic slab tariffs (PKR/unit) for protected residential category.
// These are estimates — actual bill includes taxes/duties.
export function wapdaBill(units: number): { energy: number; total: number; slab: string } {
  let rate = 0;
  let slab = "";
  if (units <= 100) { rate = 13.48; slab = "1–100"; }
  else if (units <= 200) { rate = 18.95; slab = "101–200"; }
  else if (units <= 300) { rate = 22.14; slab = "201–300"; }
  else if (units <= 400) { rate = 27.7; slab = "301–400"; }
  else if (units <= 500) { rate = 32.07; slab = "401–500"; }
  else if (units <= 600) { rate = 34.26; slab = "501–600"; }
  else if (units <= 700) { rate = 36.66; slab = "601–700"; }
  else { rate = 42.72; slab = "700+"; }
  const energy = units * rate;
  // Add ~20% taxes & surcharges as estimate
  const total = energy * 1.2;
  return { energy, total, slab };
}

export const fmtPKR = (n: number) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(
    isFinite(n) ? n : 0
  );

export const fmtNum = (n: number, d = 2) =>
  new Intl.NumberFormat("en-PK", { maximumFractionDigits: d }).format(isFinite(n) ? n : 0);
