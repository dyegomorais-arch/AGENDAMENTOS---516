# Migração para o visual novo (OS 516)

- O banco de dados NÃO foi alterado: continua o mesmo projeto Firebase, a mesma coleção `agendamentos`, os mesmos logins.
- `firebase-config.js`, `firebase.js` e `firestore.rules` estão idênticos aos anteriores (não precisa republicar as regras).
- Para publicar: substitua os arquivos do site pelos desta pasta e rode `firebase deploy` (ou envie pela hospedagem que você já usa).
- Após publicar, aperte Ctrl+F5 no navegador (os arquivos têm `?v=5` para forçar atualização).
