import type { Metadata } from "next";
import { FinancingCalculator } from "@/components/financing/calculator";
import { Card } from "@/components/ui/card";
import { Calculator, Percent, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Financing Calculator",
  description:
    "Estimate your monthly vehicle payments, adjust down payment, interest rates, and loan terms, and get pre-qualified.",
};

export default function FinancingPage() {
  return (
    <div className="pt-24 pb-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Page header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Auto Financing Calculator
          </h1>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Estimate your monthly payments, compare different loan structures, and
            take the first step toward driving your dream car home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Main Calculator */}
          <div className="lg:col-span-3 bg-card border border-border/50 rounded-2xl p-6 sm:p-8">
            <FinancingCalculator />
          </div>

          {/* Quick tips */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="p-5 border-border/50 rounded-2xl space-y-4">
              <h3 className="font-heading font-semibold text-sm text-foreground flex items-center gap-2">
                <Calculator className="h-4.5 w-4.5 text-brand-500" />
                Quick Estimating Tips
              </h3>
              <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Down Payment:</strong> Aim for
                  at least 10-20% of the vehicle price to reduce your monthly
                  payment and interest.
                </p>
                <p>
                  <strong className="text-foreground">Loan Term:</strong> Shorter
                  terms (36-48 months) have higher payments but save money on total
                  interest. Longer terms (60-72 months) offer lower monthly
                  payments.
                </p>
                <p>
                  <strong className="text-foreground">APR:</strong> Rates vary
                  based on credit history. Select a rate that aligns with your
                  estimated credit score bracket.
                </p>
              </div>
            </Card>

            <Card className="p-5 border-border/50 rounded-2xl space-y-4">
              <h3 className="font-heading font-semibold text-sm text-foreground flex items-center gap-2">
                <Percent className="h-4.5 w-4.5 text-brand-500" />
                Our Finance Partners
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We work with multiple major banks, credit unions, and financial institutions
                to ensure you secure the most competitive loan rates available.
              </p>
              <div className="flex items-center gap-2 pt-2 border-t text-[10px] font-semibold text-green-600 dark:text-green-500">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                SSL Secure 256-bit Encryption
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
