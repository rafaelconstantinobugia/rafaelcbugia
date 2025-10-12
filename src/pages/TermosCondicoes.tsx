export default function TermosCondicoes() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-4xl font-bold">Termos e Condições</h1>
        
        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">1. Objeto e Âmbito</h2>
            <p>
              Os presentes Termos e Condições regulam o acesso e utilização do website www.rafaelcbugia.com 
              (doravante "Website"), propriedade de Rafael Constantino Bugia.
            </p>
            <p className="mt-4">
              O acesso e utilização do Website implica a aceitação plena e sem reservas de todos os 
              termos incluídos nestes Termos e Condições, bem como na Política de Privacidade.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">2. Utilizadores</h2>
            <p>
              O acesso ao Website é gratuito e não requer registo prévio, salvo em áreas específicas 
              que possam ser criadas no futuro. A utilização de certas funcionalidades pode requerer 
              o fornecimento de dados pessoais, conforme descrito na nossa Política de Privacidade.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">3. Utilização Permitida</h2>
            <p className="mb-4">Os utilizadores comprometem-se a utilizar o Website de forma lícita e conforme com:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A legislação aplicável, nacional e internacional</li>
              <li>Os presentes Termos e Condições</li>
              <li>As boas práticas geralmente aceites na Internet</li>
              <li>A ordem pública e direitos de terceiros</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">4. Condutas Proibidas</h2>
            <p className="mb-4">É expressamente proibido:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Utilizar o Website para fins ilícitos ou lesivos de direitos de terceiros</li>
              <li>Difundir conteúdos ou propaganda de caráter racista, xenófobo, pornográfico, de apologia ao terrorismo ou atentatório dos direitos humanos</li>
              <li>Provocar danos nos sistemas físicos ou lógicos do Website, fornecedores ou terceiros</li>
              <li>Introduzir ou difundir vírus informáticos ou outros sistemas que possam causar danos</li>
              <li>Tentar aceder, utilizar ou manipular dados de outros utilizadores</li>
              <li>Reproduzir, copiar, distribuir, modificar ou transmitir conteúdos sem autorização prévia</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">5. Propriedade Intelectual</h2>
            <p>
              Todos os conteúdos do Website, incluindo mas não limitado a textos, fotografias, gráficos, 
              imagens, ícones, tecnologia, software, links e demais conteúdos audiovisuais ou sonoros, 
              bem como o seu design gráfico e códigos fonte, são propriedade exclusiva de Rafael Constantino Bugia 
              ou dos seus licenciantes, estando protegidos pelas leis de propriedade intelectual aplicáveis.
            </p>
            <p className="mt-4">
              É expressamente proibida a reprodução, distribuição, comunicação pública, transformação ou 
              qualquer outra forma de exploração, por qualquer procedimento, de todo ou parte dos conteúdos 
              deste Website, sem autorização prévia e expressa por escrito.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">6. Limitação de Responsabilidade</h2>
            <p className="mb-4">Rafael Constantino Bugia não se responsabiliza por:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Interrupções, erros, omissões, vírus, atrasos ou bloqueios no funcionamento do Website</li>
              <li>Conteúdos, informações ou serviços incluídos em websites de terceiros através de links</li>
              <li>Danos derivados da utilização indevida do Website por parte dos utilizadores</li>
              <li>Falhas ou incidências que possam surgir no decorrer da utilização do Website</li>
            </ul>
            <p className="mt-4">
              O Website pode conter ligações a outros websites. Rafael Constantino Bugia não é responsável 
              pelo conteúdo, políticas de privacidade ou práticas de outros websites.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">7. Modificações</h2>
            <p>
              Rafael Constantino Bugia reserva-se o direito de modificar, em qualquer momento e sem aviso prévio, 
              a apresentação, configuração e conteúdos do Website, bem como as condições de acesso e utilização.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">8. Duração e Término</h2>
            <p>
              A prestação do serviço do Website tem duração indefinida. Rafael Constantino Bugia reserva-se 
              o direito de suspender ou encerrar a prestação de serviços do Website a qualquer momento, 
              sem necessidade de pré-aviso.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">9. Lei Aplicável e Jurisdição</h2>
            <p>
              Os presentes Termos e Condições regem-se pela lei portuguesa. Para a resolução de qualquer 
              litígio emergente da interpretação ou aplicação dos presentes Termos e Condições, as partes 
              submetem-se à jurisdição dos tribunais da Comarca de Lisboa, com expressa renúncia a qualquer outro.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">10. Contacto</h2>
            <p>
              Para qualquer questão relacionada com estes Termos e Condições, pode contactar-nos através de:
            </p>
            <p className="mt-4">
              <strong>Email:</strong> contacto@rafaelcbugia.com<br />
              <strong>Website:</strong> www.rafaelcbugia.com
            </p>
          </section>

          <section>
            <p className="text-sm">
              <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-PT')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
