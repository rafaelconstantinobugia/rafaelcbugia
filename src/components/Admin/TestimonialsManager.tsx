import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";
import { ImageUploader } from "./ImageUploader";

interface Testimonial {
  id?: string;
  name: string;
  role: string;
  testimonial: string;
  photo_url: string;
  priority: number;
  is_active: boolean;
}

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("priority", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar testemunhos");
    } else {
      setTestimonials(data || []);
    }
  };

  const handleSave = async () => {
    if (!editingTestimonial) return;

    const { id, ...testimonialData } = editingTestimonial;

    let error;
    if (id) {
      ({ error } = await supabase
        .from("testimonials")
        .update(testimonialData)
        .eq("id", id));
    } else {
      ({ error } = await supabase
        .from("testimonials")
        .insert([testimonialData]));
    }

    if (error) {
      toast.error("Erro ao guardar: " + error.message);
    } else {
      toast.success("Testemunho guardado com sucesso!");
      setShowForm(false);
      setEditingTestimonial(null);
      fetchTestimonials();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem a certeza que deseja eliminar este testemunho?")) return;

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Erro ao eliminar");
    } else {
      toast.success("Testemunho eliminado!");
      fetchTestimonials();
    }
  };

  const startEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
  };

  const startNew = () => {
    setEditingTestimonial({
      name: "",
      role: "",
      testimonial: "",
      photo_url: "",
      priority: 0,
      is_active: true,
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerir Testemunhos</h2>
        <Button onClick={startNew}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Testemunho
        </Button>
      </div>

      {showForm && editingTestimonial && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingTestimonial.id ? "Editar Testemunho" : "Novo Testemunho"}
          </h3>
          <div className="space-y-4">
            <Input
              placeholder="Nome"
              value={editingTestimonial.name}
              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
            />
            <Input
              placeholder="Função/Cargo"
              value={editingTestimonial.role}
              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
            />
            <Textarea
              placeholder="Testemunho"
              value={editingTestimonial.testimonial}
              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, testimonial: e.target.value })}
              rows={4}
            />
            <ImageUploader
              folder="testimonials"
              currentUrl={editingTestimonial.photo_url}
              onUploadComplete={(url) => setEditingTestimonial({ ...editingTestimonial, photo_url: url })}
              label="Foto do Testemunho"
            />
            <Input
              type="number"
              placeholder="Prioridade"
              value={editingTestimonial.priority}
              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, priority: parseInt(e.target.value) })}
            />
            <div className="flex items-center gap-2">
              <Switch
                checked={editingTestimonial.is_active}
                onCheckedChange={(checked) => setEditingTestimonial({ ...editingTestimonial, is_active: checked })}
              />
              <label className="text-sm">Activo</label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">Guardar</Button>
              <Button onClick={() => { setShowForm(false); setEditingTestimonial(null); }} variant="outline">
                Cancelar
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{testimonial.testimonial}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Prioridade: {testimonial.priority} | {testimonial.is_active ? "Activo" : "Inactivo"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(testimonial)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => testimonial.id && handleDelete(testimonial.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
