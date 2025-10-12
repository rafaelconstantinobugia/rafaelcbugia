export default function PoliticaCookies() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-4xl font-bold">Política de Cookies</h1>
        
        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">1. O que são Cookies?</h2>
            <p>
              Cookies são pequenos ficheiros de texto que os websites colocam no seu computador ou dispositivo móvel 
              quando os visita. Os cookies são amplamente utilizados para fazer com que os websites funcionem de 
              forma mais eficiente, bem como para fornecer informações aos proprietários do website.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">2. Como Utilizamos os Cookies</h2>
            <p className="mb-4">
              Este website utiliza cookies para melhorar a experiência do utilizador, personalizar conteúdos e 
              analisar o tráfego do website. Utilizamos diferentes tipos de cookies:
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-xl font-semibold text-foreground">2.1. Cookies Essenciais (Sempre Ativos)</h3>
            <p className="mb-4">
              Estes cookies são necessários para o funcionamento básico do website e não podem ser desativados. 
              Geralmente são definidos apenas em resposta a ações suas, como definir preferências de privacidade, 
              fazer login ou preencher formulários.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="border border-border px-4 py-2 text-left">Nome</th>
                    <th className="border border-border px-4 py-2 text-left">Finalidade</th>
                    <th className="border border-border px-4 py-2 text-left">Duração</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2">cookie_consent</td>
                    <td className="border border-border px-4 py-2">Armazena as suas preferências de cookies</td>
                    <td className="border border-border px-4 py-2">12 meses</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2">session_id</td>
                    <td className="border border-border px-4 py-2">Mantém a sessão do utilizador</td>
                    <td className="border border-border px-4 py-2">Sessão</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-xl font-semibold text-foreground">2.2. Cookies Analíticos</h3>
            <p className="mb-4">
              Estes cookies permitem-nos contar visitas e fontes de tráfego para que possamos medir e melhorar 
              o desempenho do nosso website. Ajudam-nos a saber quais as páginas mais e menos populares e a ver 
              como os visitantes se movem pelo website.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="border border-border px-4 py-2 text-left">Nome</th>
                    <th className="border border-border px-4 py-2 text-left">Fornecedor</th>
                    <th className="border border-border px-4 py-2 text-left">Finalidade</th>
                    <th className="border border-border px-4 py-2 text-left">Duração</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2">_ga</td>
                    <td className="border border-border px-4 py-2">Google Analytics</td>
                    <td className="border border-border px-4 py-2">Distingue utilizadores únicos</td>
                    <td className="border border-border px-4 py-2">2 anos</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2">_gid</td>
                    <td className="border border-border px-4 py-2">Google Analytics</td>
                    <td className="border border-border px-4 py-2">Distingue utilizadores únicos</td>
                    <td className="border border-border px-4 py-2">24 horas</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-xl font-semibold text-foreground">2.3. Cookies de Marketing (Opcional)</h3>
            <p className="mb-4">
              Estes cookies podem ser definidos através do nosso website por parceiros de publicidade. 
              Podem ser usados por essas empresas para criar um perfil dos seus interesses e mostrar-lhe 
              anúncios relevantes noutros websites.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">3. Gestão de Cookies</h2>
            <p className="mb-4">
              Pode gerir as suas preferências de cookies a qualquer momento através do nosso banner de cookies 
              ou clicando no botão "Gerir Cookies" no rodapé do website.
            </p>
            <p className="mb-4">
              A maioria dos browsers permite controlar cookies através das suas definições. Para saber mais sobre 
              como gerir e eliminar cookies, visite:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Chrome: <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">support.google.com/chrome/answer/95647</a></li>
              <li>Firefox: <a href="https://support.mozilla.org/pt-PT/kb/ativar-desativar-cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">support.mozilla.org/pt-PT/kb/ativar-desativar-cookies</a></li>
              <li>Safari: <a href="https://support.apple.com/pt-pt/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">support.apple.com/pt-pt/guide/safari/sfri11471/mac</a></li>
              <li>Edge: <a href="https://support.microsoft.com/pt-pt/microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">support.microsoft.com/pt-pt/microsoft-edge</a></li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">4. Consequências da Desativação de Cookies</h2>
            <p>
              Se desativar os cookies, algumas funcionalidades do website podem não funcionar corretamente. 
              Por exemplo, pode não conseguir aceder a determinadas áreas do website ou não receber informação 
              personalizada quando visitar o website.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">5. Cookies de Terceiros</h2>
            <p>
              Este website pode incluir cookies de terceiros (como Google Analytics) para análise de tráfego 
              e comportamento dos utilizadores. Estes cookies são regidos pelas políticas de privacidade dos 
              respetivos fornecedores:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Google Analytics: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">policies.google.com/privacy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">6. Atualizações da Política de Cookies</h2>
            <p>
              Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças nas nossas práticas 
              ou por outros motivos operacionais, legais ou regulamentares.
            </p>
            <p className="mt-4">
              <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-PT')}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">7. Contacto</h2>
            <p>
              Para mais informações sobre a nossa utilização de cookies, contacte-nos através de:
            </p>
            <p className="mt-4">
              <strong>Email:</strong> contacto@rafaelcbugia.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
