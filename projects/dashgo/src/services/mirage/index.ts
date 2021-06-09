import {createServer, Factory, Model} from 'miragejs'
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
      server.createList('user', 10)
    }, 

    routes(){
      this.namespace = 'api'; 
      this.timing = 750;

      this.get('/users'); 
      this.post('/users'); 

      this.namespace = ""; // avoiding conflict with next api 
      this.passthrough() // if any request is not found in mirage, it lets the request to be passed to the next apis
    }
  })

  return server
}