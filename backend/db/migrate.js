import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost:5432/electrarewards';

async function migrate() {
  const client = new pg.Client({ connectionString: DATABASE_URL });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Run schema
    const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
    await client.query(schema);
    console.log('Schema created successfully');

    // Run seed
    const seed = readFileSync(join(__dirname, 'seed.sql'), 'utf-8');
    await client.query(seed);
    console.log('Seed data inserted successfully');

    // Verify
    const { rows: gifts } = await client.query('SELECT COUNT(*) FROM gifts');
    const { rows: users } = await client.query('SELECT COUNT(*) FROM users');
    console.log(`Verification: ${gifts[0].count} gifts, ${users[0].count} users`);

    console.log('Migration complete!');
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
