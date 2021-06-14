import {createServer, Factory, Model, Response} from 'miragejs'
import faker from 'faker'

type User = {
  name: string; 
  email: string; 
  create_at: string; 
}

export function makeServer(){
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}) //partial lets us not to use all fields from user 
    }, 

    factories: { // generate data
      user: Factory.extend({
        name(i: number){ // the same table in the model is a function that return the value the factory will use as "name"
          return faker.name.firstName()
        },
        email(){
          return faker.internet.email()
        }, 
        createdAt(){
          return faker.date.recent(10)
        }
      })
    },

    seeds(server){
      server.createList('user', 200)
    }, 

    routes(){
      this.namespace = 'api'; 
      this.timing = 750;

      this.get('/users', function (schema, request) { // we're extending the functionality of the mirage 
        const { page=1, per_page = 10 } = request.queryParams

        const total = schema.all('user').length; 

        const pageStart = (Number(page) -1) * Number(per_page); 
        const pageEnd = pageStart + Number(per_page); 

        const users = this.serialize(schema.all('user')).users.slice(pageStart, pageEnd)

        return new Response(
          200, 
          {'x-total-count': String(total)},
          { users }
        )

      }); 
      this.get('users/:id')
      this.post('/users'); 

      this.namespace = ""; // avoiding conflict with next api 
      this.passthrough() // if any request is not found in mirage, it lets the request to be passed to the next apis
    }
  })

  return server
}