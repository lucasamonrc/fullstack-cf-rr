import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const guestsTable = sqliteTable("guests_table", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	message: text().notNull(),
});
