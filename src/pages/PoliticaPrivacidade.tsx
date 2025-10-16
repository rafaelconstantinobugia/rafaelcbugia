export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-4xl font-bold">Política de Privacidade</h1>
        
        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">1. Responsável pelo Tratamento de Dados</h2>
            <p>
              <strong>Nome:</strong> Rafael Constantino Bugia<br />
              <strong>Email:</strong> contacto@rafaelcbugia.com<br />
              <strong>Website:</strong> www.rafaelcbugia.com
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">2. Dados Recolhidos</h2>
            <p className="mb-4">Recolhemos e processamos os seguintes tipos de dados pessoais:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Formulário de Contacto:</strong> nome, email, assunto e mensagem</li>
              <li><strong>Newsletter:</strong> endereço de email</li>
              <li><strong>Cookies:</strong> preferências de cookies, dados de sessão</li>
              <li><strong>Dados técnicos:</strong> endereço IP (para segurança e prevenção de abuso)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">3. Finalidades do Tratamento</h2>
            <p className="mb-4">Os seus dados pessoais são tratados para as seguintes finalidades:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Resposta a pedidos de contacto:</strong> processar e responder às suas mensagens</li>
              <li><strong>Newsletter:</strong> enviar atualizações, notícias e informações relevantes (com o seu consentimento)</li>
              <li><strong>Melhorar o website:</strong> análise de uso e otimização da experiência do utilizador</li>
              <li><strong>Segurança:</strong> prevenção de spam, fraude e abuso</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">4. Base Legal</h2>
            <p className="mb-4">O tratamento dos seus dados pessoais baseia-se em:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consentimento:</strong> para newsletter e cookies não essenciais (Art.º 6(1)(a) RGPD)</li>
              <li><strong>Interesse legítimo:</strong> para responder a pedidos de contacto e garantir a segurança do website (Art.º 6(1)(f) RGPD)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">5. Período de Conservação</h2>
            <p className="mb-4">
              Os dados pessoais são conservados apenas pelo tempo necessário para os fins para os quais foram recolhidos:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Formulário de contacto:</strong> 3 anos após a submissão, ou até ser processado e respondido</li>
              <li><strong>Newsletter:</strong> até cancelar a subscrição, ou 3 anos sem interação</li>
              <li><strong>Pré-reservas de livro:</strong> 6 meses após o lançamento do livro</li>
              <li><strong>Consentimentos de cookies:</strong> 13 meses (duração máxima legal)</li>
              <li><strong>Logs de acesso (IP):</strong> 90 dias para fins de segurança</li>
            </ul>
            <p className="mt-4">
              Após estes períodos, os dados são automaticamente eliminados dos nossos sistemas.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">6. Partilha de Dados</h2>
            <p className="mb-4">Os seus dados podem ser partilhados com:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Prestadores de serviços:</strong> fornecedores de hosting, email e serviços técnicos necessários ao funcionamento do website</li>
              <li><strong>Obrigações legais:</strong> autoridades competentes, quando legalmente obrigatório</li>
            </ul>
            <p className="mt-4">Não vendemos, alugamos ou partilhamos os seus dados pessoais com terceiros para fins de marketing.</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">7. Transferências Internacionais</h2>
            <p>
              Alguns dos nossos prestadores de serviços podem estar localizados fora da União Europeia. 
              Nestas situações, garantimos que existem salvaguardas adequadas em conformidade com o RGPD, 
              como cláusulas contratuais padrão aprovadas pela Comissão Europeia.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">8. Os Seus Direitos</h2>
            <p className="mb-4">Em conformidade com o RGPD, tem os seguintes direitos:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Direito de acesso:</strong> solicitar cópia dos seus dados pessoais</li>
              <li><strong>Direito de retificação:</strong> corrigir dados inexatos ou incompletos</li>
              <li><strong>Direito ao apagamento:</strong> solicitar a eliminação dos seus dados ("direito a ser esquecido")</li>
              <li><strong>Direito à limitação:</strong> restringir o tratamento dos seus dados</li>
              <li><strong>Direito à portabilidade:</strong> receber os seus dados em formato estruturado</li>
              <li><strong>Direito de oposição:</strong> opor-se ao tratamento dos seus dados</li>
              <li><strong>Direito de retirar consentimento:</strong> a qualquer momento, sem comprometer a licitude do tratamento anterior</li>
            </ul>
            <p className="mt-4">
              Para exercer estes direitos, pode utilizar a nossa ferramenta de gestão de dados em{" "}
              <a href="/gerir-dados" className="text-primary hover:underline">
                www.rafaelcbugia.com/gerir-dados
              </a>{" "}
              ou contactar-nos através de{" "}
              <strong>contacto@rafaelcbugia.com</strong>
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">9. Reclamações</h2>
            <p>
              Tem o direito de apresentar uma reclamação junto da autoridade de controlo competente:
            </p>
            <p className="mt-4">
              <strong>CNPD - Comissão Nacional de Proteção de Dados</strong><br />
              Av. D. Carlos I, 134, 1.º<br />
              1200-651 Lisboa<br />
              Tel: +351 213 928 400<br />
              Email: geral@cnpd.pt<br />
              Website: www.cnpd.pt
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">10. Segurança</h2>
            <p>
              Implementamos medidas técnicas e organizativas adequadas para proteger os seus dados pessoais 
              contra perda, uso indevido, acesso não autorizado, divulgação, alteração ou destruição. 
              Estas incluem encriptação, controlos de acesso e auditorias regulares de segurança.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">11. Cookies</h2>
            <p>
              Para informações detalhadas sobre os cookies utilizados neste website, 
              consulte a nossa <a href="/politica-cookies" className="text-primary hover:underline">Política de Cookies</a>.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">12. Atualizações</h2>
            <p>
              Esta Política de Privacidade pode ser atualizada periodicamente. 
              A data da última atualização será sempre indicada no topo da página. 
              Recomendamos que reveja esta política regularmente.
            </p>
            <p className="mt-4">
              <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-PT')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
