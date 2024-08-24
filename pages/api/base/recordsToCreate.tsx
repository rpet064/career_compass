export async function getRecordsToCreate<Type extends { [key: string]: any }>(dataInDatabase: Type[] | null,
    dataFromClient: Type[] | null, key: keyof Type): Promise<Type[] | null> {    
    // All records are new
    if(!dataInDatabase)
        return dataFromClient;

    // No new records
    if(!dataFromClient)
        return [];

    let recordsToCreate = [];
    for (let j = 0; j < dataFromClient.length; j++) {
        const clientData = dataFromClient[j];

            for (let i = 0; i < dataInDatabase.length; i++) {
                const databaseData = dataInDatabase[i];

            if (clientData[key] === databaseData[key]) {
                break;
            }
        }
        recordsToCreate.push(clientData);
    }
    return recordsToCreate;
}