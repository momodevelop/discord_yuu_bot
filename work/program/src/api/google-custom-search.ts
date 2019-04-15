import r from 'request-promise-native'
const kEndpointUrl = "https://www.googleapis.com/customsearch/v1"

function prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

//https://developers.google.com/custom-search/v1/cse/list
export interface SearchParams {
    q: string;
    cx: string;
    key: string;
}
export interface OptionalSearchParams {
    c2coff?: string;
    cr?: string;
    dateRestrict?: string;
    exactTerms?: string;
    excludeTerms?: string;
    fileType?: string;
    filter?: string;
    gl?: string;
    googlehost?: string;
    highRange?: string;
    hl?: string;
    hq?: string;
    imgColorType?: string;
    imgDominantColor?: string;
    imgSize?: string;
    imgType?: string;
    linkSite?: string;
    lowRange?: string;
    lr?: string;
    num?: number;
    orTerms?: string;
    relatedSite?: string;
    rights?: string;
    safe?: string;
    searchType?: string;
    siteSearch?: string;
    siteSearchFilter?: string;
    sort?: string;
    start?: number;
}

export interface Response {
    kind: "string";
    url: {
        type: string;
        template: string;
    }
    queries: {
        [key: string]: {
            searchTerms: string,
            count: number,
            startIndex: number,
            startPage: number,
            language: string,
            inputEncoding: string,
            outputEncoding: string,
            safe: string,
            cx: string,
            sort: string,
            filter: string,
            gl: string,
            cr: string,
            googleHost: string,
            disableCnTwTranslation: string,
            hq: string,
            hl: string,
            siteSearch: string,
            siteSearchFilter: string,
            exactTerms: string,
            excludeTerms: string,
            linkSite: string,
            orTerms: string,
            relatedSite: string,
            dateRestrict: string,
            lowRange: string,
            highRange: string,
            fileType: string,
            rights: string,
            searchType: string,
            imgSize: string,
            imgType: string,
            imgColorType: string,
            imgDominantColor: string
        }[]
    },
    promotions: {
        title: string;
        htmlTitle: string;
        link: string;
        displayLink: string;
        bodyLines: {
            title: string;
            htmlTitle: string;
            url: string;
            link: string;
        }[],
        image: {
            source: string,
            width: string,
            height: string
        }
    }[],
    context: {
        title: string;
        facets: {
            label: string;
            anchor: string;
            label_with_op: string;
        }[][]
    },
    searchInformation: {
        searchTime: number;
        formattedSearchTime: string;
        totalResults: number;
        formattedTotalResults: string;
    },
    spelling: {
        correctedQuery: string;
        htmlCorrectedQuery: string;
    },
    items: {
        kind: "customsearch#result";
        title: string;
        htmlTitle: string,
        link: string,
        displayLink: string,
        snippet: string,
        htmlSnippet: string,
        cacheId: string,
        mime: string,
        fileFormat: string,
        formattedUrl: string,
        htmlFormattedUrl: string,
        pagemap: {
            [key: string] : {
                [key: string]: string
            }[]
        },
        labels: {
            name: string;
            displayName: string;
            label_with_op: string;
        }[],
        image: {
            contextLink: string;
            height: number;
            width: number;
            byteSize: number;
            thumbnailLink: string;
            thumbnailHeight: number;
            thumbnailWidth: number
        }

    }[]
}

// getImages will process your request as if it's looking for images, and return an array of links to those images
// Note: if 'searchType' is given, it will be overwritten by 'image'
export async function getImages(searchParams: SearchParams, options?: OptionalSearchParams) : Promise<string[]>
{
    let tempOptions: OptionalSearchParams | undefined = options;
    if (tempOptions == null ) {
        tempOptions = {};
    }
    tempOptions.searchType = "image";

    let res: Response = await callApi(searchParams, tempOptions);

    // extract links from every item
    let result: string[] = [];
    for ( let i = 0 ; i < res.items.length; ++i ) {
        result.push(res.items[i].link);
    }
    
    return result;
} 

export async function callApi(reqOptions: SearchParams, options?: OptionalSearchParams) : Promise<Response>
{
    let query: string = "?";
    
    // unpack reqOptions
    let keys:[ string, any ][] = Object.entries(reqOptions);
    for(let i = 0; i < keys.length; ++i) {
        query += keys[i][0] + "=" + keys[i][1] + ((i == keys.length - 1) ? "" : "&");
    }

    // unpack options
    if ( options ) {
        
        keys = Object.entries(options);
        for(let i = 0; i < keys.length; ++i) {
            query += "&" +  keys[i][0] + "=" + keys[i][1];;
        }
    }

    query = encodeURI(query);

	let response: any = await r.get(kEndpointUrl + query, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return JSON.parse(response);
}
