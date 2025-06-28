# 🚀 Deploy no Azure App Service

## 📋 Configurações Necessárias

### 1. **Variáveis de Ambiente no Azure**

Configure as seguintes variáveis de ambiente no Azure App Service:

```bash
# Configurações do Frontend
FRONTEND_URL=https://purple-coast-0153c791e.2.azurestaticapps.net

# Configurações do Node.js
NODE_ENV=production
PORT=8080

# Configurações do Banco de Dados (opcional)
DB_PATH=./src/database/db.sqlite
```

### 2. **Como Configurar no Azure Portal**

1. Acesse o Azure Portal
2. Vá para seu App Service
3. Navegue para **Configurações** > **Configurações da aplicação**
4. Adicione as variáveis acima na seção **Configurações da aplicação**

### 3. **Configurações do App Service**

#### **Stack de Runtime:**
- **Runtime Stack:** Node.js
- **Version:** 18 LTS ou superior

#### **Configurações de Inicialização:**
- **Startup Command:** `npm start`

#### **Configurações de Build:**
- **Build Command:** `npm install`
- **Output Directory:** (deixe vazio)

### 4. **Arquivos de Configuração**

#### **web.config** ✅ (já criado)
- Configura o IIS para servir a aplicação Node.js

#### **package.json** ✅ (já atualizado)
- Scripts de build e start configurados
- Dependências organizadas

### 5. **Verificação do Deploy**

Após o deploy, teste os seguintes endpoints:

```bash
# Health Check
GET https://seu-app-service.azurewebsites.net/health

# Documentação da API
GET https://seu-app-service.azurewebsites.net/api-docs

# Lista de Temas
GET https://seu-app-service.azurewebsites.net/tema
```

### 6. **Logs e Debugging**

Para verificar os logs:

1. **Azure Portal:**
   - App Service > **Monitoramento** > **Log stream**

2. **Azure CLI:**
   ```bash
   az webapp log tail --name seu-app-service --resource-group seu-resource-group
   ```

### 7. **Solução de Problemas Comuns**

#### **Erro: "You do not have permission to view this directory or page"**
- ✅ Verificar se o `web.config` está na raiz do projeto
- ✅ Verificar se o `package.json` tem o script `start` correto
- ✅ Verificar se o arquivo principal está em `src/server.js`

#### **Erro de CORS:**
- ✅ Verificar se `FRONTEND_URL` está configurada corretamente
- ✅ Verificar se a URL do frontend está na lista de origens permitidas
- ✅ Verificar logs para ver qual origem está sendo bloqueada

#### **Erro de Banco de Dados:**
- ✅ Verificar se as migrations foram executadas (`npm run migrate`)
- ✅ Verificar permissões de escrita no diretório do banco

### 8. **Comandos Úteis**

```bash
# Deploy via Azure CLI
az webapp up --name seu-app-service --resource-group seu-resource-group --runtime "NODE:18-lts"

# Verificar status
az webapp show --name seu-app-service --resource-group seu-resource-group

# Reiniciar aplicação
az webapp restart --name seu-app-service --resource-group seu-resource-group
```

### 9. **Monitoramento**

Configure alertas para:
- **CPU Usage** > 80%
- **Memory Usage** > 80%
- **Response Time** > 5s
- **HTTP 5xx Errors** > 1%

### 10. **Backup e Recuperação**

- Configure backup automático do banco SQLite
- Mantenha backup das variáveis de ambiente
- Documente as configurações de CORS

---

**🎯 Após aplicar essas configurações, o backend deve funcionar corretamente no Azure!** 