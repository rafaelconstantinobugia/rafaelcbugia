import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function TestimonialsSection() {
  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("priority", { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">O que dizem sobre mim</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-8 relative hover-lift">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
              
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-14 w-14">
                  {testimonial.photo_url && (
                    <AvatarImage src={testimonial.photo_url} alt={testimonial.name} />
                  )}
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>

              <div className="prose prose-sm prose-invert max-w-none">
                <ReactMarkdown>{testimonial.testimonial}</ReactMarkdown>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}