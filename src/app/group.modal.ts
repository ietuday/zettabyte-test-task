    export interface Folder {
        owner: string;
        lastUpdatedBy: string;
        lastRevision: any;
        folder?: any;
        id: string;
        name: string;
        description: string;
        order: string[];
        folders_order: any[];
    }

    export interface HeaderData {
        key: string;
        value: string;
        description: string;
        enabled: boolean;
    }

    export interface Request {
        folder: string;
        id: string;
        name: string;
        dataMode: string;
        data: any[];
        rawModeData: string;
        descriptionFormat: string;
        description: string;
        headers: string;
        method: string;
        pathVariables: any[];
        url: string;
        preRequestScript?: any;
        tests?: any;
        currentHelper: string;
        helperAttributes: string;
        queryParams: any[];
        headerData: HeaderData[];
        pathVariableData: any[];
        responses: any[];
        collectionId: string;
    }

    export class Group {
        id: string;
        owner: string;
        name: string;
        description: string;
        order: any[];
        folders: Folder[];
        folders_order: string[];
        timestamp: number;
        public: boolean;
        lastUpdatedBy: string;
        lastRevision: number;
        team?: any;
        requests: Request[];
    }
