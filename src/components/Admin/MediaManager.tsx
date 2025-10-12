import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";

interface MediaArticle {
  id?: string;
  title: string;
  source: string;
  published_date: string;
  excerpt: string;
  external_url: string;
  thumbnail_url: string;
}

export default function MediaManager() {
  const [articles, setArticles] = useState<MediaArticle[]>([]);
  const [editingArticle, setEditingArticle] = useState<MediaArticle | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("media_articles")
      .select("*")
      .order("published_date", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar artigos");
    } else {
      setArticles(data || []);
    }
  };

  const handleSave = async () => {
    if (!editingArticle) return;

    const { id, ...articleData } = editingArticle;

    let error;
    if (id) {
      ({ error } = await supabase
        .from("media_articles")
        .update(articleData)
        .eq("id", id));
    } else {
      ({ error } = await supabase
        .from("media_articles")
        .insert([articleData]));
    }

    if (error) {
      toast.error("Erro ao guardar: " + error.message);
    } else {
      toast.success("Artigo guardado com sucesso!");
      setShowForm(false);
      setEditingArticle(null);
      fetchArticles();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem a certeza que deseja eliminar este artigo?")) return;

    const { error } = await supabase
      .from("media_articles")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Erro ao eliminar");
    } else {
      toast.success("Artigo eliminado!");
      fetchArticles();
    }
  };

  const startEdit = (article: MediaArticle) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  const startNew = () => {
    setEditingArticle({
      title: "",
      source: "",
      published_date: new Date().toISOString().split('T')[0],
      excerpt: "",
      external_url: "",
      thumbnail_url: "",
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerir Media</h2>
        <Button onClick={startNew}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Artigo
        </Button>
      </div>

      {showForm && editingArticle && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingArticle.id ? "Editar Artigo" : "Novo Artigo"}
          </h3>
          <div className="space-y-4">
            <Input
              placeholder="Título"
              value={editingArticle.title}
              onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
            />
            <Input
              placeholder="Fonte/Publicação"
              value={editingArticle.source}
              onChange={(e) => setEditingArticle({ ...editingArticle, source: e.target.value })}
            />
            <Input
              type="date"
              placeholder="Data de Publicação"
              value={editingArticle.published_date}
              onChange={(e) => setEditingArticle({ ...editingArticle, published_date: e.target.value })}
            />
            <Textarea
              placeholder="Excerto"
              value={editingArticle.excerpt}
              onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
              rows={3}
            />
            <Input
              placeholder="URL Externo"
              value={editingArticle.external_url}
              onChange={(e) => setEditingArticle({ ...editingArticle, external_url: e.target.value })}
            />
            <Input
              placeholder="URL do Thumbnail"
              value={editingArticle.thumbnail_url}
              onChange={(e) => setEditingArticle({ ...editingArticle, thumbnail_url: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">Guardar</Button>
              <Button onClick={() => { setShowForm(false); setEditingArticle(null); }} variant="outline">
                Cancelar
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold">{article.title}</h3>
                <p className="text-sm text-muted-foreground">{article.source} • {article.published_date}</p>
                <p className="text-xs text-muted-foreground mt-1">{article.excerpt}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(article)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => article.id && handleDelete(article.id)}>
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
