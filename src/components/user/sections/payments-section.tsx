"use client";

import { mockPayments } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { CreditCard, Wallet, Plus, ArrowUpRight, ArrowDownLeft, Receipt, CheckCircle2, Clock } from "lucide-react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { formatCurrency } from "@/lib/utils";

export function PaymentsSection() {
  const { isDemoMode } = useDemoModeStore();
  const payments = isDemoMode ? mockPayments : [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-gradient">Payments</h1>
          <p className="text-muted-foreground font-medium">Manage your billing history and payment methods.</p>
        </div>
        <Button className="rounded-2xl h-12 px-6 font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1">
          <Plus className="h-5 w-5 mr-2 stroke-[3]" />
          Add Payment Method
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2rem] border-none shadow-sm bg-white/50 backdrop-blur-sm overflow-hidden">
             <CardHeader className="px-8 pt-8 flex flex-row items-center justify-between">
               <div>
                 <CardTitle className="text-xl font-black tracking-tight">Recent Transactions</CardTitle>
                 <p className="text-xs text-muted-foreground font-medium mt-1">Your latest payment activity</p>
               </div>
               <Button variant="ghost" size="sm" className="font-bold text-primary">View All</Button>
             </CardHeader>
             <CardContent className="px-0 pb-0">
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-slate-50/50">
                       <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction</th>
                       <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Method</th>
                       <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                       <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                       <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                     </tr>
                   </thead>
                   <tbody>
                     {payments.map((payment) => (
                       <tr key={payment.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors group">
                         <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                               <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${payment.payment_status === 'paid' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                                  <Receipt className="h-5 w-5" />
                               </div>
                               <div>
                                  <p className="text-sm font-bold text-slate-900">{payment.transaction_id || 'Pending ID'}</p>
                                  <p className="text-[10px] text-muted-foreground font-medium">Ref: {payment.booking_id}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                               <Badge variant="outline" className="rounded-lg bg-white border-slate-200 font-bold text-[10px] uppercase">{payment.payment_method}</Badge>
                            </div>
                         </td>
                         <td className="px-8 py-5">
                            <p className="text-sm font-medium text-slate-600">{payment.payment_date || 'N/A'}</p>
                         </td>
                         <td className="px-8 py-5 text-right">
                            <p className="text-sm font-black text-slate-900">{formatCurrency(payment.amount)}</p>
                         </td>
                         <td className="px-8 py-5">
                            <div className="flex justify-center">
                               {payment.payment_status === 'paid' ? (
                                 <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none px-3 py-1 font-bold rounded-full">PAID</Badge>
                               ) : (
                                 <Badge className="bg-amber-500 hover:bg-amber-600 border-none px-3 py-1 font-bold rounded-full">PENDING</Badge>
                               )}
                            </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
           <Card className="rounded-[2.5rem] bg-slate-900 text-white p-8 relative overflow-hidden border-none shadow-2xl">
              <div className="relative z-10">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Total Spent</p>
                <p className="text-4xl font-black tracking-tight mb-8">{formatCurrency(10500)}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <p className="font-bold text-sm">Wallet Balance</p>
                    </div>
                    <p className="font-black">৳0.00</p>
                  </div>
                  <Button className="w-full rounded-xl h-12 font-bold shadow-xl shadow-primary/20">Add Money</Button>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-10">
                <CreditCard size={180} className="rotate-12" />
              </div>
           </Card>

           <Card className="rounded-[2rem] border-none shadow-sm bg-white/50 backdrop-blur-sm p-8 space-y-6">
              <h3 className="text-lg font-black tracking-tight">Saved Methods</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 border-dashed">
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 rounded-xl bg-slate-200/50 flex items-center justify-center text-slate-400">
                          <Plus className="h-5 w-5" />
                       </div>
                       <p className="text-sm font-bold text-slate-500">Add bKash or Nagad</p>
                    </div>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
