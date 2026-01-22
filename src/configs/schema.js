import { pgTable ,serial,varchar,text,integer,boolean} from "drizzle-orm/pg-core";

export const jsonForms = pgTable("jsonForms",{
    id:serial("id").primaryKey(),
    jsonForm:text("json_form").notNull(),
    createdBy:varchar("created_by").notNull(),
    createdAt:varchar("created_at").notNull(),
    requireAuth:boolean("require_auth").default(false),
    acceptResponses:boolean("accept_responses").default(true),
    closeDate:varchar("close_date"),
})

export const formResponses = pgTable("formResponses",{
    id:serial("id").primaryKey(),
    formId:integer("form_id").notNull(),
    response:text("response").notNull(),
    createdBy:varchar("created_by"),
    respondentEmail:varchar("respondent_email"),
    submittedAt:varchar("submitted_at").notNull(),
    viewed:boolean("viewed").default(false),
})
