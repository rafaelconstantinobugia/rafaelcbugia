import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Project {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  external_url: string;
  image_url: string;
  priority: number;
  is_active: boolean;
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projectos")
      .select("*")
      .order("priority", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar projectos");
    } else {
      setProjects(data || []);
    }
  };

  const handleSave = async () => {
    if (!editingProject) return;

    const { id, ...projectData } = editingProject;

    let error;
    if (id) {
      ({ error } = await supabase
        .from("projectos")
        .update(projectData)
        .eq("id", id));
    } else {
      ({ error } = await supabase
        .from("projectos")
        .insert([projectData]));
    }

    if (error) {
      toast.error("Erro ao guardar: " + error.message);
    } else {
      toast.success("Projecto guardado com sucesso!");
      setShowForm(false);
      setEditingProject(null);
      fetchProjects();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem a certeza que deseja eliminar este projecto?")) return;

    const { error } = await supabase
      .from("projectos")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Erro ao eliminar");
    } else {
      toast.success("Projecto eliminado!");
      fetchProjects();
    }
  };

  const startEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const startNew = () => {
    setEditingProject({
      title: "",
      subtitle: "",
      description: "",
      external_url: "",
      image_url: "",
      priority: 0,
      is_active: true,
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerir Projectos</h2>
        <Button onClick={startNew}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Projecto
        </Button>
      </div>

      {showForm && editingProject && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingProject.id ? "Editar Projecto" : "Novo Projecto"}
          </h3>
          <div className="space-y-4">
            <Input
              placeholder="Título"
              value={editingProject.title}
              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
            />
            <Input
              placeholder="Subtítulo"
              value={editingProject.subtitle}
              onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
            />
            <Textarea
              placeholder="Descrição"
              value={editingProject.description}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              rows={4}
            />
            <Input
              placeholder="URL Externo"
              value={editingProject.external_url}
              onChange={(e) => setEditingProject({ ...editingProject, external_url: e.target.value })}
            />
            <Input
              placeholder="URL da Imagem"
              value={editingProject.image_url}
              onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Prioridade"
              value={editingProject.priority}
              onChange={(e) => setEditingProject({ ...editingProject, priority: parseInt(e.target.value) })}
            />
            <div className="flex items-center gap-2">
              <Switch
                checked={editingProject.is_active}
                onCheckedChange={(checked) => setEditingProject({ ...editingProject, is_active: checked })}
              />
              <label className="text-sm">Activo</label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">Guardar</Button>
              <Button onClick={() => { setShowForm(false); setEditingProject(null); }} variant="outline">
                Cancelar
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Prioridade: {project.priority} | {project.is_active ? "Activo" : "Inactivo"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(project)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => project.id && handleDelete(project.id)}>
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
