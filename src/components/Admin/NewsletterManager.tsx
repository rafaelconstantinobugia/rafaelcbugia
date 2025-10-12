import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, Download } from "lucide-react";

interface NewsletterSubscription {
  id: string;
  email: string;
  confirmed: boolean;
  created_at: string;
}

export const NewsletterManager = () => {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportSubscriptions = () => {
    const confirmed = subscriptions.filter(s => s.confirmed);
    const csv = [
      "Email,Data de Subscrição",
      ...confirmed.map(s => `${s.email},${new Date(s.created_at).toLocaleDateString('pt-PT')}`)
    ].join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const confirmedCount = subscriptions.filter(s => s.confirmed).length;
  const pendingCount = subscriptions.filter(s => !s.confirmed).length;

  if (loading) {
    return <div>A carregar...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Newsletter</h2>
        <div className="flex gap-2">
          <Badge variant="default">{confirmedCount} confirmadas</Badge>
          <Badge variant="secondary">{pendingCount} pendentes</Badge>
          <Button size="sm" variant="outline" onClick={exportSubscriptions}>
            <Download className="h-4 w-4 mr-2" />
            Exportar Lista
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{subscription.email}</p>
                  {subscription.confirmed ? (
                    <Badge variant="outline" className="text-xs">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                      Confirmada
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      <XCircle className="h-3 w-3 mr-1 text-orange-500" />
                      Pendente
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Subscrito em {new Date(subscription.created_at).toLocaleString("pt-PT")}
                </p>
              </div>
            </div>
          </Card>
        ))}

        {subscriptions.length === 0 && (
          <Card className="p-12 text-center text-muted-foreground">
            Ainda não existem subscrições na newsletter
          </Card>
        )}
      </div>
    </div>
  );
};
