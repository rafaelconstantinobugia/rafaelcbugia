import { useEffect } from "react";

export default function KitDigital() {
  useEffect(() => {
    window.location.href = "https://kitdigital.lovable.app/";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">A redirecionar...</p>
    </div>
  );
}
