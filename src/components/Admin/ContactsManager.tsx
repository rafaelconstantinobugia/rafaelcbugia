import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, Mail } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  processed: boolean;
  created_at: string;
}

export const ContactsManager = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
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

  const markAsProcessed = async (id: string) => {
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ processed: true })
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: "Mensagem marcada como processada",
      });
      
      fetchSubmissions();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>A carregar...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mensagens de Contacto</h2>
        <Badge variant="secondary">{submissions.length} total</Badge>
      </div>

      <div className="space-y-4">
        {submissions.map((submission) => (
          <Card key={submission.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{submission.name}</h3>
                  {submission.processed && (
                    <Badge variant="outline" className="text-xs">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Processada
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${submission.email}`} className="hover:text-primary">
                    {submission.email}
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(submission.created_at).toLocaleString("pt-PT")}
                </p>
              </div>
              {!submission.processed && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => markAsProcessed(submission.id)}
                >
                  Marcar como processada
                </Button>
              )}
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Assunto:</p>
                <p className="text-sm text-muted-foreground">{submission.subject}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Mensagem:</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {submission.message}
                </p>
              </div>
            </div>
          </Card>
        ))}

        {submissions.length === 0 && (
          <Card className="p-12 text-center text-muted-foreground">
            Ainda não existem mensagens de contacto
          </Card>
        )}
      </div>
    </div>
  );
};
