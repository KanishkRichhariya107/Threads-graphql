const express=require('express')
const graphql=require('@apollo/server')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express5');


async function innit(){
    const app=express()
const PORT=process.env.PORT||5001
const gqlserver=new ApolloServer({
    typeDefs:`
        type Query{
            hello: String
            hi(name: String): String
        }
        `
    ,
    resolvers:{
        Query:{
        hello:()=>"hello from user" ,
        hi:(_,{name})=>`hi ${name} from devbhai`
    }
        },
    
    
});
await gqlserver.start()

app.use(express.json())
app.get('/',(req,res)=>{
        res.json({message:"hello world"})
})
app.use('/graphql',(expressMiddleware(gqlserver)))
app.listen(PORT,()=>{
    console.log(`server started at ${PORT} `)
})

}
innit()

