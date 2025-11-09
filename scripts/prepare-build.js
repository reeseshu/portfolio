const fs = require('fs');
const path = require('path');

const apiRoutePath = path.join(__dirname, '..', 'src', 'app', 'api');
const apiRouteBackup = path.join(__dirname, '..', '.api-backup');

// Check if we're doing static export
const isStaticExport = process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT !== 'false';
// Check if this is prebuild (npm run build) or postbuild
const npmLifecycleEvent = process.env.npm_lifecycle_event || '';

if (npmLifecycleEvent === 'prebuild' && isStaticExport && fs.existsSync(apiRoutePath)) {
  console.log('📦 Static export detected - temporarily moving API route...');
  // Move API route folder out of the way (outside src so Next.js doesn't process it)
  if (fs.existsSync(apiRouteBackup)) {
    fs.rmSync(apiRouteBackup, { recursive: true, force: true });
  }
  fs.renameSync(apiRoutePath, apiRouteBackup);
  console.log('✅ API route moved for static export build');
}

if (npmLifecycleEvent === 'postbuild' && fs.existsSync(apiRouteBackup)) {
  console.log('🔄 Restoring API route...');
  if (fs.existsSync(apiRoutePath)) {
    fs.rmSync(apiRoutePath, { recursive: true, force: true });
  }
  fs.renameSync(apiRouteBackup, apiRoutePath);
  console.log('✅ API route restored');
}

