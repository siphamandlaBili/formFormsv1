import { pgTable ,serial,varchar,text} from "drizzle-orm/pg-core";

export const jsonForms = pgTable("jsonForms",{
    id:serial("id").primaryKey(),
    jsonForm:text("json_form").notNull(),
    createdBy:varchar("created_by").notNull(),
    createdAt:varchar("created_at").notNull(),
})
