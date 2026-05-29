import type { LucideIcon } from "lucide-react";
import {
  Receipt, Landmark, Calculator, ArrowLeftRight, TrendingUp, Tag,
  Wallet, Coins, GraduationCap, Percent, Cake, CalendarDays,
  ClipboardCheck, ArrowRightLeft, FileText, Dices, Ruler,
  Activity, KeyRound, HandCoins, Clock, Moon, Zap, Fuel, Flame,
  Smartphone, Building2, Banknote, Trophy, Gem, Home, Star,
  Pill, BedDouble, Wifi,
} from "lucide-react";

export type ToolCategory = "finance" | "students" | "daily";

export interface ToolMeta {
  slug: string;
  name: string;
  short: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  keywords: string;
  popular?: boolean;
  usage?: number; // approximate usage count for social proof
}

export const categories: Record<ToolCategory, { label: string; href: string; blurb: string }> = {
  finance: { label: "Finance & Business", href: "/#finance", blurb: "Tax, loans, profit & money tools for Pakistan." },
  students: { label: "Student Tools", href: "/#students", blurb: "CGPA, percentage, attendance & study helpers." },
  daily: { label: "Daily Use", href: "/#daily", blurb: "Bills, prayers, health & everyday calculators." },
};

export const tools: ToolMeta[] = [
  // Finance
  { slug: "gst-calculator", name: "GST Calculator", short: "Add or remove 17% GST on any amount.", description: "Quickly calculate 17% GST on goods and services in Pakistan.", category: "finance", icon: Receipt, keywords: "GST, sales tax, 17%, Pakistan, FBR", popular: true, usage: 8400 },
  { slug: "income-tax-calculator", name: "Income Tax Calculator", short: "FBR 2024-25 salaried tax slabs.", description: "Calculate your yearly and monthly income tax using FBR 2024-25 salaried slabs.", category: "finance", icon: Landmark, keywords: "income tax, FBR, 2024-25, salaried, Pakistan", popular: true, usage: 12300 },
  { slug: "loan-calculator", name: "Loan / EMI Calculator", short: "Monthly installment for any loan.", description: "Calculate monthly EMI for car, house or personal loans in PKR.", category: "finance", icon: Calculator, keywords: "loan, EMI, installment, bank, Pakistan", usage: 4200 },
  { slug: "currency-converter", name: "PKR Currency Converter", short: "PKR to USD, SAR, AED, GBP, EUR.", description: "Live PKR exchange rates to major currencies.", category: "finance", icon: ArrowLeftRight, keywords: "currency, PKR, USD, dollar rate, Pakistan", usage: 6700 },
  { slug: "profit-loss-calculator", name: "Profit & Loss Calculator", short: "Calculate profit or loss %.", description: "Find profit or loss percentage from cost and selling price.", category: "finance", icon: TrendingUp, keywords: "profit, loss, percentage, business, Pakistan", usage: 2100 },
  { slug: "discount-calculator", name: "Discount Calculator", short: "Final price after % off.", description: "Calculate sale price and saving from any discount percentage.", category: "finance", icon: Tag, keywords: "discount, sale, percentage, off, price", usage: 3400 },
  { slug: "salary-tax-calculator", name: "Salary Tax Calculator", short: "Monthly take-home salary.", description: "Convert your monthly salary into yearly tax and take-home pay.", category: "finance", icon: Wallet, keywords: "salary tax, take home, monthly, Pakistan, FBR", usage: 5800 },
  { slug: "tip-calculator", name: "Tip Calculator", short: "Tip + split per person.", description: "Calculate restaurant tip and split the bill between people.", category: "finance", icon: Coins, keywords: "tip, restaurant, bill, split, Pakistan", usage: 1200 },

  // Students
  { slug: "cgpa-calculator", name: "CGPA Calculator", short: "Pakistani 4.0 GPA system.", description: "Calculate semester CGPA based on Pakistani university 4.0 GPA system.", category: "students", icon: GraduationCap, keywords: "CGPA, GPA, university, Pakistan, semester", popular: true, usage: 15600 },
  { slug: "percentage-calculator", name: "Percentage Calculator", short: "Marks to percentage + grade.", description: "Convert obtained marks into percentage and letter grade.", category: "students", icon: Percent, keywords: "percentage, marks, grade, exam, Pakistan", usage: 4800 },
  { slug: "age-calculator", name: "Age Calculator", short: "Exact years, months & days.", description: "Calculate your exact age in years, months and days from date of birth.", category: "students", icon: Cake, keywords: "age, date of birth, years, calculator", usage: 3900 },
  { slug: "date-difference-calculator", name: "Date Difference Calculator", short: "Days between two dates.", description: "Find days, weeks and months between any two dates.", category: "students", icon: CalendarDays, keywords: "date difference, days between, duration", usage: 1500 },
  { slug: "attendance-calculator", name: "Attendance Calculator", short: "75% attendance helper.", description: "Calculate attendance percentage and how many classes you need to reach 75%.", category: "students", icon: ClipboardCheck, keywords: "attendance, 75%, classes, university, Pakistan", usage: 2700 },
  { slug: "gpa-to-percentage", name: "GPA to Percentage Converter", short: "Pakistani GPA → %.", description: "Convert your GPA into equivalent percentage using Pakistani formula.", category: "students", icon: ArrowRightLeft, keywords: "GPA, percentage, conversion, Pakistan, university", usage: 3600 },
  { slug: "word-counter", name: "Word Counter", short: "Words, chars & reading time.", description: "Count words, characters and estimated reading time of any text.", category: "students", icon: FileText, keywords: "word counter, character count, reading time", usage: 2200 },
  { slug: "random-number-generator", name: "Random Number Generator", short: "For draws & picks.", description: "Generate a random number between any two values for lucky draws.", category: "students", icon: Dices, keywords: "random number, generator, lucky draw", usage: 900 },
  { slug: "unit-converter", name: "Unit Converter", short: "Length, weight & temperature.", description: "Convert km, miles, kg, lbs and temperature units instantly.", category: "students", icon: Ruler, keywords: "unit converter, km to miles, kg to lbs", usage: 2400 },

  // Daily Use
  { slug: "bmi-calculator", name: "BMI Calculator", short: "Body Mass Index + category.", description: "Calculate your BMI and find out your weight category.", category: "daily", icon: Activity, keywords: "BMI, body mass index, weight, health, Pakistan", usage: 4100 },
  { slug: "password-generator", name: "Password Generator", short: "Strong random passwords.", description: "Create strong, random and secure passwords of any length.", category: "daily", icon: KeyRound, keywords: "password generator, strong password, secure", usage: 3300 },
  { slug: "zakat-calculator", name: "Zakat Calculator", short: "2.5% on gold, silver & cash.", description: "Calculate your yearly Zakat on gold, silver, cash and assets.", category: "daily", icon: HandCoins, keywords: "Zakat, 2.5%, Islam, gold, Pakistan", usage: 7200 },
  { slug: "prayer-times", name: "Prayer Times", short: "Today's 5 namaz timings.", description: "Today's accurate 5 prayer times for any city in Pakistan.", category: "daily", icon: Clock, keywords: "prayer times, namaz, Karachi, Lahore, Pakistan", popular: true, usage: 18900 },
  { slug: "hijri-date-converter", name: "Hijri Date Converter", short: "Gregorian ↔ Hijri.", description: "Convert between Gregorian and Islamic Hijri dates.", category: "daily", icon: Moon, keywords: "Hijri, Islamic date, Gregorian, converter", usage: 2600 },
  { slug: "electricity-bill-calculator", name: "Electricity Bill Estimator", short: "WAPDA slab calculator.", description: "Estimate your monthly WAPDA / K-Electric bill from units consumed.", category: "daily", icon: Zap, keywords: "electricity bill, WAPDA, K-Electric, units, Pakistan", usage: 9800 },
  { slug: "fuel-cost-calculator", name: "Fuel Cost Calculator", short: "Trip cost from distance.", description: "Calculate fuel cost for any trip using distance, mileage and petrol price.", category: "daily", icon: Fuel, keywords: "fuel cost, petrol, mileage, trip, Pakistan", usage: 2800 },
  { slug: "calorie-calculator", name: "Calorie Calculator", short: "Daily calorie needs.", description: "Find your daily calorie requirement based on age, weight and activity.", category: "daily", icon: Flame, keywords: "calorie, BMR, diet, weight loss, Pakistan", usage: 1900 },
  { slug: "car-loan-calculator", name: "Car Loan Calculator", short: "Monthly installment calculator.", description: "Calculate monthly car installment for any Pakistani bank. Supports all banks.", category: "finance", icon: Landmark, keywords: "car loan, installment, Meezan, HBL, Pakistan", usage: 8500 },
  { slug: "pta-tax-calculator", name: "PTA Mobile Tax Calculator", short: "Mobile registration duty.", description: "Calculate PTA mobile registration tax for imported phones in Pakistan.", category: "finance", icon: Smartphone, keywords: "PTA tax, mobile duty, iPhone, Samsung, Pakistan", popular: true, usage: 12000 },
  { slug: "govt-salary-calculator", name: "Govt Salary Calculator", short: "BPS grade salary.", description: "Calculate Pakistan government employee salary by BPS grade including all allowances.", category: "finance", icon: Building2, keywords: "govt salary, BPS, government employee, Pakistan", usage: 9200 },
  { slug: "pension-calculator", name: "Pension Calculator", short: "Govt pension amount.", description: "Calculate Pakistan government employee pension and gratuity.", category: "finance", icon: Banknote, keywords: "pension, gratuity, government employee, retirement, Pakistan", usage: 6800 },
  { slug: "matric-result-calculator", name: "Matric/Inter Result Calculator", short: "Percentage + grade + division.", description: "Calculate Matric or Inter percentage, grade and division for all Pakistani boards.", category: "students", icon: Trophy, keywords: "matric result, inter result, percentage, grade, Pakistani board", popular: true, usage: 11000 },
  { slug: "gold-price-calculator", name: "Gold Price Calculator", short: "Tola/gram gold value.", description: "Calculate gold price in Pakistan for any weight and karat (24K, 22K, 21K).", category: "finance", icon: Gem, keywords: "gold price, tola, Pakistan, 24K, 22K", usage: 7600 },
  { slug: "property-size-calculator", name: "Property Size Converter", short: "Marla, Kanal, Square Feet.", description: "Convert property size between Marla, Kanal, Square Feet, Square Yards.", category: "finance", icon: Home, keywords: "marla, kanal, square feet, property, Pakistan", usage: 8900 },
  { slug: "umrah-savings-calculator", name: "Umrah Savings Calculator", short: "Plan your Umrah savings.", description: "Calculate how long it will take to save for Umrah or Hajj in Pakistan.", category: "daily", icon: Star, keywords: "Umrah, Hajj, savings, Pakistan, Islamic", usage: 5400 },
  { slug: "inflation-calculator", name: "Inflation Calculator", short: "Pakistan money value over time.", description: "Calculate the real value of money considering Pakistan's inflation rate.", category: "finance", icon: TrendingUp, keywords: "inflation, Pakistan, money value, purchasing power", usage: 4200 },
  { slug: "medicine-dose-calculator", name: "Medicine Dose Calculator", short: "Correct dose by weight.", description: "Calculate correct medicine dose for children and adults by body weight.", category: "daily", icon: Pill, keywords: "medicine dose, Paracetamol, children, Pakistan", usage: 3800 },
  { slug: "sleep-calculator", name: "Sleep Calculator", short: "Best bedtime & wake up time.", description: "Calculate best bedtime or wake up time based on 90-minute sleep cycles.", category: "daily", icon: BedDouble, keywords: "sleep calculator, bedtime, wake up, sleep cycles", usage: 2900 },
  { slug: "data-usage-calculator", name: "Data Usage Calculator", short: "Mobile internet usage.", description: "Calculate daily and monthly mobile internet data usage in Pakistan.", category: "daily", icon: Wifi, keywords: "data usage, mobile internet, WhatsApp, YouTube, Pakistan", usage: 3500 },
];

export const toolBySlug = (slug: string) => tools.find((t) => t.slug === slug);

export const relatedTools = (slug: string, n = 3): ToolMeta[] => {
  const cur = toolBySlug(slug);
  if (!cur) return [];
  const same = tools.filter((t) => t.category === cur.category && t.slug !== slug);
  const others = tools.filter((t) => t.category !== cur.category);
  return [...same, ...others].slice(0, n);
};
