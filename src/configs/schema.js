import { pgTable ,serial,varchar,text,integer} from "drizzle-orm/pg-core";

export const jsonForms = pgTable("jsonForms",{
    id:serial("id").primaryKey(),
    jsonForm:text("json_form").notNull(),
    createdBy:varchar("created_by").notNull(),
    createdAt:varchar("created_at").notNull(),
})

export const formResponses = pgTable("formResponses",{
    id:serial("id").primaryKey(),
    formId:integer("form_id").notNull(),
    response:text("response").notNull(),
    createdBy:varchar("created_by"),
    submittedAt:varchar("submitted_at").notNull(),
})
