export class QuoteQuery {
    static insertQuote = `
        mutation InsertQuoteMutation($quote_input: String!) {
            insert_Quotes(objects: {quote: $quote_input}) {
                affected_rows
                returning {
                quote
                }
            }
        }
    `;
}