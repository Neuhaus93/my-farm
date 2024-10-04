import {
  bigint,
  bigserial,
  boolean,
  foreignKey,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const idColumn = bigserial("id", { mode: "number" }).primaryKey();
const farmIdFK = bigint("farm_id", { mode: "number" }).references(
  () => farmTable.id,
);

export const contractorTypeEnum = pgEnum("contractor_type_enum", [
  "person",
  "company",
]);
export const categoryTypeEnum = pgEnum("category_type_enum", [
  "income",
  "expense",
]);

export const farmTable = pgTable("farm", {
  id: idColumn,
  name: varchar("name", { length: 255 }).notNull(),
});

export const userTable = pgTable(
  "user",
  {
    id: idColumn,
    email: varchar("email", { length: 255 }).unique().notNull(),
    farmId: farmIdFK.notNull(),
  },
  (table) => ({
    farmIdx: index().on(table.farmId),
  }),
);

export const personTable = pgTable("person", {
  id: idColumn,
  firstname: varchar("firstname", { length: 255 }).notNull(),
  lastname: varchar("lastname", { length: 255 }).notNull(),
});

export const companyTable = pgTable("company", {
  id: idColumn,
  name: varchar("name", { length: 255 }).notNull(),
});

export const employeeTable = pgTable("employee", {
  id: idColumn,
  salary: integer("salary").default(0),
  active: boolean("active").default(false),
  start_date: timestamp("start_date", { withTimezone: true }),
  end_date: timestamp("end_date", { withTimezone: true }),
});

export const contractorTable = pgTable(
  "contractor",
  {
    id: idColumn,
    farmId: farmIdFK.notNull(),
    type: contractorTypeEnum("type").notNull(),
    personId: bigint("person_id", { mode: "number" }).references(
      () => personTable.id,
    ),
    companyId: bigint("company_id", { mode: "number" }).references(
      () => companyTable.id,
    ),
    employeeId: bigint("employee_id", { mode: "number" }).references(
      () => employeeTable.id,
    ),
  },
  (table) => {
    return {
      farmIdx: index().on(table.farmId),
    };
  },
);

export const accountTable = pgTable(
  "account",
  {
    id: idColumn,
    farmId: farmIdFK.notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    initialBalance: integer("initial_balance").default(0),
  },
  (table) => {
    return {
      farmIdx: index().on(table.farmId),
    };
  },
);

export const categoryTable = pgTable(
  "category",
  {
    id: idColumn,
    farmId: farmIdFK.notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    type: categoryTypeEnum("type").notNull(),
    iconName: varchar("icon_name", { length: 255 }).notNull(),
    parentId: bigint("parent_id", { mode: "number" }),
  },
  (table) => ({
    farmIdx: index().on(table.farmId),
    parentReference: foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
    }).onDelete("cascade"),
  }),
);

export const regionTable = pgTable(
  "region",
  {
    id: idColumn,
    farmId: farmIdFK.notNull(),
    name: varchar("name", { length: 255 }).notNull(),
  },
  (table) => ({
    farmIdx: index().on(table.farmId),
  }),
);

export const transactionTable = pgTable("transaction", {
  id: idColumn,
  accountId: bigint("account_id", { mode: "number" })
    .notNull()
    .references(() => accountTable.id),
  amount: integer("amount").notNull(),
  time: timestamp("time", { withTimezone: true }),
  categoryId: bigint("category_id", { mode: "number" })
    .notNull()
    .references(() => categoryTable.id),
  regionId: bigint("region_id", { mode: "number" }).references(
    () => regionTable.id,
  ),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
