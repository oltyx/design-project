/**
 * @module
 * User datatype plus some dummy users.
 * Currently a User only consists of an id (6 bytes encoded as 8 Base64 characters) and a name.
 */

export type User = {id: string, name: string};

export const USERS: User[] = [ {id: "A0NHLQew", name: "Mike"}
                             , {id: "zN8dgDEe", name: "Bart"}
                             , {id: "T6PydDQC", name: "Gerwin"}
                             ];