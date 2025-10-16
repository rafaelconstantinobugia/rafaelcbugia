import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Trash2, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BookPrereservation {
  id: string;
  name: string;
  email: string;
  source: string;
  created_at: string;
}

export function BookPrereservationsManager() {
  const [prereservations, setPrereservations] = useState<BookPrereservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    loadPrereservations();
    loadSettings();
  }, []);

  const loadPrereservations = async () => {
    try {
      const { data, error } = await supabase
        .from('book_prereservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrereservations(data || []);
    } catch (error) {
      console.error('Error loading pre-reservations:', error);
      toast.error("Erro ao carregar pré-reservas");
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'book_prereservation_enabled')
        .single();

      if (error) throw error;
      setEnabled(data?.value === true);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleToggle = async (checked: boolean) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ value: checked })
        .eq('key', 'book_prereservation_enabled');

      if (error) throw error;
      setEnabled(checked);
      toast.success(checked ? "Pré-reservas activadas" : "Pré-reservas desactivadas");
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error("Erro ao actualizar configuração");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem a certeza que quer eliminar esta pré-reserva?")) return;

    try {
      const { error } = await supabase
        .from('book_prereservations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Pré-reserva eliminada");
      loadPrereservations();
    } catch (error) {
      console.error('Error deleting pre-reservation:', error);
      toast.error("Erro ao eliminar pré-reserva");
    }
  };

  const handleExport = () => {
    const csv = [
      ['Nome', 'Email', 'Origem', 'Data'],
      ...prereservations.map(p => [
        p.name,
        p.email,
        p.source,
        new Date(p.created_at).toLocaleString('pt-PT')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pre-reservas-livro-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success("Ficheiro CSV exportado");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pré-Reservas do Livro</CardTitle>
        <CardDescription>
          Gerir pré-reservas de "IA para a Minha Avó"
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="book-prereservation-toggle"
              checked={enabled}
              onCheckedChange={handleToggle}
            />
            <Label htmlFor="book-prereservation-toggle">
              Activar pré-reservas
            </Label>
          </div>
          
          <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
            disabled={prereservations.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            A carregar...
          </div>
        ) : prereservations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Ainda sem pré-reservas
          </div>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Acções</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prereservations.map((prereservation) => (
                  <TableRow key={prereservation.id}>
                    <TableCell className="font-medium">{prereservation.name}</TableCell>
                    <TableCell>{prereservation.email}</TableCell>
                    <TableCell>{prereservation.source}</TableCell>
                    <TableCell>
                      {new Date(prereservation.created_at).toLocaleDateString('pt-PT')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(prereservation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          Total: {prereservations.length} pré-reservas
        </div>
      </CardContent>
    </Card>
  );
}
