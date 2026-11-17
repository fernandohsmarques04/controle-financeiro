# Meu Financeiro — aplicativo para Windows

Aplicativo pessoal, responsivo e **offline**, com dashboard, lançamentos, compras parceladas no cartão, orçamentos, metas, recorrências, relatórios e backup JSON.

## Baixar para PC

1. Abra a aba **Actions** deste repositório.
2. Escolha a execução concluída de **Gerar aplicativo Windows**.
3. Baixe o artefato **Meu-Financeiro-Windows** e extraia o ZIP.
4. Execute o instalador `Meu-Financeiro-Setup-...`. Para usar sem instalar, abra `Meu-Financeiro-Portable-...`.

Os executáveis são gerados para Windows x64. Como ainda não há assinatura digital de código, o Windows pode exibir um aviso de aplicativo desconhecido.

## Executar a partir do código

Requer Node.js 24:

```bash
npm install
npm start
```

Para gerar os dois executáveis no próprio Windows:

```bash
npm run dist:win
```

## Onde ficam os dados?

As informações são armazenadas somente no computador, no armazenamento persistente do Electron; **não há conta, nuvem ou sincronização**. Use os botões **Exportar backup** e **Importar backup** para transferir registros entre dispositivos ou da versão web para a versão desktop. O aplicativo não lê automaticamente dados guardados no navegador.

**Nunca publique backups com seus dados financeiros neste repositório público.**
