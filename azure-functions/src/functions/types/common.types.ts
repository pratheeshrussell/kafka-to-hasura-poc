export type InsertQuoteVars = {
    "quote_input": string
}

export type QuoteTopicTrigger = {
    quote: string
}


export type InsertQuoteResponse = {
    data: {
        insert_Quotes: InsertQuotes;
    };
}

export type InsertQuotes = {
    affected_rows: number;
    returning: InsertQuotesData[];
}

export type InsertQuotesData = {
    quote: string;
}