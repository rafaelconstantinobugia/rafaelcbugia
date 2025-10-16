import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Eye, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

interface UserData {
  contactSubmissions: any[];
  newsletterSubscriptions: any[];
  bookPrereservations: any[];
  cookieConsents: any[];
}

export default function GerirDados() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchUserData = async (userEmail: string) => {
    setLoading(true);
    try {
      const normalizedEmail = userEmail.trim().toLowerCase();

      // Fetch all data related to this email
      const [contacts, newsletters, prereservations, cookies] = await Promise.all([
        supabase.from('contact_submissions').select('*').eq('email', normalizedEmail),
        supabase.from('newsletter_subscriptions').select('*').eq('email', normalizedEmail),
        supabase.from('book_prereservations').select('*').eq('email', normalizedEmail),
        supabase.from('cookie_consents').select('*'),
      ]);

      setUserData({
        contactSubmissions: contacts.data || [],
        newsletterSubscriptions: newsletters.data || [],
        bookPrereservations: prereservations.data || [],
        cookieConsents: cookies.data || [],
      });

      toast.success("Dados carregados com sucesso");
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    if (!userData) return;

    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meus-dados-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success("Dados exportados com sucesso");
  };

  const deleteAllData = async () => {
    if (!email) return;
    
    setDeleting(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();

      // Delete all data related to this email
      await Promise.all([
        supabase.from('contact_submissions').delete().eq('email', normalizedEmail),
        supabase.from('newsletter_subscriptions').delete().eq('email', normalizedEmail),
        supabase.from('book_prereservations').delete().eq('email', normalizedEmail),
      ]);

      toast.success("Todos os seus dados foram eliminados");
      setUserData(null);
      setEmail("");
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error("Erro ao eliminar dados");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <SEO
        title="Gerir os Meus Dados Pessoais - Rafael C. Búgia"
        description="Aceda, exporte ou elimine os seus dados pessoais de acordo com o RGPD"
        canonical="https://rafaelcbugia.com/gerir-dados"
      />
      
      <main role="main" className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs items={[{ label: "Gerir os Meus Dados" }]} />
          
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Gerir os Meus Dados Pessoais</h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-8" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Em conformidade com o RGPD, pode aceder, exportar ou eliminar todos os seus dados pessoais.
            </p>
          </header>

          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Aceder aos Meus Dados</h2>
            <p className="text-muted-foreground mb-6">
              Introduza o seu email para ver todos os dados que temos sobre si.
            </p>
            
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="flex-1 px-4 py-2 border rounded-md"
              />
              <Button 
                onClick={() => fetchUserData(email)}
                disabled={loading || !email}
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver Dados
              </Button>
            </div>
          </Card>

          {userData && (
            <>
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Os Seus Dados</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Mensagens de Contacto</h3>
                    <p className="text-muted-foreground">
                      {userData.contactSubmissions.length} mensagem(ns) encontrada(s)
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Subscrições de Newsletter</h3>
                    <p className="text-muted-foreground">
                      {userData.newsletterSubscriptions.length} subscrição(ões) encontrada(s)
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Pré-reservas de Livro</h3>
                    <p className="text-muted-foreground">
                      {userData.bookPrereservations.length} pré-reserva(s) encontrada(s)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button onClick={exportData} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar Dados (JSON)
                  </Button>
                </div>
              </Card>

              <Card className="p-8 border-destructive">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-destructive mt-1" />
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-2 text-destructive">
                      Direito ao Esquecimento
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Pode solicitar a eliminação permanente de todos os seus dados pessoais. 
                      Esta ação é irreversível.
                    </p>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" disabled={deleting}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar Todos os Meus Dados
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Tem a certeza absoluta?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser revertida. Todos os seus dados pessoais serão 
                            permanentemente eliminados dos nossos sistemas, incluindo:
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              <li>Mensagens de contacto</li>
                              <li>Subscrições de newsletter</li>
                              <li>Pré-reservas de livro</li>
                            </ul>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={deleteAllData}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Sim, Eliminar Tudo
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </Card>
            </>
          )}

          <Card className="p-6 mt-8 bg-muted">
            <h3 className="font-semibold mb-2">Os Seus Direitos RGPD</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>✓ Direito de acesso aos seus dados pessoais</li>
              <li>✓ Direito à portabilidade dos dados (exportação)</li>
              <li>✓ Direito ao esquecimento (eliminação)</li>
              <li>✓ Direito à retificação (contacte-nos para alterar dados)</li>
              <li>✓ Direito de apresentar reclamação à CNPD</li>
            </ul>
          </Card>
        </div>
      </main>
    </>
  );
}
