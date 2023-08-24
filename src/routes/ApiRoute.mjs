import RegistrationController from '../controllers/RegistrationControllers.mjs'
import { POST } from '../core/http/HttpMethodEnum.mjs'

export default [
    {
        path: '/v1',
        children: [
            {
                method: POST,
                path: '/register',
                controller: (req) => RegistrationController.shared.register(req),
                middleware: null
            }
        ]
    }

]