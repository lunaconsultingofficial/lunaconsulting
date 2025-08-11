# 🗄️ Configuración de Base de Datos Supabase

## Configuración Inicial

### 1. Variables de Entorno
Crea un archivo `.env.local` con las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_KEY=tu_supabase_service_key
```

### 2. Ejecutar Migraciones
En el panel de Supabase, ve a SQL Editor y ejecuta el archivo:
```
database/migrations/001_create_stocks_schema.sql
```

### 3. Migrar Datos Existentes
Para migrar los datos existentes a Supabase:

```bash
# Instalar dependencias si no están instaladas
npm install @supabase/supabase-js

# Ejecutar migración
npx tsx scripts/migrate-to-supabase.ts
```

## 🔧 Funcionalidades Implementadas

### ✅ Schema de Base de Datos
- **stocks**: Información principal de los assets
- **stock_images**: Imágenes asociadas a cada stock
- **stock_videos**: Videos asociados a cada stock
- **stock_specs**: Especificaciones técnicas
- **leads**: Gestión de contactos e interesados
- **analytics**: Tracking de eventos y métricas

### ✅ Componentes Híbridos
- **Fallback automático**: Si Supabase no está disponible, usa datos locales
- **Analytics integrado**: Tracking automático de views e interacciones
- **Indicador de fuente**: Muestra si usa datos live o locales

### ✅ Hooks Personalizados
- `useSupabaseStocks()`: Obtiene todos los stocks
- `useSupabaseStock(slug)`: Obtiene un stock específico
- `useFeaturedStocks()`: Obtiene stocks destacados
- `useStockAnalytics()`: Funciones de tracking

## 📊 Analytics Implementado

### Eventos Tracked:
- **stock_view**: Vista de página de stock
- **stock_interaction**: Interacciones (filtros, etc.)
- **whatsapp_click**: Clicks en botones de WhatsApp

### Dashboard Analytics
Los datos se almacenan en la tabla `analytics` y pueden ser consultados para:
- Stocks más vistos
- Patrones de navegación
- Conversión a WhatsApp
- Segmentación por categorías

## 🔐 Seguridad (RLS)

### Políticas Implementadas:
- **Lectura pública**: Stocks, imágenes, videos, specs
- **Leads**: Solo inserción pública, admin para lectura
- **Analytics**: Solo inserción para tracking

### Configuración Administrativa:
Para acceso completo administrativo, configurar políticas adicionales basadas en roles de usuario.

## 🚀 Ventajas del Sistema

### Para Empresas Multimillonarias:
1. **Escalabilidad**: Base de datos empresarial
2. **Analytics profesionales**: Métricas detalladas
3. **Gestión de leads**: Tracking automático de interesados
4. **Redundancia**: Fallback a datos locales
5. **Performance**: CDN global de Supabase

### Funcionalidades Premium:
- Tracking en tiempo real
- Dashboard de métricas
- Gestión de leads cualificados
- Analytics de conversión
- Backup automático

## 📈 Próximos Pasos

1. **Dashboard Administrativo**: Panel para gestionar stocks y leads
2. **Lead Scoring**: Sistema de puntuación de leads
3. **Reportes Avanzados**: Analytics exportables
4. **Notificaciones**: Alerts para nuevos leads
5. **CRM Integration**: Conexión con sistemas CRM

## 🛠️ Debugging

### Si Supabase no funciona:
1. Verificar variables de entorno
2. Confirmar project ID en Supabase
3. Revisar políticas RLS
4. Verificar conexión de red

### Logs importantes:
```bash
# Ver logs de desarrollo
npm run dev

# Verificar conexión a Supabase en browser console
# El sistema automáticamente fallback a datos locales
```
