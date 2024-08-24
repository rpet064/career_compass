export async function getRecordsToUpdate<Type extends { [key: string]: any }>(dataInDatabase: Type[] | null,
    dataFromClient: Type[] | null, key: keyof Type): Promise<Type[] | null> {    
    // Nothing to update
    if(!dataFromClient || !dataInDatabase)
        return [];

    let recordsToUpdate = [];
    for (let j = 0; j < dataFromClient.length; j++) {
        const clientData = dataFromClient[j];

            for (let i = 0; i < dataInDatabase.length; i++) {
                const databaseData = dataInDatabase[i];
                
            // Check if ids the same
            if (clientData[key] === databaseData[key]) {
                // check if differences in data
                if(clientData[key] !== databaseData[key])
                    recordsToUpdate.push(clientData);
                    break;
            }
        }
    }
    return recordsToUpdate;
}