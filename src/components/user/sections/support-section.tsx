"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Ticket, Plus, MessageSquare, Phone, Mail, HelpCircle, ArrowRight, Clock } from "lucide-react";

export function SupportSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-gradient">Support Center</h1>
          <p className="text-muted-foreground font-medium">Get help with your bookings, payments, or account issues.</p>
        </div>
        <Button className="rounded-2xl h-12 px-6 font-bold shadow-xl shadow-primary/20 transition-all hover:-translate-y-1">
          <Plus className="h-5 w-5 mr-2 stroke-[3]" />
          Create New Ticket
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-black tracking-tight">Active Tickets</h3>
           </div>

           <Card className="rounded-[2rem] border-none shadow-sm bg-white/50 backdrop-blur-sm overflow-hidden group">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <Badge className="bg-amber-500 text-white border-none px-3 py-1 font-bold rounded-full">PENDING</Badge>
                       <span className="text-xs font-black text-slate-400 uppercase tracking-widest">#TK-89012</span>
                    </div>
                    <h3 className="font-black text-lg text-slate-900">Issue with RFID entry at Gulshan North</h3>
                    <p className="text-slate-600 font-medium text-sm line-clamp-2">
                      My vehicle was not recognized at the gate even though I have an active booking. I had to pay manually to enter.
                    </p>
                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> 2 hours ago</span>
                       <span className="flex items-center gap-1.5"><MessageSquare className="h-3 w-3" /> 1 Reply</span>
                    </div>
                  </div>
                  <div className="flex items-center shrink-0">
                     <Button variant="ghost" className="rounded-xl font-bold text-primary group-hover:translate-x-1 transition-transform">
                        View Chat <ArrowRight className="h-4 w-4 ml-2" />
                     </Button>
                  </div>
                </div>
              </CardContent>
           </Card>

           <div className="pt-8 space-y-6">
              <h3 className="text-xl font-black tracking-tight">Quick Help</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                 {[
                   { title: 'Booking Guide', icon: Ticket, color: 'bg-blue-50 text-blue-500' },
                   { title: 'Payment Issues', icon: HelpCircle, color: 'bg-emerald-50 text-emerald-500' },
                   { title: 'Account Security', icon: HelpCircle, color: 'bg-amber-50 text-amber-500' },
                   { title: 'Zone Locations', icon: HelpCircle, color: 'bg-rose-50 text-rose-500' },
                 ].map((item, idx) => (
                   <button key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 border border-slate-100 hover:bg-white hover:shadow-md transition-all text-left">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${item.color}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="font-bold text-sm text-slate-700">{item.title}</span>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <Card className="rounded-[2.5rem] bg-slate-900 text-white p-8 overflow-hidden relative border-none shadow-2xl">
              <div className="relative z-10 space-y-6">
                 <h3 className="text-xl font-black tracking-tight">Contact Us</h3>
                 <p className="text-slate-400 font-medium text-sm leading-relaxed">Our support team is available 24/7 to assist you with any inquiries.</p>
                 
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 group">
                       <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          <Phone className="h-5 w-5" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Call us</p>
                          <p className="font-bold text-sm">+880 1234 567 890</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                       <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                          <Mail className="h-5 w-5" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email us</p>
                          <p className="font-bold text-sm">support@parkbd.com</p>
                       </div>
                    </div>
                 </div>

                 <Button variant="secondary" className="w-full rounded-xl h-12 font-bold shadow-xl shadow-black/20">
                    Live Chat Now
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
