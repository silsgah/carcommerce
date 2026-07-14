"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatPrice, calculateMonthlyPayment } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calculator, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface FinancingCalculatorProps {
  initialPrice?: number;
  embed?: boolean;
}

export function FinancingCalculator({
  initialPrice = 35000,
  embed = false,
}: FinancingCalculatorProps) {
  const [price, setPrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeIn, setTradeIn] = useState(0);
  const [apr, setApr] = useState(6.9);
  const [term, setTerm] = useState(60);

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const loanAmount = Math.max(0, price - downPayment - tradeIn);
    const payment = calculateMonthlyPayment(loanAmount, apr, term);
    const totalPaid = payment * term;
    const interest = Math.max(0, totalPaid - loanAmount);

    setMonthlyPayment(Math.round(payment));
    setTotalInterest(Math.round(interest));
    setTotalCost(Math.round(price + interest));
  }, [price, downPayment, tradeIn, apr, term]);

  const handlePrequalify = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pre-qualification application submitted! A finance specialist will reach out shortly.");
  };

  return (
    <div className={embed ? "space-y-6" : "grid grid-cols-1 lg:grid-cols-3 gap-8"}>
      {/* Inputs */}
      <div className={embed ? "space-y-6" : "lg:col-span-2 space-y-6"}>
        {/* Vehicle Price */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="price" className="text-sm font-semibold">Vehicle Price</Label>
            <span className="text-sm font-bold text-foreground">{formatPrice(price)}</span>
          </div>
          <Slider
            min={5000}
            max={150000}
            step={1000}
            value={[price]}
            onValueChange={(val: any) => setPrice(val[0])}
            disabled={embed}
          />
          {!embed && (
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="h-9 rounded-lg"
            />
          )}
        </div>

        {/* Down Payment */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="downPayment" className="text-sm font-semibold">Down Payment</Label>
            <span className="text-sm font-bold text-foreground">{formatPrice(downPayment)}</span>
          </div>
          <Slider
            min={0}
            max={Math.min(price, 50000)}
            step={500}
            value={[downPayment]}
            onValueChange={(val: any) => setDownPayment(val[0])}
          />
          <Input
            id="downPayment"
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Math.min(price, Number(e.target.value)))}
            className="h-9 rounded-lg"
          />
        </div>

        {/* Trade-In Value */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="tradeIn" className="text-sm font-semibold">Estimated Trade-In Value</Label>
            <span className="text-sm font-bold text-foreground">{formatPrice(tradeIn)}</span>
          </div>
          <Slider
            min={0}
            max={Math.min(price - downPayment, 50000)}
            step={500}
            value={[tradeIn]}
            onValueChange={(val: any) => setTradeIn(val[0])}
          />
          <Input
            id="tradeIn"
            type="number"
            value={tradeIn}
            onChange={(e) => setTradeIn(Math.min(price - downPayment, Number(e.target.value)))}
            className="h-9 rounded-lg"
          />
        </div>

        {/* APR */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="apr" className="text-sm font-semibold">Interest Rate (APR)</Label>
            <span className="text-sm font-bold text-foreground">{apr}%</span>
          </div>
          <Slider
            min={0.9}
            max={19.9}
            step={0.1}
            value={[apr]}
            onValueChange={(val: any) => setApr(val[0])}
          />
        </div>

        {/* Term */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Loan Term (Months)</Label>
          <div className="grid grid-cols-5 gap-2">
            {[24, 36, 48, 60, 72].map((m) => (
              <Button
                key={m}
                type="button"
                variant={term === m ? "default" : "outline"}
                onClick={() => setTerm(m)}
                className="h-9 text-xs rounded-lg font-semibold"
              >
                {m} mo
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Outputs / Calculations */}
      <div className={embed ? "" : "lg:col-span-1"}>
        <div className="bg-brand-900 text-white border border-brand-800 rounded-2xl p-6 space-y-6 shadow-lg shadow-brand-950/10">
          <div className="text-center pb-4 border-b border-brand-800/80">
            <p className="text-xs text-brand-200 uppercase font-bold tracking-wider">
              Estimated Payment
            </p>
            <p className="text-4xl font-heading font-bold text-white mt-1">
              {formatPrice(monthlyPayment)}
              <span className="text-sm text-brand-300 font-normal">/mo</span>
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-200">Amount Financed</span>
              <span className="font-semibold text-white">
                {formatPrice(Math.max(0, price - downPayment - tradeIn))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-200">Total Interest</span>
              <span className="font-semibold text-white">{formatPrice(totalInterest)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-200">Total Cost</span>
              <span className="font-semibold text-white">{formatPrice(totalCost)}</span>
            </div>
          </div>

          {!embed && (
            <div className="pt-4 border-t border-brand-800/80 space-y-4">
              <h4 className="font-semibold text-sm text-white">Get Pre-Qualified</h4>
              <form onSubmit={handlePrequalify} className="space-y-3">
                <Input required placeholder="First & Last Name" className="h-9 rounded-lg bg-brand-950/40 border-brand-800 text-white placeholder:text-brand-400 focus-visible:ring-brand-500" />
                <Input required type="email" placeholder="Email Address" className="h-9 rounded-lg bg-brand-950/40 border-brand-800 text-white placeholder:text-brand-400 focus-visible:ring-brand-500" />
                <Input required type="tel" placeholder="Phone Number" className="h-9 rounded-lg bg-brand-950/40 border-brand-800 text-white placeholder:text-brand-400 focus-visible:ring-brand-500" />
                <Button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 text-white rounded-xl text-xs font-semibold gap-1 border-none">
                  Apply for Pre-Qualification <ArrowRight className="h-3 w-3" />
                </Button>
              </form>
              <p className="text-[10px] text-brand-300 text-center leading-normal">
                *Pre-qualification is an estimate only and does not guarantee financing terms. Rates and limits depend on actual credit bureau reports.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
