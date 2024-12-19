import {
	customType,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';

export const contractorTypeEnum = pgEnum('contractor_type_enum', ['person', 'company']);

const idColumn = integer('id').primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 });
const nameColumn = varchar('name', { length: 255 }).notNull();

const bytea = customType<{
	data: Buffer;
	default: false;
}>({
	dataType() {
		return 'bytea';
	}
});

export const user = pgTable('user', {
	id: idColumn,
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const farm = pgTable('farm', {
	id: idColumn,
	name: nameColumn,
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	logo: bytea('logo')
});

export const region = pgTable('region', {
	id: idColumn,
	name: nameColumn,
	geojson: jsonb('geojson'),
	farmId: integer('farm_id')
		.notNull()
		.references(() => farm.id)
});

export const company = pgTable('company', {
	id: idColumn,
	name: nameColumn
});

export const employee = pgTable('employee', {
	id: idColumn,
	salary: integer('salary'),
	personId: integer('person_id')
		.notNull()
		.references(() => person.id)
});

export const contractor = pgTable('contractor', {
	id: idColumn,
	type: contractorTypeEnum('type'),
	farmId: integer('farm_id')
		.notNull()
		.references(() => farm.id),
	companyId: integer('company_id').references(() => company.id),
	employeeId: integer('employee_id').references(() => employee.id)
});

export const person = pgTable('person', {
	id: idColumn,
	firstname: varchar('firstname', { length: 255 }).notNull(),
	lastname: varchar('lastname', { length: 255 }).notNull()
});

export const account = pgTable('account', {
	id: idColumn,
	name: nameColumn,
	initialBalance: integer('initial_balance').default(0).notNull(),
	farmId: integer('farm_id')
		.notNull()
		.references(() => farm.id)
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Farm = typeof farm.$inferSelect;
