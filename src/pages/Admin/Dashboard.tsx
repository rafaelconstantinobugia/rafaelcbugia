import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import BioManager from "@/components/Admin/BioManager";
import ProjectsManager from "@/components/Admin/ProjectsManager";
import MediaManager from "@/components/Admin/MediaManager";
import TestimonialsManager from "@/components/Admin/TestimonialsManager";
import SettingsManager from "@/components/Admin/SettingsManager";
import { ContactsManager } from "@/components/Admin/ContactsManager";
import { NewsletterManager } from "@/components/Admin/NewsletterManager";
import PressKitManager from "@/components/Admin/PressKitManager";
import { BookPrereservationsManager } from "@/components/Admin/BookPrereservationsManager";

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">A carregar...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <SEO
        title="Dashboard Admin — Rafael Bugia"
        description="Painel administrativo"
        noindex={true}
      />
      <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <Button onClick={handleLogout} variant="outline">
            Sair
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="bio" className="w-full">
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="bio">Bio</TabsTrigger>
            <TabsTrigger value="projectos">Projectos</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="presskit">Press Kit</TabsTrigger>
            <TabsTrigger value="testemunhos">Testemunhos</TabsTrigger>
            <TabsTrigger value="contactos">Contactos</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            <TabsTrigger value="livro">Livro</TabsTrigger>
            <TabsTrigger value="definicoes">Definições</TabsTrigger>
          </TabsList>

          <TabsContent value="bio" className="mt-6">
            <BioManager />
          </TabsContent>

          <TabsContent value="projectos" className="mt-6">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="media" className="mt-6">
            <MediaManager />
          </TabsContent>

          <TabsContent value="presskit" className="mt-6">
            <PressKitManager />
          </TabsContent>

          <TabsContent value="testemunhos" className="mt-6">
            <TestimonialsManager />
          </TabsContent>

          <TabsContent value="contactos" className="mt-6">
            <ContactsManager />
          </TabsContent>

          <TabsContent value="newsletter" className="mt-6">
            <NewsletterManager />
          </TabsContent>

          <TabsContent value="livro" className="mt-6">
            <BookPrereservationsManager />
          </TabsContent>

          <TabsContent value="definicoes" className="mt-6">
            <SettingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  );
}
