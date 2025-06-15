Doutor Agenda

Doutor Agenda é uma aplicação web para gerenciamento de agendamentos médicos, projetada para facilitar a organização de consultas para clínicas e profissionais da saúde. A aplicação oferece uma interface moderna e intuitiva, com funcionalidades para cadastro de pacientes, agendamento de consultas, gerenciamento de dados e processamento de pagamentos, construída com tipagem segura usando TypeScript. O dashboard permite visualizar o faturamento total (ex.: R$ 5.000,00), agendamentos (ex.: 2), pacientes (ex.: 3) e médicos (ex.: 1), além de gráficos de agendamentos e faturamento por período.
🚀 Tecnologias Utilizadas

Figma: Prototipagem e design da interface.
React: Biblioteca JavaScript para construção da interface de usuário.
Next.js: Framework React para renderização híbrida e otimização de performance.
TypeScript: Superset de JavaScript para tipagem estática e maior robustez.
TailwindCSS: Framework CSS para estilização rápida e responsiva.
PostgreSQL: Banco de dados relacional para armazenamento de dados.
Shadcn UI: Componentes de interface acessíveis e personalizáveis.
Better-Auth: Solução de autenticação segura e escalável.
Lucide: Conjunto de ícones modernos e leves.
Neon Console: Plataforma para gerenciamento do banco de dados PostgreSQL.
Drizzle ORM: ORM TypeScript para interação com o banco de dados.
Stripe API: Integração de pagamentos para processamento seguro de transações.

📋 Funcionalidades

Cadastro e gerenciamento de pacientes.
Agendamento e edição de consultas.
Processamento de pagamentos via Stripe para consultas ou serviços.
Interface responsiva com dashboard para monitoramento de faturamento (ex.: R$ 5.000,00), agendamentos, pacientes e médicos.
Autenticação de usuários com segurança.
Visualização de gráficos de agendamentos e faturamento por período.

🛠️ Pré-requisitos
Antes de começar, certifique-se de ter instalado:

Node.js (versão 18 ou superior)
PostgreSQL ou acesso ao Neon Console
Git
Conta no Stripe para testes de pagamento (chaves de API)

⚙️ Instalação
Siga os passos abaixo para configurar o projeto localmente:

Clone o repositório:
git clone https://github.com/EuDavidev/doutor-agenda.git
cd doutor-agenda


Instale as dependências:
npm install


Configure as variáveis de ambiente:Crie um arquivo .env na raiz do projeto com base no arquivo .env.example e preencha as variáveis necessárias, como a conexão com o banco de dados Neon, as configurações do Better-Auth e as chaves da Stripe API.
Exemplo:
DATABASE_URL="sua-url-do-neon-console"
AUTH_SECRET="sua-chave-secreta"
STRIPE_SECRET_KEY="sua-chave-secreta-stripe"
STRIPE_WEBHOOK_SECRET="sua-chave-webhook-stripe"


Configure o banco de dados:Execute as migrações do Drizzle ORM para configurar o schema do banco:
npx drizzle-kit push:pg


Inicie o servidor de desenvolvimento:
npm run dev


Acesse a aplicação em http://localhost:3000.


📚 Estrutura do Projeto
doutor-agenda/
├── app/                 # Páginas e rotas do Next.js
├── components/          # Componentes React reutilizáveis
├── lib/                 # Utilitários e configurações (ex.: Drizzle ORM, Stripe)
├── public/              # Arquivos estáticos (imagens, ícones, ex.: dashboard.png)
├── styles/              # Estilos globais e configurações do Tailwind
├── drizzle/             # Configurações e migrações do Drizzle ORM
├── .env.example         # Exemplo de variáveis de ambiente
├── next.config.js       # Configurações do Next.js
├── tailwind.config.js   # Configurações do TailwindCSS
├── tsconfig.json        # Configurações do TypeScript
└── README.md            # Documentação do projeto

🤝 Contribuindo
Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

Faça um fork do repositório.
Crie uma branch para sua feature ou correção:git checkout -b minha-nova-feature


Commit suas alterações:git commit -m "Adiciona minha nova feature"


Envie para o repositório remoto:git push origin minha-nova-feature


Abra um Pull Request descrevendo suas alterações.

📜 Licença
Este projeto está licenciado sob a MIT License.
📬 Contato
Para dúvidas ou sugestões, entre em contato:

GitHub: EuDavidev
Email: davisouza128@gmail.com (baseado na imagem)

