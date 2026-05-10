"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Star, MessageSquare, ThumbsUp, MapPin, Plus } from "lucide-react";

export function ReviewsSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-gradient">My Reviews</h1>
          <p className="text-muted-foreground font-medium">Share your parking experiences and help the community.</p>
        </div>
        <Button className="rounded-2xl h-12 px-6 font-bold shadow-xl shadow-primary/20 transition-all hover:-translate-y-1">
          <Plus className="h-5 w-5 mr-2 stroke-[3]" />
          Write a Review
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
         <Card className="lg:col-span-1 rounded-[2rem] border-none shadow-sm bg-white/50 backdrop-blur-sm p-8 flex flex-col items-center justify-center text-center space-y-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Average Rating</p>
            <p className="text-6xl font-black text-slate-900 tracking-tighter">4.8</p>
            <div className="flex items-center gap-1">
               {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-sm font-medium text-muted-foreground">Based on 12 reviews given by you</p>
         </Card>

         <div className="lg:col-span-3 space-y-6">
            {[1, 2].map((i) => (
              <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-white/50 backdrop-blur-sm overflow-hidden group">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                           <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-black text-lg text-slate-900">Gulshan North Parking</h3>
                          <p className="text-xs text-muted-foreground font-medium">Reviewed on May {10-i}, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                         {[1,2,3,4,5].map(star => (
                           <Star key={star} className={`h-4 w-4 ${star <= 5-i ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                         ))}
                      </div>
                      <p className="text-slate-600 font-medium leading-relaxed italic">
                        "{i === 1 ? 'Excellent service and very secure area. The RFID entry worked perfectly!' : 'Great location but the ramp is a bit steep for large cars. Staff is very helpful.'}"
                      </p>
                      <div className="flex items-center gap-6 pt-2">
                         <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors">
                            <ThumbsUp className="h-4 w-4" /> 24 Helpful
                         </button>
                         <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors">
                            <MessageSquare className="h-4 w-4" /> 3 Replies
                         </button>
                      </div>
                    </div>
                    <div className="flex md:flex-col justify-end gap-2 shrink-0">
                       <Button variant="ghost" size="sm" className="rounded-xl font-bold text-slate-500">Edit</Button>
                       <Button variant="ghost" size="sm" className="rounded-xl font-bold text-rose-500 hover:bg-rose-50">Delete</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
         </div>
      </div>
    </div>
  );
}
