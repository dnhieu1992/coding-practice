import 'reflect-metadata';
import dataSource from '../src/database/data-source';

async function testTypeORM() {
  try {
    console.log('Initializing DataSource...');
    await dataSource.initialize();
    console.log('✅ DataSource initialized successfully');

    console.log('Running a simple query...');
    const result = await dataSource.query('SELECT 1 as test');
    console.log('✅ Query result:', result);

    console.log('Checking migrations table...');
    const migrations = await dataSource.query(
      "SELECT * FROM information_schema.tables WHERE table_schema = 'notification_db' AND table_name = 'migrations'",
    );
    console.log('Migrations table exists:', migrations.length > 0);

    await dataSource.destroy();
    console.log('✅ DataSource destroyed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

void testTypeORM();
