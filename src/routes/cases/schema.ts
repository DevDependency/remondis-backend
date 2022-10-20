import type { FastifySchema } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'


export const CaseCoreSchema = {
    $id: "CaseCore",
    type: "object",
    properties: {
        client_phone: { type: "string" },
        client_email: { type: "string", format: "email" },
        address: { type: "string" }
    },
    required: ['client_email, address']
} as const

export const CaseExtendSchema = {
    $id: "CaseExtend",
    type: "object",
    properties: {
        client_first_name: { type: "string" },
        client_last_name: { type: "string" },
        type_of_property: { type: "string" },
        floor: { type: "integer" },
        elevator: { type: "integer" },
        squaremeters: { type: "integer" },
        quantity: { type: "integer" },
        way_to_property: { type: "string" }
    }
} as const

export const CaseFullSchema = {
    $id: "CaseFull",
    type: "object",
    properties: {
        ...{ ...CaseCoreSchema.properties }, ...{ ...CaseExtendSchema.properties },
        create_time: { type: "string", format: "date-time" },
        assigned_time: { type: "string", format: "date-time" },
        confirmed_time: { type: "string", format: "date-time" },
        state_id: { type: "integer" },
        state: { type: "string" },
        inspector_id: { type: "integer" },
        inspector: { type: "string" },
        manager_id: { type: "integer" },
        manager: { type: "string" },
    }
} as const

export const CaseItemCoreSchema = {
    $id: "CaseItemCore",
    type: "object",
    properties: {
        room: { type: "integer" },
        description: { type: "string" }
    },
} as const

export const CaseItemFullSchema = {
    $id: "CaseItemFull",
    type: "object",
    properties: {
        ...{ ...CaseItemCoreSchema.properties },
        room_title: { type: "string" },
        photo_link: { type: "string" },
        quantity: { type: "integer" }
    }
} as const



// Options 
export const getCasesSchema: FastifySchema = {

    summary: "Get list of cases",
    description: "Get list of cases filtered by: data ceration, state, inspector, manager",
    tags: ['case'],
    querystring: {
        date_from: { type: ["string", "null"], format: "date-time" },
        date_to: { type: ["string", "null"], format: "date-time" },
        state_id: { type: ["integer", "null"] },
        state: { type: ["string", "null"] },
        inspector_id: { type: "integer" },
        inspector: { type: "string" },
        manager_id: { type: "integer" },
        manager: { type: "string" },
    },
    response: {
        200: {
            type: "array",
            items: CaseFullSchema,
        },
    },

}

export const getCaseSchema: FastifySchema = {
    summary: "Get single case by id",
    description: "Get single case by id",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    response: {
        200: {
            CaseFullSchema
        },
    },
}

export const postCaseSchema: FastifySchema = {
    summary: "Create a new case",
    description: "Create a new case with necessary information",
    tags: ['case'],
    body: CaseCoreSchema,
    response: {
        201: CaseCoreSchema,
    },
}

export const updateCaseSchema: FastifySchema = {
    summary: "Update the case by id",
    description: "Update the case by id",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    body: CaseCoreSchema,
    response: {
        201: CaseCoreSchema,
    },
}

export const changeCaseSchema: FastifySchema = {
    summary: "Add info to case by id",
    description: "Add info to case by id",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    body: CaseExtendSchema,
    response: {
        201: CaseFullSchema,
    },
}

export const deleteCaseSchema: FastifySchema = {
    summary: "Delete case by id",
    description: "Delete case by id",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    response: {
        201: CaseCoreSchema,
    },
}

export const assignCaseSchema: FastifySchema = {
    summary: "Manager assigns case to inspector",
    description: "Manager assigns case to inspector",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    body: { inspector_id: { type: "integer" } },
    response: {
        201: CaseFullSchema,
    },
}

export const declineCaseSchema: FastifySchema = {
    summary: "Inspector declines assignement",
    description: "Inspector declines assignement",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    body: { reason: { type: "string" } },
    response: {
        201: CaseFullSchema,
    },
}

export const acceptCaseSchema: FastifySchema = {
    summary: "Inspector accepts assignement",
    description: "Inspector accepts assignement",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    response: {
        201: CaseFullSchema,
    },
}

export const submitCaseSchema: FastifySchema = {

    summary: "Inspector fills in all information",
    description: "Inspector fills in all information",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    response: {
        201: CaseFullSchema,
    },
}

export const quoteCaseOpts: FastifySchema = {
    summary: "Manager sends quote to household owner",
    description: "Manager sends quote to household owner",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    response: {
        201: CaseFullSchema,
    },
}

export const closeCaseOpts: FastifySchema = {
    summary: "Manager closes case",
    description: "Manager closes case",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    body: { reason: { type: "string" } },
    response: {
        201: CaseFullSchema,
    },
}
