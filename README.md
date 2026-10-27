# Fulano — protótipo de jogo social

Interface Next.js para um jogo de sala com anfitrião, jogadores, cores e impostores. O código contém telas de criação, entrada, instruções e lobby em tempo real.

**Estado:** protótipo incompleto. O frontend está versionado, mas o backend aparece como um gitlink sem `.gitmodules` e não foi recuperado no clone. O fluxo mistura uma API em `localhost:3001`, dados mock no navegador e leitura direta do Supabase; não há caminho end-to-end reproduzível neste repositório.

## Fluxo observado

- o anfitrião envia `POST /rooms/create` para uma API externa ao frontend;
- tokens e código da sala são gravados no `localStorage`;
- a entrada de jogador usa apenas um mock local e não chama a API;
- o lobby consulta `rooms` e `players` no Supabase e assina mudanças Realtime.

## Executar a interface

```bash
cd frontend
npm ci
```

Crie `frontend/.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_publicavel
```

Depois:

```bash
npm run dev
```

A interface abre em `http://localhost:3000`. A criação de sala continuará falhando sem uma API compatível em `http://localhost:3001`.

## Segurança do Supabase

Como o lobby acessa tabelas públicas pelo cliente, `rooms` e `players` precisam de RLS e policies compatíveis com o modelo de sala. A chave no navegador deve ser publicável/anon; nunca use service role no frontend.

O schema, as policies, a configuração Realtime e as migrations não estão neste repositório, portanto não foi possível validar autorização ou isolamento entre salas.

## Limitações e roadmap

- backend ausente no clone;
- criação, entrada e lobby usam integrações diferentes;
- não há schema Supabase, testes, CI ou instruções de deploy;
- tokens ficam no `localStorage` e o modelo de ameaça não está documentado;
- a URL copiada pelo lobby não corresponde à rota de entrada implementada;
- a UI possui lógica, mas o jogo e suas rodadas não estão implementados.

Antes de promover o projeto, recupere o backend como submodule válido ou incorpore-o ao repositório, versione migrations/RLS e conclua um único fluxo de sala.
