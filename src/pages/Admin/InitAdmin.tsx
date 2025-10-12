import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function InitAdmin() {
  const [loading, setLoading] = useState(false);

  const createAdminUser = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-admin');
      
      if (error) {
        toast.error("Erro ao criar administrador: " + error.message);
      } else if (data.success) {
        toast.success("Administrador criado com sucesso! Pode agora fazer login em /admin");
      }
    } catch (error) {
      toast.error("Erro inesperado ao criar administrador");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-4">Inicializar Admin</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Clique no botão abaixo para criar o utilizador administrador inicial.
          Apenas execute isto uma vez.
        </p>
        <Button 
          onClick={createAdminUser} 
          className="w-full" 
          disabled={loading}
        >
          {loading ? "A criar..." : "Criar Administrador"}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-4">
          Email: rafaelcbugia@gmail.com<br />
          Password: Admin95!
        </p>
      </Card>
    </div>
  );
}
