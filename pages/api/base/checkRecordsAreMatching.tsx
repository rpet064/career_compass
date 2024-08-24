export async function checkRecordsAreMatching(list1: any[] | null, list2: any[] | null): Promise<boolean> {
    if(!list1 || !list2)
        return false;

    if(!list1 && !list2)
        return true;

    return list1.every(record1 => list2.includes(record1));
}