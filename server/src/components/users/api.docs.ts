/**
 * ******************************
 * @fileoverview Swagger Api Docs
 * ******************************
 */

/**
 * @typedef User
 * @property {integer} id.required - The autogenerated user id - eg: 1
 * @property {string} name.required - The user name - eg: Stan Lee
 * @property {string} email.required - The user email. Is unique - eg: stan@marvel.com
 * @property {password} password.required - The user hashed password - eg: ******
 * @property {date} createdAt.required - The date of user registration - eg: 2020-12-18T10:30
 * @property {timestamp} updatedAt.required - The date of last update - eg: 2020-12-18T10:30
 *
 */

/**
 * @typedef UserCreate
 * @property {string} name.required - The user name
 * @property {string} email.required - The user email. Is unique
 * @property {string} password.required - The user hashed password
 */

/**
 * @typedef UserUpdate
 * @property {string} name - The user name
 * @property {string} email - The user email. Is unique
 * @property {string} password - The user hashed password
 */

/**
 * @typedef UserLogin
 * @property {string} email.required - The user email - eg: stanLee@marvel.com
 * @property {password} password.required - The user password - eg: user123
 */

/**
 * @typedef TokenResponse
 * @property {string} token.required - The valid JWT
 * @property {User.model} user.required - The user data
 */

/**
 * @typedef AuthResponse
 * @property {boolean} error.required - Error on requets - eg: false
 * @property {string} detail.required - The response message - User logged
 * @property {TokenResponse.model} data.required
 */

/**
 * @typedef UserResponse
 * @property {boolean} error.required - Error on requets - eg: false
 * @property {string} detail.required - The response message - eg: Detail about operation
 * @property {User.model} data.required
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
 * @typedef GeneralError
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Detail - eg: Message about error
 * @property {object} data - No data - eg: {}
 */
