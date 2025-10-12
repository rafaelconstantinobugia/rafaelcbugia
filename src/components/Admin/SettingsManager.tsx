import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function SettingsManager() {
  const [homeHero, setHomeHero] = useState("");
  const [contactIntro, setContactIntro] = useState("");
  const [contactSuccess, setContactSuccess] = useState("");
  const [howIWork, setHowIWork] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*");

    if (error) {
      toast.error("Erro ao carregar definições");
      return;
    }

    data?.forEach((setting) => {
      const value = setting.value as any;
      switch (setting.key) {
        case "home_hero":
          setHomeHero(value.text || "");
          break;
        case "contact_intro":
          setContactIntro(value.text || "");
          break;
        case "contact_success":
          setContactSuccess(value.message || "");
          break;
        case "how_i_work":
          setHowIWork(value.text || "");
          break;
      }
    });
  };

  const handleSave = async () => {
    setLoading(true);

    const updates = [
      { key: "home_hero", value: { text: homeHero } },
      { key: "contact_intro", value: { text: contactIntro } },
      { key: "contact_success", value: { message: contactSuccess } },
      { key: "how_i_work", value: { text: howIWork } },
    ];

    for (const update of updates) {
      const { error } = await supabase
        .from("site_settings")
        .update({ value: update.value })
        .eq("key", update.key);

      if (error) {
        toast.error(`Erro ao actualizar ${update.key}`);
        setLoading(false);
        return;
      }
    }

    toast.success("Definições actualizadas com sucesso!");
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Definições do Site</h2>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Hero da Home</label>
            <Textarea
              value={homeHero}
              onChange={(e) => setHomeHero(e.target.value)}
              rows={3}
              placeholder="Texto principal da página inicial..."
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Introdução Contacto</label>
            <Textarea
              value={contactIntro}
              onChange={(e) => setContactIntro(e.target.value)}
              rows={3}
              placeholder="Texto de introdução da página de contacto..."
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Mensagem Sucesso Contacto</label>
            <Textarea
              value={contactSuccess}
              onChange={(e) => setContactSuccess(e.target.value)}
              rows={2}
              placeholder="Mensagem após envio do formulário..."
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Como Trabalho</label>
            <Textarea
              value={howIWork}
              onChange={(e) => setHowIWork(e.target.value)}
              rows={4}
              placeholder="Texto da secção 'Como trabalho' na página de projectos..."
            />
          </div>

          <Button onClick={handleSave} disabled={loading} className="w-full">
            {loading ? "A guardar..." : "Guardar Definições"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
