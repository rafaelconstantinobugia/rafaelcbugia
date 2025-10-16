import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import ReactMarkdown from "react-markdown";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export default function BioManager() {
  const [introText, setIntroText] = useState("");
  const [bioImageUrl, setBioImageUrl] = useState("");
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [bioId, setBioId] = useState<string | null>(null);

  useEffect(() => {
    fetchBioContent();
  }, []);

  const fetchBioContent = async () => {
    const { data, error } = await supabase
      .from("bio_content")
      .select("*")
      .maybeSingle();

    if (error) {
      toast.error("Erro ao carregar bio");
      return;
    }

    if (data) {
      setBioId(data.id);
      setIntroText(data.intro_text || "");
      setBioImageUrl(data.bio_image_url || "");
      setTimeline((data.timeline as unknown as TimelineItem[]) || []);
    }
  };

  const handleSave = async () => {
    setLoading(true);

    const bioData = {
      intro_text: introText,
      bio_image_url: bioImageUrl,
      timeline: timeline as any,
    };

    let error;
    if (bioId) {
      ({ error } = await supabase
        .from("bio_content")
        .update(bioData)
        .eq("id", bioId));
    } else {
      const { data, error: insertError } = await supabase
        .from("bio_content")
        .insert([bioData])
        .select()
        .single();
      error = insertError;
      if (data) setBioId(data.id);
    }

    if (error) {
      toast.error("Erro ao guardar: " + error.message);
    } else {
      toast.success("Bio actualizada com sucesso!");
    }
    setLoading(false);
  };

  const addTimelineItem = () => {
    setTimeline([...timeline, { year: "", title: "", description: "" }]);
  };

  const removeTimelineItem = (index: number) => {
    setTimeline(timeline.filter((_, i) => i !== index));
  };

  const updateTimelineItem = (index: number, field: keyof TimelineItem, value: string) => {
    const updated = [...timeline];
    updated[index][field] = value;
    setTimeline(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gerir Bio</h2>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Texto Introdutório (suporta Markdown)</label>
            <Textarea
              value={introText}
              onChange={(e) => setIntroText(e.target.value)}
              rows={10}
              placeholder="Utilize **negrito**, *itálico*, parágrafos, listas, etc..."
              className="font-mono text-sm"
            />
            <div className="mt-2 text-xs text-muted-foreground">
              Dica: Use Enter para criar parágrafos. Markdown básico é suportado.
            </div>
            {introText && (
              <div className="mt-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="text-xs font-medium mb-2 text-muted-foreground">Preview:</div>
                <div className="prose prose-sm prose-invert max-w-none">
                  <ReactMarkdown>{introText}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          <ImageUploader
            folder="bio"
            currentUrl={bioImageUrl}
            onUploadComplete={(url) => setBioImageUrl(url)}
            label="Imagem da Bio"
          />

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium">Linha Temporal</label>
              <Button onClick={addTimelineItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Marco
              </Button>
            </div>

            {timeline.map((item, index) => (
              <Card key={index} className="p-4 mb-3">
                <div className="flex gap-3 items-start">
                  <div className="flex-1 space-y-3">
                    <Input
                      placeholder="Ano"
                      value={item.year}
                      onChange={(e) => updateTimelineItem(index, "year", e.target.value)}
                    />
                    <Input
                      placeholder="Título"
                      value={item.title}
                      onChange={(e) => updateTimelineItem(index, "title", e.target.value)}
                    />
                    <Textarea
                      placeholder="Descrição"
                      value={item.description}
                      onChange={(e) => updateTimelineItem(index, "description", e.target.value)}
                      rows={2}
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeTimelineItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Button onClick={handleSave} disabled={loading} className="w-full">
            {loading ? "A guardar..." : "Guardar Alterações"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
