import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      // Check if user has admin role
      const { data: roleData, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      if (error || !roleData) {
        toast.error("Acesso negado. Apenas administradores podem aceder.");
        await supabase.auth.signOut();
        navigate("/admin");
      } else {
        setIsAdmin(true);
      }
      
      setLoading(false);
    };

    checkAdminStatus();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sessão terminada com sucesso!");
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">A carregar...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <Button onClick={handleLogout} variant="outline">
            Sair
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Bio</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Editar conteúdo da página de biografia
            </p>
            <Button className="w-full">Editar Bio</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Projectos</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Gerir projectos e portfolio
            </p>
            <Button className="w-full">Gerir Projectos</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Media</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Adicionar e editar artigos de media
            </p>
            <Button className="w-full">Gerir Media</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Testemunhos</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Gerir testemunhos de clientes
            </p>
            <Button className="w-full">Gerir Testemunhos</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Definições</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Configurações gerais do site
            </p>
            <Button className="w-full">Definições</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
