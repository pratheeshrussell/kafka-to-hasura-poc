import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { QuoteQuery } from "./gqlQueries/quote.query";
import { InsertQuoteResponse, InsertQuoteVars, QuoteTopicTrigger } from "./types/common.types";

export async function handleKafkaMessage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const hasuraUrl = "http://localhost:8080/v1/graphql";
    const roleName = "azure_user"; // The user role with insert permission
    
    const headers = {
        "Content-Type": "application/json",
        "X-Hasura-Role": roleName,
        "x-hasura-admin-secret": process.env["hasura_secret"]
    };
    context.log(`================`);
    context.log(`Received request`);
    
    if(request.method === 'POST') {
        const bodyText = (await request.text());
        const body = JSON.parse(bodyText) as QuoteTopicTrigger;
        context.log(`Received body: ${bodyText}`);
        
        if(Object.prototype.hasOwnProperty.call(body, 'quote')){
            context.log(`Quote found: ${body.quote}`);
         try {
            const mutationQuery = QuoteQuery.insertQuote;
            const mutationVars: InsertQuoteVars = {
                "quote_input": body.quote
            }
            const response = await fetch(hasuraUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    query: mutationQuery,
                    variables: mutationVars
                })
            });
    
            const data = (await response.json()) as InsertQuoteResponse;
            if (response.ok) {
                context.log(`fetch response ok with data: ${JSON.stringify(data)}`);
                return { jsonBody: data, status: 200 };
            } else {
                context.log(`fetch response not ok`);
                // SEND 200 ALWAYS
                return { body: data.toString(), status: 200 };
            }
        } catch (error) {
            context.log(`fetch error caught ${error.message}`);
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
