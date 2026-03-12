import fs from 'node:fs';
import path from 'node:path';

const messagesDir = path.resolve(process.cwd(), 'messages');
const baseLocale = 'es';
const targetLocales = ['en', 'it'];

function flattenKeys(value, prefix = '') {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return [];
  }

  const keys = [];
  for (const [key, nested] of Object.entries(value)) {
    const currentKey = prefix ? `${prefix}.${key}` : key;
    keys.push(currentKey);
    keys.push(...flattenKeys(nested, currentKey));
  }
  return keys;
}

function readLocale(locale) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const base = readLocale(baseLocale);
const baseKeys = new Set(flattenKeys(base));
let hasErrors = false;

for (const locale of targetLocales) {
  const current = readLocale(locale);
  const currentKeys = new Set(flattenKeys(current));
  const missing = [...baseKeys].filter((k) => !currentKeys.has(k));

  if (missing.length) {
    hasErrors = true;
    console.error(`Locale "${locale}" is missing keys:`);
    for (const key of missing) {
      console.error(`- ${key}`);
    }
  }
}

if (hasErrors) {
  process.exit(1);
}

console.log('i18n check passed');
