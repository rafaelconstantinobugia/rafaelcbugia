import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PressKitManager() {
  const [bioPt, setBioPt] = useState("");
  const [bioEn, setBioEn] = useState("");
  const [bioEs, setBioEs] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPressKit();
  }, []);

  const fetchPressKit = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "press_kit")
        .single();

      if (error) throw error;

      if (data?.value) {
        const pressKit = data.value as any;
        setBioPt(pressKit.bio_pt || "");
        setBioEn(pressKit.bio_en || "");
        setBioEs(pressKit.bio_es || "");
        setDownloadUrl(pressKit.download_url || "");
      }
    } catch (error) {
      console.error("Error fetching press kit:", error);
      toast.error("Erro ao carregar press kit");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const pressKitData = {
        bio_pt: bioPt,
        bio_en: bioEn,
        bio_es: bioEs,
        download_url: downloadUrl,
      };

      const { error } = await supabase
        .from("site_settings")
        .upsert({
          key: "press_kit",
          value: pressKitData,
        });

      if (error) throw error;

      toast.success("Press kit guardado com sucesso!");
    } catch (error) {
      console.error("Error saving press kit:", error);
      toast.error("Erro ao guardar press kit");
    }
  };

  if (loading) {
    return <div className="text-center py-8">A carregar...</div>;
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Gestão do Press Kit</h2>

      <div className="space-y-6">
        <Tabs defaultValue="pt" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pt">PT</TabsTrigger>
            <TabsTrigger value="en">EN</TabsTrigger>
            <TabsTrigger value="es">ES</TabsTrigger>
          </TabsList>

          <TabsContent value="pt" className="mt-4">
            <div>
              <Label htmlFor="bio-pt">Bio Oficial (PT)</Label>
              <Textarea
                id="bio-pt"
                value={bioPt}
                onChange={(e) => setBioPt(e.target.value)}
                rows={6}
                className="mt-2"
                placeholder="Bio oficial em português..."
              />
            </div>
          </TabsContent>

          <TabsContent value="en" className="mt-4">
            <div>
              <Label htmlFor="bio-en">Official Bio (EN)</Label>
              <Textarea
                id="bio-en"
                value={bioEn}
                onChange={(e) => setBioEn(e.target.value)}
                rows={6}
                className="mt-2"
                placeholder="Official bio in English..."
              />
            </div>
          </TabsContent>

          <TabsContent value="es" className="mt-4">
            <div>
              <Label htmlFor="bio-es">Bio Oficial (ES)</Label>
              <Textarea
                id="bio-es"
                value={bioEs}
                onChange={(e) => setBioEs(e.target.value)}
                rows={6}
                className="mt-2"
                placeholder="Bio oficial en español..."
              />
            </div>
          </TabsContent>
        </Tabs>

        <div>
          <Label htmlFor="download-url">URL do Ficheiro de Download</Label>
          <Input
            id="download-url"
            type="url"
            value={downloadUrl}
            onChange={(e) => setDownloadUrl(e.target.value)}
            placeholder="https://rafaelcbugia.com/press-kit.pdf"
            className="mt-2"
          />
          <p className="text-sm text-muted-foreground mt-2">
            URL para download da bio e foto (ficheiro PDF, ZIP, etc.)
          </p>
        </div>

        <Button onClick={handleSave} className="w-full">
          Guardar Alterações
        </Button>
      </div>
    </Card>
  );
}
