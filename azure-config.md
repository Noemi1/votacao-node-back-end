# 🔧 Configuração Específica - Azure App Service

## 📋 Informações do App Service

- **Nome:** `votacao-back-end-ewhybnghhkegb0e0`
- **Região:** `canadacentral-01` (Canadá Central)
- **URL:** `https://votacao-back-end-ewhybnghhkegb0e0.canadacentral-01.azurewebsites.net`
- **SCM URL:** `https://votacao-back-end-ewhybnghhkegb0e0.scm.canadacentral-01.azurewebsites.net`

## ⚙️ Configurações Necessárias no Azure Portal

### **1. Configurações da Aplicação (Variáveis de Ambiente)**

Acesse: **Azure Portal** > **App Service** > **Configurações** > **Configurações da aplicação**

Adicione as seguintes variáveis:

```bash
# Frontend URL
FRONTEND_URL=https://purple-coast-0153c791e.2.azurestaticapps.net

# Ambiente
NODE_ENV=production

# Porta (opcional - Azure define automaticamente)
PORT=8080

# Configurações do Banco
DB_PATH=./src/database/db.sqlite
```

### **2. Configurações Gerais**

#### **Stack de Runtime:**
- **Runtime Stack:** `Node.js`
- **Version:** `18 LTS` ou `20 LTS`

#### **Configurações de Inicialização:**
- **Startup Command:** `npm start`

### **3. Configurações de CORS Atualizadas**

O CORS já está configurado para aceitar:
- ✅ `https://purple-coast-0153c791e.2.azurestaticapps.net`
- ✅ `http://localhost:8080` (desenvolvimento)

## 🧪 Testes de Verificação

### **1. Health Check**
```bash
curl https://votacao-back-end-ewhybnghhkegb0e0.canadacentral-01.azurewebsites.net/health
```

**Resposta esperada:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-XX...",
  "environment": "production"
}
```

### **2. API Documentation**
```bash
curl https://votacao-back-end-ewhybnghhkegb0e0.canadacentral-01.azurewebsites.net/api-docs
```

### **3. Lista de Temas**
```bash
curl https://votacao-back-end-ewhybnghhkegb0e0.canadacentral-01.azurewebsites.net/tema
```

## 🔍 Verificação de Logs

### **Via Azure Portal:**
1. App Service > **Monitoramento** > **Log stream**
2. Verificar se há erros de inicialização

### **Via Azure CLI:**
```bash
az webapp log tail --name votacao-back-end-ewhybnghhkegb0e0 --resource-group [seu-resource-group]
```

## 🚨 Problemas Comuns e Soluções

### **1. Erro: "You do not have permission to view this directory or page"**
**Causa:** `web.config` não está sendo reconhecido
**Solução:** 
- Verificar se o `web.config` está na raiz do projeto
- Verificar se o `package.json` tem o script `start` correto

### **2. Erro de CORS**
**Causa:** Frontend não está na lista de origens permitidas
**Solução:**
- Verificar se `FRONTEND_URL` está configurada corretamente
- Verificar logs para ver qual origem está sendo bloqueada

### **3. Erro de Banco de Dados**
**Causa:** Migrations não foram executadas
**Solução:**
- Verificar se o script `postinstall` está executando `npm run migrate`
- Verificar permissões de escrita no diretório

## 📝 Comandos Úteis

### **Verificar Status:**
```bash
az webapp show --name votacao-back-end-ewhybnghhkegb0e0 --resource-group [seu-resource-group]
```

### **Reiniciar Aplicação:**
```bash
az webapp restart --name votacao-back-end-ewhybnghhkegb0e0 --resource-group [seu-resource-group]
```

### **Verificar Configurações:**
```bash
az webapp config appsettings list --name votacao-back-end-ewhybnghhkegb0e0 --resource-group [seu-resource-group]
```

## 🎯 Próximos Passos

1. **Configure as variáveis de ambiente** no Azure Portal
2. **Verifique o runtime** do Node.js
3. **Faça o deploy** com os arquivos atualizados
4. **Teste os endpoints** de verificação
5. **Verifique os logs** para debugging

---

**🔧 Com essas configurações, o backend deve funcionar corretamente no seu App Service!** 