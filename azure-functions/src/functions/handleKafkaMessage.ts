import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Client } from 'pg';
import { QuoteTopicTrigger } from "./types/common.types";

export async function handleKafkaMessage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const config = {
        host: 'localhost',
        // Do not hard code your username and password.
        // USE environment variables.
        user: 'postgres',     
        password: 'postgrespassword',
        database: 'postgres',
        port: 5432,
        ssl: false
    };

    const pgclient = new Client(config);
    context.log(`================`);
    context.log(`Received request`);
    
    if(request.method === 'POST') {
        const bodyText = (await request.text());
        const body = JSON.parse(bodyText) as QuoteTopicTrigger;
        context.log(`Received body: ${bodyText}`);

        
        if(Object.prototype.hasOwnProperty.call(body, 'quote')){
            context.log(`Quote found: ${body.quote}`);
         try {
            const sql = `
                INSERT INTO public."Quotes" (quote)
                VALUES ($1)
                RETURNING quote;
            `;
            const values = [body.quote]; 
            await pgclient.connect().then(async ()=>{
               await pgclient.query(sql, values).then((result)=>{
                    context.log('Quote inserted successfully:', result.rows[0]);
                }).catch((err)=>{
                    context.log(`query error caught ${err.message}`);
                    throw err;
                })
            }).catch((err)=>{
                context.log(`connect error caught ${err.message}`);
                throw err;
            }).finally(()=>{
                pgclient.end();
            });
                    
        } catch (error) {
            // SEND 200 ALWAYS
            return { body: error.message, status: 200 };
        }
        }else{
            context.log(`Quote not found`);
        }
        
    }
    context.log(`================`);

    return { jsonBody: {message:`Request Received`} };
};

app.http('handleKafkaMessage', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: handleKafkaMessage
});
