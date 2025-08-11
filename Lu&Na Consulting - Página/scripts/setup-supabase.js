#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🚀 Lu&Na Consulting - Configuración de Supabase\n')

// Create .env.local template
const envTemplate = `# Supabase Configuration for Lu&Na Consulting
# Get these values from: https://supabase.com/dashboard/org/uvgsvojwqmuajdnyijvw

# 1. Go to your Supabase project dashboard
# 2. Go to Settings > API
# 3. Copy the Project URL and anon public key
# 4. For service role key, copy the service_role secret key

NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here

# Example:
# NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnopqrst.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...
# SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...
`

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envTemplate)
  console.log('✅ Created .env.local template')
} else {
  console.log('ℹ️  .env.local already exists')
}

// Instructions
console.log('\n📋 Instrucciones de configuración:')
console.log('\n1. 🌐 Ve a tu dashboard de Supabase:')
console.log('   https://supabase.com/dashboard/org/uvgsvojwqmuajdnyijvw')

console.log('\n2. 🔧 Crea un nuevo proyecto o selecciona uno existente')

console.log('\n3. 🗃️  Ejecuta la migración SQL:')
console.log('   - Ve a SQL Editor en tu dashboard de Supabase')
console.log('   - Ejecuta el contenido de: supabase/migrations/20250811000001_initial_schema.sql')

console.log('\n4. 🔑 Configura las variables de entorno:')
console.log('   - Ve a Settings > API en tu proyecto Supabase')
console.log('   - Copia Project URL y anon key a .env.local')
console.log('   - Copia service_role key (para migraciones)')

console.log('\n5. 🚀 Reinicia el servidor de desarrollo:')
console.log('   npm run dev')

console.log('\n6. 📊 Accede al dashboard administrativo:')
console.log('   http://localhost:3000/admin/dashboard')

console.log('\n✨ Características incluidas:')
console.log('   ✅ Base de datos escalable')
console.log('   ✅ Analytics en tiempo real')
console.log('   ✅ Gestión de leads')
console.log('   ✅ Fallback automático a datos locales')
console.log('   ✅ Dashboard administrativo')
console.log('   ✅ Tracking de conversiones')

console.log('\n🔗 Enlaces útiles:')
console.log('   📚 Documentación: ./SUPABASE_SETUP.md')
console.log('   🎛️  Dashboard: /admin/dashboard')
console.log('   📈 Stocks página: /stocks')

console.log('\n🎯 El sistema funciona automáticamente:')
console.log('   - Si Supabase está configurado: usa datos live')
console.log('   - Si no está disponible: usa datos locales')
console.log('   - Analytics y leads solo funcionan con Supabase')

console.log('\n💡 Tip: Para empresas multimillonarias, Supabase proporciona:')
console.log('   - Escalabilidad empresarial')
console.log('   - Métricas profesionales')
console.log('   - Gestión avanzada de leads')
console.log('   - Backup automático en la nube\n')
