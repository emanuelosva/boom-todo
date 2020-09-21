/**
 * **************************************
 * @fileoverview Swagger Api Docs - Todos
 * **************************************
 */


/**
 * @typedef Todo
 * @property {integer} id.required - The autogenerated todo id - eg: 1
 * @property {string} title.required - The todo title - eg: Create the API
 * @property {string} content.required - The todo content - eg: Create all code base
 * @property {boolean} completed.required - The todo status - eg: false
 * @property {boolean} isUrgent.required - The todo status - eg: true
 * @property {enum} tag.required - Todo Tag - eg: work, home, personal
 * @property {string} dateTodo.required - The goal date - eg: DateTime
 * @property {string} createdAt.required - The date of creation - eg: DateTime
 * @property {string} updatedAt.required - The date of last update - eg: DateTime
 * @property {number} postedBy_id - The user author
 */

/**
 * @typedef TodoCreate
 * @property {string} title.required - The todo title - eg: Todo...
 * @property {string} content.required - The todo content - eg: My work...
 * @property {enum} tag.required - Todo Tag - eg: work, home, personal
 * @property {string} dateTodo.required - The goal date - eg: 2020-12-18T10:30
 */

/**
 * @typedef TodoUpdate
 * @property {string} title.required - The todo title - eg: Todo new...
 * @property {string} content.required - The todo content - eg: New work...
 * @property {boolean} completed.required - The todo status - eg: false
 * @property {boolean} isUrgent.required - The todo status - eg: true
 * @property {enum} tag.required - Todo Tag - eg: work, home, personal
 * @property {date} dateTodo.required - The goal date - eg: 2020-12-18T10:30
 */


/**
 * @typedef TodoResponse
 * @property {boolean} error.required - Error on requets - eg: false
 * @property {string} detail.required - The response message - eg: Detail about Todo operation
 * @property {Todo.model} data.required
 */

/**
 * @typedef TodoResponseList
 * @property {boolean} error.required - Error on requets - eg: false
 * @property {string} detail.required - The response message - eg: Detail about Todo operation
 * @property {Array<Todo>} data.required
 */

/**
 * @typedef UnauthorizedError
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Error - eg: Invalid credentials
 * @property {object} data - No data - eg: {}
 */

/**
 * @typedef BadRequetsError
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Error - eg: Invalid data schema
 * @property {object} data - No data - eg: {}
 */

/**
 * @typedef ConfiltError
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Error - eg: Conflict. Invalid ID
 * @property {object} data - No data - eg: {}
 */

/**
 * @typedef GeneralError
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Detail - eg: Message about error
 * @property {object} data - No data - eg: {}
 */
